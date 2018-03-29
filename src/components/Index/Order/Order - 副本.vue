<template>
<div class="order">
  <div class="top">
    <div class="import">
      <el-button type="success" plain size = 'mini' icon="el-icon-download">导入</el-button>
    </div>
    <div class="export">
      <el-button type="primary" plain size = 'mini' icon="el-icon-upload2">导出</el-button>
    </div>
    <div class="add-order">
      <el-button type="primary" size = 'mini' icon="el-icon-plus">新增订单</el-button>
    </div>
  </div>
  <div class="form" ref="form">
    <EasyScrollbar :barOption="myBarOption">
      <div class="wrapper" ref="wrapper">
        <div class="contain" ref="contain">
          <div class="title common">
            <div class="all">全选</div>
            <div class="id">订单ID</div>
            <div class="time">订单时间</div>
            <div class="status">未调度</div>
            <div class="start-id">装货点编号</div>
            <div class="end-id">配送点编号</div>
            <div class="num">总件数</div>
            <div class="weight">总重量(kg)</div>
            <div class="volume">总体积(m³)</div>
            <div class="start-time-range">装货浮动时间范围</div>
            <div class="start-time">装货时长</div>
            <div class="end-time-range">卸货浮动时间范围</div>
            <div class="end-time">卸货时长</div>
            <div class="edit-box"></div>
          </div>
          <div class="box">
            <div class="box-main common">
              <div class="all"></div>
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
                <div class="arrow el-icon-arrow-down" ></div>
              </div>
            </div>
            <div class="box-detial">
              <div class="box-detial goodInfo-common">
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
              <div class="box-detial goodInfo-common">
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
          </div>
        </div>
      </div>
    </EasyScrollbar>
  </div>
</div>
</template>
<script>
export default {
  name: "order",
  data() {
    return {
      myBarOption: {
        barWidth: 10
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.elMainBox = document.querySelector(".el-main");
      this.scroll = document.querySelector('.easy-scrollbar')
      this.initStyle();
      window.onresize = () => {
        this.initStyle();
      };
      console.log(this.$refs.contain);
      this.$refs.contain.onscroll = e => {
        console.log(e);
      };
    });
  },
  methods: {
    initStyle() {
      var formBoxWidth = this.$refs.form.offsetWidth;
      var elMainBoxHeight = this.elMainBox.offsetHeight;
      var editBox = document.querySelectorAll(".edit-box");
      this.$refs.wrapper.style.height = elMainBoxHeight * 0.7 + "px";
      console.log(editBox[0]);
      editBox.forEach(element => {
        element.style.left = formBoxWidth - 200 + "px";
      });
    }
  }
};
</script>
<style lang="scss">
$fontColor: #828282 !global;
.order {
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
    .wrapper {
      height: 700px;

      .contain {
        // background-color: yellowgreen;
        // width: 1800px;
        width: 2000px;
        height: 1000px;
        .title {
          background-color: #edf6fc;
          color: #08a2ed;
          font-weight: 500;
          .edit-box {
            background-color: #edf6fc;
            width: 200px;
            height: 50px;
            position: fixed;
          }
        }
        .box {
          font-size: 14px;
          .box-main {
            border-bottom: 1px solid #e5e5e5;
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
          .box-detial {
          }
          .goodInfo-common {
            display: flex;
            height: 50px;
            line-height: 50px;
            text-align: center;
            font-size: 13px;
            margin-left: 30px;
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
              width: 150px;
            }
            .goodsName {
              width: 150px;
            }
            .goodsType {
              width: 150px;
            }
            .goodsNum {
              width: 150px;
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
        }
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
      }
    }
  }
}
</style>
