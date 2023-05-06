<template>
  <a href="#" class="btn_gotop" ref="btnGotop" @click.prevent="scrollTop">
    <span class="arrow-up"></span>
  </a>
</template>

<script>
export default {
  methods: {
    handleScroll () {
      if (window.scrollY > 100) {
        this.$refs.btnGotop.classList.add('show')
      } else {
        this.$refs.btnGotop.classList.remove('show')
      }
    },
    scrollTop () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  },
  mounted () {
    this.handleScroll()
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
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
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease-in-out;
  opacity: 0;
}

.arrow-up {
  border: solid #333;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
}

.btn_gotop.show {
  opacity: 1;
}

.btn_gotop:hover {
  background-color: #555;
}

.btn_gotop:hover .arrow-up {
  border-color: white;
}
</style>
