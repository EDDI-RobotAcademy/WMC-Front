<template>
  <div id="map"></div>
</template>

<script>
export default {
  name: 'KakaoMap',
  data() {
    return {
      map: null
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      // 카카오 맵 생성
      this.map = new window.kakao.maps.Map(document.getElementById('map'), {
        center: new window.kakao.maps.LatLng(37.48304736239642, 127.03564683785888),
        level: 3
      })
    }
  }
}
</script>

<style scoped>
#map {
  width: 500px;
  height: 500px;
}
</style>
