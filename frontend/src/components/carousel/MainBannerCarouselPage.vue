<template>
  <div>
          <v-carousel hide-delimiters cycle :interval="5000">
              <v-carousel-item src="@/assets/banner/banner1.jpg" cover />
              <v-carousel-item src="@/assets/banner/banner2.jpg" cover />
              <v-carousel-item src="@/assets/banner/banner3.jpg" cover />
              <v-carousel-item src="@/assets/banner/banner4.jpg" cover />
              <v-carousel-item src="@/assets/banner/banner5.jpg" cover />
          </v-carousel>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.carousel {
  width: 100%;
  margin: 0;
  padding: 0;
}

.carousel-inner {
  width: 100%;
  margin: 0;
  padding: 0;
}

.carousel-item img {
  width: 100%;
  height: 300px;
  margin: 0;
  padding: 0;
  }

</style>
