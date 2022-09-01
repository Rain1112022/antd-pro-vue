<template>
  <div class="chart-wrap">
      <div class="chart-title">
          {{chartTitle}}
      </div>
      <div class="chart-wrapper" :id="echartId"></div>
  </div>
</template>

<script>
import { eventMap } from '@/api/eventdict'
import {getWarnType} from '@/api/screen/screenShow.js'
export default {
  name: 'PieChart',
  data(){
      return{
          chartTitle:'今日告警类型统计',
          pie_data: [],
          seriesData:[],
          legendData: [],
          eventMap,
          option: {
                  color: [ '#4992ff','#7cffb2','#fddd60','#ff6e76','#58d9f9','#05c091','#ff8a45','#8d48e3','#dd79ff','#FF5050'],
                  tooltip: {
                      trigger: 'item',
                      fontSize: '10' ,
                      // formatter: '{a} <br/>{b} : {c} ({d}%)'
                  },
                  legend: {
                      type: 'scroll',
                      orient: 'vertical',
                      right: 8,
                      bottom: 10,
                      top: 10,
                      textStyle: { color:'#464646' },
                      // data: this.legendData,
                  },
                  series: [
                      {
                          name: '告警类型统计',
                          type: 'pie',
                          radius: '55%',
                          center: ['40%', '50%'],
                          avoidLabelOverlap: false,
                          data: [{
                              name: "吸烟",
                              value: "4"
                          },
                          {
                              name: "打电话",
                              value: "6"
                          },
                          {
                              name: "禁区",
                              value: "3"
                          },
                          {
                              name: "进入",
                              value: "7"
                          },
                          {
                              name: "聚集",
                              value: "2"
                          },
                          {
                              name: "跌倒",
                              value: "1"
                          },
                          {
                              name: "玩手机",
                              value: "9"
                          },
                          {
                              name: "离岗",
                              value: "4"
                          },
                          ],
                          emphasis: {
                              itemStyle: {
                                  shadowBlur: 10,
                                  shadowOffsetX: 0,
                                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                              }
                          }
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
    // this.updateData()
    this.initChart()  
  },
  methods: {
    initChart() {
      this.seriesData = [];
      this.legendData = [];
      let chartDom = document.getElementById(this.echartId);
      let myChart = this.$echarts.init(chartDom);
      myChart.setOption(this.option);
      setInterval(() => {
        myChart.clear()
        myChart.setOption(this.option)
      }, 10000);
      window.onresize = function () {
        myChart.resize()
      }
    }

    // initChart(type = 0, number = 100) {
    //   this.seriesData = [];
    //   this.legendData = [];
    //   let chartDom = document.getElementById(this.echartId);
    //   let myChart = this.$echarts.init(chartDom);
    //       let pie_data = this.updateData(type, number)
    //       pie_data.then(res => {
    //           if (res.data.data.length > 0) {
    //               this.pie_data = res.data.data
    //               res.data.data.map((item) => {
    //                   return this.seriesData.push({
    //                       name: this.eventMap[item.event_id],
    //                       value: item.event_counts,
    //                   })
    //               })
    //               res.data.data.map((item) => {
    //                   return this.legendData.push(this.eventMap[item.event_id])
    //               })
    //               this.legendData = this.legendData.slice(0, 10)
    //               this.seriesData = this.seriesData.slice(0, 10)
    //               let option = {
    //                   color: ['#4992ff', '#7cffb2', '#fddd60', '#ff6e76', '#58d9f9', '#05c091', '#ff8a45', '#8d48e3', '#dd79ff', '#FF5050'],
    //                   tooltip: {
    //                       trigger: 'item',
    //                       fontSize: '10',
    //                       formatter: '{a} <br/>{b} : {c} ({d}%)'
    //                   },
    //                   legend: {
    //                       type: 'scroll',
    //                       orient: 'vertical',
    //                       right: 7,
    //                       bottom: 10,
    //                       top: 10,
    //                       textStyle: { color: '#eaf0f0' },
    //                       data: this.legendData,
    //                   },
    //                   series: [
    //                       {
    //                           name: '告警类型统计',
    //                           type: 'pie',
    //                           radius: '55%',
    //                           center: ['50%', '50%'],
    //                           avoidLabelOverlap: false,
    //                           data: this.seriesData,
    //                           emphasis: {
    //                               itemStyle: {
    //                                   shadowBlur: 10,
    //                                   shadowOffsetX: 0,
    //                                   shadowColor: 'rgba(0, 0, 0, 0.5)'
    //                               }
    //                           }
    //                       }
    //                   ]
    //               };
    //               option && myChart.setOption(option);
    //               setInterval(() => {
    //                   myChart.clear()
    //                   myChart.setOption(option)
    //               }, 10000);
    //           }else{
    //             myChart.setOption(this.option);
    //           }
    //           window.onresize = function () {
    //           myChart.resize()
    //           }   
    //       })
          
    //   },
      
      // updateData(pie = 0, number = 100) {
      //     return new Promise ((resolve,reject) => {
      //         getWarnType().then((res) => {
      //             resolve(res)
      //         }).catch(error => {
      //             reject(error)
      //         })
      //     }) 
      // },

  },
  
  destroyed(){
  }
}
</script>

<style lang='less' scoped>
.chart-wrap{
  position: relative;
  width: 100%;
  height: 262px;
  .chart-title{
      position: absolute;
      left: 0;
      top: 0;
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


