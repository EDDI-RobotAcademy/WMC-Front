<template>
  <div class="main-container">
    <!--이슈작성-->
    <v-row style="--bs-gutter-x: 1.5rem">
      <v-col
        class="card-container"
        v-for="product in products"
        :key="product.productId"
        cols="12"
        sm="3"
        md="3"
      >
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
              class="grey lighten-3"
            ></v-img>

            <v-card-title>{{ product.name }}</v-card-title>
            <v-card-actions> </v-card-actions>
          </v-card>
        </router-link>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import { mapState } from 'vuex';
export default {
    name: 'MostSoldProductList',
    comments: {
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
      console.log('imageData:', imageData);
      return require(`@/${imageData}`);
    },
    }
}
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