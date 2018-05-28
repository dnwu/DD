<template>
<div class="login">
  <div class="login-form">
    <h3><img src="../../assets/logo.png">北斗院智慧物流</h3>
    <div class="name">
      <span class="icon icon-user"></span>
      <el-input v-model="name" placeholder="请输入用户名"></el-input>
    </div>
    <div class="pass">
      <span class="icon icon-lock"></span>
      <el-input v-model="pass" placeholder="请输入密码"></el-input>
      <span class="forget">忘记密码?</span>
    </div>
    <div class="check">
      <el-checkbox text-color="red" v-model="keepName">记住用户名</el-checkbox>
      <el-checkbox v-model="keepPass">记住密码</el-checkbox>
    </div>
    <div class="btn">
      <el-button type="primary">登录</el-button>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      pass: "",
      keepName: false,
      keepPass: false
    };
  }
};
</script>
<style lang="scss" scoped>
@import url("../../common/font/style.css");
.login {
  background: url("../../assets/login.png") center center no-repeat;
  height: 100%;
  display: flex;
  align-items: center;
  .login-form {
    margin-left: 160px;
    width: 400px;
    h3 {
      font-size: 30px;
      vertical-align: middle;
      text-align: left;
      color: #fff;
      img {
        vertical-align: middle;
        margin-right: 20px;
      }
    }
    .name,
    .pass {
      position: relative;
      .icon {
        width: 40px;
        position: absolute;
        font-size: 26px;
        color: #9dcdf4;
        line-height: 40px;
        text-align: center;
      }
      .forget {
        position: absolute;
        line-height: 40px;
        top: 0;
        right: -76px;
        font-size: 14px;
        color: #9dcdf4;
        cursor: pointer;
      }
    }
    .name {
      margin: 20px 0;
    }
    .check {
      display: flex;
      padding-top: 20px;
      label {
        flex: 1;
        color: #fff;
      }
    }
  }
}
</style>
<style lang="scss">
.login {
  .name,
  .pass {
    input {
      padding-left: 39px;
      background: transparent;
      border-color: #68b9ed;
      &:focus {
        border-color: #27a2f5;
      }
    }
  }
  .btn {
    margin-top:20px;
    button{
      padding:10px 180px;
      background-color:#00C2FF;
    }
  }
}
</style>

