<template>
  <v-container>
    <div align="center">
      <h2>NOTICE</h2>
      <notice-read v-if="notice" :notice="notice" :images="notice.images" />
      <p v-else>로딩중 .......... </p>
      <v-btn color="primary" outlined :to="{ name: 'NoticeModifyPage', params: { noticeId, notice } }">수정</v-btn>
      <v-btn v-if="isManager" color="error" @click="onDelete">삭제</v-btn>
      <v-btn color="info" :to="{ name: 'NoticeListPage' }">돌아가기</v-btn>
    </div>
  </v-container>
</template>


<script>
import NoticeRead from '../../../components/csCenter/notice/NoticeRead.vue'
import { mapActions, mapState } from 'vuex'
const noticeModule = 'noticeModule'
export default {
  components: { NoticeRead },
  name: "NoticeReadPage",
  props: {
    noticeId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      awsBucketName: 'wmc-s3-bucket',
      awsBucketRegion: 'ap-northeast-2',
      awsIdentityPoolId: 'ap-northeast-2:8de0e190-db24-44d8-88b5-2e897cd0af39',
    };
  },
  created() {
    this.requestNoticeToSpring(this.noticeId);
  },
  computed: {
    isManager() {
      return localStorage.getItem('authorityName') === 'MANAGER';
    },
    ...mapState(noticeModule, ['notice']),
  },
  methods: {
    ...mapActions(noticeModule, [
      'requestNoticeToSpring',
      'requestDeleteNoticeToSpring',
    ]),
    onDelete() {
      if (this.isManager) {
        if (confirm('공지사항을 삭제하시겠습니까?')) {
          if (this.notice.images && this.notice.images.length > 0) {
            this.notice.images.forEach((image) => {
              this.deleteAwsS3File(image.noticeImageData);
            });
          }
          this.requestDeleteNoticeToSpring(this.noticeId)
            .then(() => {
              this.$router.push({ name: 'NoticeListPage' });
            })
            .catch(() => {
              alert('문제 발생!');
            });
        }
      } else {
        alert('공지사항을 삭제할 권한이 없습니다.');
      }
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
    deleteAwsS3File(key) {
      console.log('Deleting image:', key);
      this.awsS3Config(() => {
        this.s3.deleteObject(
          {
            Key: key,
          },
          (err, data) => {
            if (err) {
              return alert(
                'AWS 버킷 데이터 삭제에 문제가 발생했습니다: ' + err.message
              );
            }
            alert('AWS 버킷 데이터 삭제가 성공적으로 완료되었습니다');
          }
        );
      });
    },
  },
}
</script>

<style>
</style>