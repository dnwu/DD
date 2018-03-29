<template>
<div class="list">
  <div class="top">
    <div class="add-order">
      <el-button type="primary" icon="el-icon-plus" @click="goTo('/index/planStep1')">新建调度方案</el-button>
    </div>
  </div>
  <div class="form" ref="form">
    <div class="title common">
      <div class="name">调度方案名称<span class="el-icon-search"></span></div>
      <div class="time">时间<span class="el-icon-search"></span></div>
      <div class="target">优化目标<span class="el-icon-arrow-down"></span></div>
      <div class="all-pay">总费用(元)</div>
      <div class="mileage">总里程(km)</div>
      <div class="carNum">车辆数</div>
      <div class="status">状态<span class="el-icon-arrow-down"></span></div>
      <div class="change-num">迭代次数</div>
      <div class="change-time">迭代时间(min)</div>
      <div class="edit-box"></div>
    </div>
    <div class="box" ref="box">
      <div class="box-main common">
        <div class="name">284646654654654</div>
        <div class="time">2018-03-06</div>
        <div class="target">未调度</div>
        <div class="all-pay">szfdc</div>
        <div class="mileage">666</div>
        <div class="carNum">666</div>
        <div class="status">666</div>
        <div class="change-num">666</div>
        <div class="change-time">666</div>
        <div class="edit-box">
          <div class="edit el-icon-edit-outline"></div>
          <div class="delete el-icon-delete"></div>
        </div>
      </div>
    </div>
    <div class="box" ref="box">
      <div class="box-main common couple">
        <div class="name">284646654654654</div>
        <div class="time">2018-03-06</div>
        <div class="target">未调度</div>
        <div class="all-pay">szfdc</div>
        <div class="mileage">666</div>
        <div class="carNum">666</div>
        <div class="status">666</div>
        <div class="change-num">666</div>
        <div class="change-time">666</div>
        <div class="edit-box couple">
          <div class="edit el-icon-edit-outline"></div>
          <div class="delete el-icon-delete"></div>
        </div>
      </div>
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
  data() {
    return {};
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
    },
    goTo(path) {
      this.$router.push("/index/planStep1");
    }
  }
};
</script>
<style lang="scss">
@import url("../../../config/css/scroll.scss");

$fontColor: #828282;
$fontGreen: #22acf2;
.list {
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
    .add-order {
      button {
        border-radius: 20px;
      }
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
      .name {
        width: 200px;
      }
      .time {
        width: 200px;
      }
      .target {
        width: 150px;
      }
      .all-pay {
        width: 150px;
      }
      .mileage {
        width: 150px;
      }
      .carNum {
        width: 150px;
      }
      .status {
        width: 150px;
      }
      .change-num {
        width: 150px;
      }
      .change-time {
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
        // border-bottom: 1px solid #e5e5e5;
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
