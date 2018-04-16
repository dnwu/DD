<template>
<div class="new-order">
  <div class="back">
    <el-button type="info" round icon="el-icon-back" size="mini">返回</el-button>
  </div>
  <div class="title">
    <span>订单信息</span>
  </div>
  <div class="order-info">
    <el-form :model="orderInfo" ref="orderInfo" class="orderInfo">
      <div class="line">
        <div class="item">
          <div class="tit must" title="订单编号">订单ID</div>
          <div class="value">
            <el-form-item prop="orderID" :rules="orderID">
              <el-input v-model="orderInfo.orderID" placeholder="请输入订单ID"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="item">
          <div class="tit must" title="订单时间">订单时间</div>
          <div class="value">
            <el-form-item prop="orderTime" :rules="orderTime">
              <el-date-picker
                v-model="orderInfo.orderTime"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </div>
        </div>
        <div class="item">
          <div class="tit must" title="该订单需前往装货的仓库编码">装货点编号</div>
          <div class="value">
            <el-form-item prop="takeID" :rules="takeID">
              <el-select v-model="orderInfo.takeID" placeholder="请选择">
                <el-option
                  v-for="item in takeIDs"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="item">
          <div class="tit must" title="该订单需前往配送的配送点编码">配送点编号</div>
          <div class="value">
            <el-form-item prop="sendID" :rules="sendID">
              <el-select v-model="orderInfo.sendID" placeholder="请选择">
                <el-option
                  v-for="item in sendIDs"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
      </div>
      <div class="line">
        <div class="item">
          <div class="tit" title="订单编号">总件数</div>
          <div class="value">
            <el-form-item prop="num">
              <el-input v-model="orderInfo.num" placeholder="请输入订单ID"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="item item-li">
          <div class="tit">装货时间窗</div>
          <div class="value">
            <div class="li">
              <el-form-item prop="takeTime">
                <el-date-picker
                  v-model="orderInfo.takeDate"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </div>
            <div class="li">
              <el-time-select
                v-model="orderInfo.taketime"
                placeholder="选择时间">
              </el-time-select>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="tit" title="该订单需前往装货的仓库编码">装货浮动时间范围</div>
          <div class="value">
            <el-form-item prop="takeRangeTime">
              <el-select v-model="orderInfo.takeRangeTime" placeholder="请选择">
                <el-option
                  v-for="item in takeRangeTimes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="item"></div>
      </div>
      <div class="line"></div>
    </el-form>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      orderInfo: {
        orderID: "",
        orderTime: "",
        takeID: "",
        num: "",
        takeDate: "",
        takeTime: "",
        takeRangeTime: ""
      },
      orderID: [
        {
          required: false,
          message: "请输入订单ID",
          trigger: "blur",
          sendID: ""
        }
      ],
      orderTime: [
        {
          required: false,
          message: "请输入订单时间",
          trigger: "blur"
        }
      ],
      takeID: [
        {
          required: false,
          message: "请输入订单时间",
          trigger: "blur"
        }
      ],
      sendID: [
        {
          required: false,
          message: "请输入订单时间",
          trigger: "blur"
        }
      ],
      takeIDs: [
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
      sendIDs: [
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
      ]
    };
  }
};
</script>
<style lang="scss">
$fontColor: #828282;
$fontGreen: #22acf2;
.new-order {
  height: 100%;
  .back {
    text-align: right;
    margin-right: 50px;
  }
  .title {
    height: 50px;
    background-color: #edf6fc;
    line-height: 50px;
    text-align: left;
    color: $fontGreen;
    text-indent: 2em;
    margin-top: 20px;
  }
  .order-info {
    .line {
      height: 70px;
      // background-color: #e0e0e0;
      margin: 10px 0;
      display: flex;
      .item {
        flex: 1;
        color: $fontColor;
        .tit {
          text-align: left;
          margin-left: 20px;
          &.must {
            position: relative;
            &::before {
              content: "*";
              display: inline-block;
              width: 3px;
              height: 3px;
              border-radius: 50%;
              // background-color: $fontGreen;
              color: $fontGreen;
              position: absolute;
              left: -10px;
              top: 0;
            }
          }
        }
        .value {
          margin: 6px 60px 0 10px;
          .el-date-editor,
          .el-select {
            width: 100%;
          }
        }
      }
      .item-li {
        .value {
          display: flex;
          .li {
            flex: 1;
            // margin: 0 10px;
            &:first-child {
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
}
</style>
