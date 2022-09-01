<template>
  <div>
    <h1>相比SvgCanvas1，这个组件中svg绘制视频，canvas绘制图片。并且实现可绘制多个图形在画面上</h1>
    <h1>Svg + Canvas处理图片（静态）</h1>
    <!-- 操作按钮 -->
    <div class="my-btns">
      <div class="my-button" @click="clearDraw1">清除画布svg</div>
      <div class="my-button" @click="clearDraw2">清除画布canvas</div>
      <div class="my-button" v-for="(item) in tempPointCounts" :key="item" :class="pointCounts == item? 'active': ''" @click="pointCounts = item"> {{item}}</div>
      <div class="my-button" @click="toArray">转成数组</div>
    </div>

    <!-- 视频容器; controls="true"是否显示视频控件(如播放，暂停，进度条，音量等) -->
    <div style="position:relative;" @click="divClick1($event)" @mousemove="divMove1($event)">
      <video 
        id="myVideo" 
        width="750" 
        height="420" 
        muted="false" 
        controls="true" 
        autoplay="false" 
        loop="false" 
        mediatype="video/mp4" 
        crossorigin="anonymous" 
        fluid="true">
        <source :src="videoSrc">
      </video>
      <!-- svg画布容器 stroke:它指定笔触颜色;fill:none它指定不填充颜色-->
      <div class="my-line-svg">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"  width="750" height="420">
          <polygon :points="clickCount == this.pointCounts? myPoints: myMovePoints"         style=" fill:none; stroke: blue; stroke-width: 2;"/>
        </svg>
      </div>
    </div>

    <!-- 图片容器 -->
    <div style="position:relative;" @click="divClick2($event)" @mousemove="divMove2($event)">
      <img src="@/assets/img/001.jpg" style="width:750px; height:420px" id="myImg">
      <!-- canvas画布容器 -->
      <div class="my-line" v-if="isShowCanvas">
        <canvas id="myCanvas" width="750px" height="420"></canvas>
      </div>
       
    </div>

  </div>
</template> 

<script>
export default {
   name: 'SvgCanvas2',
   data(){
    return{
      tempPointCounts: [3,5,7,9],  // 设置画几边形
      isShowCanvas: true, // 是否显示canvas画布
      firstClickY: 0,  // 画第一个点的x坐标
      firstClickX: 0,  // 画第一个点的y坐标
      clickCount: 0,   // 已经画了几个点
      myMovePoints:'',  // 画时的形状
      myPoints:'',     // 画完时的形状
      pointCounts:5,   // 画几边形
      videoSrc:'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm'
    }
   },
   mounted(){
    // $nextTick() :在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。主要应用场景是需要在视图更新之后，基于新的视图进行操作；需要注意的是，在created和mounted阶段，如果需要操作渲染后的视图，也要用 $nextTick()方法
    this.$nextTick(function(){
      this.doDraw()
      this.pauseVideo()
    })
   },
  methods: {
    clearDraw1() {
      // 清除画布svg
      this.myPoints = ''
      this.myMovePoints = ''
      this.clickCount = 0
    },
    clearDraw2() {
      // 清除画布canvas
      this.isShowCanvas = false
      this.$nextTick(function () {
        this.isShowCanvas = true
      })
    },
    toArray() {
      // 转成数组
      let myPointsArr = this.myPoints.split(' ');
      console.log("myPointsArr--", myPointsArr)
    },
    divClick1(e) {
      // console.log(this.clickCount, "--点击--", e);
      if (this.clickCount < this.pointCounts) {
        this.clickCount++
        let x = e.offsetX
        let y = e.offsetY
        // svg画边框线
        this.myPoints += x + ',' + y
        if (this.clickCount < this.pointCounts) this.myPoints += ' '
        console.log("this.myPoints--", this.myPoints);
      }else if(this.clickCount = this.pointCounts){
        this.clickCount = 0
        this.clearDraw1()
        console.log(this.clickCount);
      }
    },
    divMove1(e) {
      if (this.clickCount >= this.pointCounts) return
      let x = e.offsetX
      let y = e.offsetY
      this.myMovePoints = this.myPoints + x + ',' + y + ''
    },
    divClick2(e) {
      if (this.clickCount < this.pointCounts) {
        this.clickCount++
        let x = e.offsetX
        let y = e.offsetY

        // canvas画边框线
        if (this.clickCount == 1) {
          this.myPoints = ''
          this.firstClickX = x
          this.firstClickY = y
          this.doDrawMoveTo(x, y)
        } else if (this.clickCount == this.pointCounts) {
          this.doDrawLineTo(x, y)
          this.doDrawLineTo(this.firstClickX, this.firstClickY)
          this.clickCount = 0
          console.log(this.clickCount);
        } else {
          this.doDrawLineTo(x, y)
        }
      }
    },
    divMove2(e) {
      if (this.clickCount >= this.pointCounts) return
      let x = e.offsetX
      let y = e.offsetY
      this.myMovePoints = this.myPoints + x + ',' + y + ''
    },


    doDrawLineTo(x, y) {
      // 获取canvas
      var canvas = document.getElementById("myCanvas")
      // setTimeout()定时器是在指定的时间后执行某些代码，代码执行一次就会自动停止；而setInterval()定时器是按照指定的周期来重复执行某些代码，该定时器不会自动停止，需要调用clearInterval()来手动停止。
      var a = setInterval(() => {
        // 重复获取
        canvas = document.getElementById("myCanvas")
        if (!canvas) {
          return false
        } else {
          clearInterval(a)
          // 可以理解为一个画笔，可画路径、矩形、文字、图像
          var ctx = canvas.getContext('2d')
          ctx.strokeStyle = "red"
          ctx.lineWidth = 1;
          ctx.lineTo(x, y)  //从当前点到指定点绘制一条直线(x,y)
          ctx.stroke()  //描边
        }
      }, 1)
    },
    doDrawMoveTo(x, y) {
      // 获取canvas
      var canvas = document.getElementById("myCanvas")
      var a = setInterval(() => {
        // 重复获取
        canvas = document.getElementById("myCanvas")
        if (!canvas) {
          return false
        } else {
          clearInterval(a)
          // 可以理解为一个画笔，可画路径、矩形、文字、图像
          var ctx = canvas.getContext('2d')
          ctx.strokeStyle = "red"
          ctx.lineWidth = 1;
          //e.layerX e.layerY  e.offsetX e.offsetY
          ctx.moveTo(x, y)  //移动到指定点(x,y)
          ctx.stroke()  //描边
        }
      }, 1)
    },
    doDraw(){
      // 获取canvas
      var canvas = document.getElementById("myCanvas")
      // 由于弹窗，确保已经获取到
      var a = setInterval(()=>{
        // 重复获取
        canvas = document.getElementById("myCanvas")
        if(!canvas){
          return false
        } else{
          clearInterval(a)
          // 可以理解为一个画笔，可画路径、矩形、文字、图像
          var ctx = canvas.getContext('2d')
          ctx.strokeStyle = "red"
          ctx.lineWidth = 1;
          ctx.strokeRect(20, 20, 120, 120)  //绘制矩形（无填充）
          // 六角形
          ctx.moveTo(80, 20);
          ctx.lineTo(30,50);
          ctx.lineTo(30,106);
          ctx.lineTo(80,140);
          ctx.lineTo(130,106);
          ctx.lineTo(130,50);
          ctx.lineTo(80,20);

          // 伞形
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
      // console.log("请播放");
      video.play();
      if(video.play()){
        setTimeout(()=>{
          video.currentTime = 4
          video.pause();
        }, 8000)
      }
    }
  },
}
</script>

<style lang="less">
.my-btns{
  display: flex;
}
.my-button{
  margin: 10px 10px;
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