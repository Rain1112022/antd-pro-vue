<template>
  <div class="chart-wrap">
      <div class="chart-title">
          {{chartTitle}}
      </div>
      <div class="chart-wrapper" :id="echartId"></div>
  </div>
</template>

<script>
import {getWeekCount} from '@/api/screen/screenShow.js'
import { eventMap } from '@/api/eventdict'
import { log } from 'video.js'
export default {
  name: 'BarLineChart',
  data(){
      return{
          chartTitle:'告警变化趋势',
          xAxis_data: [],
          legendData: [],
          create_date:[],
          event_count:[],
          tempCount0 : [0, 0, 0, 0, 0, 0, 0],
          tempCount1 : [0, 0, 0, 0, 0, 0, 0],
          tempCount2 : [0, 0, 0, 0, 0, 0, 0],
          tempCount3 : [0, 0, 0, 0, 0, 0, 0],
          eventMap,
          option : {
                  color: ['#fac858', '#ee6666', '#58d9f9', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc', '#FF5050', '#5470c6', '#91cc75',],
                  tooltip: {
                      trigger: 'axis',
                      axisPointer: {
                          type: 'cross',
                          label: {
                              backgroundColor: '#6a7985'
                          }
                      }
                  },
                  legend: {
                      left: 50,
                      bottom: 0,
                      textStyle: { color:'#464646'},
                      data: ["打电话","进入","玩手机","聚集"]
                  },
                  xAxis: [
                      {
                          type: 'category',
                          boundaryGap: false,
                          data:[ "0809", "0810", "0811", "0812", "0813", "0814", "0815" ],
                          axisLine: {
                              symbol: ["none", "arrow"],
                              symbolOffset: [0, 15],
                              lineStyle: {
                                  color: '#02f7ffea',
                              }
                          },
                          axisTick: { 
                              show: false
                          },
                          axisLabel: {
                              interval: 0,
                          },
                      }
                  ],
                  yAxis: [
                      {
                          type: 'value',
                          name: '次数',
                          scale: true,
                          axisLabel: {
                              formatter: '{value}',
                              textStyle: {
                                  color: '#5EA7F8',
                                  color: '#02f7ffea',
                              }
                          },
                          splitLine: { 
                              show: false,
                          },
                          axisLine: {
                              symbol: ["none", "arrow"],
                              symbolOffset: [0, 10],
                              lineStyle: {
                                  color: '#02f7ffea',
                              }
                          },
                          axisTick: {
                              show: false
                          }
                      }
                  ],
                  series: [
                      {
                          name: "打电话",
                          type: 'line',
                          stack: 'Total',
                          areaStyle: {},
                          data: [2348, 2656, 0, 0, 440, 0, 0]
                      },
                      {
                          name: "进入",
                          type: 'line',
                          stack: 'Total',
                          areaStyle: {},
                          data: [2048, 2056, 1345, 17, 140, 22, 50]
                      },
                      {
                          name: "玩手机",
                          type: 'line',
                          stack: 'Total',
                          areaStyle: {},
                          data: [1348, 1656, 210, 1110, 240, 540,20]
                      },
                      {
                          name: "聚集",
                          type: 'line',
                          stack: 'Total',
                          areaStyle: {},
                          data: [1848, 2456, 80, 50, 340, 1370, 170]
                      }
                  ]
              },
          
      }
  },
  computed:{
      echartId(){
          return 'echartId' + (Math.floor(Math.random() * 100) + 1)
      }
  },
  mounted() {
      this.initChart()
  },
  methods: {
      initChart() {
          let chartDom = document.getElementById(this.echartId);
          let myChart = this.$echarts.init(chartDom);
          myChart.setOption(this.option);
          window.onresize = function () {
            myChart.resize()
          }
          setInterval(() => {
            myChart.clear()
            myChart.setOption(this.option)
          }, 10000);

          // getWeekCount().then((res) => {
          //     if (res.data.data.event_list.length > 0) {
          //         res.data.data.date_duration.map((item) => {
          //             return this.xAxis_data.push(item)
          //         })
          //         res.data.data.event_list.slice(0, 4).map((item) => {
          //             return this.legendData.push(this.eventMap[item.event_id])
          //         })
          //         if (res.data.data.event_list.length >= 4) {
          //             let list = res.data.data.event_list.slice(0, 4)
          //             this.create_date = list[0].create_date
          //             this.event_count = list[0].event_count
          //             this.create_date.forEach((ele, index) => {
          //                 var tempIndex = this.xAxis_data.indexOf(ele)
          //                 if (tempIndex !== -1) {
          //                     this.tempCount0[tempIndex] = this.event_count[index]
          //                 }

          //             })
          //             // console.log(this.tempCount0);

          //             this.create_date = list[1].create_date
          //             this.event_count = list[1].event_count
          //             this.create_date.forEach((ele, index) => {
          //                 var tempIndex = this.xAxis_data.indexOf(ele)
          //                 if (tempIndex !== -1) {
          //                     this.tempCount1[tempIndex] = this.event_count[index]
          //                 }

          //             })
          //             console.log(this.tempCount1);


          //             this.create_date = list[2].create_date
          //             this.event_count = list[2].event_count
          //             this.create_date.forEach((ele, index) => {
          //                 var tempIndex = this.xAxis_data.indexOf(ele)
          //                 if (tempIndex !== -1) {
          //                     this.tempCount2[tempIndex] = this.event_count[index]
          //                 }

          //             })
          //             // console.log(this.tempCount2);

          //             this.create_date = list[3].create_date
          //             this.event_count = list[3].event_count
          //             this.create_date.forEach((ele, index) => {
          //                 var tempIndex = this.xAxis_data.indexOf(ele)
          //                 if (tempIndex !== -1) {
          //                     this.tempCount3[tempIndex] = this.event_count[index]
          //                 }
          //             })
          //             // console.log(this.tempCount3);
          //         } else {
          //             let list = res.data.data.event_list
          //             if (list.length == 1) {
          //                 this.create_date = list[0].create_date
          //                 this.event_count = list[0].event_count
          //                 this.create_date.forEach((ele, index) => {
          //                     var tempIndex = this.xAxis_data.indexOf(ele)
          //                     if (tempIndex !== -1) {
          //                         this.tempCount0[tempIndex] = this.event_count[index]
          //                     }
          //                 })
          //                 // console.log(this.tempCount0);

          //             } else if (list.length == 2) {
          //                 this.create_date = list[0].create_date
          //                 this.event_count = list[0].event_count
          //                 this.create_date.forEach((ele, index) => {
          //                     var tempIndex = this.xAxis_data.indexOf(ele)
          //                     if (tempIndex !== -1) {
          //                         this.tempCount0[tempIndex] = this.event_count[index]
          //                     }
          //                 })
          //                 // console.log(this.tempCount0);

          //                 this.create_date = list[1].create_date
          //                 this.event_count = list[1].event_count
          //                 this.create_date.forEach((ele, index) => {
          //                     var tempIndex = this.xAxis_data.indexOf(ele)
          //                     if (tempIndex !== -1) {
          //                         this.tempCount1[tempIndex] = this.event_count[index]
          //                     }
          //                 })
          //                 // console.log(this.tempCount1);

          //             } else if (list.length == 3) {
          //                 this.create_date = list[0].create_date
          //                 this.event_count = list[0].event_count
          //                 this.create_date.forEach((ele, index) => {
          //                     var tempIndex = this.xAxis_data.indexOf(ele)
          //                     if (tempIndex !== -1) {
          //                         this.tempCount0[tempIndex] = this.event_count[index]
          //                     }
          //                 })
          //                 // console.log(this.tempCount0);

          //                 this.create_date = list[1].create_date
          //                 this.event_count = list[1].event_count
          //                 this.create_date.forEach((ele, index) => {
          //                     var tempIndex = this.xAxis_data.indexOf(ele)
          //                     if (tempIndex !== -1) {
          //                         this.tempCount1[tempIndex] = this.event_count[index]
          //                     }
          //                 })
          //                 // console.log(this.tempCount1);

          //                 this.create_date = list[2].create_date
          //                 this.event_count = list[2].event_count
          //                 this.create_date.forEach((ele, index) => {
          //                     var tempIndex = this.xAxis_data.indexOf(ele)
          //                     if (tempIndex !== -1) {
          //                         this.tempCount2[tempIndex] = this.event_count[index]
          //                     }
          //                 })
          //                 // console.log(this.tempCount2);
          //             }
          //         }
          //         let option = {
          //             color: ['#fac858', '#ee6666', '#58d9f9', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc', '#FF5050', '#5470c6', '#91cc75',],
          //             tooltip: {
          //                 trigger: 'axis',
          //                 axisPointer: {
          //                     type: 'cross',
          //                     label: {
          //                         backgroundColor: '#6a7985'
          //                     }
          //                 }
          //             },
          //             legend: {
          //                 left: 50,
          //                 bottom: 0,
          //                 textStyle: { color: '#eaf0f0' },
          //                 data: this.legendData
          //             },
          //             xAxis: [
          //                 {
          //                     type: 'category',
          //                     boundaryGap: false,
          //                     data: this.xAxis_data,
          //                     // data:[ "0809", "0810", "0811", "0812", "0813", "0814", "0815" ],
          //                     axisLine: {
          //                         symbol: ["none", "arrow"],
          //                         symbolOffset: [0, 10],
          //                         lineStyle: {
          //                             color: '#02f7ffea',
          //                         }
          //                     },
          //                     axisTick: {
          //                         show: false
          //                     }
          //                 }
          //             ],
          //             yAxis: [
          //                 {
          //                     type: 'value',
          //                     name: '次数',
          //                     scale: true,
          //                     axisLabel: {
          //                         formatter: '{value}',
          //                         textStyle: {
          //                             color: '#5EA7F8',
          //                             color: '#02f7ffea',
          //                         }
          //                     },
          //                     splitLine: {
          //                         show: false
          //                     },
          //                     axisLine: {
          //                         symbol: ["none", "arrow"],
          //                         symbolOffset: [0, 15],
          //                         lineStyle: {
          //                             color: '#02f7ffea',
          //                         }
          //                     },
          //                     axisTick: {
          //                         show: false
          //                     }
          //                 }
          //             ],
          //             series: [
          //                 {
          //                     name: this.legendData[0],
          //                     type: 'line',
          //                     stack: 'Total',
          //                     areaStyle: {},
          //                     data: this.tempCount0
          //                     //   data: [2348, 2656, 0, 0, 440, 0, 0]
          //                 },
          //                 {
          //                     name: this.legendData[1],
          //                     type: 'line',
          //                     stack: 'Total',
          //                     areaStyle: {},
          //                     data: this.tempCount1
          //                 },
          //                 {
          //                     name: this.legendData[2],
          //                     type: 'line',
          //                     stack: 'Total',
          //                     areaStyle: {},
          //                     data: this.tempCount2
          //                 },
          //                 {
          //                     name: this.legendData[3],
          //                     type: 'line',
          //                     stack: 'Total',
          //                     areaStyle: {},
          //                     data: this.tempCount3
          //                 }
          //             ]
          //         };
          //         option && myChart.setOption(option);
          //         setInterval(() => {
          //             myChart.clear()
          //             myChart.setOption(option)
          //         }, 10000);
          //     }else{
          //       myChart.setOption(this.option);
          //     }
          // }).catch((error) => {
          //     console.log(error);
          // })

      },
  },
  
}
</script>


<style lang='less' scoped>
.chart-wrap{
  position: relative;
  width: 100%;
  height: 100%;
  .chart-title{
      position: absolute;
      left: 0;
      top: 0px;
      font-size: 16px;
      color:#464646;
      font-weight: bold;
      line-height: 20px;
      padding-left: 4px;
      border-left: 4px solid #276BDD;
  }
  .chart-wrapper{
      width: 90%;
      height: 100%;
  }
}
</style>
