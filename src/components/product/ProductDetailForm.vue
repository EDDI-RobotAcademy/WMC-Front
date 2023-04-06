<template>
  <v-row>
    <v-col cols="12" sm="6" md="6">
      <div v-if="product">
        <v-img
          v-for="(image, index) in product.imageDataList"
          :key="index"
          :src="getImagePath(image.imageData)"
          :alt="'Image ' + index"
          class="mini-image"
          @mouseover="changeMainImage(getImagePath(image.imageData))"
        ></v-img>
        <v-img :src="mainImage" :alt="'Main Image'" class="main-image"></v-img>
      </div>
    </v-col>
    <v-col cols="12" sm="6" md="6" v-if="product">
      <h2>{{ product.name }}</h2>
      <p>{{ product.description }}</p>
      <p>{{ product.price }}₩</p>
      <p>{{ product.stock }} in stock</p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    product: Object,
  },
  data() {
    return {
      mainImage: this.product ? this.getImagePath(this.product.imageDataList[0].imageData) : '',
    };
  },
  methods: {
    getImagePath(imageData) {
      console.log('imageData:', imageData);
      return require(`@/${imageData}`);
    },
    changeMainImage(image) {
      this.mainImage = image;
    },
  },
};
</script>

<style scoped>
.mini-image {
  width: 50px;
  height: 50px;
  cursor: pointer;
}
.main-image {
  width: 300px;
  height: 300px;
  margin-top: 1rem;
}
</style>
