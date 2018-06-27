<template>
<div class="order">
  <div class="top">
    <div class="import">
      <el-upload
        action = ''
        :show-file-list = "false"
        :http-request = "uploadFile">
        <el-button type="success" plain size = 'mini' icon="el-icon-download">导入</el-button>
      </el-upload>
    </div>
    <div class="export">
      <el-button type="primary" @click="exportExcel" plain size = 'mini' icon="el-icon-upload2">导出</el-button>
    </div>
    <div class="add-order">
      <el-button type="primary" size = 'mini' icon="el-icon-plus" @click="goto('/index/neworder')">新增订单</el-button>
    </div>
  </div>
  <div class="form" ref="form">
    <div class="title common">
      <div class="all"><el-checkbox @change='allChange' v-model="checked">全选</el-checkbox></div>
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
    <div class="box" ref="box" v-for="(item,index) in orderList" :key="index">
      <div class="box-main common" :class="index%2 == 0?'':'couple'">
        <div class="all"><el-checkbox @change='change' v-model="item._checked"></el-checkbox></div>
        <div class="id">{{item.orderInfo.order_id}}</div>
        <div class="time">{{initOrderTime(item.orderInfo.order_time)}}</div>
        <div class="status green">{{item.orderInfo.is_processed?'已调度':'未调度'}}</div>
        <div class="start-id">{{item.orderInfo.load_city_code}}</div>
        <div class="end-id">{{item.orderInfo.unload_city_code}}</div>
        <div class="num">{{item.orderInfo.total_piece}}</div>
        <div class="weight">{{item.orderInfo.total_weight}}</div>
        <div class="volume">{{item.orderInfo.total_volume}}</div>
        <div class="start-time-range">±{{item.orderInfo.load_float_area}}</div>
        <div class="start-time">{{item.orderInfo.load_time}}</div>
        <div class="end-time-range">±{{item.orderInfo.unload_float_area}}</div>
        <div class="end-time">{{item.orderInfo.unload_time}}</div>
        <div class="edit-box" :class="index%2 == 0?'':'couple'">
          <div class="edit el-icon-edit-outline"></div>
          <div class="delete el-icon-delete" @click="deleteOrder(item.orderInfo.id)"></div>
          <div class="arrow el-icon-arrow-down" @click="slide(index)"></div>
        </div>
      </div>
      <transition name="slide">
        <div class="box-detial" v-show="item._open">
          <div class="goodInfo-common" v-for="(s,i) in item.stocks" :key="i">
            <div class="number"><span>{{i+1}}</span></div>
            <div class="goodsId">货物ID:{{s.stock_id}}</div>
            <div class="goodsName">货物名称:{{s.stock_name}}</div>
            <div class="goodsType">货物类型:{{s.stock_type_code}}</div>
            <div class="goodsNum">货物数量:{{s.stock_number}}件</div>
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
    <div class="btn"><el-button :type="btnType" :disabled='disabled' @click="goto('/index/planstep2')" round>生成调度方案</el-button></div>
    <div class="page">
      <el-pagination
        background
        page-size:10
        layout="prev, pager, next"
        @current-change = "currentChange"
        :total="total">
      </el-pagination>
    </div>
  </div>
</div>
</template>
<script>
import { download, upload } from "@/config/js/load";
export default {
  name: "order",
  data() {
    return {
      box: true,
      checked: false,
      disabled: true,
      btnType: "info",
      value1: "",
      orderList: [],
      total: 20,
      saveOrderIds: ""
    };
  },
  created() {
    this.getOrderList("1");
  },
  mounted() {},
  methods: {
    getOrderList(currentPage) {
      this.axios
        .get("/web-schedul/service/order/listOrderByPage", {
          params: {
            currentPage: currentPage,
            pageSize: "10"
          }
        })
        .then(data => {
          console.log('getOrderList',data);
          this.orderList = [...data.data.page.recordList];
          this.total = data.data.page.totalCount;
          this.orderList.forEach(ele => {
            this.$set(ele, "_checked", false);
            this.$set(ele, "_open", false);
          });
          this.$nextTick(() => {
            this.elMainBox = document.querySelector(".el-main");
            this.editBox = document.querySelectorAll(".el-main .edit-box");
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
    exportExcel() {
      this.axios({
        method: "post",
        url: "/web-schedul/service/excel/download/order",
        params: {
          ids: this.itemChecked()
        },
        responseType: "blob",
        // headers: {
        //   'Content-Type': 'application/x-www-form-urlencoded'
        // }
      }).then(data => {
        console.log('order', data);
        download(data.data, "order");
      }).catch(e => {
        console.log('error' ,e);
      });
    },
    uploadFile(file) {
      upload(file, "order", this.axios).then(data => {
        if(data.data.code != 200) {
          this.$message({
            duration: 0,
            showClose: true,
            message: data.data.msg,
            type: "error"
          });
        }
        this.getOrderList("1");
      });
    },
    itemChecked() {
      let checked = ''
      this.orderList.forEach(ele => {
        if(ele._checked) {
          checked = checked + ele.orderInfo.id + ','
        }
      })
      return checked.slice(0, -1)
    },
    currentChange(e) {
      this.getOrderList(e);
    },
    deleteOrder(id) {
      console.log(id);
      this.axios
        .get("/web-schedul/service/order/delete", {
          params: {
            id: id
          }
        })
        .then(data => {
          // console.log(data);
          this.getOrderList(1);
        });
    },
    initOrderTime(time) {
      var date = new Date(time);
      let year = date.getFullYear();
      let month =
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1;
      let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
      return `${year}-${month}-${day}`;
    },
    allChange(item) {
      let num = this.orderList.length;
      if (num === 0) {
        this.disableBtnClass();
        return;
      }
      if (item) {
        this.ableBtnClass();
        this.orderList.forEach(ele => {
          ele._checked = true;
        });
      } else {
        this.disableBtnClass();
        this.orderList.forEach(ele => {
          ele._checked = false;
        });
      }
    },
    change(item) {
      let num = this.orderList.length;
      let _num = 0;
      this.orderList.forEach(ele => {
        if (ele._checked) {
          _num++;
          if (_num === num) {
            this.checked = true;
          }
        }
        if (_num !== 0) {
          this.ableBtnClass();
        } else {
          this.disableBtnClass();
        }
        if (!ele._checked) {
          this.checked = false;
        }
      });
    },
    disableBtnClass() {
      this.btnType = "info";
      this.disabled = true;
    },
    ableBtnClass() {
      this.btnType = "primary";
      this.disabled = false;
    },
    initStyle() {
      var elMainBoxHeight = this.elMainBox.offsetHeight;
      this.$refs.form.style.height = elMainBoxHeight * 0.7 + "px";
    },
    resetEditBox() {
      var formBoxWidth = this.$refs.form.offsetWidth;
      var scrollLeft = this.$refs.form.scrollLeft + formBoxWidth - 200;
      var boxWidth = this.$refs.box[0].scrollWidth;
      // console.log(scrollLeft);
      if (this.$refs.form.scrollLeft >= boxWidth - formBoxWidth) {
        this.editBox.forEach(element => {
          element.style.left = boxWidth - 200 + "px";
        });
        return;
      }
      this.editBox.forEach(element => {
        element.style.left = scrollLeft + "px";
      });
    },
    slide(index) {
      // console.log(index);
      this.orderList[index]._open = !this.orderList[index]._open;
    },
    goto(path) {
      this.orderList.forEach(ele => {
        if (ele._checked) {
          this.saveOrderIds += ele.orderInfo.id + ",";
        }
      });
      this.saveOrderIds = this.saveOrderIds.slice(0, -1);
      window.sessionStorage.setItem("orderIds", this.saveOrderIds);
      this.$router.push(path);
    }
  }
};
</script>
<style lang="scss">
$fontColor: #828282;
$fontGreen: #22acf2;
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

      .box-main {
        border-bottom: 1px solid #e5e5e5;
        font-size: 14px;
        position: relative;
        width: 100%;
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
          // .edit-box {
          //   background-color: #fff;
          //   width: 200px;
          //   height: 50px;
          //   position: absolute;
          //   display: flex;
          //   > div {
          //     height: 50px;
          //     flex: 1;
          //     line-height: 50px;
          //     font-size: 20px;
          //     color: #b8b8b8;
          //     cursor: pointer;
          //     margin: 0 10px;
          //   }
          // }
        }
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
