<template>
<div>
  <h1>js 解析 mjpeg 视频流（buffer, stream）</h1>
  <div class="container">
    <canvas id="canvas" width="400" height="300" ref="canvas1"></canvas>
    <img :src="src" id="image" width="400" height="300" ref="img1" /> 
  </div>
  <div class="container">
    <canvas id="canvas" width="400" height="300" ref="canvas2"></canvas>
    <img :src="src" id="image" width="400" height="300" ref="img2" /> 
  </div>
</div>
</template>

<script>
export default {
  name:'RequestData',
  data(){
    return {
      // url: 'http://192.167.0.101:8899/video/',
      lineLength: 0,
      lineBuffer: new Uint8Array(new ArrayBuffer(1000)),
      headers: "",
      contentLength: -1,
      contentType: "",
      imageLength: -1,
      imageBuffer: null,
      jsonLength: -1,
      jsonData: "",
      bytesRead: 0,
      src: '',
      obj: {},
    }
  },
  mounted(){
    this.myFetch()
  },
  methods: {
    myFetch(){
      fetch(this.url).then((res) => {
        const reader = res.body.getReader();
        const read = () => {
          reader.read().then(({done, value}) => {
            if(done) return;
            for(let index = 0,len = value.length; index < len; index ++){
              if(this.contentLength <= 0) {
                this.lineBuffer[this.lineLength++] = value[index]
                if(this.lineLength < 2) continue
                if(this.lineBuffer[this.lineLength - 2] != 0x0d || this.lineBuffer[this.lineLength - 1] != 0x0a) continue
                for(let i = 0; i < this.lineLength; i ++){
                  this.headers += String.fromCharCode(this.lineBuffer[i])
                }
                if(this.lineBuffer[0] === 0x0d && this.lineBuffer[1] === 0x0a) {
                  this.contentType = this.getValue(this.headers, "Content-Type");
                  this.contentLength = this.getValue(this.headers, "Content-length");
                this.imageLength = this.getValue(this.headers, "Content-image-length");
                this.jsonLength = this.getValue(this.headers, "Content-json-length");
                this.imageBuffer = new Uint8Array(new ArrayBuffer(this.imageLength));
                }
                this.lineLength = 0;
              }else if(this.bytesRead < this.contentLength) {
                let tempLength = this.imageLength + this.jsonLength;
                if(this.bytesRead < this.imageLength) {
                  this.imageBuffer[this.bytesRead] = value[index]
                }else if(this.bytesRead < tempLength) {
                  this.jsonData += String.fromCharCode(value[index])
                }
                this.bytesRead ++
              }else{
                this.src = URL.createObjectURL(new Blob([this.imageBuffer], {type: this.contentType}))
                let ctx1 = this.$refs.canvas1.getContext("2d")
                ctx1.drawImage(this.$refs.img1, 0, 0, 400, 300)
                let ctx2 = this.$refs.canvas2.getContext("2d")
                ctx2.drawImage(this.$refs.img2, 0, 0, 400, 300)
                try {
                  this.obj = JSON.parse(this.jsonData)
                } catch (error) {
                  console.log("obj parse error", error);
                }
                for(var key in this.obj) {
                  ctx1.font = "24px Arial"
                  ctx2.font = "24px Arial"
                  ctx1.fillStyle = "#ca0c16"
                  ctx2.fillStyle = "#ca0c16"
                  ctx1.fillText(`${key}:${this.obj[key]}`, 115, 140)
                  ctx2.fillText(`${key}:${this.obj[key]}`, 115, 140)
                }
                this.contentLength = 0;
                this.imageLength = 0;
                this.jsonLength = 0;
                this.bytesRead = 0 ;
                this.headers = '';
                this.jsonData = '';
              }
            }
            read();
          }).catch((error) => {
            console.log("read error", error);
          })
        }
        read()
      }).catch((error) => {
        console.error(error);
      })
    },

    getValue(headers, key) {
      let value = ''
      headers.split("\n").forEach((item) => {
        const itemArr = item.split(":")
        if(itemArr[0] === key) value = itemArr[1]
      })
      if(key.includes('length')) {
        return Number(value)
      }else{
        return value;
      }
    }
    
  }
}
</script>
<style>
.container {
  box-sizing: border-box;
  width: 400px;
  height: 300px;
  position: relative;
}
#canvas {
  position: absolute;
  top: 0;
  left: 0;
}
</style>