<template>
<div class="new-order">
  <div class="back">
    <el-button type="info" round icon="el-icon-back" size="mini">返回</el-button>
  </div>
  <div class="title">
    <span>订单信息</span>
  </div>
  <div class="order-info">
    <el-form :model="orderInfo" ref="orderInfo" class="order-info-form">
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
          <div class="tit" title="对应的订单总件数">总件数</div>
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
              <el-form-item prop="takeDate">
                <el-date-picker
                  v-model="orderInfo.takeDate"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </div>
            <div class="li">
              <el-form-item prop="taketime">
                <el-time-select
                  v-model="orderInfo.taketime"
                  placeholder="选择时间">
                </el-time-select>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="tit" title="与客户商定沟通后可以容忍的时间误差，例如客户要求装货时间窗为16:00-18:00，“+—20min”代表客户可以容忍20分钟时间的误差，即总体装货时间窗为“15:40-18:20”">装货浮动时间范围</div>
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
        <div class="item">
          <div class="tit" title="该订单的装货时长">装货时长(min)</div>
          <div class="value">
            <el-form-item prop="takeRangeTime">
              <el-select v-model="orderInfo.takeTimeUse" placeholder="请选择">
                <el-option
                  v-for="item in takeTimeUses"
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
        <div class="item item-li">
          <div class="tit">
            <span title="对应的订单总体积">总体积(m³)</span>
            <span title="对应的订单总重量">总重量(Kg)</span>
          </div>
          <div class="value">
            <div class="li">
              <el-form-item prop="size">
                <el-input v-model="orderInfo.size" placeholder=""></el-input>
              </el-form-item>
            </div>
            <div class="li">
              <el-form-item prop="weight">
                <el-input v-model="orderInfo.weight" placeholder=""></el-input>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="item item-li">
          <div class="tit" title="订单要求到取货点取货的时间段">卸货时间窗</div>
          <div class="value">
            <div class="li">
              <el-form-item prop="unlodeDate">
                <el-date-picker
                  v-model="orderInfo.unlodeDate"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </div>
            <div class="li">
              <el-form-item prop="unlodeTime">
                <el-time-select
                  v-model="orderInfo.unlodeTime"
                  placeholder="选择时间">
                </el-time-select>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="tit" title="与客户商定沟通后可以容忍的时间误差，例如客户要求卸货时间窗为18:00-18:30，“+—20min”代表客户可以容忍20分钟时间的误差，即总体卸货时间窗为“17:40-18:50”">卸货浮动时间范围</div>
          <div class="value">
            <el-form-item prop="unlodeRangeTime">
              <el-select v-model="orderInfo.unlodeRangeTime" placeholder="请选择">
                <el-option
                  v-for="item in unlodeRangeTimes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="item">
          <div class="tit" title="该订单的装货时长">卸货时长(min)</div>
          <div class="value">
            <el-form-item prop="unlodeTimeUse">
              <el-select v-model="orderInfo.unlodeTimeUse" placeholder="请选择">
                <el-option
                  v-for="item in unlodeTimeUses"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
      </div>
      <div class="add-btn">
        <span @click="addGoodItem"></span>
      </div>
      <div class="good-title">
        <div title="该订单下货物ID">货物ID</div>
        <div title="该订单下货物名称">货物名称</div>
        <div title="对应货物需求温度类型">货物类型</div>
        <div title="该货物ID的货物数量">货物数量</div>
      </div>
      <div class="goods-item-box">
        <div class="goods-item" v-for="(item,index) in orderStockList" :key="index">
          <div class="goods-id">
            <div class="index">{{index+1}}</div>
            <el-form-item>
              <el-input v-model="item.stockId" placeholder="请输入内容"></el-input>
            </el-form-item>
          </div>
          <div class="goods-name">
            <el-form-item>
              <el-input v-model="item.name" placeholder="请输入内容"></el-input>
            </el-form-item>
          </div>
          <div class="goods-type">
            <el-form-item>
              <el-input v-model="item.type" placeholder="请输入内容"></el-input>
            </el-form-item>
          </div>
          <div class="goods-num">
            <el-form-item>
              <el-input v-model="item.stockNumber" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="item.measurementUnit" placeholder="请选择">
                <el-option
                  v-for="item in goodsNuit"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <div class="delete el-icon-delete" @click="deleteItem(index)"></div>
          </div>
        </div>
      </div>
      <div class="btn">
        <el-form-item>
          <el-button round>全部清除</el-button>
          <el-button type="primary" round>保存信息</el-button>
          <el-button round>复制订单信息</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      input: "",
      goodUnit: "",
      orderInfo: {
        orderID: "",
        orderTime: "",
        takeID: "",
        num: "",
        takeDate: "",
        takeTime: "",
        takeRangeTime: "",
        takeTimeUse: "",
        size: "",
        weight: "",
        unlodeDate: "",
        unlodeTime: "",
        unlodeRangeTime: "",
        unlodeTimeUse: ""
      },
      orderStockList: [
        {
          stockId: "",
          stockNumber: "",
          name: "",
          type: "",
          measurementUnit: ""
        }
      ],
      takeRangeTimes: "",
      takeTimeUses: "",
      unlodeRangeTimes: "",
      unlodeTimeUses: "",
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
      ],
      goodsNuit: [
        {
          value: "选项1",
          label: "箱"
        }
      ]
    };
  },
  methods: {
    addGoodItem() {
      this.orderStockList.push({
        stockId: "",
        stockNumber: "",
        name: "",
        type: "",
        measurementUnit: ""
      });
    },
    deleteItem(index) {
      this.orderStockList.splice(index, 1);
    }
  }
};
</script>
<style lang="scss">
$fontColor: #828282;
$fontGreen: #22acf2;
.new-order {
  position: absolute;
  height: 100%;
  min-width: 1300px;
  display: flex;
  flex-direction: column ;
  .back {
    text-align: right;
    margin-right: 50px;
    height: 28px;
  }
  .title {
    height: 50px;
    background-color: #edf6fc;
    line-height: 50px;
    text-align: left;
    color: $fontGreen;
    text-indent: 2em;
    padding-top: 20px;
    background-clip: content-box;
  }
  .order-info {
    flex: 1;
    .order-info-form{
      height: 100%;
      display: flex;
      flex-direction: column;
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
            display: flex;
            margin-right: 50px;
            color: #818181;
            font-size: 14px;
            span {
              flex: 1;
            }
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
      .add-btn {
        height: 40px;
        margin-top: 40px;
        border-top: 1px solid #dde3ef;
        text-align: right;
        span {
          display: inline-block;
          width: 30px;
          height: 30px;
          margin-top: 30px;
          margin-right: 20px;
          border-radius: 50%;
          box-shadow: 0 0 4px 4px #ceecf7;
          cursor: pointer;
          position: relative;
          &::before {
            content: "";
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            display: inline-block;
            width: 2px;
            height: 20px;
            background-color: #00a0ee;
          }
          &::after {
            content: "";
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) rotate(90deg);
            display: inline-block;
            width: 2px;
            height: 20px;
            background-color: #00a0ee;
          }
        }
      }
      .good-title {
        display: flex;
        margin-bottom: 10px;
        color: #818181;
        font-size: 14px;
        height: 19px;
        > div {
          flex: 1;
          margin: 0 60px;
          text-align: left;
        }
      }
      .goods-item-box{
        flex: 1;
        .goods-item {
          display: flex;
          > div {
            margin: 0 60px;
            flex: 1;
            &.goods-id {
              position: relative;
              .index {
                position: absolute;
                top: 6px;
                left: -50px;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background-color: #edf6fc;
                color: #2baff0;
                text-align: center;
                line-height: 30px;
              }
            }
            &.goods-num {
              display: flex;
              div:nth-of-type(1) {
                flex: 1;
              }
              div:nth-of-type(2) {
                margin-left: 10px;
                width: 60px;
              }
              .delete {
                width: 40px;
                margin-left: 20px;
                font-size: 26px;
                text-align: center;
                line-height: 40px;
                cursor: pointer;
                color: #b3b3b3;
              }
            }
          }
        }
      }
      .btn{
        // height: 40px;
      }
    }
  }
}
</style>
