<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="800px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="grey"
          dark
          v-bind="attrs"
          v-on="on"
          @click="openReviewDialog"
        >
          리뷰 등록하기
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">리뷰 등록</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field :value="product.name" readonly></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="카테고리"
                  :value="product.name"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="작성자"
                  :value="product.name"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-rating label="별점" v-model="reviewData.rating" required />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="본문"
                  v-model="reviewData.content"
                  required
                />
              </v-col>
              <v-col>
                <v-file-input
                  label="상품 사진 업로드"
                  multiple
                  show-size
                  @change="handleFileUpload($event)"
                  class="mt-3"
                ></v-file-input>
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
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            닫기
          </v-btn>
          <v-btn color="blue darken-1" text @click="onSubmit(reviewData)">
            등록하기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import mainRequest from '@/api/mainRequest';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { mapActions, mapState } from 'vuex';
const memberModule = 'memberModule';
const reviewModule = 'reviewModule';

export default {
  data() {
    return {
      dialog: false,
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
      reviewData: {
        writer: '',
        rating: 3,
        content: '',
      },
    };
  },

  props: {
    product: Object,
  },

  computed: {},
  methods: {
    ...mapActions('reviewModule', ['requestCreateReviewToSpring']),
    onSubmit() {
  const content = this.reviewData.content;
  // const fileNames = this.fileNames;
  const rating = this.reviewData.rating;
  const productId = this.product.productId;
  const payload = {
    productId: productId,
    token: JSON.parse(localStorage.getItem('userInfo')),
    rating,
    content,
    fileNames: this.fileNames,
  };
  console.log(payload);
  this.requestCreateReviewToSpring(payload)
    .then(() => {
      this.dialog = false;
    })
    .catch(() => {
      console.error('Error submitting the review.');
    });
},


    openReviewDialog() {
      this.$emit('openReviewDialog');
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

<style></style>
