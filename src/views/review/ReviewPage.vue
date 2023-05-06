<template>
     <v-container>
     <p>ㅓ어어엉</p>
     <review-list :product="product" :reviews="reviews" />
     </v-container>
</template>

<script>
import ReviewList from '@/components/review/ReviewList.vue';
import ReviewCreateDialog from '@/components/review/ReviewCreateDialog.vue';
import ReviewDetailDialog from '@/components/review/ReviewDetailDialog.vue';

export default {
components: {
     ReviewList,
     ReviewCreateDialog,
     ReviewDetailDialog
},
data() {
    return {
      product: {
        id: 1,
        name: "Sample Product",
        description: "This is a sample product.",
        price: 100,
      },
      reviews: [
        {
          id: 1,
          rating: 4,
          comment: "Great product!",
          author: "John Doe",
        },
        {
          id: 2,
          rating: 5,
          comment: "Amazing quality!",
          author: "Jane Smith",
        },
      ],
    };
  },
}
</script>

<style>

</style>