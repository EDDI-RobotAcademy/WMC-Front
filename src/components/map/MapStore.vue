<template>
  <v-container>
    <div>
        <h1>오프라인 스토어</h1>
        <div>
            <v-row justify="center">
                <v-card flat>
                    <v-card-text>
                        <h3>WMC 상품을 오프라인 매장에서도 만나보세요!</h3>
                        <div class="banner">
                            <MapBannerCarouselPage/>
                        </div>
                    </v-card-text>
                </v-card>
            </v-row>
        </div>
        <div>
            <v-row justify="center">
                <v-card class="custom-card" flat>
                    <v-card-title>
                        <h4>양재역점</h4>
                    </v-card-title>
                    <v-card-text class="text-left">
                        <h5>아이러브안경원<h6>서울 서초구 남부순환로 지하 2585 양재역 상가 15호</h6></h5>
                    </v-card-text>
                    <div class="d-flex justify-center">
                        <KakaoMap />
                    </div>
                </v-card>
                <v-card class="custom-card" flat>
                    <v-card-title >
                        <h4>홍대입구역점</h4>
                    </v-card-title>
        <v-card-text class="text-left">
            <h5>다비치안경<h6>서울 마포구 양화로 193</h6></h5>
        </v-card-text>
        <div class="d-flex justify-center">
            <KakaoMap1 />
        </div>
    </v-card>
    <v-card class="custom-card" flat>
        <v-card-title>
            <h4>안국역점</h4>
        </v-card-title>
        <v-card-text class="text-left">
            <h5>안경이야기<h6>서울 종로구 율곡로 67</h6></h5>
        </v-card-text>
        <div class="d-flex justify-center">
            <KakaoMap2 />
        </div>
    </v-card>
</v-row>
</div>
</div>
</v-container>
</template>

<script>
import MapBannerCarouselPage from "@/components/carousel/MapBannerCarouselPage.vue"
import KakaoMap from "@/components/map/KakaoMap.vue";
import KakaoMap1 from "@/components/map/KakaoMap1.vue";
import KakaoMap2 from "@/components/map/KakaoMap2.vue";
export default {
  components: {
    MapBannerCarouselPage,
    KakaoMap,
    KakaoMap1,
    KakaoMap2
  }
};
</script>

<style>
.row {
  display: flex;
  flex-wrap: wrap;
}

.v-card.custom-card {
  width: 400px;
}

.d-flex.justify-center {
  display: flex;
  justify-content: center;
}
.banner{
}
</style>
