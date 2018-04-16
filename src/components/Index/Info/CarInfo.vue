<template>
<div class="carInfo">
  <div class="top">
    <div class="import">
      <el-button type="success" plain size = 'mini' icon="el-icon-download">导入</el-button>
    </div>
    <div class="export">
      <el-button type="primary" plain size = 'mini' icon="el-icon-upload2">导出</el-button>
    </div>
    <div class="add-order">
      <el-button type="primary" size = 'mini' icon="el-icon-plus">新增车辆</el-button>
    </div>
  </div>
  <div class="form" ref="form">
    <div class="title common">
      <div class="all"><el-checkbox v-model="checked">全选</el-checkbox></div>
      <div class="id">车辆ID <span class="el-icon-search"></span></div>
      <div class="start-position">初始位置<span class="el-icon-search"></span></div>
      <div class="return-position">返回位置 <span class="el-icon-search"></span></div>
      <div class="car-num">车型编号 <span class="el-icon-arrow-down"></span></div>
      <div class="car-type">车辆类型</div>
      <div class="size">长宽高(cm)</div>
      <div class="rate">最低装载率</div>
      <div class="cost">启动成本(元)</div>
      <div class="cost-per">每公里成本(元)</div>
      <div class="edit-box"></div>
    </div>
    <div class="box" ref="box" v-for="(item,index) in carInfoList" :key="index">
      <div class="box-main common" :class="index%2 == 0?'':'couple'">
        <div class="all"><el-checkbox v-model="item._checked"></el-checkbox></div>
        <div class="id">{{item.car_id}}</div>
        <div class="start-position">{{item.start_adress}}</div>
        <div class="return-position">{{item.return_adress}}</div>
        <div class="car-num">{{item.type}}</div>
        <div class="car-type">{{item.stock_type_code}}</div>
        <div class="size">{{`${item.length}*${item.width}*${item.height}`}}</div>
        <div class="rate">{{item.lowest_load_rate}}</div>
        <div class="cost">{{item.launch_cost}}</div>
        <div class="cost-per">{{item.perkm_cost}}</div>
        <div class="edit-box" :class="index%2 == 0?'':'couple'">
          <div class="edit el-icon-edit-outline"></div>
          <div class="delete el-icon-delete" @click="deleteCar(item.car_id)"></div>
          <div class="arrow el-icon-arrow-down" @click="slide(index)"></div>
        </div>
      </div>
      <transition name="slide">
        <div class="box-detial" v-show="item._open">
          <div class="goodInfo-common">
            <div class="row">
              <div>额定载重(kg):{{item.car_load}}</div>
              <div>装载速度(按件):{{item.loading_speed_unit=='min/件'?`${item.loading_speed}min/件`:'/min/件'}}</div>
              <div>回程每公里成本:{{item.return_perkm_cost}}</div>
            </div>
            <div class="row">
              <div>额定体积(m³):{{item.volume}}</div>
              <div>装载速度(按吨):{{item.loading_speed_unit=='min/t'?`${item.loading_speed}min/t`:'/min/t'}}</div>
              <div>每小时成本:{{item.perhour_cost}}</div>
            </div>
            <div class="row">
              <div>额定件数(件):{{item.rated_quantity}}</div>
              <div>装货速度(按立方米):{{item.loading_speed_unit=='min/立方米'?`${item.loading_speed}min/立方米`:'/min/立方米'}}</div>
              <div>多点操作费:{{item.many_point_cost}}</div>
            </div>
            <div class="row">
              <div>最大送货点数:{{item.delivery_point_restriction}}</div>
              <div>卸货速度(按件):{{item.unloading_speed_unit=='min/件'?`${item.unloading_speed}min/件`:'/min/件'}}</div>
              <div>弹性件数:{{item.elastic_piece}}</div>
            </div>
            <div class="row">
              <div>工作时长:{{item.working_time}}h</div>
              <div>卸货速度(按吨):{{item.unloading_speed_unit=='min/t'?`${item.unloading_speed}min/t`:'/min/t'}}</div>
              <div>弹性重量:{{item.elastic_weight}}</div>
            </div>
            <div class="row">
              <div>行驶速度:{{item.speed}}km/h</div>
              <div>卸货速度(按立方米):{{item.unloading_speed_unit=='min/立方米'?`${item.unloading_speed}min/立方米`:'/min/立方米'}}</div>
              <div>弹性体积:{{item.elastic_volume}}</div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
  <div class="bottom">
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change = "currentChange"
        :total="total">
      </el-pagination>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: "Carinfo",
  data() {
    return {
      checked: false,
      box: true,
      carInfoList: [],
      total: 10
    };
  },
  created() {
    this.getCarInfoList("1");
  },
  mounted() {},
  methods: {
    getCarInfoList(currentPage) {
      this.axios
        .get("/web-schedul/service/info/listCarByPage", {
          params: {
            currentPage: currentPage,
            pageSize: "10"
          }
        })
        .then(data => {
          console.log(data.data.page);
          this.carInfoList = data.data.page.recordList;
          this.carInfoList.forEach(ele => {
            this.$set(ele, "_checked", false);
            this.$set(ele, "_open", false);
          });

          this.$nextTick(() => {
            this.elMainBox = document.querySelector(".el-main");
            this.editBox = document.querySelectorAll(".edit-box");
            this.initStyle();
            this.resetEditBox();
            window.onresize = () => {
              this.initStyle();
              this.resetEditBox();
            };
            this.$refs.form.onscroll = e => {
              this.resetEditBox();
              // console.log(this.$refs.form.scrollLeft);
            };
          });
        });
    },
    deleteCar(id) {
      console.log(id);
      this.axios.get("/web-schedul/service/info/deleteCar", {
        params: {
          carId: id
        }
      }).then(data => {
        this.getCarInfoList(1);
      })
    },
    currentChange(e) {
      this.getCarInfoList(e);
    },
    slide(index) {
      this.carInfoList[index]._open = !this.carInfoList[index]._open;
    },
    initStyle() {
      var elMainBoxHeight = this.elMainBox.offsetHeight;
      this.$refs.form.style.height = elMainBoxHeight * 0.7 + "px";
    },
    resetEditBox() {
      var formBoxWidth = this.$refs.form.offsetWidth;
      var scrollLeft = this.$refs.form.scrollLeft + formBoxWidth - 200;
      var boxWidth = this.$refs.box[0].offsetWidth;
      // console.log('boxWidth',boxWidth);
      if (this.$refs.form.scrollLeft >= boxWidth - formBoxWidth) {
        this.editBox.forEach(element => {
          element.style.left = boxWidth - 200 + "px";
        });
        return;
      }
      this.editBox.forEach(element => {
        element.style.left = scrollLeft + "px";
      });
    }
  }
};
</script>
<style lang="scss" scoped>
$fontColor: #828282;
$fontGreen: #22acf2;
.carInfo {
  height: 100%;
  display: flex;
  flex-direction: column;
  .top {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
    > div {
      margin: 0 10px;
    }
    .import,
    .export,
    .add-order {
      button {
        border-radius: 20px;
      }
    }
    .export {
    }
    .add-order {
      margin-right: 40px;
    }
  }
  .form {
    flex: 1;
    width: 100%;
    position: relative;
    color: $fontColor;
    overflow: auto;
    .common {
      display: flex;
      height: 50px;
      line-height: 50px;
      .all {
        width: 100px;
      }
      .id {
        width: 200px;
      }
      .start-position {
        width: 200px;
      }
      .return-position {
        width: 150px;
      }
      .car-num {
        width: 150px;
      }
      .car-type {
        width: 100px;
      }
      .size {
        width: 100px;
      }
      .rate {
        width: 100px;
      }
      .cost {
        width: 100px;
      }
      .cost-per {
        width: 150px;
      }
    }
    .title {
      height: 50px;
      // width: 2000px;
      min-width: 1523px;
      background-color: skyblue;
      position: relative;
      top: 0;
      background-color: #edf6fb;
      color: $fontGreen;
      font-size: 14px;
      .edit-box {
        background-color: #edf6fc;
        width: 200px;
        height: 50px;
        position: absolute;
        right: 0;
      }
    }
    .box {
      // width: 1523px;
      min-width: 1523px;
      // padding-top: 50px;
      // height: 2000px;
      .goodInfo-common {
        line-height: 50px;

        font-size: 13px;
        text-align: left;
        margin-left: 200px;
        // padding-left: 60px;
        .row {
          display: flex;
          > div {
            width: 300px;
          }
        }
      }
      .box-main {
        border-bottom: 1px solid #e5e5e5;
        font-size: 14px;
        position: relative;
        .edit-box {
          background-color: #fff;
          width: 200px;
          height: 50px;
          position: absolute;
          // left: 300px;
          right: 0;
          display: flex;
          > div {
            height: 50px;
            flex: 1;
            line-height: 50px;
            font-size: 20px;
            color: #b8b8b8;
            cursor: pointer;
            margin: 0 10px;
          }
          &.couple {
            background-color: #edf6fd;
          }
        }
      }
      .couple {
        background-color: #edf6fd;
      }
      .box-detial {
        height: 300px;
      }
      .slide--enter-active,
      .slide-leave-active {
        transition: height 0.05s;
      }
      .slide-enter,
      .slide-leave-to {
        height: 0;
      }
    }
  }
  .bottom {
    margin-top: 30px;
    display: flex;
    justify-content: flex-end;
    .page {
      width: 666px;
    }
  }
}
</style>
