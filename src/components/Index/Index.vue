<template>
<div class='index'>
  <el-container>
    <el-aside width="200px">
      <div class="avatar">
        <img src="../../assets/avatar.jpg" alt="">
        <p class="name">Admin</p>
      </div>
      <div class="nav">
        <ul class="navbox">
          <li class="level1" @click='toggle1Class(0)' :class="level1Active === 0?'active':''"><router-link to="/"><img :src="iconArr[0]['d']">订单管理</router-link></li>
          <li class="level1" @click='toggle1Class(1)' :class="level1Active === 1?'active':''"><router-link to="/"><img :src="iconArr[1]['d']">调度方案</router-link></li>
          <li class="level1">
            <div class="title" @click='toggle1Class(2)' :class="level1Active === 2?'active':''"><img :src="iconArr[2]['d']">基础信息</div>
            <transition name="slide">
              <ul class="level2Box" v-show="level2Switch">
                <li class="level2" @click='toggle2Class(0)' :class="level2Active === 0?'active':''"><router-link to="/">车辆信息</router-link></li>
                <li class="level2" @click='toggle2Class(1)' :class="level2Active === 1?'active':''"><router-link to="/">货物信息</router-link></li>
                <li class="level2" @click='toggle2Class(2)' :class="level2Active === 2?'active':''"><router-link to="/">位置信息</router-link></li>
                <li class="level2" @click='toggle2Class(3)' :class="level2Active === 3?'active':''"><router-link to="/">人员信息</router-link></li>
              </ul>
            </transition>
          </li>
          <li class="level1" @click='toggle1Class(3)' :class="level1Active === 3?'active':''"><router-link to="/"><img :src="iconArr[3]['d']">智能监控</router-link></li>
          <li class="level1" @click='toggle1Class(4)' :class="level1Active === 4?'active':''"><router-link to="/"><img :src="iconArr[4]['d']">统计报表</router-link></li>
          <li class="level1" @click='toggle1Class(5)' :class="level1Active === 5?'active':''"><router-link to="/"><img :src="iconArr[5]['d']">用户中心</router-link></li>
        </ul>
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <div class="title">
          <img :src="iconArr[level1Active]['a']">
          <span>title</span>
        </div>
        <div class="logout">
          <img src="../../assets/logout.png">
        </div>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</div>
</template>
<script>
export default {
  name: "Index",
  data() {
    return {
      level2Switch: false,
      level1Active: 0,
      level2Active: 0,
      iconArr: [
        {
          'a': require("../../assets/icon1.png"),
          'd': require("../../assets/icon11.png")
        },
        {
          'a': require("../../assets/icon2.png"),
          'd': require("../../assets/icon22.png")
        },
        {
          'a': require("../../assets/icon3.png"),
          'd': require("../../assets/icon33.png")
        },
        {
          'a': require("../../assets/icon4.png"),
          'd': require("../../assets/icon44.png")
        },
        {
          'a': require("../../assets/icon5.png"),
          'd': require("../../assets/icon55.png")
        },
        {
          'a': require("../../assets/icon6.png"),
          'd': require("../../assets/icon66.png")
        }
      ]
    };
  },
  methods: {
    toggle1Class(e) {
      if(e === 2) {
        this.level2Switch = !this.level2Switch
      }
      if(e !== 2) {
        this.level2Active = -1
        this.level2Switch = false
      }
      this.level1Active = e
    },
    toggle2Class(e) {
      this.level2Active = e
    },
  }
};
</script>
<style lang="scss" scoped>
.imgIcon {
  img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    transform: translateY(4px);
  }
}
.index {
  width: 100%;
  height: 100%;
  .el-container {
    width: 100%;
    height: 100%;
    .el-aside {
      user-select: none;
      background: linear-gradient(top, #005ebe, #27aae0);
      height: 100%;
      .avatar {
        margin-top: 100px;
        img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 2px solid #0092ff;
        }
        .name {
          color: #6bddf5;
        }
      }
      .nav {
        .navbox {
          padding: 0;
          .level1 {
            line-height: 27px;
            padding: 10px 0;
            cursor: pointer;
            &.active {
              background-color: #29b1e5;
            }
            a {
              display: inline-block;
              text-decoration: none;
              color: #94c9e7;
              width: 100%;
              @extend .imgIcon;
            }
            .title {
              color: #94c9e7;
              cursor: pointer;
              height: 48px;
              line-height: 48px;
              @extend .imgIcon;
              &.active {
                background-color: #29b1e5;
              }
            }
            .level2Box{
              overflow: hidden;
              height: 172px;
            }
            .slide-enter-active,.slide-leave-active{
              transition: all 0.2s cubic-bezier(.49,-0.01,1,.44);
            }
            .slide-enter,.slide-leave-to{
              height: 0;
            }
            ul {
              padding: 0;
              .level2 {
                padding: 8px 0;
                padding-left: 28px;
                font-size: 14px;
                &.active {
                  background-color: #29b1e5;
                }
              }
            }
          }
        }
      }
    }
    .el-header {
      display: flex;
      border-bottom: 1px solid #F3F3F3;
      .title{
        flex: 1;
        color: #02A0EE;
      }
      .logout{
        flex: 1;
      }
    }
    .el-main {
    }
  }
}
</style>
