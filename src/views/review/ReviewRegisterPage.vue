<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="800px">
      <form @submit.prevent="submitReview">
        <v-card>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="상품명" v-model="reviewProduct.name" readonly></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="작성자" v-model="user.name" readonly></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="상품 카테고리" v-model="reviewProduct.category" readonly></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="24">
                <div class="rating-label">Star Rating</div>
                  <v-rating justify-center name="rating" v-model="rating" color="yellow" density="compact" size="middle" ></v-rating>
              </v-col>
              <v-col cols="12">
                <v-textarea label="리뷰 내용" v-model="content" required></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <input
                type="file"
                id="files"
                ref="files"
                accept="@/assets/reviewImage"
                multiple
                @change="handleFileUpload"
              />
            </v-row>
          </v-container>
          <v-btn variant="outlined" type="submit" class="submit-btn">Submit</v-btn>
          <v-btn variant="outlined" type="button" @click="cancel" class="cancel-btn">Cancel</v-btn>
        </v-card>
      </form>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    productId: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState(['user', 'reviewProduct']),
  },
  data() {
    return {
      rating: 0,
      content: '',
      image: null,
    };
  },
  methods: {
    ...mapActions(['fetchReviewProduct', 'submitReview']),
   
    handleFileUpload(event) {
      this.image = event.target.files;
    },
    async submitReview() {
      if (this.$refs.form.validate()) {
        const formData = new FormData();
        formData.append('product', this.reviewProduct.id);
        formData.append('user', this.user.id);
        formData.append('rating', this.rating);
        formData.append('content', this.content);

        for (let i = 0; i < this.image.length; i++) {
          formData.append(`files[${i}]`, this.image[i]);
        }

        await this.submitReview(formData);
        this.dialog = false;
      }
    },
    cancel() {
      this.dialog = false;
    }
  },
  watch: {
    productId() {
      this.fetchReviewProduct(this.productId);
    },
  },
};
</script>

