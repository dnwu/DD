<template>
<div class="position-info">
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
      <el-button type="primary" size = 'mini' icon="el-icon-plus">新增位置</el-button>
    </div>
  </div>
  <div class="form" ref="form">
    <div class="title common">
      <div class="all"><el-checkbox @change="allChange" v-model="checked">全选</el-checkbox></div>
      <div class="code">位置编码<span class="el-icon-search"></span></div>
      <div class="name">名称<span class="el-icon-search"></span></div>
      <div class="type">类型<span class="el-icon-arrow-down"></span></div>
      <div class="start-end">开始-结束时间</div>
      <div class="time">沟通耗时(min)</div>
      <div class="allow">许可车型</div>
      <div class="position">地址</div>
      <div class="lng-lat">经纬度</div>
      <div class="edit-box"></div>
    </div>
    <div class="box" ref="box">
      <div class="box-main common" v-for="(item,index) in positonInfoList" :key="index" :class="index%2==0?'':'couple'">
        <div class="all"><el-checkbox @change="change" v-model="item._checked"></el-checkbox></div>
        <div class="code">{{item.place_id}}</div>
        <div class="name">{{item.place_name}}</div>
        <div class="type">{{item.place_type}}</div>
        <div class="start-end">{{`${item.opentime}-${item.limitTime}`}}</div>
        <div class="time">{{item.communication_time}}</div>
        <div class="allow">{{item.allow_car}}</div>
        <div class="position">{{item.place_adress}}</div>
        <div class="lng-lat">{{`${item.lon}/${item.lat}`}}</div>
        <div class="edit-box" :class="index%2==0?'':'couple'">
          <div class="edit el-icon-edit-outline"></div>
          <div class="delete el-icon-delete" @click="deletePosition(item.place_id)"></div>
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
  name: "positionInfo",
  data() {
    return {
      checked: false,
      total: 10,
      positonInfoList: []
    };
  },
  created() {
    this.getPositionInfoList(1);
  },
  mounted() {},
  methods: {
    getPositionInfoList(page) {
      this.axios
        .get("/web-schedul/service/info/listPlaceByPage", {
          params: {
            currentPage: page,
            pageSize: "10"
          }
        })
        .then(data => {
          this.positonInfoList = data.data.page.recordList;
          console.log(this.positonInfoList);
          this.positonInfoList.forEach(ele => {
            this.$set(ele, "_checked", false);
          });
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
    currentChange(page) {
      this.getPositionInfoList(page);
    },
    deletePosition(id) {
      // console.log(id);
      this.axios
        .get("/web-schedul/service/info/deletePlace", {
          params: {
            place_id: id
          }
        })
        .then(data => {
          this.getPositionInfoList(1);
        });
    },
    exportExcel() {
      this.axios({
        method: "post",
        url: "/web-schedul/service/excel/download/place",
        params: {
          ids: this.itemChecked()
        },
        responseType: "blob"
      }).then(data => {
        download(data.data, "place ");
      });
    },
    uploadFile(file) {
      upload(file, "place", this.axios).then(data => {
        console.log(data);
        this.getPositionInfoList(1);
      });
    },
    itemChecked() {
      let checked = ''
      this.positonInfoList.forEach(ele => {
        if(ele._checked) {
          checked = checked + ele.place_id + ','
        }
      })
      return checked.slice(0, -1)
    },
    allChange(item) {
      if (item) {
        this.positonInfoList.forEach(ele => {
          ele._checked = true;
        });
      } else {
        this.positonInfoList.forEach(ele => {
          ele._checked = false;
        });
      }
    },
    change(item) {
      let num = this.positonInfoList.length;
      let _num = 0;
      this.positonInfoList.forEach(ele => {
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
.position-info {
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
      .code {
        width: 150px;
      }
      .name {
        width: 150px;
      }
      .type {
        width: 130px;
      }
      .start-end {
        width: 150px;
      }
      .time {
        width: 100px;
      }
      .allow {
        width: 150px;
      }
      .position {
        width: 300px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .lng-lat {
        width: 170px;
      }
    }
    .title {
      height: 50px;
      // width: 2000px;
      min-width: 1600px;
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
      min-width: 1600px;
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
