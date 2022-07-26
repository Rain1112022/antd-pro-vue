<template>
  <div class="chart-wrap">
    <div class="chart-title">
      {{chartTitle}}
    </div>
    <div class="chart-wrapper" :id="echartId"></div>
  </div>
</template>

<script>
  export default {
    name: 'PieChart',
    data(){
      return{
        chartTitle: '告警类型统计'
      }
    },
    computed: {
      echartId(){
        return 'echartId' + (Math.floor(Math.random() * 100) + 1)
      }
    },
    mounted(){
      this.initChart()
    },
    methods: {
      initChart(){
        let chartDom = document.getElementById(this.echartId);
        let myChart = this.$echarts.init(chartDom);
        let option = {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            bottom: '0',
            left: 'left',
            data: [{
              name: '黑白名单',
              textStyle: {
                color: '#FF5050'
              },
            }, {
              name: '入侵检测',
              textStyle: {
                color: '#F0A080'
              },
            }, {
              name: '徘徊检测',
              textStyle: {
                color: '#78DCB4'
              },
            }, {
              name: '接打手机',
              textStyle: {
                color: '#6FAC54'
              },
            }]
          },
          series: [
            {
              name: '告警类型统计',
              type: 'pie',
              radius: ['40%', '60%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '20',
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: 1048, name: '黑白名单', itemStyle: { color: '#FF5050' } },
                { value: 735, name: '入侵检测', itemStyle: { color: '#F0A080' } },
                { value: 580, name: '徘徊检测', itemStyle: { color: '#78DCB4' } },
                { value: 484, name: '接打手机', itemStyle: { color: '#6FAC54' } },
              ]
            }
          ],
        };
        option && myChart.setOption(option);
      },
      disposeChart(){
        // this.dataChart.dispose();
      }
    },
    destroyed(){
      this.disposeChart();
    }
  }
</script>

<style lang='less' scoped>
.chart-wrap{
    position: relative;
    width: 100%;
    height: 100%;
    // width: 400px;
    // height: 300px;
    .chart-title{
        position: absolute;
        left: 0;
        top: 0;
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