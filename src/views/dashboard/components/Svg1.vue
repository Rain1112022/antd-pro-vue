<template>
  <div>
    <h1> Monitor-SVG</h1>
    <h1>这是个svg练手(静态)，所以封装成组件，并没有在其他页面引用</h1>
   
    <div class="drawing-panel">
       <img src="@/assets/img/001.jpg" alt="" ref="drawing-panel" id="drawing">
       <svg  width ="320px"  height ="320px" >
          <path  d ="M10 315
           L 110 215
           A 30 50 0 0 1 162.55 162.45
           L 172.55 152.45
           A 30 50 -45 0 1 215.1 109.9
           L 315 10"  stroke ="black"  fill ="green"  stroke-width ="2"  fill-opacity ="0.5"/>
       </svg>
    </div>

    <svg width="240px" height="240px" xmlnx="http://www.w3.org/2000/svg">
      <defs>
        <g id="house" style="stroke:black">
          <rect x="0" y="41" width="60" height="60" />
          <polyline points="0 41,30 0,60 41" />
          <polyline points="30 101,30 71,44 71,44 101" />
        </g>
        <rect id="rect01" x="0" y="0" width="10" height="10" />
      </defs>
      <use xlink:href="#house" x="0" y="0" style="fill:#ccffcc;" />
      <use xlink:href="#house" x="120" y="0" style="fill:#99f;" />
      <use xlink:href="#house" x="65" y="105" style="fill:#c00;" />
      <use xlink:href="#rect01" x="0" y="130" />
    </svg>


  <svg width="800" height="800">
    <!-- 1. 绘制矩形 -->
    <rect width='50' height='50' style="fill:red;" />
 
    <!-- 2. 绘制线段 -->
    <line x1="100" y1="100" x2="250" y2="75" style="stroke: blue;stroke-width:1;" />
 
    <!-- 3. 绘制圆形 -->
    <circle cx="200" cy="200" r="50" stroke="green" stroke-width=2 fill="red" />
 
 
  </svg>
 

 


  </div>
</template>

<script>

export default {
  name: 'Svg1',
  data(){
    return {

    }
  },
  methods: {
    drawMySVG(){
      this.draw = SVG("drawing").size(300, 300)
      this.draw.line(10, 10, 10, 150).stroke({width: 5, linecap: "round", color: "blue"});
      this.draw.rect(100, 100).radius(10).fill("red").move(20,20);
      this.draw.circle(100).fill("green").move(130, 20)
      // var draw = SVG('drawing').size(300, 300)
      // var rect = draw.rect(100, 100).attr({ fill: '#f06' })
    }
  },
  mounted(){
    this.drawMySVG()
  }
}
</script>

<style scoped>

</style>