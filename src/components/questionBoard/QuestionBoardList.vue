<template>
    <v-container>
      <div>
        <h3>게시물 목록</h3>
        

        <table class="boards" border="1">
          <thead>
          <tr>
            <th scope="col" align="center" width="100">No</th>
            <th scope="col" align="center" width="200">문의유형</th>
            <th scope="col" align="center" width="640">제목</th>
            <th scope="col" align="center" width="150">작성자</th>
            <th scope="col" align="center" width="240">작성일자</th>
          </tr>
          </thead>
          <tbody>
          <tr v-if="!questionBoards || (Array.isArray(questionBoards) && questionBoards.length === 0)">
            <td colspan="4">
              현재 등록된 게시물이 없습니다!
            </td>
          </tr>
          <!--<tr v-else v-for="questionBoard in questionBoards" :key="questionBoard.questionBoardId">-->
          <tr v-else v-for="(questionBoard, index) in calData" :key="index">
            <td align="center">
              {{ questionBoard.questionBoardId }}
            </td>
            
            <td align="left">
              {{ questionBoard.questionCategoryType }}
            </td>
            <td align="left">
              <router-link :to="{ name: 'QuestionBoardReadPage',params: { questionBoardId: questionBoard.questionBoardId.toString() }}"
              style="color: black; text-decoration: none">
                <div v-if="isLogin == false" @click.prevent="readAccess">
                  {{ questionBoard.title }}
                </div>
                <div v-else>
                  {{ questionBoard.title }}
                </div>
              </router-link>
            </td>
            <td align="left">
              {{ questionBoard.writer }}
            </td>
            <td align="center">
              {{ new Date(questionBoard.regDate).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\./g, '.') }}
            </td>
          </tr>
          </tbody>
        </table>
        <v-pagination
        v-model="curPageNum"
        :length="numOfPages"
        color="#5D4037"
        class="mt-10"
        flat
        ></v-pagination>
      </div>
    </v-container>
  </template>
  
  <script>
  import {mapState} from "vuex";
  
  export default {
    name: "QuestionBoardList",
    data() {
      return {
        dataPerPage: 6,
        curPageNum: 1,
        isLogin: false
        
      }
    },
    props: {
      questionBoards: {
        type: Array,
      }
    },
    mounted () {
      if (this.$store.state.isAuthenticated != false) {
        this.isLogin = true
      } else {
        this.isLogin = false
      }
    },
    methods: {
      readAccess() {
        if(this.isLogin == false) {
          alert("로그인이 필요한 기능입니다.")
          this.$router.push("/sign-in")
        }
        
      },
      goToProductDetail(questionBoard) {
      this.$router.push({
        name: 'QuestionBOardReadPage',
        params: { questionBoardId: questionBoard.questionBoardId },
      });
    },
    },
    computed : {
      ...mapState([
        'isAuthenticated',
      ]),
      startOffset() {
          return (this.curPageNum - 1) * this.dataPerPage;
      },
      endOffset() {
          return this.startOffset + this.dataPerPage;
      },
      numOfPages() {
          return Math.ceil(this.questionBoards.length / this.dataPerPage);
      },
      calData() {
          return this.questionBoards.slice(this.startOffset, this.endOffset);
      },
    },
    
  
}
  </script>
  
  <style scoped>
  
  table.boards {
    border-collapse: collapse;
    text-align: center;
    line-height: 1;
    border: 1px solid #ccc;
    margin: 20px 10px;
  }
  
  table.boards thead {
    border-right: 1px solid #ccc;
    border-left: 1px solid #ccc;
    background: #967a50;
  }
  
  table.boards thead th {
    padding: 10px;
    font-weight: bold;
    vertical-align: center;
    border-right: 1px solid #ccc;
    color: #fff;
  }
  
  table.boards tbody th {
    padding: 10px;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
    background: #ececec;
  }
  
  table.boards td {
    padding: 10px;
    vertical-align: center;
    border-bottom: 1px solid #ccc;
  }
  
  a {
    text-decoration: none;
  }
  
  
  </style>