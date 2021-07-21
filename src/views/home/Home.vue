<template>
  <div id="audio-main" v-title data-title="MyLikeMusic">
    <AudioPalyer
      class="AudioPalyer"
      :height="clientHeight - 60"
      v-bind:list="list"
    />
  </div>
</template>
<script>
import AudioPalyer from "@/assets/component/AudioPalyer/AudioPalyer";
export default {
  data() {
    return {
      clientHeight: document.documentElement.clientHeight,
      list: [],
    };
  },
  components: {
    AudioPalyer,
  },
  mounted() {
    window.onresize = () => {
      this.clientHeight = document.documentElement.clientHeight;
    };
    this.httpRequest.get("/music.json").then((response) => {
      this.list = response.data;
    });
  },
  methods: {
    goToPage(url) {
      this.$router.push(url);
    },
  },
  watch: {
    clientHeight(newValue, oldValue) {
      if (newValue) {
        // console.log(this.clientHeight);
      }
    },
  },
};
</script>
<style scoped>
@import "~@/assets/css/style.css";
</style>
