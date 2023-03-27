<template>
  <v-carousel :multi-item="true" :per-page="items.length" cycle hide-delimiters>
    <v-carousel-item v-for="n in Math.ceil(items.length / 4)" :key="n">
      <v-row justify="center">
        <v-col cols="4"  v-for="(item, index) in items.slice((n - 1) * 3, n * 3)" :key="index">
          <v-card :color="item.color" class="card-carousel">
            <v-card-title>{{ item.title }}</v-card-title>
            <v-img :src="item.src" contain :aspect-ratio="1.77778"  class="carousel-image"></v-img>
            <v-card-text>{{ item.text }}</v-card-text>
            <v-card-actions>
              <v-btn text>Read More</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-carousel-item>
  </v-carousel>
  </template>
  
  <script>
    import { Carousel, Slide } from "vue-carousel";
  
  export default {
    name: "BodyBanner",
    components: {
      Carousel,
      Slide,
    },
  
  data() {
    return {
      items: [
        {
          src: 'http://cdn2-aka.makeshop.co.kr/design/yeoek/wib_2/img/main/main_fb_0326_01J.jpg',
          title: '특별한 혜택 ',
          text: '첫 구매시  5%적립.',
          color: 'white',
        },
        {
          src: 'https://www.sinshop.co.kr/web/upload/NNEditor/20220704/05d616a08e6165acdd3fa2233cc3db2c.jpg',
          title: '무료배송',
          text: '4만원이상 구매시 기존 회원 무료 배송 .',
          color: 'white',
        },
        {
          src: 'http://dailylike.jpg3.kr/hgodo/05_Evt/2202/220222_seasonoff_m_top_01.jpg',
          title: '시즌오프 70% 세일',
          text: '화.수.목 단 3일간 단 73% 할인 찬스 .',
          color: 'white',
        },
        {
          src: 'https://mblogthumb-phinf.pstatic.net/MjAxNjEyMDVfMTc0/MDAxNDgwOTEwNjExODA2.B_rB4a3Suh11wb_bio66785mMqxofmo5y5KTaMOApKQg.5nLJPj_KEzpUM2OGYwt9G3NyGhPTR2ddMGrvL4NLrRkg.JPEG.onceblue82/CHARLES-KEITH-winter-2016-ess-001_KOR.jpg?type=w800',
          title: 'best deals on our products today! ',
          text: '화.수.목 단 3일간 단 73% 할인 찬스',
          color: 'white',
        },
        {
          src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt4u4077lO6OtLtl-KQP66Z4WFEPuzA113uA&usqp=CAU',
          title: '신상품 단독 사은품',
          text: 'This is the second card in the carousel.',
          color: 'white',
        },
      ],
    };
  },
  };
  </script>
  
  <style scoped>
  .card-carousel {
  width: 100%;
  height: 400px;
  margin-right:50px ;
  }
  .carousel-image {
  height: 230px;

  }

  </style>