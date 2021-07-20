<template>
  <div id="app">
    <div id="nav">
      <ul>
        <li class="current">Home</li>
        <li @click="goUrl('https://www.bugquit.com')">Bolg</li>
        <li @click="goUrl('https://www.bugquit.com/about')">About</li>
      </ul>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    goToPage(url) {
      this.$router.push(url);
    },
    goUrl(url) {
      window.open(url)
    },
  }
};
</script>
<style scoped>
@import "~@/assets/css/style.css";
</style>

