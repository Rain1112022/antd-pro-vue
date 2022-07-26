<template>
  <div class="chart-wrap">
    <div class="chart-title">
      {{chartTitle}}
    </div>
    <div class="chart-wrapper" :id="echartId"></div>
  </div>
</template>

<script>
import { functionsIn, truncate } from 'lodash';

  export default {
    name: 'BarLineChart',
    data(){
      return{
        chartTitle: '告警变化趋势'
      }
    },
    computed: {
      echartId(){
        return 'echartId' + (Math.floor(Math.random() * 100) + 1)
      }
    },
    mounted() {
      this.initChart()
    },
    methods: {
      initChart(){
        let chartDom = document.getElementById(this.echartId);
        let myChart = this.$echarts.init(chartDom)
        var option = {
          tooltip: {
            trigger: 'axis', 
            axisPointer: {
              type: 'cross',
              crossStyle:{
                color: '#999'
              }
            }
          },
          legend: {
            left: 0,
            bottom: 0,
            data: [{
              name: '黑白名单',
              textStyle: {
                overflow: truncate,  //‘truncate’ 截断，并在末尾显示ellipsis配置的文本，默认为…
                color: '#FF5050'
              },
              icon: 'square'
            }, {
              name: '入侵检测',
              textStyle: {
                overflow: truncate,
                color: '#F0A080'
              },
              icon: 'square'
            }, {
              name: '徘徊检测',
              textStyle: {
                overflow: truncate,
                color: '#78DCB4'
              },
              icon: 'line'
            }, {
              name: '接打手机',
              textStyle: {
                overflow: truncate,
                color: '#6FAC54'
              },
              icon: 'line'
            }]
          },
          grid:{
            left: '30px'
          },
          xAxis: [
            {
              type: 'category',
              data: ['07-22', '07-23', '07-24', '07-25', '07-26', '07-27', '07-28'],
              axisPointer: {type:'shadow'},
              axisLine: {
                symbol: ['none', 'arrow'],
                symbolOffset:[0,10],
                lineStyle: {color: '#02f7ffea'}
              },
              axisTick: {show: false},
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '次数',
              scale: true,  //自动计算最小值保证坐标轴刻度的均匀分布;设置min/max后，scale失效
              axisLable:{
                formatter: '{value}',
                color: '#5EA7F8',
              },
              axisLine: {
                symbol: ['none','arrow'],
                symbolOffset: [0,10],
                color: '#5EA7F8',
              },
              splitLine: {
                show: false
              },
              axisTick: {
                show: false
              }
            }
          ],
          series: [
            {
              name: '黑白名单',
              type: 'bar',
              tooltip: {
                valueFormatter: function (value) {
                  return value + '次';
                },
                data: [32, 24, 57, 23, 25, 76, 35, 16, 32, 20, 6, 35],
                color: '#FF5050'
              },
            },
            {
              name: '入侵检测',
              type: 'bar',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' ml';
                }
              },
              data: [
                16, 45, 39, 26, 48, 70, 75, 82, 48, 18, 6, 2
              ],
              color: '#F0A080'
            },
            {
              name: '徘徊检测',
              type: 'line',
              // yAxisIndex: 1,  // 1表示配置多个y轴；0表示一个y轴
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' %';
                }
              },
              data: [2, 23, 3, 5, 6, 10, 20, 23, 25, 16, 12, 60],
              color: '#78DCB4'
            },
            {
              name: '接打手机',
              type: 'line',
              // yAxisIndex: 1,
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' %';
                }
              },
              data: [8, 13, 23, 15, 16, 20, 39, 43, 2, 8, 5, 23],
              color: '#6FAC54'
            }
          ]
        };
        option && myChart.setOption(option);
      },
      disposeChart(){
         // 官方给的说明:在图表容器被销毁之后，调用 echartsInstance.dispose 销毁实例，
        // this.dataChart.dispose();
      }
    },
    destroyed(){
      // 除图表代码：
      this.disposeChart();
    }
  }
</script>

<style lang="less" scoped>
  .chart-wrap{
    position: relative;
    width: 100;
    height: 100%;
    .chart-title{
       position: absolute;
        left: 0;
        top: 0px;
        font-size: 16px;
        color: #07F6F1;
        // color: #eaf0f0;
        font-weight: bold;
        line-height: 20px;
        padding-left: 4px;
        border-left: 4px solid #276BDD;
    }
    .chart-wrapper{
      width: 100%;
      height: 100%;
    }
  }
</style>