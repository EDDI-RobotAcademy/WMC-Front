<template>
  <v-container>
    <div>
      <v-carousel :cycle="cycle" :interval="interval" :height="height" v-model="model" show-arrows show-delimiters>
        <v-carousel-item v-for="(picture, idx) in pictures" :key="idx">
          <v-sheet :height="height" tile>
            <v-row class="fill-height">
              <v-img :src="picture.img" class="carousel-image" contain />
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "CarouselPage",
  data() {
    return {
      model: 0,
      pictures: [
        { img: require("@/assets/image/1.jpg") },
        { img: require("@/assets/image/2.jpg") },
        { img: require("@/assets/image/3.jpg") },
      ],
      cycle: true,
      interval: 2500, // ms 단위
      height: 1500,
    };
  },
};
</script>

<style scoped>
.carousel-image {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
</style>
