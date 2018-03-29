<template>
<div class="plan-step3">
  <div class="step">
    <div class="step1 active">1.选择订单列表</div>
    <div class="step2 active">2.优化目标 <span class="a"></span><span class="b"></span></div>
    <div class="step3 active">3.生成调度方案<span class="a"></span><span class="b"></span></div>
  </div>
  <div class="progress">
    <div class="box">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <p class="word">调度方案计算中</p>
  </div>
  <div class="bottom">
    <div class="btn1"><el-button type="info" round>停止优化</el-button></div>
    <div class="btn1"><el-button type="primary" round @click="goto('/index/plan')">返回方案列表</el-button></div>
    <div class="btn2"><el-button type="info" round @click="goto('/index/result')">查看结果</el-button></div>
  </div>
</div>
</template>
<script>
export default {
  name: "order",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    goto(path) {
      this.$router.push(path);
    }
  }
};
</script>
<style lang="scss">
$fontColor: #828282;
$fontGreen: #22acf2;
.plan-step3 {
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
  .progress {
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .box {
      display: inline-block;
      width: 120px;
      height: 120px;
      // transform: translateX(-10px);
      span:not(.word) {
        display: inline-block;
        position: absolute;
        border-radius: 50%;
        background-color: #0092ff;
        transform-origin: 0 80px;
      }
      @keyframes scale {
        from {
          width: 38px;
          height: 38px;
        }
        to {
          width: 10px;
          height: 10px;
        }
      }
      span:nth-of-type(1) {
        width: 38px;
        height: 38px;
        // transform-origin: 19px 80px;
        transform: rotate(0deg) translate(-50%, -50%);
        animation: scale 1s linear 0s infinite;
      }
      span:nth-of-type(2) {
        width: 34px;
        height: 34px;
        // transform-origin: 17px 80px;
        transform: rotate(45deg)translate(-50%, -50%);
        animation: scale 1s linear 125ms infinite;
      }
      span:nth-of-type(3) {
        width: 30px;
        height: 30px;
        // transform-origin: 15px 80px;
        transform: rotate(90deg) translate(-50%, -50%);
        animation: scale 1s linear 250ms infinite;
      }
      span:nth-of-type(4) {
        width: 26px;
        height: 26px;
        // transform-origin: 13px 80px;
        transform: rotate(135deg) translate(-50%, -50%);
        animation: scale 1s linear 375ms infinite;
      }
      span:nth-of-type(5) {
        width: 22px;
        height: 22px;
        // transform-origin: 11px 80px;
        transform: rotate(180deg) translate(-50%, -50%);
        animation: scale 1s linear 500ms infinite;
      }
      span:nth-of-type(6) {
        width: 18px;
        height: 18px;
        // transform-origin: 9px 80px;
        transform: rotate(225deg) translate(-50%, -50%);
        animation: scale 1s linear 625ms infinite;
      }
      span:nth-of-type(7) {
        width: 14px;
        height: 14px;
        // transform-origin: 7px 80px;
        transform: rotate(270deg) translate(-50%, -50%);
        animation: scale 1s linear 750ms infinite;
      }
      span:nth-of-type(8) {
        width: 10px;
        height: 10px;
        // transform-origin: 5px 80px;
        transform: rotate(315deg) translate(-50%, -50%);
        animation: scale 1s linear 875ms infinite;
      }
    }
    .word {
      margin-top: 80px;
      color: $fontGreen;
      font-weight: 700;
      font-size: 18px;
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
