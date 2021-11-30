<template>
  <div class="header">
    <div class="top">
      <div class="wrap">
        <!-- logo -->
        <div class="logo h-hand p-r-20" @click="goHome"></div>
        <!-- 导航栏 -->
        <ul class="navbar">
          <li v-for="item in navMsg" :key="item.path" @click="goPage(item.path)">
            <span :class="{'active-em':item.path.endsWith(activePath) }">
              <em class="fz-14">{{item.name}}</em>
              <div :class="{'navbar-icon-active':item.path.endsWith(activePath)}"></div>
              <div :class="{'download-icon':item.path === '/download'}"></div>
            </span>
          </li>
        </ul>
        <!-- 搜索 -->
        <div class="search m-t-19">
          <a-input-search placeholder="音乐/视频/电台/用户" style="width: 158px" @search="onSearch(value)" v-model="value"/>
        </div>
        <!-- 登录 -->
        <div v-if="!loginStatus" class="login h-hand h-t-d-u" @click="openLoginDialog">
          <p class="fz-12">登录</p>
        </div>
        <!-- 已登录 -->
        <div class="user" v-else>
          <a-dropdown>
            <div class="user-head">s
              <div class="img"></div>
            </div>
            <UserMenuHover slot="overlay"></UserMenuHover>
          </a-dropdown>
        </div>

      </div>
    </div>
    <div class="box"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { navMsg } from '@/assets/data/header.js'
import UserMenuHover from '@/components/user/UserMenuHover'
export default {
  name: 'AllHeader',
  data () {
    return {
      // 导航栏
      navMsg,
      value: ''
    }
  },
  components: { UserMenuHover },
  methods: {
    goHome () {
      this.$router.push('/')
    },
    goPage (path) {
      this.$store.commit('setActivePath', path)
      this.$router.push({ path: path })
    }
  },
  computed: {
    ...mapGetters(['activePath', 'loginStatus'])
  }
}
</script>

<style lang="less" scoped>
  // @import '../../assets/css/all-header.less';
  // 修改组件默认样式
  // 调整搜索框文本大小
  /deep/ .ant-input {
    font-size: 1px;
    border-radius: 16px;
  }

  /deep/ .ant-input-suffix {
    font-size: 15px;
  }

  /deep/ .ant-input-search {
    margin-left: 60px;
  }

  .header {
    background-color: #242424;

    .top {
      z-index: 1000;
      height: 70px;
      border-bottom: 1px solid #000;
      display: flex;
      flex-direction: column;

      .wrap {
        // line-height: 70px;
        width: 1100px;
        margin: 0 auto;
        position: relative;

        .logo {
          float: left;
          width: 176px;
          height: 69px;
          background: url(../assets/imgs/header/header.png);
          background-position: 0 0;
        }

        .navbar {
          line-height: 70px;
          position: relative;

          li {
            float: left;
            cursor: pointer;
            color: #ccc;

            .active-em {
              color: #fff;
              background-color: #000;
            }

            span {
              padding: 0 15px;
              display: block;
              position: relative;

              .navbar-icon-active {
                position: absolute;
                width: 12px;
                height: 7px;
                left: 280px;
                z-index: 99;
                left: 50%;
                top: 64px;
                margin-left: -6px;
                background: url(../assets/imgs/header/header.png) no-repeat 0 0;
                background-position: -226px 0px;
              }

              .download-icon {
                width: 28px;
                height: 19px;
                position: absolute;
                top: 21px;
                left: 100px;
                background: url(../assets/imgs/header/header.png) no-repeat 0 0;
                background-position: -190px 0px;
              }
            }

          }

          li:hover {
            color: #fff;
            background-color: #000;
          }

        }
      }

      .login {
        position: absolute;
        top: 27px;
        right: 130px;
        color: #787878;
      }

      .user {
        position: absolute;
        top: 19px;
        right: 113px;

        .user-head {
          padding-left: 64px;

          .img {
            width: 30px;
            height: 30px;
            background-color: red;
          }
        }
      }
    }

    // 红条
    .box {
      background-color: rgb(194, 12, 12);
      height: 5px;
    }
  }
</style>
