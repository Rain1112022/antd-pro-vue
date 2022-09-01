<template>
  <div>
    <div>
      <button @click="showCanvas1">切换Canvas1</button>
      <button @click="showSvg1">切换Svg1</button>
      <button @click="showSvgCanvas1">切换SvgCanvas1</button>
      <button @click="showSvgCanvas2">切换SvgCanvas2</button>
    </div>
    <div>
      <Canvas1 v-show="isCanvas1"></Canvas1>
      <Svg1 v-show="isSvg1"></Svg1>
      <SvgCanvas1 v-show="isSvgCanvas1"></SvgCanvas1>
      <SvgCanvas2 v-show="isSvgCanvas2"></SvgCanvas2>
    </div>
    
  </div>
</template> 

<script>
  import Canvas1 from './components/Canvas1.vue'
  import Svg1 from './components/Svg1.vue'
  import SvgCanvas1 from './components/SvgCanvas1.vue'
  import SvgCanvas2 from './components/SvgCanvas2.vue'
export default {
   name: 'Monitor',
   components:{
    Canvas1,
    Svg1,
    SvgCanvas1,
    SvgCanvas2
   },
   data(){
    return{
      isCanvas1: true,
      isSvg1: false,
      isSvgCanvas1: false,
      isSvgCanvas2: false
    }
   },
  mounted() {
   
  },
  methods:{
    showCanvas1(){
      this.isCanvas1 = true,
      this.isSvg1 = false,
      this.isSvgCanvas1 = false,
      this.isSvgCanvas2 = false
    },
    showSvg1(){
      this.isSvg1 = true,
      this.isCanvas1 = false,
      this.isSvgCanvas1 = false,
      this.isSvgCanvas2 = false
    },
    showSvgCanvas1(){
      this.isSvgCanvas1 = true,
      this.isCanvas1 = false,
      this.isSvg1 = false,
      this.isSvgCanvas2 = false
    },
    showSvgCanvas2(){
      this.isSvgCanvas2 = true,
      this.isCanvas1 = false,
      this.isSvg1 = false,
      this.isSvgCanvas1 = false
      
    },

  }

    
}
</script>

<style lang="less">

</style>