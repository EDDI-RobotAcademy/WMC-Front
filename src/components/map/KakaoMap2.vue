<template>
  <div id="map2"></div>
</template>

<script>
export default {
  name: 'KakaoMap2',
  data() {
    return {
      map: null,
      marker: null
    }
  },
  mounted() {
    this.initMap()
    this.initMarker()
  },
  methods: {
    initMap() {
      // 카카오 맵 생성
      this.map = new window.kakao.maps.Map(document.getElementById('map2'), {
        center: new window.kakao.maps.LatLng(37.577267900943056,126.98656013908354),
        level: 5
      })
    },
    initMarker() {
  // 마커 생성
  const markerPosition = new window.kakao.maps.LatLng(37.577267900943056,126.98656013908354)
  this.marker = new window.kakao.maps.Marker({
    position: markerPosition
  })

  // 마커를 지도 위에 표시
  this.marker.setMap(this.map)

  // 인포윈도우 생성
  const infoWindowContent = '<div style="padding:10px;">안경이야기</div>'
  const infoWindowPosition = markerPosition
  const infoWindowOptions = {removable: true}
  const infoWindow = new window.kakao.maps.InfoWindow({
    content: infoWindowContent,
    position: infoWindowPosition,
    removable: infoWindowOptions.removable
  })

  // 마커에 클릭 이벤트 등록
  window.kakao.maps.event.addListener(this.marker, 'click', () => {
    infoWindow.open(this.map, this.marker)
  })
}
  }
}
</script>

<style scoped>
#map2 {
  width: 350px;
  height: 350px;
}
</style>
