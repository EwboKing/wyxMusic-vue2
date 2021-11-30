<template>
  <div class="hot-singer">
    <!-- 未登录 -->
    <div class="my-info" v-if="!loginStatus">
      <p class="text fz-12">登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
      <div class="login-btn h-hand t-c-f fz-12" @click="openLoginDialog">用户登录</div>
    </div>
    <!-- 已登录 -->
    <div class="user-info p-t-20" v-else>
      <div class="user">
        <div class="img m-l-20"></div>
        <div class="info m-l-18">
          <p class="t-c-3 f-w-b">顾城紫槿</p>
          <div class="btn bg-btn2 m-t-20">
            <i class="bg-btn2">签到</i>
          </div>
        </div>
      </div>
      <div class="others">
        <div>
          <p>0</p>
          <span>歌单</span>
        </div>
        <div>
          <p>8</p>
          <span>收藏</span>
        </div>
        <div class="mv">
          <p>0</p>
          <span>MV</span>
        </div>
      </div>
    </div>

    <!-- 歌手列表 -->
    <div class="singer-wrap">
      <div class="hot-singer">
        <span class="t-c-3 f-w-b">热门歌手</span>
        <p class="h-hand t-c-6 h-t-d-u fz-12" @click="goHotSingerPage">查看全部 ></p>
      </div>
      <div class="singer-list h-hand" v-for="item in hotSingerList" :key="item.id" @click="goSongDetailById(item.id)">
        <div class="head"><img :src="`${item.picUrl}?param=62y62`"></div>
        <div class="info">
          <span class="fz-14 f-w-b t-c-3">{{item.name}}</span>
          <p class="fz-12">{{item.alias[0]}}</p>
        </div>
      </div>
      <div class="singer-btn h-hand">
        <em class="f-w-b t-c-3 fz-12">申请成为网易音乐人</em>
      </div>
    </div>
  </div>
</template>

<script>
import { getHotSingerList } from '@/http/api.js'
import { mapGetters } from 'vuex'
export default {
  name: 'HotSinger',
  data () {
    return {
      // 热门歌手
      hotSingerList: []
    }
  },
  methods: {
    goHotSingerPage () {
      this.$router.push('artist/list?type=1&area=7')
    }
  },
  created () {
    getHotSingerList(5).then(res => {
      // console.log('歌手', res)
      this.hotSingerList = res.artists
    }).catch(err => {
      console.log(err)
    })
  },
  computed: {
    ...mapGetters(['loginStatus'])
  }
}
</script>

<style lang="less" scoped>
  .hot-singer {
    width: 250px;

    // 用户登录
    .my-info {
      height: 125px;
      box-shadow: 1px 1px 3px #333;
      background: url(../../assets/imgs/index.png) no-repeat 0 9999px;
      background-position: 0 0;

      // 文本
      .text {
        width: 205px;
        margin: 0 auto;
        padding: 16px 0;
      }

      // 登录按钮
      .login-btn {
        text-align: center;
        width: 100px;
        line-height: 31px;
        text-shadow: 0 1px 0 #8a060b;
        margin: 0 auto;
        background: url(../../assets/imgs/index.png) no-repeat;
        background-position: 0 -195px;
      }

      .login-btn:hover {
        background-position: -110px -195px;
      }
    }

    // 已登录
    .user-info {
      height: 185px;
      background: url(../../assets/imgs/index.png) no-repeat 0 -270px;

      .user {
        display: flex;

        .img {
          width: 80px;
          height: 80px;
          border: 1px solid #000;
        }

        .info {
          width: 115px;
          height: 87px;
          background-color: #bfa;
          position: relative;

          .btn {
            position: absolute;
            left: -17px;
            width: 110px;
            background-position: right -428px;
            text-align: center;
            font-size: 12px;
            padding-left: 18px;
            cursor: pointer;

            i {
              color: #fff;
              width: 90px;
              line-height: 31px;
              display: inline-block;
              padding: 0 15px 0 20px;
              background-position: 0 -387px;
            }

            &:hover {
              background-position: right -510px;

              i {
                background-position: 0 -469px;
              }
            }
          }
        }
      }

      .others {
        display: flex;
        margin: 15px 0 0 20px;
        color: #666;

        div {
          width: 45px;
          margin-right: 18px;
          border-right: 1px solid #e4e4e4;
          cursor: pointer;

          &:hover {
            color: #0c73c2;
          }
        }

        p {
          margin: 0;
          font-size: 20px;
        }

        span {
          font-size: 12px;
        }

        .mv {
          border: none;
        }

      }
    }

    // 歌手显示区域
    .singer-wrap {
      height: 455px;
      margin-top: 15px;

      // 标题头
      .hot-singer {
        width: 210px;
        height: 24px;
        margin: 0 auto;
        border-bottom: 1px solid #ccc;

        p {
          float: right;
        }

      }

      // 歌手
      .singer-list {
        width: 210px;
        height: 62px;
        display: flex;
        margin: 14px auto;
        background-color: #fafafa;
        border: 1px solid rgba(204, 204, 204, .5);

        .info {
          padding-left: 14px;

          span {
            display: inline-block;
            margin-top: 8px;
          }

          p {
            margin-top: 8px;

          }
        }
      }

      .singer-list:hover {
        background-color: #f4f4f4;
      }

      .singer-btn {
        height: 30px;
        width: 210px;
        border-radius: 4px;
        margin: 0 auto;
        border-right: 1px solid #ccc;
        // background-color: #ccc;
        background: url(../../assets/imgs/button/button2.png) no-repeat;
        background-position: 0 -59px;
        text-align: center;

        em {
          display: inline-block;
          line-height: 30px;
        }
      }

      .singer-btn:hover {
        background-position: 0 -141px;
      }

    }

  }
</style>
