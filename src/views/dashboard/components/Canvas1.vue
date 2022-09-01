<template>
  <div>
    <h1>Canvas处理图片(动态图片)</h1>
    <!-- 操作按钮 -->
    <div class="my-btns">
      <div class="my-button" @click="clearDraw1">清除画布svg</div>
    </div>
    <!-- 图片容器;-->
    <div style="position:relative;" @click="divClick1($event)" @mousemove="divMove1($event)" >
      <img :src="imgurl" style="width:750px; height:420px" id="myImg" >

      <div class="my-line-svg">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"  width="750" height="420">
          <polygon :points="clickCount == this.pointCounts? myPoints: myMovePoints"   style=" fill:none; stroke: blue; stroke-width: 2;"/>
          <!-- x 属性定义矩形的左侧位置；y 属性定义矩形的顶端位置；width 和 height 属性可定义矩形的高度和宽度；style 属性用来定义 CSS 属性 -->
          <rect x="" y="" width="" height="" style=""/>
        </svg>
      </div>
    </div>
  </div>
</template> 

<script>
export default {
   name: 'Canvas1',
   data(){
    return{
      imgs: [],       //接收的图片列表
      imgurl:'',
      firstClickY: 0,  // 画第一个点的x坐标
      firstClickX: 0,  // 画第一个点的y坐标
      clickCount: 0,   // 已经画了几个点
      myMovePoints:'',  // 画时的形状
      myPoints:'',     // 画完时的形状
      pointCounts:4,   // 画几边形
    }
   },
  mounted() {
    this.getList()
    // this.$nextTick(function () {
    //   // this.doDraw()
    //    this.getList()
    // })
  },
  methods: {
    // getList(){
    //   this.axios.get('../../../imgs.json').then((res) => {
    //     this.imgs = res.data
    //     console.log(this.imgs);
    //     var timer = setInterval(()=> {
    //       if(this.imgs[0].id == '001') {
    //         this.imgurl = require('@/assets/image/' + this.imgs[0].id + '.jpg')
    //       }else{
    //         this.imgurl = require('@/assets/image/' + this.imgs[0].id + '.jpeg')
    //       }
    //       this.imgs.shift()
    //       if(this.imgs.length == 0) {
    //         clearInterval(timer)
    //       }
    //     },1000)
    //   }).catch((err) => {
    //     console.log(err);
    //   })
    // },
    async getList(){
      this.imgs = await fetch('../../../imgs.json').then(res => res.json()).then(res =>{return res.data})
      console.log(this.imgs);
      let list = [];
      for(var i=0;i<this.imgs.length;i++){
        list.push(this.imgs[i].id)
      }
      console.log(list[0]);
        var timer = setInterval(()=>{
        if(list[0] == "001"){
          this.imgurl = require('@/assets/image/' + list[0] + '.jpg')
        }else{
          this.imgurl = require('@/assets/image/' + list[0] + '.jpeg')
        }
         list.shift()
         console.log(list.length);
         if(list.length == 0) {
          clearInterval(timer);
         }
        },1000)
    },
    clearDraw1() {
      this.myPoints = ''
      this.myMovePoints = ''
      this.clickCount = 0
    },
    divClick1(e) {
      if (this.clickCount < this.pointCounts) {
        this.clickCount++
        let x = e.offsetX
        let y = e.offsetY
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
  background-color: #1e3fd4;
  color: #fcfcfc;
  border-radius: 20px;
}
.my-line-svg{
  position: absolute;
  top: 0;
  left: 0;
}
</style>