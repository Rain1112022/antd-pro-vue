<template>
  <div class="box">
    <h1>中国地图</h1>
    <div id="chart-panel" class="chart-panel" ></div>
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'
import MapLoader from '@/assets/AMap.js'
import getGeoJson from './components/GeoJson.js'
import $ from 'jquery'
export default {
  name: 'geoChina',
  data(){
    return {
      map: null,
      geoJson : {},
      currentIndex : 0,
      timeTitle : ['2015', '2016', '2017', '2018', '2019'],
      adcode: 100000,
      mapData : [],
      pointData : [],
      sum : 0,
      parentInfo : [{
        cityName: '全国',
        code: 100000
      }],
      xData : [],
      yData : [],
    }
  },
  mounted() {
    let self = this
    
    // MapLoader().then(AMap => {
    //   console.log('地图加载成功')
    //   self.map = new AMap.Map('container', {
    //     //center: [116.401538,39.929543],
    //     resizeEnable: true,
    //     zoom: 12
    //   })
    //   self.init(100000)
    // }, e => {
    //   console.log('地图加载失败', e)
    // })
    
  },
  // methods: {
    
  //   async init(adcode) {
  //     await getGeoJson(adcode).then(data => {
  //       this.geoJson = data
  //       this.getMapData(this.geoJson)
  //     })
  //   },

  //   getMapData(geoJson){
  //    geoJson.features.forEach(item => {
  //       let value = Math.random() * 3000
  //       this.mapData.push({
  //         name: item.properties.name,
  //         value: value,
  //         cityCode: item.properties.adcode
  //       })
  //       this.pointData.push({
  //         name: item.properties.name,
  //         value: [item.properties.center[0], item.properties.center[1], value],
  //         cityCode: item.properties.adcode
  //       })
  //       this.sum += value
  //     })
  //     this.mapData = this.mapData.sort(function (a, b) {
  //       return b.value - a.value
  //     });

  //     this.initEchartMap(this.mapData, this.sum, this.pointData)
  //   },

  //   initEchartMap(mapData, sum, pointData){
  //     let myChart = this.$echarts.init(document.getElementById('chart-panel'))
  //     let min = this.mapData[this.mapData.length - 1].value
  //     let max = this.mapData[0].value
  //     if (this.mapData.length === 1) {
  //       min = 0
  //     }
  //     this.mapData.forEach(c => {
  //       this.xData.unshift(c.name)
  //       this.yData.unshift(c.value)
  //     })
  //     //这里做个切换，全国的时候才显示南海诸岛  只有当注册的名字为china的时候才会显示南海诸岛
  //     this.$echarts.registerMap(this.parentInfo.length === 1 ? 'china' : 'map', this.geoJson);
  //     let option = {
  //       timeline: {
  //         data: this.timeTitle,
  //         axisType: 'category',
  //         autoPlay: true,
  //         playInterval: 5000,
  //         left: '10%',
  //         right: '10%',
  //         bottom: '2%',
  //         width: '80%',
  //         label: {
  //           normal: {
  //             textStyle: {
  //               color: 'rgb(179, 239, 255)'
  //             }
  //           },
  //           emphasis: {
  //             textStyle: {
  //               color: '#fff'
  //             }
  //           }
  //         },
  //         currentIndex: this.currentIndex,
  //         symbolSize: 10,
  //         lineStyle: {
  //           color: '#8df4f4'
  //         },
  //         checkpointStyle: {
  //           borderColor: '#8df4f4',
  //           color: '#53D9FF',
  //           borderWidth: 2,
  //         },
  //         controlStyle: {
  //           showNextBtn: true,
  //           showPrevBtn: true,
  //           normal: {
  //             color: '#53D9FF',
  //             borderColor: '#53D9FF'
  //           },
  //           emphasis: {
  //             color: 'rgb(58,115,192)',
  //             borderColor: 'rgb(58,115,192)'
  //           }
  //         },

  //       },
  //       baseOption: {
  //         backgroundColor: '#012248',
  //         title: [{
  //           left: 'center',
  //           top: 10,
  //           text: this.parentInfo[this.parentInfo.length - 1].cityName + '销售额统计图(可点击下钻到县)',
  //           textStyle: {
  //             color: 'rgb(179, 239, 255)',
  //             fontSize: 16
  //           },
  //         },
  //         {
  //           text: "销售总额：" + this.sum.toFixed(2) + '万',
  //           left: 'center',
  //           top: '6.5%',
  //           textStyle: {
  //             color: '#FFAC50',
  //             fontSize: 26
  //           }
  //         }
  //         ],
  //         tooltip: {
  //           trigger: 'axis',
  //           axisPointer: {
  //             type: 'shadow'
  //           },
  //         },
  //         grid: {
  //           right: '2%',
  //           top: '12%',
  //           bottom: '8%',
  //           width: '20%'
  //         },
  //         toolbox: {
  //           feature: {
  //             restore: {
  //               show: false
  //             },
  //             dataView: {
  //               show: false
  //             },
  //             saveAsImage: {
  //               name: this.parentInfo[this.parentInfo.length - 1].cityName + '销售额统计图'
  //             },
  //             dataZoom: {
  //               show: false
  //             },
  //             magicType: {
  //               show: false
  //             }
  //           },
  //           iconStyle: {
  //             normal: {
  //               borderColor: '#1990DA'
  //             }
  //           },
  //           top: 15,
  //           right: 35
  //         },
  //         geo: {
  //           map: this.parentInfo.length === 1 ? 'china' : 'map',
  //           zoom: 1.1,
  //           roam: true,
  //           left: '10%',
  //           top: '15%',
  //           tooltip: {
  //             trigger: 'item',
  //             formatter: (p) => {
  //               let val = p.value[2];
  //               if (window.isNaN(val)) {
  //                 val = 0;
  //               }
  //               let txtCon =
  //                 "<div style='text-align:left'>" + p.name + ":<br />销售额：" + val.toFixed(2) + '万</div>';
  //               return txtCon;
  //             }
  //           },
  //           label: {
  //             normal: {
  //               show: true,
  //               color: "rgb(249, 249, 249)", //省份标签字体颜色
  //               formatter: p => {
  //                 switch (p.name) {
  //                   case '内蒙古自治区':
  //                     p.name = "内蒙古"
  //                     break;
  //                   case '西藏自治区':
  //                     p.name = "西藏"
  //                     break;
  //                   case '新疆维吾尔自治区':
  //                     p.name = "新疆"
  //                     break;
  //                   case '宁夏回族自治区':
  //                     p.name = "宁夏"
  //                     break;
  //                   case '广西壮族自治区':
  //                     p.name = "广西"
  //                     break;
  //                   case '香港特别行政区':
  //                     p.name = "香港"
  //                     break;
  //                   case '澳门特别行政区':
  //                     p.name = "澳门"
  //                     break;

  //                 }
  //                 return p.name;
  //               }
  //             },
  //             emphasis: {
  //               show: true,
  //               color: '#f75a00',
  //             }
  //           },
  //           itemStyle: {
  //             normal: {
  //               areaColor: '#24CFF4',
  //               borderColor: '#53D9FF',
  //               borderWidth: 1.3,
  //               shadowBlur: 15,
  //               shadowColor: 'rgb(58,115,192)',
  //               shadowOffsetX: 7,
  //               shadowOffsetY: 6,
  //             },
  //             emphasis: {
  //               areaColor: '#8dd7fc',
  //               borderWidth: 1.6,
  //               shadowBlur: 25,
  //             }

  //           },
  //         },
  //         visualMap: {
  //           min: min,
  //           max: max,
  //           left: '3%',
  //           bottom: '5%',
  //           calculable: true,
  //           seriesIndex: [0],
  //           inRange: {
  //             color: ['#24CFF4', '#2E98CA', '#1E62AC']
  //           },
  //           textStyle: {
  //             color: '#24CFF4'
  //           }
  //         },
  //         xAxis: {
  //           type: 'value',
  //           scale: true,
  //           position: 'top',
  //           boundaryGap: false,
  //           splitLine: {
  //             show: false
  //           },
  //           axisLine: {
  //             show: true,
  //             lineStyle: {
  //               color: '#455B77'
  //             }
  //           },
  //           axisTick: {
  //             show: false
  //           },
  //           axisLabel: {
  //             margin: 2,
  //             textStyle: {
  //               color: '#c0e6f9'
  //             }
  //           },
  //         },
  //         yAxis: {
  //           type: 'category',
  //           nameGap: 16,
  //           axisLine: {
  //             show: true,
  //             lineStyle: {
  //               color: '#455B77'
  //             }
  //           },
  //           axisTick: {
  //             show: false,
  //           },
  //           axisLabel: {
  //             interval: 0,
  //             textStyle: {
  //               color: '#c0e6f9'
  //             }
  //           },
  //           data: this.xData
  //         },
  //         series: [{
  //           name: this.timeTitle[this.currentIndex] + '年销售额度',
  //           type: 'map',
  //           geoIndex: 0,
  //           map: this.parentInfo.length === 1 ? 'china' : 'map',
  //           roam: true,
  //           zoom: 1.3,
  //           tooltip: {
  //             trigger: "item",
  //             formatter: p => {
  //               let val = p.value;
  //               if (p.name == '南海诸岛') return
  //               if (window.isNaN(val)) {
  //                 val = 0;
  //               }
  //               let txtCon =
  //                 "<div style='text-align:left'>" + p.name + ":<br />销售额：" + val.toFixed(2) + '万</div>';
  //               return txtCon;
  //             }
  //           },
  //           label: {
  //             normal: {
  //               show: false,
  //             },
  //             emphasis: {
  //               show: false,
  //             }
  //           },
  //           data: this.mapData,

  //         },
  //         {
  //           name: '散点',
  //           type: 'effectScatter',
  //           coordinateSystem: 'geo',
  //           rippleEffect: {
  //             brushType: 'fill'
  //           },
  //           itemStyle: {
  //             normal: {
  //               color: '#F4E925',
  //               shadowBlur: 10,
  //               shadowColor: '#333'
  //             }
  //           },
  //           data: this.pointData,

  //           symbolSize: function (val) {
  //             let value = val[2]
  //             if (value == max) {
  //               return 27
  //             }
  //             return 10
  //           },
  //           showEffectOn: 'render', //加载完毕显示特效
  //         },
  //         {
  //           type: 'bar',
  //           barGap: '-100%',
  //           barCategoryGap: '60%',
  //           itemStyle: {
  //             normal: {
  //               color: '#11AAFE'
  //             },
  //             emphasis: {
  //               show: false
  //             }
  //           },
  //           data: this.yData
  //         }
  //         ]
  //       },
  //     }
  //     myChart.setOption(option, true)
  //     //点击前解绑，防止点击事件触发多次
  //     myChart.off('click');
  //     myChart.on('click', this.echartsMapClick);

  //     //监听时间切换事件
  //     myChart.off('timelinechanged');
  //     myChart.on('timelinechanged', params => {

  //       this.currentIndex = params.currentIndex;
  //       this.getMapData();
  //     })
  //   },

  //   echartsMapClick(params) {
  //     if (!params.data) {
  //       return
  //     } else {
  //       //如果当前是最后一级，那就直接return
  //       if (this.parentInfo[this.parentInfo.length - 1].code == params.data.cityCode) {
  //         return
  //       }
  //       let data = params.data
  //       this.parentInfo.push({
  //         cityName: data.name,
  //         code: data.cityCode
  //       })
  //       this.init(data.cityCode)
  //     }
  //   },
    
    
   
  // },
}
</script>

<style lang="less" scoped>

.box {
  width: 100%;
  height: 100%;
  position: relative;
}
.chart-panel {
    position: absolute;
    left: 0;
    right: 0;
    top: 50px;
    bottom: 0;
  }

</style>