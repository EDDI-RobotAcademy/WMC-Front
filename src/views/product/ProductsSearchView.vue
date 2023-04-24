<template>
  <v-container>
      <v-col
        v-if="
          !searchResults ||
          (Array.isArray(searchResults) && searchResults.length === 0)
        "
      >
        상품이 존재하지 않습니다!
      </v-col>
      <v-col
        v-else
        v-for="product in searchResults"
        :key="product.productId"
        cols="12"
        sm="6"
        md="4"
      >
        <router-link
          :to="{
            name: 'ProductDetailPage',
            params: { productId: product.productId },
          }"
          tag="div"
        >
          <v-card flat>
            <v-img
              :src="product.firstPhoto ? getImagePath(product.firstPhoto) : ''"
              aspect-ratio=".8"
            ></v-img>
            <v-card-title>{{ product.name }}</v-card-title>
            <v-card-text>{{ product.description }}</v-card-text>
            <v-card-subtitle>{{ product.price }}₩</v-card-subtitle>
          </v-card>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import { mapState } from 'vuex';
import AWS from 'aws-sdk';
const productModule = 'productModule';

export default {
  name: 'ProductList',
  components: {
    Carousel,
    Slide,
  },

  data() {
    return {
      memberId: localStorage.getItem('memberId'),
      authorityName: localStorage.getItem('authorityName'),
      cart: [],
      awsBucketName: 'wmc-s3-bucket',
      awsBucketRegion: 'ap-northeast-2',
      awsIdentityPoolId: 'ap-northeast-2:8de0e190-db24-44d8-88b5-2e897cd0af39',
      awsFileList: [],
    };
  },

  computed: {
    ...mapState(productModule, ['isAuthenticated', 'searchResults']),

    total() {
      let sum = 0;
      for (const item of this.cart) {
        sum += item.price * item.quantity;
      }
      return sum;
    },
  },
  mounted() {
    if (localStorage.getItem('userInfo')) {
      this.$store.state.isAuthenticated = true;
    } else {
      this.$store.state.isAuthenticated = false;
    }
  },
  methods: {
    goToProductDetail(product) {
      this.$router.push({
        name: 'ProductDetailPage',
        params: { productId: product.productId },
      });
    },

    getImagePath(imageData) {
      const s3BucketBaseUrl =
        'https://wmc-s3-bucket.s3.ap-northeast-2.amazonaws.com';
      const imageURL = `${s3BucketBaseUrl}/${imageData}`;
      console.log('Image URL:', imageURL);
      return imageURL;
    },

    awsS3Config(callback) {
      AWS.config.update({ region: this.awsBucketRegion });

      const cognitoCredentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: this.awsIdentityPoolId,
      });

      cognitoCredentials.get((err) => {
        if (err) {
          console.log('Error fetching credentials:', err);
          return;
        }

        AWS.config.credentials = cognitoCredentials;

        this.s3 = new AWS.S3({
          apiVersion: '2006-03-01',
          params: {
            Bucket: this.awsBucketName,
          },
        });

        console.log('Credentials: ', AWS.config.credentials);

        if (callback) {
          callback();
        }
      });
    },
    getAwsS3Files() {
      this.awsS3Config(() => {
        let res = this.s3.listObjects(
          {
            Delimiter: '/',
            MaxKeys: 1,
          },
          (err, data) => {
            if (err) {
              return alert('AWS 버킷내에 문제가 있습니다: ' + err.message);
            } else {
              this.awsFileList = data.Contents;
              console.log('s3 리스트: ', data);
              this.startAfterAwsS3Bucket = data.NextMarker;
            }
          }
        );
      });
    },
  },
};
</script>

<style>
.shopping-mall {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.products-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}
.product {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
}
.cart-container {
  margin-top: 50px;
}
</style>
