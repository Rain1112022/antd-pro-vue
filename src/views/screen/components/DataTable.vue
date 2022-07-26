<template>
  <div class="table">
    <div class="title">{{tableTitle}}</div>
    <div class="header-wrap">
      <span v-for="(header, index) in headerData" :key="index" class="item">{{header.name}}</span>
    </div>
    <div class="content-wrap">
      <div v-for="(trData, index) in tableData" :key="index" class="tr-item">
        <span v-for="(item, keyName) in trData" :key="keyName" class="td-item"> {{item}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        tableTitle:'告警方案部署一览',
        headerData: [
          {
            name: '摄像头',
            width: 40
          },
          {
            name: '黑白名单',
          }, {
            name: '入侵检测',
          },
          {
            name: '徘徊检测',
          }, {
            name: '接打手机',
          }
        ],
        tableData: [
          {
            name: '摄像头1',
            intercept: '是',
            invade: '是',
            wander: '是',
            mobile: '否'
          },
          {
            name: '摄像头2',
            intercept: '是',
            invade: '否',
            wander: '是',
            mobile: '否'
          },
          {
            name: '摄像头3',
            intercept: '是',
            invade: '否',
            wander: '是',
            mobile: '是'
          },
          {
            name: '摄像头4',
            intercept: '否',
            invade: '是',
            wander: '是',
            mobile: '否'
          },
          {
            name: '摄像头5',
            intercept: '否',
            invade: '是',
            wander: '是',
            mobile: '否'
          },
          {
            name: '摄像头6',
            intercept: '否',
            invade: '是',
            wander: '是',
            mobile: '否'
          }, {
            name: '摄像头7',
            intercept: '否',
            invade: '是',
            wander: '是',
            mobile: '否'
          },
          {
            name: '摄像头8',
            intercept: '否',
            invade: '是',
            wander: '是',
            mobile: '否'
          }
        ],
      }
    }
  }
</script>

<style lang="less" scoped>
.table{
  width: 100%;
  .title{
    font-size: 16px;
    color: #07F6F1;
    // color: #eaf0f0;
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
      flex: 1;
      height:28px;
      line-height: 28px;
      font-size: 14px;
      padding-left: 8px;
      color: #fff;
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
        width: 20%;
        padding-left: 8px;
        font-size: 12px;
        color:#dfdfdf;
      }
    }
  }
}
</style>