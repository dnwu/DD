<template>
<div class="result">
  <div class="top">
    <div class="box">
      <div class="key">方案名称:</div>
      <div class="value">
        <el-input v-model="input" size="mini" placeholder="请输入内容"></el-input>
      </div>
    </div>
    <div class="box">
      <div class="key">日期:</div>
      <div class="value">2010-10-10</div>
    </div>
    <div class="box">
      <div class="key">优化目标:</div>
      <div class="value">里程最短</div>
    </div>
    <div class="box">
      <div class="key">线路总里程:</div>
      <div class="value">318km</div>
    </div>
    <div class="box">
      <el-button type="primary" size="mini" round icon="el-icon-upload">继续优化方案</el-button>
      <el-button type="success" plain round icon="el-icon-download">导出</el-button>
      <el-button type="info" size="mini" round icon="el-icon-back">返回</el-button>
    </div>
  </div>
  <div class="map">
    <div id="container"></div>
    <div class="slide">
      <div class="selet">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="line form">
        <div class="point">
          <div class="title">SZDC 南山存储点
            <span class="num">1</span>
          </div>
          <div class="info">
            <span>装货量:4.5t</span>
            <span class="el-icon-time">装货 2010-10-10 10:10</span>
          </div>
          <div class="order">
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item title="订单:154654654" name="1">
                <div class="order-title common">
                  <div class="id">货物ID</div>
                  <div class="name">名称</div>
                  <div class="type">类型</div>
                  <div class="num">数量</div>
                </div>
                <div class="info common">
                  <div class="id">416546465416</div>
                  <div class="name">水果</div>
                  <div class="type">LLC</div>
                  <div class="num">6666</div>
                </div>
                <div class="info common">
                  <div class="id">416546465416</div>
                  <div class="name">水果</div>
                  <div class="type">LLC</div>
                  <div class="num">6666</div>
                </div>
                <div class="info common">
                  <div class="id">416546465416</div>
                  <div class="name">水果</div>
                  <div class="type">LLC</div>
                  <div class="num">6666</div>
                </div>
                <div class="info common">
                  <div class="id">416546465416</div>
                  <div class="name">水果</div>
                  <div class="type">LLC</div>
                  <div class="num">6666</div>
                </div>
              </el-collapse-item>
              <el-collapse-item title="订单:154654654" name="2">
                <div class="order-title common">
                  <div class="id">货物ID</div>
                  <div class="name">名称</div>
                  <div class="type">类型</div>
                  <div class="num">数量</div>
                </div>
                <div class="info common">
                  <div class="id">416546465416</div>
                  <div class="name">水果</div>
                  <div class="type">LLC</div>
                  <div class="num">6666</div>
                </div>
                <div class="info common">
                  <div class="id">416546465416</div>
                  <div class="name">水果</div>
                  <div class="type">LLC</div>
                  <div class="num">6666</div>
                </div>
                <div class="info common">
                  <div class="id">416546465416</div>
                  <div class="name">水果</div>
                  <div class="type">LLC</div>
                  <div class="num">6666</div>
                </div>
                <div class="info common">
                  <div class="id">416546465416</div>
                  <div class="name">水果</div>
                  <div class="type">LLC</div>
                  <div class="num">6666</div>
                </div>
              </el-collapse-item>
              <el-collapse-item title="订单:154654654" name="3">
                <div class="order-title common">
                  <div class="id">货物ID</div>
                  <div class="name">名称</div>
                  <div class="type">类型</div>
                  <div class="num">数量</div>
                </div>
                <div class="info common">
                  <div class="id">416546465416</div>
                  <div class="name">水果</div>
                  <div class="type">LLC</div>
                  <div class="num">6666</div>
                </div>
                <div class="info common">
                  <div class="id">416546465416</div>
                  <div class="name">水果</div>
                  <div class="type">LLC</div>
                  <div class="num">6666</div>
                </div>
                <div class="info common">
                  <div class="id">416546465416</div>
                  <div class="name">水果</div>
                  <div class="type">LLC</div>
                  <div class="num">6666</div>
                </div>
                <div class="info common">
                  <div class="id">416546465416</div>
                  <div class="name">水果</div>
                  <div class="type">LLC</div>
                  <div class="num">6666</div>
                </div>
              </el-collapse-item>
              <el-collapse-item title="订单:154654654" name="4">
                <div class="order-title common">
                  <div class="id">货物ID</div>
                  <div class="name">名称</div>
                  <div class="type">类型</div>
                  <div class="num">数量</div>
                </div>
                <div class="info common">
                  <div class="id">416546465416</div>
                  <div class="name">水果</div>
                  <div class="type">LLC</div>
                  <div class="num">6666</div>
                </div>
                <div class="info common">
                  <div class="id">416546465416</div>
                  <div class="name">水果</div>
                  <div class="type">LLC</div>
                  <div class="num">6666</div>
                </div>
                <div class="info common">
                  <div class="id">416546465416</div>
                  <div class="name">水果</div>
                  <div class="type">LLC</div>
                  <div class="num">6666</div>
                </div>
                <div class="info common">
                  <div class="id">416546465416</div>
                  <div class="name">水果</div>
                  <div class="type">LLC</div>
                  <div class="num">6666</div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
          <div class="bottom-info">
            <span class="el-icon-time green">出发 2010-10-10 10:10</span>
          </div>
        </div>
        <div class="point">
          <div class="title">SZDC 南山存储点
            <span class="num">2</span>
          </div>
          <div class="info">
            <span>装货量:4.5t</span>
            <span class="el-icon-time blue">到达 2010-10-10 10:10</span>
          </div>
          <div class="order">
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item title="订单:154654654" name="1">
                <div class="order-title common">
                  <div class="id">货物ID</div>
                  <div class="name">名称</div>
                  <div class="type">类型</div>
                  <div class="num">数量</div>
                </div>
                <div class="info common">
                  <div class="id">416546465416</div>
                  <div class="name">水果</div>
                  <div class="type">LLC</div>
                  <div class="num">6666</div>
                </div>
                <div class="info common">
                  <div class="id">416546465416</div>
                  <div class="name">水果</div>
                  <div class="type">LLC</div>
                  <div class="num">6666</div>
                </div>
                <div class="info common">
                  <div class="id">416546465416</div>
                  <div class="name">水果</div>
                  <div class="type">LLC</div>
                  <div class="num">6666</div>
                </div>
                <div class="info common">
                  <div class="id">416546465416</div>
                  <div class="name">水果</div>
                  <div class="type">LLC</div>
                  <div class="num">6666</div>
                </div>
              </el-collapse-item>
              <el-collapse-item title="订单:154654654" name="2">
                <div class="order-title common">
                  <div class="id">货物ID</div>
                  <div class="name">名称</div>
                  <div class="type">类型</div>
                  <div class="num">数量</div>
                </div>
                <div class="info common">
                  <div class="id">416546465416</div>
                  <div class="name">水果</div>
                  <div class="type">LLC</div>
                  <div class="num">6666</div>
                </div>
                <div class="info common">
                  <div class="id">416546465416</div>
                  <div class="name">水果</div>
                  <div class="type">LLC</div>
                  <div class="num">6666</div>
                </div>
                <div class="info common">
                  <div class="id">416546465416</div>
                  <div class="name">水果</div>
                  <div class="type">LLC</div>
                  <div class="num">6666</div>
                </div>
                <div class="info common">
                  <div class="id">416546465416</div>
                  <div class="name">水果</div>
                  <div class="type">LLC</div>
                  <div class="num">6666</div>
                </div>
              </el-collapse-item>
              <el-collapse-item title="订单:154654654" name="3">
                <div class="order-title common">
                  <div class="id">货物ID</div>
                  <div class="name">名称</div>
                  <div class="type">类型</div>
                  <div class="num">数量</div>
                </div>
                <div class="info common">
                  <div class="id">416546465416</div>
                  <div class="name">水果</div>
                  <div class="type">LLC</div>
                  <div class="num">6666</div>
                </div>
                <div class="info common">
                  <div class="id">416546465416</div>
                  <div class="name">水果</div>
                  <div class="type">LLC</div>
                  <div class="num">6666</div>
                </div>
                <div class="info common">
                  <div class="id">416546465416</div>
                  <div class="name">水果</div>
                  <div class="type">LLC</div>
                  <div class="num">6666</div>
                </div>
                <div class="info common">
                  <div class="id">416546465416</div>
                  <div class="name">水果</div>
                  <div class="type">LLC</div>
                  <div class="num">6666</div>
                </div>
              </el-collapse-item>
              <el-collapse-item title="订单:154654654" name="4">
                <div class="order-title common">
                  <div class="id">货物ID</div>
                  <div class="name">名称</div>
                  <div class="type">类型</div>
                  <div class="num">数量</div>
                </div>
                <div class="info common">
                  <div class="id">416546465416</div>
                  <div class="name">水果</div>
                  <div class="type">LLC</div>
                  <div class="num">6666</div>
                </div>
                <div class="info common">
                  <div class="id">416546465416</div>
                  <div class="name">水果</div>
                  <div class="type">LLC</div>
                  <div class="num">6666</div>
                </div>
                <div class="info common">
                  <div class="id">416546465416</div>
                  <div class="name">水果</div>
                  <div class="type">LLC</div>
                  <div class="num">6666</div>
                </div>
                <div class="info common">
                  <div class="id">416546465416</div>
                  <div class="name">水果</div>
                  <div class="type">LLC</div>
                  <div class="num">6666</div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
          <div class="bottom-info">
            <span class="el-icon-time green">出发 2010-10-10 10:10</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import baiduMap from "@/config/js/initMap";
export default {
  name: "result",
  data() {
    return {
      input: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      activeNames: ""
    };
  },
  mounted() {
    this.$nextTick(() => {
      baiduMap.init().then(BMap => {
        console.log(BMap);
        setTimeout(() => {
          this.initMap(BMap);
        }, 1000);
      });
    });
  },
  methods: {
    initMap(BMap) {
      var map = new BMap.Map("container");
      // // 创建地图实例
      var point = new BMap.Point(114.00804, 22.543595);
      // // 创建点坐标
      map.enableScrollWheelZoom(true);
      map.centerAndZoom(point, 14);
      // // 初始化地图，设置中心点坐标和地图级别
    },
    handleChange() {}
  }
};
</script>
<style lang="scss">
$fontColor: #828282;
$fontGreen: #42b953;
$fontblue: #22acf2;
.result {
  height: 100%;
  display: flex;
  flex-direction: column;
  min-width: 1150px;
  .green {
    color: $fontGreen;
  }
  .blue {
    color: $fontblue;
  }
  .top {
    height: 60px;
    display: flex;
    color: $fontColor;
    font-size: 14px;
    align-items: center;
    .box {
      display: flex;
      margin: 0 20px;
      font-family: "Tahoma";
      .key {
        margin-right: 10px;
      }
      &:last-child {
        flex: 1;
        justify-content: flex-end;
      }
      &:nth-of-type(1) {
        .value {
          width: 100px;
          position: relative;
          input {
            transform: translateY(-18px);
            position: absolute;
            left: 0;
            top: 0;
            width: 100px;
            height: 30px;
          }
        }
      }
      button {
        padding: 4px 10px;
        margin: 0 20px;
        height: 30px;
        &:bth-of-type(1) {
          width: 150px;
        }
        &:bth-of-type(2) {
          width: 100px;
        }
        &:bth-of-type(3) {
          width: 100px;
        }
      }
    }
  }
  .map {
    flex: 1;
    position: relative;
    #container {
      width: 100%;
      height: 94%;
    }
    .slide {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 360px;
      height: 85%;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      padding: 20px;
      .selet {
        height: 50px;
        .el-select {
          width: 100%;
          height: 100%;
          .el-input {
            input {
              border: none;
              background-color: #edf6fd;
              color: $fontblue;
              font-weight: 650;
              text-align: center;
            }
          }
        }
      }
      .line {
        flex: 1;
        overflow: auto;
        text-align: left;
        color: $fontColor;
        .point {
          padding-left: 15px;
          padding-right: 10px;
          margin-left: 15px;
          border-left: 1px dashed #e0e0e0;
          .title {
            height: 20px;
            line-height: 20px;
            margin: 10px 0;
            padding-left: 20px;
            position: relative;
            .num {
              position: absolute;
              left: -26px;
              top: 0px;
              display: inline-block;
              width: 20px;
              height: 20px;
              border: 1px solid #e0e0e0;
              border-radius: 50%;
              line-height: 20px;
              text-align: center;
              background-color: #fff;
            }
          }
          .info {
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            display: flex;
            padding-left: 20px;
            span:first-child {
              width: 100px;
            }
            span:last-child {
              flex: 1;
              line-height: 40px;
              padding-right: 10px;
              text-align: right;
            }
          }
          .order {
            padding-left: 20px;
            .el-collapse-item__content,
            .el-collapse-item__header {
              color: $fontColor;
              padding-left: 20px;
            }
            .common {
              display: flex;
              text-align: center;
              .id {
                width: 100px;
              }
              .name,
              .type,
              .num {
                flex: 1;
              }
            }
            .info {
              padding-left: 0;
            }
          }
          .bottom-info {
            font-size: 14px;
            margin: 10px 0;
            text-align: right;
          }
        }
      }
    }
  }
}
</style>
