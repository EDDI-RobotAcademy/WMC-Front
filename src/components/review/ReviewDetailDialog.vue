<template>
  <div width="100%" heigh="100hv">
    <div class="flex-container">
      <div class="photo-container">
        <div class="pre">
          <button class="prev-button" @click="prevImage">〈</button>
        </div>
        <div class="image">
          <img class="photo" :src="photoUrl" alt="photo" />
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
      <div class="left">
      <div class="review-container">
        <div class="productName">{{ selectedReview.productName }}</div>
        <div class="productImg">{{selectedReview.firstPhoto}}</div>
        <div class="reviewcount"><!-- Add review count here --></div>
        <div class="rating">{{ selectedReview.rating }}</div>
        <div class="date">{{ selectedReview.regDate }}</div>
        <div class="writer">{{ selectedReview.username }}</div>
        <div class="content">{{ selectedReview.content }}</div>
        <div class="comment"><!-- Add comment section here --></div>
      </div>
      </div>
    </div>
    <v-btn @click="$emit('close')">Close</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      thumbnailUrls: [
        'https://assets2.cre.ma/p/caringlasses-com/reviews/00/00/01/18/38/image1/59d3d6b14b85032a.jpg',
        'https://assets2.cre.ma/p/caringlasses-com/reviews/00/00/01/18/37/image1/b756a92523606065.jpg',
        'https://assets2.cre.ma/p/caringlasses-com/reviews/00/00/01/18/36/image1/f501223f2ebbaa42.jpg',
      ],
      currentImageIndex: 0,
    };
  },
  props: {
    selectedReview: {
      type: Object,
      default: () => ({}),
    },
  },

  methods: {
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
.flex-container {
  justify-content: space-between;
  display: flex;
}
.left {
  flex-grow: 1;
  background-color: black;
  align-items: stretch;
}
.photo-container {
  display: flex;
  margin: 20px 20px 20px 20px;
}
.pre {
  float: left;
}
.prev-button {
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
.image {
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
.next {
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
  bottom: 10%;
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
.review-container {
  flex-grow: 1;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: repeat(10, minmax(100px, auto));
  grid-template-areas:
    'productImg productName productName'
    'productImg reviewcount  reviewcount '
    'rating rating date'
    'writer writer writer'
    'content content content'
    'content content content'
    'content content content'
    'content content content'
    'content content content'
    'comment comment comment';
}
.review-container > div {
  background-color: white;
  padding: 00 00 00 00;
  border: 0.1px solid #d7d7d7;
  display: grid;
  justify-items: center;
  align-items: center;
}
.productImg {
  grid-area: productImg;
}
.productName {
  grid-area: productName;
}
.reviewcount {
  grid-area: reviewcount;
}
.rating {
  grid-area: rating;
}
.date {
  grid-area: date;
}
.writer {
  grid-area: writer;
}
.content {
  grid-area: content;
}
.comment {
  grid-area: comment;
}
</style>
