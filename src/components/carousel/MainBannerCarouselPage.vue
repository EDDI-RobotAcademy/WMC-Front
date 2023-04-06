<template>
  <div>
          <v-carousel height="auto" hide-delimiters cycle :interval="5000">
              <v-carousel-item src="@/assets/banner/glassBanner1.jpeg" cover />
              <v-carousel-item src="@/assets/banner/glassBanner2.jpeg" cover />
              <v-carousel-item src="@/assets/banner/glassBanner3.jpeg" cover />
              <v-carousel-item src="@/assets/banner/glassBanner4.jpeg" cover />
              <v-carousel-item src="@/assets/banner/glassBanner5.jpeg" cover />
              <v-carousel-item src="@/assets/banner/glassBanner6.jpeg" cover />
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
  height: 850px;
  width: 100%;
  margin: 0;
  padding: 0;
  }

</style>
