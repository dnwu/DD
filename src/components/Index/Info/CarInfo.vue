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
    <div class="box" ref="box">
      <div class="box-main common">
        <div class="all"><el-checkbox v-model="checked"></el-checkbox></div>
        <div class="id">284646654654654</div>
        <div class="start-position">2018-03-06</div>
        <div class="return-position green">未调度</div>
        <div class="car-num">szfdc</div>
        <div class="car-type">1030</div>
        <div class="size">666</div>
        <div class="rate">666</div>
        <div class="cost">666</div>
        <div class="cost-per">±30</div>
        <div class="edit-box">
          <div class="edit el-icon-edit-outline"></div>
          <div class="delete el-icon-delete"></div>
          <div class="arrow el-icon-arrow-down" @click="slide()"></div>
        </div>
      </div>
      <transition name="slide">
        <div class="box-detial" v-show="box">
          <div class="goodInfo-common">
            <div class="row">
              <div>固定载重(kg):/</div>
              <div>装载速度(按件):5min/件</div>
              <div>回程每公里成本:5.63</div>
            </div>
            <div class="row">
              <div>额定体积(m³):/</div>
              <div>装载速度(按吨):5min/t</div>
              <div>每小时成本:520.63</div>
            </div>
            <div class="row">
              <div>额定件数(件):250</div>
              <div>装货速度(按立方米):5min/m³</div>
              <div>多点操作费:/</div>
            </div>
            <div class="row">
              <div>最大送货点数:10</div>
              <div>卸货速度(按件):5</div>
              <div>弹性件数:/</div>
            </div>
            <div class="row">
              <div>工作时长:8h</div>
              <div>卸货速度(按吨):/</div>
              <div>弹性重量:/</div>
            </div>
            <div class="row">
              <div>行驶速度:50km/h</div>
              <div>卸货速度(按立方米):/</div>
              <div>弹性体积:/</div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="box" ref="box">
      <div class="box-main common couple">
        <div class="all"><el-checkbox v-model="checked"></el-checkbox></div>
        <div class="id">284646654654654</div>
        <div class="start-position">2018-03-06</div>
        <div class="return-position green">未调度</div>
        <div class="car-num">szfdc</div>
        <div class="car-type">1030</div>
        <div class="size">666</div>
        <div class="rate">666</div>
        <div class="cost">666</div>
        <div class="cost-per">±30</div>
        <div class="edit-box couple">
          <div class="edit el-icon-edit-outline"></div>
          <div class="delete el-icon-delete"></div>
          <div class="arrow el-icon-arrow-down" @click="slide()"></div>
        </div>
      </div>
      <transition name="slide">
        <div class="box-detial" v-show="box">
          <div class="goodInfo-common">
            <div class="row">
              <div>固定载重(kg):/</div>
              <div>装载速度(按件):5min/件</div>
              <div>回程每公里成本:5.63</div>
            </div>
            <div class="row">
              <div>额定体积(m³):/</div>
              <div>装载速度(按吨):5min/t</div>
              <div>每小时成本:520.63</div>
            </div>
            <div class="row">
              <div>额定件数(件):250</div>
              <div>装货速度(按立方米):5min/m³</div>
              <div>多点操作费:/</div>
            </div>
            <div class="row">
              <div>最大送货点数:10</div>
              <div>卸货速度(按件):5</div>
              <div>弹性件数:/</div>
            </div>
            <div class="row">
              <div>工作时长:8h</div>
              <div>卸货速度(按吨):/</div>
              <div>弹性重量:/</div>
            </div>
            <div class="row">
              <div>行驶速度:50km/h</div>
              <div>卸货速度(按立方米):/</div>
              <div>弹性体积:/</div>
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
        :total="1000">
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
      box: true
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.elMainBox = document.querySelector(".el-main");
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
  },
  methods: {
    slide() {
      this.box = !this.box;
    },
    initStyle() {
      var elMainBoxHeight = this.elMainBox.offsetHeight;
      this.$refs.form.style.height = elMainBoxHeight * 0.7 + "px";
    },
    resetEditBox() {
      var editBox = document.querySelectorAll(".edit-box");
      var formBoxWidth = this.$refs.form.offsetWidth;
      var scrollLeft = this.$refs.form.scrollLeft + formBoxWidth - 200;
      var boxWidth = this.$refs.box.scrollWidth;
      // console.log(scrollLeft);
      if (this.$refs.form.scrollLeft >= boxWidth - formBoxWidth) {
        editBox.forEach(element => {
          element.style.left = boxWidth - 200 + "px";
        });
        return;
      }
      editBox.forEach(element => {
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
      // width: 2000px;
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
  .bottom{
    margin-top: 30px;
    display: flex;
    justify-content: flex-end;
    .page{
      width: 666px;
    }
  }
}
</style>
