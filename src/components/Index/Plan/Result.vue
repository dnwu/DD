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
        <el-select v-model="car" @change='carChange' placeholder="全部路线">
          <el-option
            v-for="item in planList"
            :key="item.car_id"
            :label="item.car_id"
            :value="item.car_id">
          </el-option>
        </el-select>
      </div>
      <div class="line form" ref="form" v-if="true">
        <div class="point" v-for="(item,index) in planListInfo" :key="index">
          <div class="title">{{item.placeInfo.placeName}}
            <span class="num">{{index+1}}</span>
          </div>
          <div class="info">
            <span>装货量:{{item.burden}}t</span>
            <span class="el-icon-time" v-if="index === 0">装货 {{item.lettime}}</span>
            <span class="el-icon-time blue" v-else>到达 {{item.lettime}}</span>
          </div>
          <div class="order">
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item v-for="(e,i) in item.orderInfo" :key="i" :title="'订单:'+e.orderId" :name="e.orderId" >
                <div class="order-title common">
                  <div class="id">货物ID</div>
                  <div class="name">名称</div>
                  <div class="type">类型</div>
                  <div class="num">数量</div>
                </div>
                <div class="info common" v-for="(_e,_i) in e.stockInfo" :key="_i">
                  <div class="id">{{_e.stock_id}}</div>
                  <div class="name">{{_e.stock_name}}</div>
                  <div class="type">{{_e.stock_type_code}}</div>
                  <div class="num">{{_e.stock_number}}</div>
                </div>
              </el-collapse-item>

            </el-collapse>
          </div>
          <div class="bottom-info">
            <span v-if="index == planListInfoLength-1"></span>
            <span class="el-icon-time green" v-else>出发 {{item.arrtime}}</span>
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
      map: null,
      BMap: null,
      planList: [
        {
          car_id: "全部线路"
        }
      ],
      planListAll: [],
      planListInfo: [],
      planListInfoLength: 0,
      input: "",
      car: "",
      activeNames: "",
      schemeId: ''
    };
  },
  mounted() {
    this.schemeId = window.sessionStorage.getItem('schemeId')
    this.$nextTick(() => {
      baiduMap.init().then(BMap => {
        // console.log(BMap);
        this.BMap = BMap;
        setTimeout(() => {
          this.initMap(this.BMap);
        }, 1000);
      });
      this.initFormHeight();
      window.onresize = () => {
        // console.log("滚动了");
        this.initFormHeight();
      };
    });
  },
  methods: {
    initMap(BMap) {
      this.map = new BMap.Map("container");
      // // 创建地图实例
      var point = new BMap.Point(114.00804, 22.543595);
      // // 创建点坐标
      this.map.enableScrollWheelZoom(true);
      this.map.centerAndZoom(point, 14);
      // // 初始化地图，设置中心点坐标和地图级别
      this.getPlan();
    },
    initFormHeight() {
      let mapHeight = document.querySelector(".map").offsetHeight;
      this.$refs.form.style.height = mapHeight * 0.9 - 100 + "px";
      // console.log(this.$refs.form.style.height);
    },
    carChange(e) {
      // console.log(this.car);
      this.map.clearOverlays();
      if (e === "全部线路") {
        this.drawAllLine(this.planListAll);
        return;
      }
      this.planList.forEach((ele, index) => {
        if (ele.car_id === e) {
          // console.log(ele);
          this.planListInfo = ele.place;
          this.planListInfoLength = ele.place.length;
          this.drawLine(this.map, ele.place, true, this.BMap);
        }
      });
    },
    handleChange(e) {
      // console.log(this.activeNames);
      // console.log(e);
    },
    getPlan() {
      this.axios
        .get("/web-schedul/service/scheme/getRouteInfo", {
          params: {
            schemeId: this.schemeId
          }
        })
        .then(data => {
          console.log('mapppp', data);
          this.planList.push(...data.data.routeInfo);
          this.planListAll = data.data.routeInfo;
          this.planListInfo = data.data.routeInfo[0].place;
          // this.car = data.data.routeInfo[0].car_id;
          this.planListInfoLength = data.data.routeInfo[0].place.length;
          console.log(this.planList);
          this.drawAllLine(this.planListAll);
        });
    },
    drawAllLine(data) {
      data.forEach((ele, index) => {
        if (index === 0) {
          this.drawLine(this.map, ele.place, true, this.BMap);
        } else {
          this.drawLine(this.map, ele.place, true, this.BMap);
        }
      });
    },
    drawLine(map, places, active, BMap) {
      let length = places.length;
      // eslint-disable-next-line
      var start = new BMap.Point(
        places[0].placeInfo.lon,
        places[0].placeInfo.lat
      );
      // eslint-disable-next-line
      var end = new BMap.Point(
        places[length - 1].placeInfo.lon,
        places[length - 1].placeInfo.lat
      );
      var waypoints = [];
      places.forEach((ele, index) => {
        if (index !== 0 && index !== length - 1) {
          var point = new BMap.Point(ele.placeInfo.lon, ele.placeInfo.lat);
          waypoints.push(point);
        }
      });

      // eslint-disable-next-line
      var driving = new BMap.DrivingRoute(map, {
        renderOptions: { map: map, autoViewport: true }
      });
      driving.search(start, end, {
        waypoints: waypoints
      }); // waypoints表示途经点
      driving.setPolylinesSetCallback(function(lines) {
        lines[0]._marker = "self";
        lines[0].getPolyline().setStrokeOpacity(1);
        if (active) {
          lines[0].getPolyline().setStrokeColor("#00BD00");
          // console.log(lines[0].getPolyline());
        } else {
          lines[0].getPolyline().setStrokeColor("#B8B8B8");
        }
        lines[0].getPolyline().setStrokeWeight(8);
      });
      // console.log(driving);
      // driving.addEventListener('click',() => {
      //   console.log('点击了driving');
      // })

      map.addEventListener("click", e => {
        // console.log('点击了map');
        // alert("点击坐标: " + e.point.lng + ", " + e.point.lat);
        // console.log(e.point);
        // console.log(e.type);
        // console.log(e.target);
        // console.log(e.pixel);
        // console.log(e.overlay);
      });
    }
  }
};
</script>
<style lang="scss">
$fontColor: #828282;
$fontGreen: #42b953;
$fontblue: #22acf2;
.result {
  position: absolute;
  width: 100%;
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
      // height: 85%;
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
        // flex: 1;
        // height: 80%;
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
