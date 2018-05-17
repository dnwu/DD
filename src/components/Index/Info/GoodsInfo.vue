<template>
<div class="goods-info">
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
      <el-button type="primary" size = 'mini' icon="el-icon-plus">新增货物</el-button>
    </div>
  </div>
  <div class="form" ref="form">
    <div class="title common">
      <div class="all"><el-checkbox @change='allChange' v-model="checked">全选</el-checkbox></div>
      <div class="id">货物ID <span class="el-icon-search"></span></div>
      <div class="goods-name">货物名称<span class="el-icon-search"></span></div>
      <div class="goods-type">货物类型<span class="el-icon-search"></span></div>
      <div class="pay-unit">计量单位<span class="el-icon-arrow-down"></span></div>
      <div class="weight-per">单位重量(kg)</div>
      <div class="size-per">单位体积(m³)</div>
      <div class="remark">备注</div>
      <div class="edit-box"></div>
    </div>
    <div class="box" ref="box">
      <div class="box-main common" v-for="(item,index) in goodsInfoList" :key="index" :class="index%2==0?'':'couple'">
        <div class="all"><el-checkbox @change='change' v-model="item._checked"></el-checkbox></div>
        <div class="id">{{item.stockId}}</div>
        <div class="goods-name">{{item.stockName}}</div>
        <div class="goods-type">{{item.stockType}}</div>
        <div class="pay-unit">{{item.measurementUnit}}</div>
        <div class="weight-per">{{item.weight}}</div>
        <div class="size-per">{{item.volume}}</div>
        <div class="remark">{{item.remarks}}</div>
        <div class="edit-box" :class="index%2==0?'':'couple'">
          <div class="edit el-icon-edit-outline"></div>
          <div class="delete el-icon-delete" @click="deleteGood(item.stockId)"></div>
        </div>
      </div>
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
import { download, upload } from "@/config/js/load";
export default {
  name: "goodsInfo",
  data() {
    return {
      checked: false,
      total: 10,
      goodsInfoList: []
    };
  },
  created() {
    this.getGoodsInfoList(1);
  },
  mounted() {},
  methods: {
    getGoodsInfoList(page) {
      this.axios
        .get("/web-schedul/service/info/listStockByPage", {
          params: {
            currentPage: page,
            pageSize: "10"
          }
        })
        .then(data => {
          this.goodsInfoList = data.data.page.recordList;
          console.log(this.goodsInfoList);
          this.goodsInfoList.forEach(ele => {
            this.$set(ele, "_checked", false);
          });
          this.total = data.data.page.totalCount;
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
        });
    },
    deleteGood(id) {
      // console.log(id);
      this.axios
        .get("/web-schedul/service/info/deleteStock", {
          params: {
            stock_id: id
          }
        })
        .then(data => {
          this.getGoodsInfoList(1);
        });
    },
    exportExcel() {
      this.axios({
        method: "post",
        url: "/web-schedul/service/excel/download/stock",
        params: {
          ids: this.itemChecked()
        },
        responseType: "blob"
      }).then(data => {
        download(data.data, "stock ");
      });
    },
    uploadFile(file) {
      upload(file, "stock", this.axios).then(data => {
        console.log(data);
        this.getGoodsInfoList("1");
      });
    },
    itemChecked() {
      let checked = ''
      this.goodsInfoList.forEach(ele => {
        if(ele._checked) {
          checked = checked + ele.stockId + ','
        }
      })
      return checked.slice(0, -1)
    },
    allChange(item) {
      if (item) {
        this.goodsInfoList.forEach(ele => {
          ele._checked = true;
        });
      } else {
        this.goodsInfoList.forEach(ele => {
          ele._checked = false;
        });
      }
    },
    change(item) {
      let num = this.goodsInfoList.length;
      let _num = 0;
      this.goodsInfoList.forEach(ele => {
        if (ele._checked) {
          _num++;
          if (_num === num) {
            this.checked = true;
          }
        }
        if (!ele._checked) {
          this.checked = false;
        }
      });
    },
    currentChange(page) {
      this.getGoodsInfoList(page);
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
<style lang="scss">
$fontColor: #828282;
$fontGreen: #22acf2;
.goods-info {
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
      .goods-name {
        width: 200px;
      }
      .goods-type {
        width: 150px;
      }
      .pay-unit {
        width: 150px;
      }
      .weight-per {
        width: 150px;
      }
      .size-per {
        width: 150px;
      }
      .remark {
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
