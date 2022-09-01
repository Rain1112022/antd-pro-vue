<template>
    <div class="wrap">
        <div class="top-content">
            <div class="left-wrap">
                <div class="chart-title">
                    {{chartTitle}}
                </div>
                <div class="chart-wrapper" id="myChart1" ></div>
            </div>

            <div class="middle-wrap">
                <div class="item">
                    <video-item :videoInfo="{ 'name': 'Camera1' }"></video-item>
                </div>
                <div class="item">
                    <video-item :videoInfo="{ 'name': 'Camera2' }"></video-item>
                </div>
                <div class="item">
                    <video-item :videoInfo="{ 'name': 'Camera3' }"></video-item>
                </div>
                <div class="item">
                    <video-item :videoInfo="{ 'name': 'Camera4' }"></video-item>
                </div>
            </div>

            <div class="right-wrap">
                <div class="list-warp">
                    <warn-list></warn-list>
                </div>
            </div>
        </div>


        <section class="bottom-content">

            <div class="pie-wrap">
                <pie-chart></pie-chart>
            </div>


            <div class="bar-wrap">
                <bar-line-chart></bar-line-chart>
            </div>
            <div class="table-wrap">
                <data-table></data-table>
            </div>
        </section>
    </div>

</template>
<script>
// import * as echarts from "echarts"
import WarnList from './components/WarnList.vue'
import PieChart from './components/PieChart.vue'
import BarLineChart from './components/BarLineChart.vue'
import DataTable from './components/DataTable.vue'
import VideoItem from './components/VideoItem.vue'
export default {
    name: 'ScreenShow',
    components:{
        WarnList,
        PieChart,
        BarLineChart,
        DataTable,
        VideoItem
    },
    data() {
        return {
            chartTitle:'月度统计',
            //图表配置项对象
            option1: {
                color: ["#5ACC23"],  //柱状图的柱子颜色color: 'blue',
                tooltip: {           //提示工具设置
                    show: true,  
                    trigger: 'axis',  //触发类型； axis指鼠标hover到一条柱状图会显示全部数据，item指鼠标hover到折线点显示相应数据
                    axisPointer: {  //坐标轴指示器，坐标轴触发有效
                        type: 'cross',  //line直线；cross十字准星；shadow阴影
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
               
                legend: {    // legend属性是显示对数据的解释标准，能够明显的找出不同颜色的折线代表着什么数据
                    data: ['平均时间']
                },
                xAxis: {             //X坐标配置项
                    type: "category",  // x坐标轴的类型；"category"表示类目型，适用于离散的类目数据，此时类目数据可自动从series.data或dataset.source中获取，或者可通过xAxis.data设置类目数据
                    axisPointer: { show: true },  //对坐标指示器的线设置
                    boundaryGap: true,  //坐标轴两侧留白策略
                    axisLine: {
                        show: true , //是否显示坐标线
                        symbol: ['none','arrow'],  //坐标轴添加箭头
                        symbolOffset: 10,        // 箭头偏移
                        symbolSize: [10, 10],
                        color: '#333'
                    },
                    axisTick: {
                        show: false  //是否显示坐标刻度线
                    },
                    axisLabel:{
                        width: '40px'
                    },
                    data: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec"
                    ]
                },
                yAxis: {             //  y坐标配置项
                    type: "value",  //  y坐标的type属性只有value一种，显示的是横坐标对应的数值，并且纵坐标的值不用我们自己去设置，它会根据我们给的数据自己生成纵坐标数值范围。
                    minInterval: 1,  
                    // smooth: true,       // 有弧度（平滑）
                    onZero: false,  // y轴是负数时也能显⽰
                    axisLine: {
                        show: true,
                        symbol: ['none','arrow'],  //坐标轴添加箭头
                        symbolOffset: 10,        // 箭头偏移
                        symbolSize: [10, 10]
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        inside: false,   // 刻度值写在y轴右侧
                        padding: [-50, 0, 0, 0],  // 标签的位置
                        fontSize: 14,
                        color: '#333',
                        formatter: "{value}"  // formatter格式化方法;在axisLabel中表示坐标轴上刻度的格式化
                    },
                    splitLine: { // 分割线
                        show: true,
                        lineStyle: {
                            color: "#999999"
                        }
                    },
                    data: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                },
                series: [   //图表内容数据配置项;series是一个数组，数组里面有若干个对象
                    {
                        name: "平均时间",
                        type: "bar",        //显示成柱状图
                        barWidth: 30,       //柱子宽度为10
                        data: [1, 4, 5, 2, 3, 1, 6, 4, 3, 1, 4, 2, 3],           //每项数据，动态赋予
                        // data: getData(), 
                        showSymbol: false,  //是否显示数据点
                        itemStyle: {        //设置柱状图样式（渐变颜⾊）
                          
                                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                    offset: 0,
                                    color: "#1268f3"// 0% 处的颜⾊
                                }, {
                                    offset: 0.6,
                                    color: "#08a4fa"// 60% 处的颜⾊
                                }, {
                                    offset: 1,
                                    color: "#01ccfe"// 100% 处的颜⾊
                                }], false)
                            
                        },
                    }
                ],
                grid: {               //图表属性配置项，一个图表对应一个grid
                    top: "10%",        // 图表距离装该图容器上边的距离
                    left: "6%",
                    right: "6%", 
                    bottom: "3%",
                    containLabel: true  // 当刻度标签溢出的时候，grid区域是否包含坐标轴的刻度标签，如果为true，则显示刻度标签，如果为false，则不显示刻度标签
                }
            },
            myChart1Obj: null        //图表对象
        };
    },
    
    methods: {
        // getData() {   //获取数据并赋值给option1.series.data
        //   var jsonstr = [];
        //   var res = this.getDataList()
        //   var dataList = res.data.list;
        //   for( i = 0; i < dataList.length; i ++){
        //     var json = {}
        //     json.name = dataList[i]
        //     json.value = "value";
        //     jsonstr.push(json)
        //   }
        //   return jsonstr; 
        // },
        drawMyChart1() {             //绘制图表方法
            this.$nextTick(() => {
                this.myChart1Obj = this.$echarts.init(document.getElementById("myChart1"));
                //将图表配置项赋给图表,true参数表示不和之前的数据合并
                this.myChart1Obj.setOption(this.option1, true);
            })
        }
    },
    mounted() {
        this.drawMyChart1();
         //让图表跟随屏幕⾃动的去适应
        //  window.addEventListener("resize", function () {
        //     myChart1.resize();
        //  })
    }
}
</script>

<style lang="less" scoped>



  @borderColor:#888;
  .wrap{
    width: 100%;
    height: 100%;
    padding: 8px;
    box-sizing: border-box;
    .top-content{
        width: 100%;
        height: 48%;
        display: flex;
        box-sizing: border-box;
        // border: 2px solid #999;
        .left-wrap {
                position: relative;
                width: 34%;
                // height: 100%;
                margin-right: 1%;
                box-sizing: border-box;
                border: 2px solid rgba(25, 186, 139, 0.3);
        
                .chart-title {
                    position: absolute;
                    left: 0;
                    top: 0;
                    font-size: 16px;
                    color: #464646;
                    font-weight: bold;
                    line-height: 20px;
                    margin: 20px 0 20px 14px;
                    padding-left: 4px;
                    border-left: 4px solid #276BDD;
                }
        
                .chart-wrapper {
                    width: 80%;
                    height: 85%;
                    margin-top: 30px;
                }
            }
        .middle-wrap{
            width: 32%;
            margin-right: 1%;
            padding: 40px 10px 0 10px;
            display: flex;
            justify-content: space-around;
            align-content: space-between;
            flex-wrap: wrap;
            box-sizing: border-box;
            border: 2px solid rgba(25, 186, 139, 0.3);
            .item{
                width: 40%;
                height: 200px;
                // &:nth-of-type(2n+1){
                //     margin-right: 10px;
                // }
            }
        }
        .right-wrap{
            width: 32%;
            box-sizing: border-box;
            border: 2px solid rgba(25, 186, 139, 0.3);
        }
    }
    .bottom-content{
        width: 100%;
        display: flex;
        box-sizing: border-box;
        // border: 2px solid #999;
        margin-top: 20px;
        margin-bottom: 10px;
        .pie-wrap{
            width: 26%;
            margin-right: 1%;
            padding: 20px;
            box-sizing: border-box;
            border: 2px solid rgba(25, 186, 139, 0.3);
        }
        .bar-wrap{
            width: 36%;
            margin-right: 1%;
            padding: 20px;
            box-sizing: border-box;
            border: 2px solid rgba(25, 186, 139, 0.3);
        }
        .table-wrap{
            width: 36%;
            padding: 20px;
            box-sizing: border-box;
            border: 2px solid rgba(25, 186, 139, 0.3);
        }
    }
  }
</style>
