<template>
  <div class="chart-wrap">
    <div class="title">
      {{chartTitle}}
    </div>
    <ul class="list-content">
      <li v-for="(item,index) in warnList" :key="index" class="item">
        <span class="index">{{index + 1}}.</span>
        <span class="event">{{eventMap[item.event]}}</span>
        <span class="cameraName">{{item.camera_name}}</span>
        <span class="createdtime">{{item.createdtime.split('T')[0]}} {{item.createdtime.split('T')[1].split('.')[0]}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import {getWarnList} from '@/api/screen/screenShow.js'
import { eventMap} from '@/api/eventdict'
export default {
  name: 'WarnList',
  data(){
    return {
      chartTitle:'告警列表',
      warnList: [],
      eventMap,
      tempList: [{
        event:"10018",
        createdtime: "2022-08-15T15:22:23.4532",
        camera_name: "1号大门东侧"
      },
      {
        event:"10018",
        createdtime: "2022-08-15T15:22:23.4532",
        camera_name: "1号大门东侧"
      },
      {
        event:"10018",
        createdtime: "2022-08-15T15:22:23.4532",
        camera_name: "1号大门东侧"
      },
      {
        event:"10018",
        createdtime: "2022-08-15T15:22:23.4532",
        camera_name: "1号大门东侧"
      },
      {
        event:"10018",
        createdtime: "2022-08-15T15:22:23.4532",
        camera_name: "1号大门东侧"
      },
      {
        event:"10018",
        createdtime: "2022-08-15T15:22:23.4532",
        camera_name: "1号大门东侧"
      },
      {
        event:"10022",
        createdtime: "2022-08-18T19:43:23.1214",
        camera_name: "2号大门东侧"
      },
      {
        event:"10022",
        createdtime: "2022-08-18T19:43:23.1214",
        camera_name: "2号大门东侧"
      },
      {
        event:"10022",
        createdtime: "2022-08-18T19:43:23.1214",
        camera_name: "2号大门东侧"
      },
      {
        event:"10022",
        createdtime: "2022-08-18T19:43:23.1214",
        camera_name: "2号大门东侧"
      },
      {
        event:"10022",
        createdtime: "2022-08-18T19:43:23.1214",
        camera_name: "2号大门东侧"
      },
      {
        event:"10021",
        createdtime: "2022-08-18T20:15:02.1084",
        camera_name: "3号大门东侧"
      },
      {
        event:"10021",
        createdtime: "2022-08-18T20:15:02.1084",
        camera_name: "3号大门东侧"
      },
      {
        event:"10021",
        createdtime: "2022-08-18T20:15:02.1084",
        camera_name: "3号大门东侧"
      },
      {
        event:"10021",
        createdtime: "2022-08-18T20:15:02.1084",
        camera_name: "3号大门东侧"
      },
      {
        event_name: "10021",
        createdtime: "2022-08-18T20:15:02.1084",
        camera_name: "3号大门东侧"
      },
      ],
    }
  },
  mounted(){
    this.initList()
    // this.updateList()
  },
  methods: {
    initList(){
      this.warnList = this.tempList.slice(0,12)
    }

    // updateList() {
    //   getWarnList().then((res) => {
    //       if (res.data.data.length > 0) {
    //         this.warnList = res.data.data.slice(0, 10)
    //         console.log(res);
    //         setInterval(() => {
    //           this.warnList = res.data.data.slice(0, 10)
    //         }, 10000)
    //       } else {
    //         this.warnList = this.tempList.slice(0,10)
    //       }
    //     }).catch((error) => {
    //       console.log(error);
    //     })
    //   setInterval(() => {
    //     this.updateList()
    //     // console.log("请求更新");
    //   }, 60000)
    // }

    
  }
}
</script>

<style lang='less' scoped>

  .chart-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    
    .title {
      font-size: 16px;
      color:#464646;
      font-weight: bold;
      line-height: 30px;
      margin: 20px 0 0 14px;
      padding-left: 4px;
      border-left: 4px solid #276BDD;
    }
  
    .list-content {
      margin: 0px;
      list-style-type: decimal;
      height: calc(100%-30px);
  
      .item {
        height: 32px;
        line-height: 32px;
        text-indent: 0;
        font-size: 16px;
        // color: #02f7ffea;
        color:#464646;
        display: flex;
        .index {
          display: block;
          padding-right: 10px;
        }
        .event {
          display: block;
          // width: 15%;
          padding-right: 10px;
        }
        .cameraName {
          padding-right: 10px;
          display: block;
          max-width: 70%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .createdtime {
          padding-right: 10px;
          display: block;
          // width: 35%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
  </style>
  