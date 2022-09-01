<template>
  <div class="table">
    <div class="title">
        {{tableTitle}}
    </div>
      <div class="header-wrap">
        <span v-for="(header,index) in headerData" :key="index" class="item">{{header}}</span>
      </div>
      <div class="content-wrap">
        <div v-for="(trData,index) in tableData" :key="index" class="tr-item">
          <span v-for="(item,keyName) in trData" :key="keyName" class="td-item">
          {{item}}
          </span>
        </div>
      </div>
  </div>
  </template>
  <script>
  import {getCameraList} from '@/api/screen/screenShow.js'
  import { detectorMap } from '@/api/eventdict'
  export default{
      data() {
          return {
            tableTitle:'告警方案部署一览',
            tableList:[],
            codes:[],
            detectorMap,
            tableData:[],
            headerData:['摄像头','安全帽', '保安服','物品遗留','口罩'],
          }
      },
      mounted(){
        // this.updateData()
        this.initData()
      },
      methods: {
        initData(){
          for (let i = 0; i < 8; i++) {
                this.tableData.push({
                  name: '1号大门东侧',
                  detector1: "是",
                  detector2: "否",
                  detector3: "是",
                  detector4: "否"
                })
              }
        },

        // updateData() {
        //   getCameraList().then((res) => {
        //     console.log(res.data);
        //     this.tableData = []
        //     if (res.data.data.length > 0) {
        //       this.tableList = res.data.data
        //       let tempCodes = []
        //       res.data.data.slice(0, 8).forEach((ele) => {
        //         ele.codes.forEach((item) => {
        //           tempCodes.push(item)
        //         })
        //       })
        //       this.codes = [...new Set(tempCodes)]
        //       console.log(this.codes);
        //       if (this.codes.length < 4) {
        //         this.codes.forEach((ele, i) => {
        //           this.headerData[i + 1] = this.headerData.find((item) => { return item == this.detectorMap[ele] }) ? this.headerData[i + 1] : this.detectorMap[ele]
        //         })
        //       } else {
        //         this.codes.slice(0, 4).forEach((ele, i) => {
        //           this.headerData[i + 1] = this.detectorMap[ele]
        //         })
        //       }
        //       res.data.data.slice(0, 8).map((item) => {
        //         return this.tableData.push({
        //           name: item.camera_name,
        //           detector1: item.codes.find((item) => { return this.detectorMap[item] == this.headerData[1] }) ? "是" : "否",
        //           detector2: item.codes.find((item) => { return this.detectorMap[item] == this.headerData[2] }) ? "是" : "否",
        //           detector3: item.codes.find((item) => { return this.detectorMap[item] == this.headerData[3] }) ? "是" : "否",
        //           detector4: item.codes.find((item) => { return this.detectorMap[item] == this.headerData[4] }) ? "是" : "否",
        //         })
        //       })
        //     } else {
        //       for (let i = 0; i < 8; i++) {
        //         this.tableData.push({
        //           name: 10001,
        //           detector1: "是",
        //           detector2: "否",
        //           detector3: "是",
        //           detector4: "否"
        //         })
        //       }
        //     }
        //   }).catch((error) => {
        //     console.log(error);
        //   })
        // },
      }
      
  }
  </script>
  
  <style lang="less" scoped>
  .table{
    width: 100%;
    // height: 300px;
    .title{
      font-size: 16px;
      // color: #07F6F1;
      color:#464646;
      font-weight: bold;
      line-height: 20px;
      padding-left: 4px;
      border-left: 4px solid #276BDD;
    }
    .header-wrap{
      display: flex;
      width: 100%;
      margin-top: 20px;
      background-color: #6accd3;
      .item{
        // flex: 1;
        width: 18%;
        height:28px;
        line-height: 28px;
        font-size: 14px;
        padding-left: 8px;
        // color: #fff;
        color:#464646;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &:first-child {
          width: 30%;
        }
      }
    }
    .content-wrap{
      .tr-item{
        display: flex;
        height: 24px;
        line-height: 24px;
        &:nth-of-type(2n){
          background-color: #5169dd8e;
        }
        &:nth-of-type(2n + 1){
          background-color: #49919660;
        }
        &:hover{
          background-color: #f0ede76c;
        }
        .td-item{
          width: 18%;
          padding-left: 8px;
          font-size: 12px;
          // color:#dfdfdf;
          color:#464646;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          &:first-child{
            width: 30%;
          }
        }
      }
    }
  }
  </style>
  