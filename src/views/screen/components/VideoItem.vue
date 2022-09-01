<template>
  <div class="video-wrap">
    <div class="title">{{videoInfo.name}}</div>
    <!-- 使用vue-video-player中使用hls流: video-player标签的class必须设置成“video-player vjs-custom-skin”，你引入的样式才能起作用 -->
    <video-player
      ref="videoPlayer"
      class="video-player vjs-custom-skin"
      :playsinline="true"
      :options="playerOptions"
      @play="onPlayerPlay($event)"
      @pause= "onPlayerPause($event)"/>
  </div>
</template>

<script>
  import {videoPlayer} from 'vue-video-player'
  export default {
    name: "VideoItem",
    props: {
      videoInfo: {
        type: Object,
        default: () =>{
          name: ''
        }
      }
    },
    data(){
      return {
        playerOptions: {
          // playbackRates:[0.7, 1.0, 1.5, 2.0], //播放速度
          autoplay: false,
          muted: false,
          loop: false,
          preload: 'auto',
          language: 'zh-CN',
          aspectRatio: '16:9',
          fluid: true,
          sources: [
            {
              type: 'video/mp4',  // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
              src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm'  // url地址
            }
          ],
          hls: true,
          poster: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201810%2F13%2F20181013211010_cdtug.jpg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1660813985&t=70342e53b1ceff4deaedcf083c4fe33b',   // 封面地址
          width: document.documentElement.clientWidth,  //播放器宽度
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          contralBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true // 全屏按钮
          }
        }
      }
    },
    components:{
      videoPlayer,
    },
    // mounted(){
    //   this.getVideo()
    // },
    computed: {
      player(){
        return this.$refs.videoPlayer.player // 自定义播放
      }
    },
    methods: {
      onPlayerPlay(e){

      },
      onPlayerPause(e){

      }
    }
  }
</script>

<style lang="less" scoped>
.video-wrap{
    position: relative;
    .title{
        position: absolute;
        top: 20px;
        left: 20px;
        font-size: 16px;
        color: #222;
        font-weight: bold;
        background-color: #276bdd;
        z-index: 9;
        border-radius: 8px;
    }
}
</style>