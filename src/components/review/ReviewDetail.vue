<template>
  <div>
    <div class="flex-container stretch">
      <div class="photo-container">
        <div class="pre">
          <button class="prev-button" @click="prevImage">〈</button> 
        </div>
        <div class="image">
          <img class="photo" :src="photoUrl" alt="photo">
          <div class="thumbnails">
            <img
              v-for="(thumbnailUrl, index) in thumbnailUrls"
              :key="index"
              class="thumbnail"
              :src="thumbnailUrl"
              @click="selectImage(index)"
            />
         </div>
         </div>
        <div class="next">
          <button class="next-button" @click="nextImage">〉</button> 
        </div>
      </div>
      <div class="review-container">
        <div class="productName">productName</div>
        <div class="productImg">productImg</div>
        <div class="reviewcount">reviewcount</div>
        <div class="heart">heart</div>
        <div class="rating">rating</div>
        <div class="date">date</div>
        <div class="writer">writer</div>
        <div class="content">content</div>
        <div class="comment">comment</div>
      </div>
    </div>
    <v-btn @click="$emit('close')">Close</v-btn>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    reviewId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      thumbnailUrls: [],
      currentImageIndex: 0,
    };
  },
  methods: {
    ...mapActions(['fetchReviewById']),
    prevImage() {
      if (this.currentImageIndex > 0) {
        this.currentImageIndex--;
      }
    },
    nextImage() {
      if (this.currentImageIndex < this.thumbnailUrls.length - 1) {
        this.currentImageIndex++;
      }
    },
    selectImage(index) {
      this.currentImageIndex = index;
    },
  },
  computed: {
    photoUrl() {
      return this.thumbnailUrls[this.currentImageIndex];
    },
  },
  async created() {
    const review = await this.fetchReviewById(this.reviewId);
    this.thumbnailUrls = review.imageUrls;
  },
};
</script>


<style scoped>

.title{
  display: grid;
  justify-items: center;
  align-items: center;
  height: 200px;
}
.flex-container{
  align-items: stretch;
  display: flex;
  margin: 4%;
}
.photo-container{
  float: left;
  display: flex;
  margin: 00 20px 00 00;
  width: 60%;
}
.pre{
  float: left;
}
.prev-button{
  width: 100px;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(00, 00, 00, 00);
  border: none;
  font-size: 4vw;
  cursor: pointer;
  z-index: 1;
  
}
.image{
  flex-grow: 1;
  width: calc(100% - 200px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.photo {
  width: 70%;
  height: auto;
  object-fit: contain;
}
.next{
  float: right;
}
.next-button {
  width: 100px;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(00, 00, 00, 00);
  border: none;
  font-size: 4vw;
  cursor: pointer;
  z-index: 1;

}
.thumbnails {
  position: relative;
  bottom: 3%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: absolute;
}

.thumbnail {
  width: 100px;
  height: 100px;
  margin: 20px 5px;
  cursor: pointer;
}
.review-container{
  float:right;
  display: grid;

  width: 40%;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows:100px 100px 100px 100px 1fr 100px ;
  grid-template-areas:'productImg productName productName' 
                      'productImg reviewcount heart'
                      'rating rating date'
                      'writer writer writer'
                      'content content content'
                      'comment comment comment';
 min-height: 100vh;

}
.review-container > div{
  background-color: azure;
  padding:20px;
  border: 1px solid seagreen;
  display: grid;
  justify-items: center;
  align-items: center;

}
.productImg{
  grid-area: productImg;
}
.productName{
  grid-area: productName;
}
.reviewcount{
   grid-area:reviewcount ;
}
.heart{
   grid-area: heart;
}
.rating{
   grid-area:rating ;
}
.date{
   grid-area:date ;
}
.writer{
   grid-area:writer ;
}
.content{
   grid-area:content ;
}
.comment{
   grid-area: comment;
}
</style>