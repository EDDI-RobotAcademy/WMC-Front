<template>
  <div>
          <v-carousel height="100%" hide-delimiters cycle :interval="5000">
              <v-carousel-item src="@/assets/banner/MAPBANNER2.jpeg" style="height: 450px;"/>
              <v-carousel-item src="@/assets/banner/MAPBANNER.jpeg" style="height: 450px;" />
              <v-carousel-item src="@/assets/banner/MAPBANNER4.jpeg" style="height: 450px;" />
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
  margin: auto;
  padding: auto;
  display:flex;
  justify-content: center;
  
}
.carousel-item {
  display: flex;
  justify-content: center;
  align-items: center;
}
.carousel-item img {
  display: block;
  margin: 0 auto;
}

.carousel-inner {
  width: 100%;
  display:flex;
  justify-content: center;
  margin: auto;
  padding: auto;
}

.carousel-item img {
  display:flex;
  height: auto;
  width: auto;
  margin: auto;
  padding: auto;
  }

</style>
