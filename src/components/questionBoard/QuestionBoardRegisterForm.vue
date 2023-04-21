<template>
    <form @submit.prevent="onSubmit">
      <v-card>
        <v-card-title></v-card-title>
          <div class="board-title">
            <p style="font-size: 22px; font-weight: bold">1:1 문의</p>
          </div>
          <v-divider style="board-color: black; border-width:1px"></v-divider>
          <div class="board-container">
            <div class="board-items">
              <v-row>
                <v-col cols="2">
                  <p>작성자</p>
                </v-col>
                <v-col cols="10">
                  {{ writer }}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="2">
                  <p>유형<span style="color:red">*</span></p>
                </v-col>
                <v-col cols="10">
                  <v-select
                    :items="categoryList"
                    v-model="questionCategoryId"
                    item-value="questionCategoryId"
                    item-text="questionCategoryType"
                    color="black"
                    placeholder="문의유형을 선택해주세요"
                    outlined>
                  </v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="2">
                  <p>제목<span style="color: red"> *</span></p>
                </v-col>
                <v-col cols="10">
                  <v-text-field
                    color="black"
                    placeholder="제목을 입력해주세요"
                    v-model="title"
                    outlined>
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="2">
                  <p>파일 첨부<span style="color: red"> *</span></p>
                </v-col>
                <v-col cols="10">
                  <v-file-input
                    label="상품 사진 업로드"
                    multiple
                    show-size
                    @change="handleFileUpload($event)"
                    class="mt-3"
                  ></v-file-input>
                </v-col>
              </v-row>
              <v-row>
              <v-col cols="2">
                <p>내용<span style="color: red"> *</span></p>
              </v-col>
              <v-col cols="10">
                <v-textarea
                    color="black"
                    height="400px"
                    :placeholder="contentInfo"
                    v-model="content"
                    outlined>
                </v-textarea>
                <p align="left" style="font-size:14px; color:gray">
                  * 상품과 무관한 내용이거나 음란 및 불법적인 내용은 통보없이 삭제될 수 있습니다.
                </p>
                <div align="center">
                  <v-checkbox
                      label="비밀글로 문의하기"
                      color="#205C37"
                      >
                  </v-checkbox>
                </div>
              </v-col>
            </v-row>
            
            <v-row>
              <v-col cols="8">
                  <div align="center" class="mb-10">
                    <v-btn 
                    class="green white--text" rounded depressed small 
                    type="submit"
                    style="width: 200px; height: 50px; font-size: 16px">
                      등록
                    </v-btn>
                  </div>
                </v-col>
                <v-col cols="2">
                  <div align="center" class="mb-10">
                    <router-link :to="{ name: 'QuestionBoardListPage' }">
                      <v-btn class="green white--text" rounded depressed small
                      style="width: 200px; height: 50px; font-size: 16px">
                        취소
                      </v-btn>
                    </router-link>  
                  </div>
                </v-col>
            </v-row>
            </div>
          </div>
      </v-card>  
    </form>

  </template>
  
  <script>
import axios from 'axios';
import mainRequest from "@/api/mainRequest";

  import {mapActions, mapState} from "vuex";
  export default {
    name: "QuestionRegisterForm",
    data() {
      return {
        title: '',
        writer: localStorage.getItem('memberId'),
        content: '',
        files: [],
        categoryList: [],
        contentInfo: "1:1 문의 작성 전 확인해주세요." +
            "\n\n 반품 / 환불" +
            "\n - 제품 하자 혹은 이상으로 반품(환불)이 필요한 경우 구체적인 내용을 남겨주세요." +
            "\n\n 주문취소" +
            "\n - 주문취소는 배송 단계별로 방법이 상이합니다." +
            "\n - [주문완료] 상태인 경우에만 주문 취소 가능합니다." +
            "\n - [마이페이지 -> 주문관리 -> 상세페이지에서 직접 취소하실 수 있습니다." +
            "\n\n 배송" +
            "\n - 배송일 배송시간 지정은 불가능합니다.",
            questionCategoryId: null,
            questionCategoryType: null,
      }
    },
    methods: {
      async fetchCategoryList() {
        try {
          const response = await mainRequest.get('/categoryList');
          this.categoryList = response.data;
        } catch (error){
          console.error('Error fetching categoryList:', error);
        }

      },
      ...mapActions([
      
      ]),
      onSubmit() {
        if (this.title && this.content && this.files != '' ) {
          const {title, writer, content, files, questionCategoryId } = this
          
          this.$emit('submit', {title, writer, content, files, questionCategoryType: questionCategoryId})
        } else {
          alert("빈칸 없이 작성해주세요!")
          this.$router.push("/question-register")
        }
      },
      
        handleFileUpload (files) {
        this.files = files
        //this.imageUrls = Array.from(files).map((file) => URL.createObjectURL(file))
      }
    },
  
    mounted() {
      if (this.$store.state.isAuthenticated === true) {
      } else {
        alert("로그인 상태가 아닙니다.")
      }
      this.fetchCategoryList();
    },
    computed : {
      ...mapState([
        'isAuthenticated',
      ]),
    },
  }
  </script>
  
  <style scoped>

  v-col{
    width: 10px;
  }

  .board-title {
    margin-left: 30px;
  }
  
  .board-container {
    display: flex;
    justify-content: center;
  }
  
  .board-items {
    margin-top: 40px;
    text-align: right;
    padding-right: 50px;
    width: 1000px;
  }
  
  .board-items p {
    margin-right: 50px;
  }
  
  a {
    text-decoration: none;
  }
  </style>