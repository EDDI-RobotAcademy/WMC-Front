<template>
  <button v-if="isTop" @click="scrollTop">Top</button>
</template>

<script>
export default {
  data() {
    return {
        isTop: true
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.isTop = window.scrollY === 0
    },
    scrollTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style>

</style>