<template>
  <div
    class="audio-main"
    ref="barparent"
    v-bind:style="{ width: this.device.width }"
  >
    <div
      class="audio-lrc"
      v-bind:style="{ height: height - 92 - 100 + 'px' }"
      style="margin-top: 50px; margin-bottom: 50px"
    >
      <div
        class="content"
        v-bind:style="{ transform: 'translateY(-' + device.translateY + 'px)' }"
        v-if="device.lrc.length > 0 && !device.isShowList"
      >
        <p
          v-for="(item, index) in device.lrc"
          :key="index"
          v-bind:class="{ active: device.lrcShowKey == index }"
        >
          {{ item.lrc }}
        </p>
      </div>
      <div class="content" v-else-if="!device.isShowList">
        <p>MyLikeMusic</p>
      </div>
    </div>
    <div
      v-if="device.isShowList"
      v-bind:style="{ top: device.clientHeight + 'px' }"
      class="audio-list"
    >
      <ul>
        <li class="close">
          <div class="left"></div>
          <div
            class="icon iconfont"
            @click="
              device.isShowList
                ? (device.isShowList = false)
                : (device.isShowList = true)
            "
          >
            &#xe6be;
          </div>
        </li>
        <li v-for="(item, index) in device.list" :key="index">
          <div class="list" @click="PlayIndex(index)">
            <div class="left">{{ item.title }}</div>
            <div class="right">{{ item.singer }}</div>
          </div>
        </li>
      </ul>
    </div>

    <div class="audio-info">
      <div
        v-if="
          device.list[device.index] != undefined &&
          device.list[device.index] != null &&
          device.list[device.index].cover != undefined &&
          device.list[device.index].cover != null &&
          device.list[device.index].cover != ''
        "
        class="cover"
        v-bind:style="{
          'background-image': 'url(' + device.list[device.index].cover + ')',
        }"
      >
        <div class="state">
          <span @click="Paly" v-if="!device.isPaly" class="icon iconfont"
            >&#xe60c;</span
          >
          <span @click="Paly" v-else-if="device.isPause" class="icon iconfont"
            >&#xe60c;</span
          >
          <span @click="Paly" v-else class="icon iconfont">&#xe668;</span>
        </div>
      </div>
      <div class="cover" v-else>
        <div class="state">
          <span @click="Paly" v-if="!device.isPaly" class="icon iconfont"
            >&#xe60c;</span
          >
          <span @click="Paly" v-else-if="device.isPause" class="icon iconfont"
            >&#xe60c;</span
          >
          <span @click="Paly" v-else class="icon iconfont">&#xe668;</span>
        </div>
      </div>
      <div class="control">
        <div class="head">
          <div class="info">
            <div class="title-left">正在播放：</div>
            <marquee class="title-marquee">
              <span v-if="device.list.length > 0">{{
                device.list[device.index].title
              }}</span>
              <span v-if="device.list.length > 0" class="span"
                >&nbsp;-&nbsp;</span
              >
              <span v-if="device.list.length > 0" class="span">{{
                device.list[device.index].singer
              }}</span>
            </marquee>
          </div>
          <div class="control-head">
            <span @click="Prev()" class="icon iconfont">&#xe61e;</span>

            <span @click="Paly" v-if="!device.isPaly" class="icon iconfont"
              >&#xe80f;</span
            >
            <span @click="Paly" v-else-if="device.isPause" class="icon iconfont"
              >&#xe80f;</span
            >
            <span @click="Paly" v-else class="icon iconfont">&#xe65a;</span>
            <span @click="Next()" class="icon iconfont">&#xe61f;</span>
            <span
              @click="
                device.isShowList
                  ? (device.isShowList = false)
                  : (device.isShowList = true)
              "
              class="icon iconfont"
              >&#xe660;</span
            >
          </div>
        </div>
        <div class="footer">
          <div class="left">
            <input
              class="audio-meter"
              type="range"
              v-model="device.currentTime"
              min="0"
              :max="device.duration"
              @click="setCurrentTime"
            />
          </div>
          <div class="right">
            <div class="time">
              <span v-if="device.isPaly">
                {{ switchTime(device.currentTime) }}
              </span>
              <span v-else>00:00</span>
              <span>/</span>
              <span v-if="device.isPaly && device.duration !== 100">
                {{ switchTime(device.duration) }}
              </span>
              <span v-else>00:00</span>
            </div>
            <div class="loop">
              <span
                @click="device.loop < 5 ? device.loop++ : (device.loop = 1)"
                class="icon iconfont"
                v-if="device.loop == 1"
                >&#xe624;</span
              >
              <span
                @click="device.loop < 5 ? device.loop++ : (device.loop = 1)"
                class="icon iconfont"
                v-if="device.loop == 2"
                >&#xe6a0;</span
              >
              <span
                @click="device.loop < 5 ? device.loop++ : (device.loop = 1)"
                class="icon iconfont"
                v-if="device.loop == 3"
                >&#xe66c;</span
              >
              <span
                @click="device.loop < 5 ? device.loop++ : (device.loop = 1)"
                class="icon iconfont"
                v-if="device.loop == 4"
                >&#xe66d;</span
              >
              <span
                @click="device.loop < 5 ? device.loop++ : (device.loop = 1)"
                class="icon iconfont"
                v-if="device.loop == 5"
                >&#xe636;</span
              >
            </div>
            <div class="volume">
              <div class="icon-div">
                <span
                  @mouseover="mouseOver"
                  @mouseleave="mouseLeave"
                  @click="Mute"
                  v-if="device.audio.volume > 0"
                  class="icon iconfont"
                  >&#xe626;</span
                >
                <span
                  @mouseover="mouseOver"
                  @mouseleave="mouseLeave"
                  @click="Mute"
                  v-else
                  class="icon iconfont"
                  >&#xe655;</span
                >
              </div>
              <div v-if="device.isVolumeShow" class="volume-meter-div">
                <input
                  @mouseover="mouseOver"
                  @mouseleave="mouseLeave"
                  class="volume-meter"
                  type="range"
                  v-model="device.volume"
                  @click="setVolume"
                  min="0"
                  max="100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import elementResizeDetectorMaker from "element-resize-detector";
export default {
  name: "AudioPalyer",
  props: {
    height: Number,
    list: Array,
    width: String,
  },
  data() {
    return {
      device: {
        audio: new Audio(),
        duration: 100,
        currentTime: 0,
        isGetDuration: false,
        isPaly: false,
        isPause: false,
        src: "",
        clock: null,
        index: 0,
        list: this.list != undefined && this.list != null ? this.list : [],
        isVolumeShow: false,
        isVolumeShowClock: null,
        volume: 50,
        loop: 1, //1=顺序播放，2=随机播放，3=循环播放，4=单曲循环，5=播放完成后停止
        lrc: [],
        lrcShowKey: 0,
        // translateYStyle: {transform: 'translateY(-500px)'},
        translateY: 0,
        width:
          this.width != undefined && this.width != null && this.width != ""
            ? this.width
            : "100%",
        clientHeight: 0,
        isShowList: false,
      },
    };
  },
  mounted() {
    this.watchSize();
  },
  methods: {
    //暂停/播放
    Paly() {
      if (!this.device.isPaly) {
        //首次播放
        this.device.lrcShowKey = 0;
        this.setAudioSrc();
        if (this.device.audio.play()) {
          this.device.isPaly = true;
          this.updateMeter();
        }
        //解析歌词
        this.device.lrc = [];
        if (
          this.device.list[this.device.index].lrc != undefined &&
          this.device.list[this.device.index].lrc != null &&
          this.device.list[this.device.index].lrc != ""
        ) {
          let strLrc = this.device.list[this.device.index].lrc.replace(
            /[\r\n]/g,
            ""
          );
          let arrLrcTimeTmp = strLrc.match(/\[(.+?)\]/g);
          let arrLrcTime = [];
          let arrLrc = [];
          strLrc = strLrc.replace(/[\[\]]/g, "");
          arrLrcTimeTmp.forEach((element) => {
            element = element.replace(/[\[\]]/g, "");
            let arrTimeTmp = element.split(":");
            arrLrcTime.push(
              (arrTimeTmp[1] * 1 + arrTimeTmp[0] * 1 * 60).toFixed(5) * 1
            );
            strLrc = strLrc.replace(new RegExp(element, "g"), "\n");
          });
          arrLrc = strLrc.split("\n");
          for (let i in arrLrcTime) {
            this.device.lrc.push({
              time: arrLrcTime[i],
              lrc: arrLrc[i * 1 + 1],
              show: false,
            });
          }
        }
      } else if (!this.device.isPause) {
        //暂停
        try {
          this.device.audio.pause();
          this.device.isPause = true;
          clearInterval(this.device.clock);
        } catch (err) {}
      } else {
        //继续播放
        if (this.device.audio.play()) {
          this.device.isPause = false;
          this.updateMeter();
        }
      }
    },
    //设置播放音频
    setAudioSrc() {
      if (
        this.device.list.length > 0 &&
        this.device.index < this.device.list.length
      ) {
        this.device.duration = 100; //重置进度
        this.device.currentTime = 0; //重置进度
        this.device.isGetDuration = false; //重置进度
        this.device.isPaly = false; //重置
        this.device.isPause = false; //重置
        this.device.src = this.device.list[this.device.index].src;
        this.device.audio.src = this.device.src; //设置音频
      }
    },
    //更新进度
    updateMeter() {
      this.device.clock = setInterval(() => {
        if (!this.device.isGetDuration) {
          this.device.duration = this.device.audio.duration;
          if (this.device.duration > 0) {
            this.device.isGetDuration = true;
          }
        }
        this.device.currentTime = this.device.audio.currentTime;
        let index = this.device.lrc.length - 1;
        for (let i = index; i > this.device.lrcShowKey; i--) {
          if (this.device.currentTime >= this.device.lrc[i].time) {
            this.device.lrcShowKey = i;
            this.device.translateY = 19 * this.device.lrcShowKey;
            break;
          }
        }

        if (this.device.currentTime >= this.device.duration) {
          this.PalyOnEnded();
        }
      }, 500);
    },
    //调整进度
    setCurrentTime() {
      if (this.device.isPaly) {
        this.device.audio.fastSeek(this.device.currentTime);
        this.device.currentTime = this.device.audio.currentTime;
        let index = this.device.lrc.length - 1;
        for (let i = index; i > this.device.lrcShowKey; i--) {
          if (this.device.currentTime >= this.device.lrc[i].time) {
            this.device.lrcShowKey = i;
            this.device.translateY = 19 * this.device.lrcShowKey;
            break;
          }
        }
      } else {
        this.device.currentTime = 0;
      }
    },
    //监听播放结束
    PalyOnEnded() {
      this.device.isPaly = false;
      this.device.isPause = false;
      clearInterval(this.device.clock);
      switch (this.device.loop) {
        case 1:
          this.Next();
          break;
        case 2:
          this.device.index = Math.round(
            Math.floor(
              Math.random() * (0 - this.device.list.length) +
                this.device.list.length
            )
          );
          this.setAudioSrc();
          this.Paly();
          break;
        case 3:
          if (this.device.index == this.device.list.length - 1) {
            this.device.index = 0;
            this.setAudioSrc();
            this.Paly();
          } else {
            this.Next();
          }
          break;
        case 4:
          this.setAudioSrc();
          this.Paly();
          break;
        default:
          break;
      }
    },
    //播放时长转分秒
    switchTime(str) {
      str = (str / 60).toFixed(2);
      if (str >= 0) {
        str = str + ``;
        str = str.replace(/\./g, ":");
        return str;
      }else{
        return '0:00'
      }
    },
    //上一曲
    Prev() {
      if (this.device.index > 0) {
        this.device.index--;
        this.device.isPaly = false;
        this.Paly();
      }
    },
    //下一曲
    Next() {
      if (this.device.index + 1 < this.device.list.length) {
        this.device.index++;
        this.device.isPaly = false;
        this.Paly();
      }
    },
    // 音量按钮、滑块移入
    mouseOver() {
      this.device.isVolumeShow = true;
      if (this.device.isVolumeShowClock !== null) {
        clearInterval(this.device.isVolumeShowClock);
        this.device.isVolumeShowClock = null;
      }
    },
    // 音量按钮、滑块移出
    mouseLeave() {
      if (this.device.isVolumeShowClock === null) {
        this.device.isVolumeShowClock = setInterval(() => {
          this.device.isVolumeShow = false;
        }, 100);
      }
    },
    // 静音和取消静音
    Mute() {
      if (this.device.audio.volume != 0) {
        this.device.audio.volume = 0;
      } else {
        this.device.audio.volume = this.device.volume * 0.01;
      }
    },
    //设置音量
    setVolume() {
      this.device.audio.volume = this.device.volume * 0.01;
    },
    //监听UI变化
    watchSize() {
      var erd = elementResizeDetectorMaker();
      erd.listenTo(this.$refs.barparent, (element) => {
        var height = element.offsetHeight;
        this.device.clientHeight = height - 500 - 93;
      });
    },
    //播放指定的曲子
    PlayIndex(index) {
      this.device.index = index;
      this.device.isPaly = false;
      this.Paly();
    },
  },
  watch: {
    list: function (n, o) {
      this.device.list = this.list;
    },
  },
};
</script>
<style scoped>
@import "./css/style.css";
@import "./css/iconfont/iconfont.css";
</style>