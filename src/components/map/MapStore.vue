<template>
  <v-container>
      <h1>오프라인 매장</h1>
      <v-row>
          <v-card class="custom-card" flat float>
              <KakaoMap/>
          </v-card>
      </v-row>
  </v-container>
</template>
<script>

import KakaoMap from "@/components/map/KakaoMap.vue";
export default {
    components: {
        KakaoMap
    }
}
</script>

<style>
.row {

    display: flex;
    justify-content: center;
    align-items: center;
}

.v-card.custom-card {
    width: 500px;
    height: 500px;
    padding-top: 200px;
}
</style>