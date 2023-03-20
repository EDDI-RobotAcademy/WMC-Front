<template>
   <a href="#" class="btn_gotop" ref="btnGotop" @click.prevent="scrollTop">TOP</a>
</template>

<script>
export default {
  methods: {
    handleScroll() {
      if (window.scrollY > 100) {
        this.$refs.btnGotop.style.display = "block";
      } else {
        this.$refs.btnGotop.style.display = "none";
      }
    },
    scrollTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style>
 .btn_gotop {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 999;
  border: 1px solid #ccc;
  outline: none;
  background-color: white;
  color: #333;
  cursor: pointer;
  padding: 15px 20px;
  border-radius: 100%;
}

.btn_gotop:hover {
  background-color: #555;
}
</style>