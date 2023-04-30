<template>
  <form @submit.prevent="registerNotice" class="notice-form">
    <table>
      <tr>
        <td>제목</td>
        <td>
          <input type="text" v-model="title" class="mt-5 notice-input" />
        </td>
      </tr>
      <tr>
        <td>작성자</td>
        <td>
          <input type="text" v-model="writer" class="mt-5 mb-5 notice-input" />
        </td>
      </tr>
      <tr>
        <td>본문</td>
        <td>
          <textarea cols="50" rows="20" v-model="content" class="mb-5 notice-textarea" />
        </td>
      </tr>
      <tr>
        <td>파일 업로드</td>
        <td>
          <input type="file" id="file" multiple show-size @change="handleFileUpload($event.target.files)" class="mb-5" />
        </td>
      </tr>
      <tr>
        <td>업로드된 이미지</td>
        <td>
          <div v-for="(image, index) in imageUrls" :key="index" class="image-wrapper">
            <img :src="image" alt="Uploaded Image" class="notice-image">
          </div>
        </td>
      </tr>
    </table>
    <button type="submit" class="mr-5 notice-button">등록</button>
    <router-link :to="{ name: 'NoticeListPage' }" class="notice-button">
      취소
    </router-link>
  </form>
</template>

<script>

//import mainRequest from '@/api/mainRequest';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

export default {
  name: "NoticeRegisterForm",
  data() {
    return {
      title: '제목을 입력하세요.',
      writer: 'WMC',
      content: '내용을 입력하세요.',
      files: [],
      imageUrls: [],
      fileNames: [],
      uploadedImages: [],
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
  methods: {
    async registerNotice() {
      const { title, writer, content, files } = this;
      await this.uploadMultipleFilesToS3(files);

      this.$emit('submit', {
        title,
        writer,
        content,
        fileNames: this.fileNames,
      });
    },

    handleFileUpload(files) {
      console.log('handleFileUpload called', files);

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
table {
  margin: 0 auto;
}

.notice-input {
  width: 100%;
  padding: 5px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.notice-textarea {
  width: 100%;
  padding: 5px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.notice-textarea {
  width: 100%;
  padding: 5px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 3px;
  min-height: 500px;
  min-width: 600px;
  overflow-y: auto;
  resize: vertical;
}

.image-wrapper {
  display: inline-block;
  margin: 5px;
}

.notice-image {
  max-width: 100px;
  max-height: 100px;
  border: 1px solid #ccc;
  border-radius: 3px;
}
</style>
