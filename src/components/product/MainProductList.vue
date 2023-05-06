<template>
  <div class="main-container">
    <carousel :perPage="4" :navigationEnabled="true">
      <slide v-for="product in products" :key="product.productId">
        <router-link
          :to="{
            name: 'ProductDetailPage',
            params: { productId: product.productId },
          }"
          tag="div"
        >
          <v-card tile flat class="p-12 mb-0">
            <v-img
              :src="product.firstPhoto ? getImagePath(product.firstPhoto) : ''"
              aspect-ratio=".8"
            ></v-img>

            <v-card-title>{{ product.name }}</v-card-title>
            <v-card-actions> </v-card-actions>
          </v-card>
        </router-link>
      </slide>
    </carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import { mapState } from 'vuex';

export default {
  name: 'MostSoldProductList',
  components: {
    Carousel,
    Slide,
  },
  props: {
    products: {
      type: Array,
    },
  },
  methods: {
    getImagePath(imageData) {
      return `https://wmc-s3-bucket.s3.ap-northeast-2.amazonaws.com/${imageData}`;
    },
  },
};
</script>

<style>
.row {
  --bs-gutter-x: 0rem;
}

.container {
  max-width: 100%;
  min-width: 0%;
  padding: 12px;
  margin: 0px;
}

.main-container {
  max-width: 100%;

  margin: 0;
}

.card-container {
  padding-top: 0px;
  padding-bottom: 0px;
}
</style>
