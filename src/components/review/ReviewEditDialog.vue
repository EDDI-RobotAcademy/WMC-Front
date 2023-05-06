<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <v-card>
      <v-card-title>리뷰 수정</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field label="상품명" v-model="reviewProduct.name" readonly></v-text-field>
          <v-text-field label="상품 카테고리" v-model="reviewProduct.category" readonly></v-text-field>
          <v-text-field label="작성자" v-model="user.name" readonly></v-text-field>
          <v-rating label="별점" v-model="rating"></v-rating>
          <v-textarea label="리뷰 내용" v-model="content"></v-textarea>
          <v-file-input label="이미지" v-model="image" multiple @change="handleFileUpload"></v-file-input>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="updateReview">수정 완료</v-btn>
        <v-btn color="secondary" @click="dialog = false">취소</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    reviewId: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState(['user', 'reviewProduct']),
  },
  data() {
    return {
      rating: null,
      content: '',
      image: null,
    };
  },
  methods: {
    ...mapActions(['fetchReviewById', 'updateReview']),
    handleFileUpload(event) {
      this.image = event.target.files;
    },
    async updateReview() {
      if (this.$refs.form.validate()) {
        const formData = new FormData();
        formData.append('id', this.reviewId);
        formData.append('rating', this.rating);
        formData.append('content', this.content);

        for (let i = 0; i < this.image.length; i++) {
          formData.append(`files[${i}]`, this.image[i]);
        }

        await this.updateReview(formData);
        this.dialog = false;
      }
    },
  },
  async created() {
    const review = await this.fetchReviewById(this.reviewId);
    this.rating = review.rating;
    this.content = review.content;
    this.image = review.image;
  },
  watch: {
    reviewId() {
      this.fetchReviewById(this.reviewId);
    },
  },
};
</script>
