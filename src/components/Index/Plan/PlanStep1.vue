<template>
<div class="plan-step1">
  <div class="step">
    <div class="step1 active">1.选择订单列表</div>
    <div class="step2">2.优化目标 <span class="a"></span><span class="b"></span></div>
    <div class="step3">3.生成调度方案<span class="a"></span><span class="b"></span></div>
  </div>
  <div class="top">
    <div class="import">
      <el-button type="success" plain size = 'mini' icon="el-icon-download">导入</el-button>
    </div>
    <div class="export">
      <el-button type="primary" plain size = 'mini' icon="el-icon-upload2">导出</el-button>
    </div>
  </div>
  <div class="form" ref="formBox">
    <div class="title common">
      <div class="all"><el-checkbox v-model="checked">全选</el-checkbox></div>
      <div class="id">订单ID <span class="el-icon-search"></span></div>
      <div class="time">
        <label for="date-picker">
          订单时间 <span class="el-icon-date"></span>
        </label>
        <el-date-picker
          id="date-picker"
          v-model="value1"
          type="date"
          style="display:none"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <div class="status">未调度 <span class="el-icon-arrow-down"></span></div>
      <div class="start-id">装货点编号 <span class="el-icon-search"></span></div>
      <div class="end-id">配送点编号 <span class="el-icon-search"></span></div>
      <div class="num">总件数</div>
      <div class="weight">总重量(kg)</div>
      <div class="volume">总体积(m³)</div>
      <div class="start-time-range">装货浮动时间范围</div>
      <div class="start-time">装货时长</div>
      <div class="end-time-range">卸货浮动时间范围</div>
      <div class="end-time">卸货时长</div>
      <div class="edit-box"></div>
    </div>
    <div class="box" ref="box">
      <div class="box-main common">
        <div class="all"><el-checkbox v-model="checked"></el-checkbox></div>
        <div class="id">284646654654654</div>
        <div class="time">2018-03-06</div>
        <div class="status green">未调度</div>
        <div class="start-id">szfdc</div>
        <div class="end-id">1030</div>
        <div class="num">666</div>
        <div class="weight">666</div>
        <div class="volume">666</div>
        <div class="start-time-range">±30</div>
        <div class="start-time">66</div>
        <div class="end-time-range">±30</div>
        <div class="end-time">66</div>
        <div class="edit-box">
          <div class="edit el-icon-edit-outline"></div>
          <div class="delete el-icon-delete"></div>
          <div class="arrow el-icon-arrow-down" @click="slide()"></div>
        </div>
      </div>
      <transition name="slide">
        <div class="box-detial" v-show="box">
          <div class="goodInfo-common">
            <div class="number"><span>1</span></div>
            <div class="goodsId">货物ID:464846</div>
            <div class="goodsName">货物名称:苹果</div>
            <div class="goodsType">货物类型:Lg</div>
            <div class="goodsNum">货物数量:200件</div>
            <!-- <div class="edit-box">
              <div class="edit el-icon-edit-outline"></div>
              <div class="delete el-icon-delete"></div>
              <div class="arrow"></div>
            </div> -->
          </div>
          <div class="goodInfo-common">
            <div class="number"><span>1</span></div>
            <div class="goodsId">货物ID:464846</div>
            <div class="goodsName">货物名称:苹果</div>
            <div class="goodsType">货物类型:Lg</div>
            <div class="goodsNum">货物数量:200件</div>
            <!-- <div class="edit-box">
              <div class="edit el-icon-edit-outline"></div>
              <div class="delete el-icon-delete"></div>
              <div class="arrow"></div>
            </div> -->
          </div>
        </div>
      </transition>
    </div>
    <div class="box" ref="box">
      <div class="box-main common couple">
        <div class="all"><el-checkbox v-model="checked"></el-checkbox></div>
        <div class="id">284646654654654</div>
        <div class="time">2018-03-06</div>
        <div class="status green">未调度</div>
        <div class="start-id">szfdc</div>
        <div class="end-id">1030</div>
        <div class="num">666</div>
        <div class="weight">666</div>
        <div class="volume">666</div>
        <div class="start-time-range">±30</div>
        <div class="start-time">66</div>
        <div class="end-time-range">±30</div>
        <div class="end-time">66</div>
        <div class="edit-box couple">
          <div class="edit el-icon-edit-outline"></div>
          <div class="delete el-icon-delete"></div>
          <div class="arrow el-icon-arrow-down" @click="slide()"></div>
        </div>
      </div>
      <transition name="slide">
        <div class="box-detial" v-show="box">
          <div class="goodInfo-common">
            <div class="number"><span>1</span></div>
            <div class="goodsId">货物ID:464846</div>
            <div class="goodsName">货物名称:苹果</div>
            <div class="goodsType">货物类型:Lg</div>
            <div class="goodsNum">货物数量:200件</div>
            <!-- <div class="edit-box">
              <div class="edit el-icon-edit-outline"></div>
              <div class="delete el-icon-delete"></div>
              <div class="arrow"></div>
            </div> -->
          </div>
          <div class="goodInfo-common">
            <div class="number"><span>1</span></div>
            <div class="goodsId">货物ID:464846</div>
            <div class="goodsName">货物名称:苹果</div>
            <div class="goodsType">货物类型:Lg</div>
            <div class="goodsNum">货物数量:200件</div>
            <!-- <div class="edit-box">
              <div class="edit el-icon-edit-outline"></div>
              <div class="delete el-icon-delete"></div>
              <div class="arrow"></div>
            </div> -->
          </div>
        </div>
      </transition>
    </div>
    <div class="box" ref="box">
      <div class="box-main common couple">
        <div class="all"><el-checkbox v-model="checked"></el-checkbox></div>
        <div class="id">284646654654654</div>
        <div class="time">2018-03-06</div>
        <div class="status green">未调度</div>
        <div class="start-id">szfdc</div>
        <div class="end-id">1030</div>
        <div class="num">666</div>
        <div class="weight">666</div>
        <div class="volume">666</div>
        <div class="start-time-range">±30</div>
        <div class="start-time">66</div>
        <div class="end-time-range">±30</div>
        <div class="end-time">66</div>
        <div class="edit-box couple">
          <div class="edit el-icon-edit-outline"></div>
          <div class="delete el-icon-delete"></div>
          <div class="arrow el-icon-arrow-down" @click="slide()"></div>
        </div>
      </div>
      <transition name="slide">
        <div class="box-detial" v-show="box">
          <div class="goodInfo-common">
            <div class="number"><span>1</span></div>
            <div class="goodsId">货物ID:464846</div>
            <div class="goodsName">货物名称:苹果</div>
            <div class="goodsType">货物类型:Lg</div>
            <div class="goodsNum">货物数量:200件</div>
            <!-- <div class="edit-box">
              <div class="edit el-icon-edit-outline"></div>
              <div class="delete el-icon-delete"></div>
              <div class="arrow"></div>
            </div> -->
          </div>
          <div class="goodInfo-common">
            <div class="number"><span>1</span></div>
            <div class="goodsId">货物ID:464846</div>
            <div class="goodsName">货物名称:苹果</div>
            <div class="goodsType">货物类型:Lg</div>
            <div class="goodsNum">货物数量:200件</div>
            <!-- <div class="edit-box">
              <div class="edit el-icon-edit-outline"></div>
              <div class="delete el-icon-delete"></div>
              <div class="arrow"></div>
            </div> -->
          </div>
        </div>
      </transition>
    </div>
    <div class="box" ref="box">
      <div class="box-main common couple">
        <div class="all"><el-checkbox v-model="checked"></el-checkbox></div>
        <div class="id">284646654654654</div>
        <div class="time">2018-03-06</div>
        <div class="status green">未调度</div>
        <div class="start-id">szfdc</div>
        <div class="end-id">1030</div>
        <div class="num">666</div>
        <div class="weight">666</div>
        <div class="volume">666</div>
        <div class="start-time-range">±30</div>
        <div class="start-time">66</div>
        <div class="end-time-range">±30</div>
        <div class="end-time">66</div>
        <div class="edit-box couple">
          <div class="edit el-icon-edit-outline"></div>
          <div class="delete el-icon-delete"></div>
          <div class="arrow el-icon-arrow-down" @click="slide()"></div>
        </div>
      </div>
      <transition name="slide">
        <div class="box-detial" v-show="box">
          <div class="goodInfo-common">
            <div class="number"><span>1</span></div>
            <div class="goodsId">货物ID:464846</div>
            <div class="goodsName">货物名称:苹果</div>
            <div class="goodsType">货物类型:Lg</div>
            <div class="goodsNum">货物数量:200件</div>
            <!-- <div class="edit-box">
              <div class="edit el-icon-edit-outline"></div>
              <div class="delete el-icon-delete"></div>
              <div class="arrow"></div>
            </div> -->
          </div>
          <div class="goodInfo-common">
            <div class="number"><span>1</span></div>
            <div class="goodsId">货物ID:464846</div>
            <div class="goodsName">货物名称:苹果</div>
            <div class="goodsType">货物类型:Lg</div>
            <div class="goodsNum">货物数量:200件</div>
            <!-- <div class="edit-box">
              <div class="edit el-icon-edit-outline"></div>
              <div class="delete el-icon-delete"></div>
              <div class="arrow"></div>
            </div> -->
          </div>
        </div>
      </transition>
    </div>
  </div>
  <div class="bottom">
    <div class="btn"><el-button type="primary" round @click="goto('/index/planstep2')">选择计算方式</el-button></div>
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
  name: "order",
  data() {
    return {
      box: true,
      checked: false,
      value1: ""
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
      this.$refs.formBox.onscroll = e => {
        this.resetEditBox();
        // console.log(this.$refs.form.scrollLeft);
      };
    });
  },
  methods: {
    initStyle() {
      var elMainBoxHeight = this.elMainBox.offsetHeight;
      this.$refs.formBox.style.height = elMainBoxHeight * 0.7 + "px";
    },
    resetEditBox() {
      var editBox = document.querySelectorAll(".edit-box");
      var formBoxWidth = this.$refs.formBox.offsetWidth;
      var scrollLeft = this.$refs.formBox.scrollLeft + formBoxWidth - 200;
      var boxWidth = this.$refs.box.scrollWidth;
      // console.log(scrollLeft);
      if (this.$refs.formBox.scrollLeft >= boxWidth - formBoxWidth) {
        editBox.forEach(element => {
          element.style.left = boxWidth - 200 + "px";
        });
        return;
      }
      editBox.forEach(element => {
        element.style.left = scrollLeft + "px";
      });
    },
    slide() {
      this.box = !this.box;
    },
    goto(path) {
      this.$router.push(path);
    }
  }
};
</script>
<style lang="scss">
$fontColor: #828282;
$fontGreen: #22acf2;
.plan-step1 {
  height: 100%;
  display: flex;
  flex-direction: column;
  .step {
    height: 40px;
    margin-bottom: 20px;
    display: flex;
    text-align: left;
    line-height: 40px;
    text-indent: 40px;
    > div {
      flex: 1;
      background-color: #edf6fd;
      color: $fontGreen;
      height: 40px;
      margin: 0 -1px;
      position: relative;
      &::after {
        content: "";
        display: inline-block;
        width: 0;
        height: 0;
        border-width: 10px;
        border-style: solid;
        border-color: #fff #fff transparent transparent;
        position: absolute;
        right: 0;
        top: 0;
      }
      &::before {
        content: "";
        display: inline-block;
        width: 0;
        height: 0;
        border-width: 10px;
        border-style: solid;
        border-color: transparent #fff #fff transparent;
        position: absolute;
        right: 0;
        bottom: 0;
      }
      .a {
        display: inline-block;
        width: 0;
        height: 0;
        border-width: 10px;
        border-style: solid;
        border-color: transparent transparent #fff #fff;
        position: absolute;
        top: 0;
        left: 0;
      }
      .b {
        display: inline-block;
        width: 0;
        height: 0;
        border-width: 10px;
        border-style: solid;
        border-color: #fff transparent transparent #fff;
        position: absolute;
        bottom: 0;
        left: 0;
      }
      &.active {
        background: linear-gradient(to right, #0092ff, #00c2ff);
        color: #fff;
      }
    }
  }
  .top {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
    > div {
      margin: 0 10px;
    }
    .import,
    .export {
      button {
        border-radius: 20px;
      }
    }
    .export {
      margin-right: 30px;
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
      .time {
        width: 200px;
      }
      .status {
        width: 150px;
      }
      .start-id {
        width: 150px;
      }
      .end-id {
        width: 100px;
      }
      .num {
        width: 100px;
      }
      .weight {
        width: 100px;
      }
      .volume {
        width: 100px;
      }
      .start-time-range {
        width: 150px;
      }
      .start-time {
        width: 150px;
      }
      .end-time-range {
        width: 150px;
      }
      .end-time {
        width: 150px;
      }
    }
    .title {
      height: 50px;
      width: 2000px;
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
      }
    }
    .box {
      width: 2000px;
      // padding-top: 50px;
      // height: 2000px;
      .goodInfo-common {
        display: flex;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 13px;
        // margin-left: 30px;
        padding-left: 60px;
        border-bottom: 1px solid #e5e5e5;
        .number {
          width: 100px;
          span {
            display: inline-block;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: #edf6fb;
            line-height: 30px;
            color: #08a2ed;
          }
        }
        .goodsId {
          width: 200px;
        }
        .goodsName {
          width: 200px;
        }
        .goodsType {
          width: 200px;
        }
        .goodsNum {
          width: 200px;
        }
        .edit-box {
          background-color: #fff;
          width: 200px;
          height: 50px;
          position: absolute;
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
          left: 300px;
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
    position: relative;
    .page {
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
}
</style>
