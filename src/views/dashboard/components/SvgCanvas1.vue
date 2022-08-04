<template>
  <div>
    <h1>这是个svg和canvas组合练手，所以封装成组件，并没有在其他页面引用</h1>
    
    <div class="my-btns">
      <div class="my-button" @click="clearDraw"> 清除画布 </div>

      <div class="my-button"  v-for="(item) in tmepPointCounts" :key="item" :class="pointCounts == item?'active':''" @click="pointCounts = item"> {{ item }} </div>

      <div class="my-button" @click="toArray"> 转成数组 </div>
    </div>
 
    <div style="position:relative;" @click="divClick($event)" @mousemove="divMove($event)">
      <video id="myVideo" width="750" height="420" muted="false"
        controls="true" autoplay="false" loop="false" mediatype="video/mp4" crossorigin="anonymous" fluid="true">
        <source :src="videoSrc" type="video/mp4"  >
      </video>
      <div v-if="isShowCanvas" class="my-line">
        <canvas id="myCanvas" width="750" height="420"></canvas>
      </div>
      <div class="my-line-svg">
        <svg width="750" height="420" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <polygon :points="clickCount == this.pointCounts ? myPoints:myMovePoints"
            style="fill:#ff0000;stroke:#fafa03;stroke-width:2;opacity:0.2"/>
        </svg>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  name: 'SvgCanvas1',
  data() {
    return {
      tmepPointCounts:[3,5,7,9], // 设置画几边形
      isShowCanvas:true, // 是否显示canvas画布
      firstClickY:0, // 画第一个点的坐标x
      firstClickX:0, // 画第一个点的坐标y
      clickCount:0, // 已画了几个点
      myMovePoints:'', // 画时的形状
      myPoints:'', // 画完的时形状
      pointCounts:5, // 画几边形
      videoSrc:'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
    };
  },
  mounted() {
    this.$nextTick(function(){
      this.doDraw()
      this.pauseVideo()
    })
  },
  methods: {
    toArray(){
      let myPointsArr = this.myPoints.split(' ');
      console.log("myPointsArr--",myPointsArr)
    },
    divMove(e){
      // console.log(this.clickCount,"<--this.clickCount-----this.pointCounts-->",this.pointCounts)
      if(this.clickCount >= this.pointCounts) return
      // console.log(this.clickCount,this.myPoints,"--移动--",e)
      let x = e.offsetX
      let y = e.offsetY
      this.myMovePoints = this.myPoints + x + ',' + y + ' '
    },
    divClick(e){
      console.log(this.clickCount,"--点击--",e)
      //e.layerX e.layerY  e.offsetX e.offsetY
      if(this.clickCount < this.pointCounts){
        this.clickCount++
        let x = e.offsetX
        let y = e.offsetY
 
        // canvas 画边框线
        if(this.clickCount == 1){
          this.myPoints = ''
          this.firstClickX = x
          this.firstClickY = y
          this.doDrawMoveTo(x,y)
        } else if(this.clickCount == this.pointCounts){
          this.doDrawLineTo(x,y)
          this.doDrawLineTo(this.firstClickX,this.firstClickY)
        } else{
          this.doDrawLineTo(x,y)
        }
 
        // svg （也可以画边框线的）
        this.myPoints += x + ',' + y
        if(this.clickCount < this.pointCounts) this.myPoints += ' '
        console.log("this.myPoints--",this.myPoints)
      }
    },
    doDrawLineTo(x,y){
      // 获取canvas
      var canvas = document.getElementById("myCanvas")
      var a = setInterval(() =>{
        // 重复获取
        canvas = document.getElementById("myCanvas")
        if(!canvas){
          return false
        } else {
          clearInterval(a)
          // 可以理解为一个画笔，可画路径、矩形、文字、图像
          var ctx = canvas.getContext('2d')
          ctx.strokeStyle = "red"
          ctx.lineWidth = 1;
 
          ctx.lineTo(x,y);
          ctx.stroke();
        }
      },1)
    },
    doDrawMoveTo(x,y){
      // 获取canvas
      var canvas = document.getElementById("myCanvas")
      var a = setInterval(() =>{
        // 重复获取
        canvas = document.getElementById("myCanvas")
        if(!canvas){
          return false
        } else {
          clearInterval(a)
          // 可以理解为一个画笔，可画路径、矩形、文字、图像
          var ctx = canvas.getContext('2d')
          ctx.strokeStyle = "red"
          ctx.lineWidth = 1;
 
          //e.layerX e.layerY  e.offsetX e.offsetY
          ctx.moveTo(x,y);
          ctx.stroke();
        }
      },1)
    },
    clearDraw(){
      // 清除svg
      this.myPoints = ''
      this.myMovePoints = ''
      this.clickCount = 0
 
      // 清除canvas
      // var canvas = document.getElementById("myCanvas")
      // var ctx = canvas.getContext('2d')
      // ctx.clearRect(0,0,1000,600)
      this.isShowCanvas = false
      this.$nextTick(function(){
        this.isShowCanvas = true
      })
    },
    doDraw(){
      // 获取canvas
      var canvas = document.getElementById("myCanvas")
      // 由于弹窗，确保已获取到
      var a = setInterval(() =>{
        // 重复获取
        canvas = document.getElementById("myCanvas")
        if(!canvas){
          return false
        } else {
          clearInterval(a)
          // 可以理解为一个画笔，可画路径、矩形、文字、图像
          var ctx = canvas.getContext('2d')
          ctx.strokeStyle = "red"
          ctx.lineWidth = 1;
          ctx.strokeRect(20, 20, 120, 120)
          // ctx.strokeRect(730, 0, 200, 100)
 
          //e.layerX e.layerY  e.offsetX e.offsetY
          // 六角形
          ctx.moveTo(80,20);
          ctx.lineTo(30,50);
          ctx.lineTo(30,106);
          ctx.lineTo(80,140);
          ctx.lineTo(130,106);
          ctx.lineTo(130,50);
          ctx.lineTo(80,20);
 
          // 伞型
          ctx.moveTo(482,70);
          ctx.lineTo(472,92);
          ctx.lineTo(370,70);
          ctx.lineTo(260,120);
          ctx.lineTo(640,260);
          ctx.lineTo(580,140);
          ctx.lineTo(486,96);
          ctx.lineTo(492,78);
          ctx.lineTo(482,70);
 
          // 六角矩形
          ctx.moveTo(730,0);
          ctx.lineTo(730,60);
          ctx.lineTo(810,60);
          ctx.lineTo(810,90);
          ctx.lineTo(930,90);
          ctx.lineTo(930,0);
          ctx.lineTo(730,0);
          ctx.stroke();
        }
      },1)
    },
    pauseVideo(){
      let video = document.getElementById("myVideo")
      console.log("进来播放")
      video.play();
      if(video.play()){
        setTimeout(()=>{
          video.currentTime=4;
          video.pause();
        },8000)
      }
    }
  },
};
</script>
 
<style lang="less" scoped>
.my-btns{
  display: flex;
}
.my-button{
  margin:10px 10px;
  width: 100px;
  text-align: center;
  padding: 10px 0;
  background-color: #00a2d4;
  color: #fcfcfc;
  border-radius: 20px;
}
.active{
  background-color: #0a7ca0;
}
.my-line{
  position: absolute;
  top: 0;
  left: 0;
}
.my-line-svg{
  position: absolute;
  top: 0;
  left: 0;
}
</style>