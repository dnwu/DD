<template>
<div class="plan-step2">
  <div class="step">
    <div class="step1 active">1.选择订单列表</div>
    <div class="step2 active">2.优化目标 <span class="a"></span><span class="b"></span></div>
    <div class="step3">3.生成调度方案<span class="a"></span><span class="b"></span></div>
  </div>
  <div class="select">
    <div class="less-pay">
      <img src="../../../assets/plan_icon1.png" alt="">
      <p>成本最低</p>
    </div>
    <div class="less-mile active">
      <img :src="icons[1]['active']" alt="">
      <p>里程最短</p>
    </div>
    <div class="more-take">
      <img :src="icons[2]['default']" alt="">
      <p>装载率最高</p>
    </div>
    <div class="less-use">
      <img src="../../../assets/plan_icon4.png" alt="">
      <p>用车辆最少</p>
    </div>
  </div>
  <div class="bottom">
    <div class="btn1"><el-button type="info" round @click="goto('/index/planstep1')">上一步</el-button></div>
    <div class="btn2"><el-button type="primary" round @click="goto('/index/planstep3')">生成调度方案</el-button></div>
  </div>
</div>
</template>
<script>
export default {
  name: "order",
  data() {
    return {
      orderIds: "",
      icons: [
        {
          default: require("../../../assets/plan_icon1.png"),
          active: require("../../../assets/plan_icon11.png")
        },
        {
          default: require("../../../assets/plan_icon2.png"),
          active: require("../../../assets/plan_icon22.png")
        },
        {
          default: require("../../../assets/plan_icon3.png"),
          active: require("../../../assets/plan_icon33.png")
        },
        {
          default: require("../../../assets/plan_icon4.png"),
          active: require("../../../assets/plan_icon44.png")
        }
      ]
    };
  },
  created() {
    this.orderIds = window.sessionStorage.getItem("orderIds");
    // console.log(this.orderIds);
    if (!this.orderIds) {
      this.$router.push("/index/planstep1");
    }
  },
  mounted() {},
  methods: {
    /**
     * 1:成本最低
     * 2:里程最短
     * 3:转载率最高
     * 4:用车辆最少
     */
    goto(path) {
      if (path === "/index/planstep3") {
        this.axios({
          method: "post",
          url: "/web-schedul/service/scheme/insert",
          params: {
            optimalObject: "2",
            orderIds: this.orderIds
          }
        }).then(data => {
          console.log(data);
          if(data.data.code == 200) {
            window.sessionStorage.setItem('schemeId',data.data.schemeId)
            this.$router.push(path);
          }
        }).catch(error => {
          console.log(error);
        });
      }else {
        this.$router.push(path);
      }
    }
  }
};
</script>
<style lang="scss">
$fontColor: #828282;
$fontGreen: #22acf2;
.plan-step2 {
  height: 100%;
  display: flex;
  flex-direction: column;
  min-width: 1000px;
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
  .select {
    // height: 500px;
    flex: 1;
    min-height: 400px;

    display: flex;
    justify-content: center;
    align-items: center;
    > div {
      width: 200px;
      height: 200px;
      border: 1px solid #e0e0e0;
      box-shadow: 0 0 6px #d0d0d0;
      margin: 0 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      color: $fontColor;
      font-weight: 650;
      user-select: none;
      cursor: pointer;
      &.active {
        color: #0092ff;
        box-shadow: 0 0 16px #80e0ff;
      }
    }
  }
  .bottom {
    margin-top: 30px;
    display: flex;
    justify-content: center;

    > div {
      margin: 0 30px 30px;
    }
  }
}
</style>
