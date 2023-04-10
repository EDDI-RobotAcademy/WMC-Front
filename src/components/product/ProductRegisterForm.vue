<template>
  <v-app>
    <v-container class="product-registration-page">
      <v-row>
        <v-col cols="12" sm="8" md="6">
          <h1>상품 등록</h1>
          <v-form @submit.prevent="registerProduct">
            <v-text-field
              label="상품명"
              v-model="name"
              required
              outlined
              class="mt-3"
            ></v-text-field>
            <v-textarea
              label="상품설명"
              v-model="description"
              required
              outlined
              class="mt-3"
            ></v-textarea>
            <v-text-field
              label="가격"
              v-model="price"
              required
              outlined
              type="number"
              class="mt-3"
            ></v-text-field>
            <v-text-field
              label="재고"
              v-model="stock"
              required
              outlined
              type="number"
              class="mt-3"
            ></v-text-field>
            <v-select
              label="카테고리 선택"
              v-model="categoryId"
              :items="categories"
              item-text="name"
              item-value="categoryId"
              required
              outlined
              class="mt-3"
            ></v-select>

            <v-file-input
              label="상품 사진 업로드"
              multiple
              show-size
              @change="handleFileUpload($event)"
              class="mt-3"
            ></v-file-input>
            <v-btn type="submit" color="primary" class="mb-3 mt-3"
              >상품등록하기</v-btn
            >
            <router-link to="{ name: 'ProductListPage' }">
              <v-btn color="secondary" outlined class="mt-3">취소</v-btn>
            </router-link>
          </v-form>
        </v-col>
        <v-col cols="12" sm="4" md="6">
          <h2 class="mt-3">Selected Files</h2>
          <v-row>
            <v-col
              v-for="(url, index) in imageUrls"
              :key="index"
              cols="6"
              sm="4"
            >
              <v-img
                :src="url"
                :alt="'Image ' + index"
                aspect-ratio="1"
              ></v-img>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios';
export default {
  data () {
    return {
      name: 'iGlass',
      description: '이제까지 나온 최고의 안경입니다.',
      price: 1000000,
      stock: 10,
      files: [],
      imageUrls: [],
      categories: [],
      categoryId: null,
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get('http://localhost:7777/categories');
        this.categories = response.data;
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
    registerProduct() {
      const { name, description, price, stock, categoryId, files } = this;
      this.$emit('submit', {
        name,
        description,
        price,
        stock,
        category: categoryId,
        files,
      });
    },
    handleFileUpload(files) {
      this.files = files;
      this.imageUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
    },
  },
};
</script>

<style scoped>
.mt-3 {
  margin-top: 1rem;
}
</style>
