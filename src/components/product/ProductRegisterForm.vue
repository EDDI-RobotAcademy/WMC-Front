<template>
  <v-app>
    <v-container class="product-registration-page">
      <v-row>
        <v-col cols="12" sm="8" md="6">
          <h1>상품 등록</h1>
          <v-form @submit.prevent="registerProduct">
            <v-text-field
              label="상품명"
              v-model="name"
              required
              outlined
              class="mt-3"
            ></v-text-field>
            <v-textarea
              label="상품설명"
              v-model="description"
              required
              outlined
              class="mt-3"
            ></v-textarea>
            <v-text-field
              label="가격"
              v-model="price"
              required
              outlined
              type="number"
              class="mt-3"
            ></v-text-field>
            <v-text-field
              label="재고"
              v-model="stock"
              required
              outlined
              type="number"
              class="mt-3"
            ></v-text-field>
            <v-select
              label="카테고리 선택"
              v-model="categoryId"
              :items="categories"
              item-text="name"
              item-value="categoryId"
              required
              outlined
              class="mt-3"
            ></v-select>

            <v-file-input
              label="상품 사진 업로드"
              multiple
              show-size
              @change="handleFileUpload($event)"
              class="mt-3"
            ></v-file-input>
            <v-btn type="submit" color="primary" class="mb-3 mt-3"
              >상품등록하기</v-btn
            >
            <router-link to="{ name: 'ProductListPage' }">
              <v-btn color="secondary" outlined class="mt-3">취소</v-btn>
            </router-link>
          </v-form>
        </v-col>
        <v-col cols="12" sm="4" md="6">
          <v-row>
            <v-col
              v-for="(url, index) in imageUrls"
              :key="index"
              cols="6"
              sm="4"
            >
              <v-img
                :src="url"
                :alt="'Image ' + index"
                aspect-ratio="1"
              ></v-img>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import mainRequest from '@/api/mainRequest';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

export default {
  data() {
    return {
      name: 'iGlass',
      description: '이제까지 나온 최고의 안경입니다.',
      price: 1000000,
      stock: 10,
      files: [],
      imageUrls: [],
      fileNames: [],
      categories: [],
      categoryId: null,
      file: null,
      awsBucketName: 'wmc-s3-bucket',
      awsBucketRegion: 'ap-northeast-2',
      awsIdentityPoolId: 'ap-northeast-2:8de0e190-db24-44d8-88b5-2e897cd0af39',
      s3: null,
      awsFileList: [],
      startAfterAwsS3Bucket: null,
      awsS3NextToken: null,
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await mainRequest.get('/categories');
        this.categories = response.data;
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
    async registerProduct() {
      const { name, description, price, stock, categoryId, files } = this;
      await this.uploadMultipleFilesToS3(files);

      this.$emit('submit', {
        name,
        description,
        price,
        stock,
        categoryId,
        fileNames: this.fileNames,
      });
    },
    handleFileUpload(files) {
      this.files = files;
      this.imageUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      this.fileNames = Array.from(files).map(
        (file) => uuidv4() + '.' + file.name.split('.').pop()
      );
    },

    async uploadMultipleFilesToS3(files) {
      const uploadPromises = Array.from(files).map((file, index) =>
        this.uploadFileToS3(file, this.fileNames[index])
      );
      await Promise.all(uploadPromises);
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
    uploadFileToS3(file, uniqueFileName) {
      return new Promise((resolve, reject) => {
        this.awsS3Config(() => {
          this.s3.upload(
            {
              Key: uniqueFileName,
              Body: file,
              ACL: 'public-read',
            },
            (err, data) => {
              if (err) {
                console.log(err);
                reject(err);
                return alert(
                  '업로드 중 문제 발생 (사진 파일에 문제가 있음)',
                  err.message
                );
              }
              console.log('File uploaded:', data);
              resolve(data);
            }
          );
        });
      });
    },

    uploadAwsS3() {
      this.awsS3Config(() => {
        this.s3.upload(
          {
            Key: this.file.name,
            Body: this.file,
            ACL: 'public-read',
          },
          (err, data) => {
            if (err) {
              console.log(err);
              return alert(
                '업로드 중 문제 발생 (사진 파일에 문제가 있음)',
                err.message
              );
            }
            alert('업로드 성공!');
            this.getAwsS3Files();
          }
        );
      });
    },
  },
};
</script>

<style scoped>
.mt-3 {
  margin-top: 1rem;
}
</style>