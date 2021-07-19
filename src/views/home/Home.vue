<template>
  <div id="audio-main">
    <AudioPalyer/>
    <div class="aplayer-component"></div>
  </div>
</template>
<script>
import AudioPalyer from "@/assets/component/AudioPalyer/AudioPalyer";
export default {
  data() {
    return {
      audio: new Audio(),
      duration: 100,
      currentTime: 0,
      isGetDuration: false,
    };
  },
  components: {
    AudioPalyer,
  },
  methods: {
    goToPage(url) {
      this.$router.push(url);
    },
    palyAudio() {
      this.audio.src =
        "http://m7.music.126.net/20210719160536/da858b98076fd78e703764b669bacc97/ymusic/555f/560b/025d/b573182bc7aa7b5f57fd577ef3afa38b.mp3";
      let playPromise;
      playPromise = this.audio.play();
      if (playPromise) {
        setInterval(() => {
          if (!this.isGetDuration) {
            this.duration = this.audio.duration;
            this.isGetDuration = true;
          }
          this.currentTime = this.audio.currentTime;
          console.log();
        }, 1000);
      }
    },
  },
};
</script>
<style scoped>
@import "~@/assets/css/style.css";
</style>
