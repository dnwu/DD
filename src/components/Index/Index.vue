<template>
<div class='index'>
  <el-container>
    <el-aside width="200px">
      <div class="avatar">
        <img src="../../assets/avatar.png" alt="">
        <p class="name">{{userName}}</p>
      </div>
      <div class="nav">
        <ul class="navbox">
          <li class="level1" @click='toggle1Class(0)' :class="level1Active === 0?'active':''"><router-link to="/index/order"><img :src="iconArr[0]['d']">订单管理</router-link></li>
          <li class="level1" @click='toggle1Class(1)' :class="level1Active === 1?'active':''"><router-link to="/index/plan"><img :src="iconArr[1]['d']">调度方案</router-link></li>
          <li class="level1">
            <div class="title" @click='toggle1Class(2)' :class="level1Active === 2?'active':''"><img :src="iconArr[2]['d']">基础信息</div>
            <transition name="slide">
              <ul class="level2Box" v-show="level2Switch">
                <li class="level2" @click='toggle2Class(2)' :class="level2Active === 2?'active':''"><router-link to="/index/positionInfo">位置信息</router-link></li>
                <li class="level2" @click='toggle2Class(0)' :class="level2Active === 0?'active':''"><router-link to="/index/carInfo">车辆信息</router-link></li>
                <li class="level2" @click='toggle2Class(1)' :class="level2Active === 1?'active':''"><router-link to="/index/goodsInfo">货物信息</router-link></li>
                <li class="level2" @click='toggle2Class(3)' :class="level2Active === 3?'active':''"><router-link to="/index/staffInfo">人员信息</router-link></li>
              </ul>
            </transition>
          </li>
          <li class="level1" @click='toggle1Class(3)' :class="level1Active === 3?'active':''"><router-link to="/index/monitor"><img :src="iconArr[3]['d']">智能监控</router-link></li>
          <li class="level1" @click='toggle1Class(4)' :class="level1Active === 4?'active':''"><router-link to="/index/form"><img :src="iconArr[4]['d']">统计报表</router-link></li>
          <li class="level1" @click='toggle1Class(5)' :class="level1Active === 5?'active':''"><router-link to="/index/center"><img :src="iconArr[5]['d']">用户中心</router-link></li>
        </ul>
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <div class="title">
          <img :src="iconArr[level1Active]['a']">
          <span>{{title}}</span>
        </div>
        <div class="logout">
          <img @click="logout" src="../../assets/logout.png">
        </div>
      </el-header>
      <el-main>
        <!-- <keep-alive> -->
          <router-view></router-view>
        <!-- </keep-alive> -->
      </el-main>
    </el-container>
  </el-container>
</div>
</template>
<script>
export default {
  name: "Index",
  data() {
    return {
      userName: '',
      level2Switch: false,
      level1Active: 0,
      level2Active: -1,
      title: "订单管理",
      iconArr: [
        {
          a: require("../../assets/icon1.png"),
          d: require("../../assets/icon11.png")
        },
        {
          a: require("../../assets/icon2.png"),
          d: require("../../assets/icon22.png")
        },
        {
          a: require("../../assets/icon3.png"),
          d: require("../../assets/icon33.png")
        },
        {
          a: require("../../assets/icon4.png"),
          d: require("../../assets/icon44.png")
        },
        {
          a: require("../../assets/icon5.png"),
          d: require("../../assets/icon55.png")
        },
        {
          a: require("../../assets/icon6.png"),
          d: require("../../assets/icon66.png")
        }
      ]
    };
  },
  created() {
    this.userName = window.localStorage.getItem('userInfo')
    this.fullPath = this.$route.fullPath;
    console.log(this.fullPath);
    this.initTitle();
  },
  methods: {
    logout() {
      console.log('click');
      this.axios.get('/web-schedul/service/user/logout').then(data => {
        console.log('logout',data);
        if(data.data.code == 200){
          this.$router.push('/login')
        }
      })
    },
    toggle1Class(e) {
      if (e === 2) {
        this.level2Switch = !this.level2Switch;
        if (this.level2Active !== -1) {
          // this.level2Active = 0;
        } else {
          this.level2Active = 0;
          this.$router.push("/index/positionInfo");
        }
      }
      if (e !== 2) {
        this.level2Active = -1;
        this.level2Switch = false;
      }
      this.level1Active = e;
      // this.initTitle()
    },
    toggle2Class(e) {
      this.level2Active = e;
      // this.initTitle()
    },
    initTitle() {
      if (this.fullPath.includes("/order")) {
        this.title = "订单管理";
        this.level1Active = 0;
      } else if (this.fullPath.includes("/plan")) {
        this.title = "调度方案";
        this.level1Active = 1;
      } else if (this.fullPath.includes("/planStep1")) {
        this.title = "调度方案";
        this.level1Active = 1;
      } else if (this.fullPath.includes("/planStep2")) {
        this.title = "调度方案";
        this.level1Active = 1;
      } else if (this.fullPath.includes("/planStep3")) {
        this.title = "调度方案";
        this.level1Active = 1;
      } else if (this.fullPath.includes("/result")) {
        this.title = "调度方案";
        this.level1Active = 1;
      } else if (this.fullPath.includes("/carInfo")) {
        this.title = "基础信息";
        this.level1Active = 2;
        this.level2Switch = true;
        this.level2Active = 0;
      } else if (this.fullPath.includes("/goodsInfo")) {
        this.title = "基础信息";
        this.level1Active = 2;
        this.level2Switch = true;
        this.level2Active = 1;
      } else if (this.fullPath.includes("/positionInfo")) {
        this.title = "基础信息";
        this.level1Active = 2;
        this.level2Switch = true;
        this.level2Active = 2;
      } else if (this.fullPath.includes("/staffInfo")) {
        this.title = "基础信息";
        this.level1Active = 2;
        this.level2Switch = true;
        this.level2Active = 3;
      } else if (this.fullPath.includes("/monitor")) {
        this.title = "智能监控";
        this.level1Active = 3;
      } else if (this.fullPath.includes("/form")) {
        this.title = "统计报表";
        this.level1Active = 4;
      } else if (this.fullPath.includes("/center")) {
        this.title = "用户中心";
        this.level1Active = 5;
      }
    }
  },
  watch: {
    $route(a, b) {
      this.fullPath = a.fullPath;
      this.initTitle();
    }
  }
};
</script>
<style lang="scss">
.index {
  width: 100%;
  height: 100%;
  .imgIcon {
    img {
      width: 20px;
      height: 20px;
      margin-right: 10px;
      transform: translateY(4px);
    }
  }
  .el-container {
    width: 100%;
    height: 100%;
    .el-aside {
      user-select: none;
      background: linear-gradient(top, #005ebe, #27aae0);
      background: -webkit-gradient(linear, left top, left bottom, from(#005ebe), to(#27aae0));
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
            cursor: pointer;
            &.active {
              background-color: #29b1e5;
            }
            a {
              display: inline-block;
              text-decoration: none;
              color: #94c9e7;
              width: 100%;
              height: 47px;
              line-height: 47px;
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
            .level2Box {
              overflow: hidden;
              height: 188px;
              .level2{
                padding: 0;
              }
            }
            .slide-enter-active,
            .slide-leave-active {
              transition: all 0.2s cubic-bezier(0.49, -0.01, 1, 0.44);
            }
            .slide-enter,
            .slide-leave-to {
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
      border-bottom: 1px solid #f3f3f3;
      line-height: 60px;
      margin: 0 30px;
      .title {
        flex: 1;
        color: #02a0ee;
        text-align: left;
        font-weight: 700;
        img {
          vertical-align: middle;
        }
      }
      .logout {
        flex: 1;
        text-align: right;
        padding-right: 20px;
        img {
          vertical-align: middle;
          cursor: pointer;
        }
      }
    }
    .el-main {
      position: relative;
      padding: 0;
      margin: 20px;
      overflow: hidden;
    }
  }
}
</style>
