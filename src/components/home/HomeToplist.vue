<template>
  <!-- 排行榜 -->
  <div class="home-toplist">
    <div class="tag-wrap">
      <div class="tag-title">
        <span class="title-text" @click="goToplistPage">榜单</span>
      </div>
      <div class="more">
        <span class="h-hand h-t-d-u fz-12" @click="goToplistPage">更多</span>
        <i class="icon-more"></i>
      </div>
    </div>
    <div class="toplist-wrap m-t-20">
      <div class="list-size" v-for="item in toplist" :key="item.id">
        <div class="toplist-title">
          <img :src="item.coverImgUrl">
          <div class="info-box">
            <div class="text fz-14 f-w-b">{{item.name}}</div>
            <div class="icon"></div>
          </div>
        </div>
        <template v-if="playlist['' + item.id]">
          <div class="song-wrap m-t-20">
            <div class="song-info p-l-20" v-for="(sitem, index) in playlist['' + item.id]" :key="sitem.id">
              <span class="fz-16 t-c-6">{{index + 1}}</span>
              <p class="m-0 p-l-10 t-c-0">{{sitem.name}}</p>
            </div>
          </div>
        </template>

        <div class="tolist-footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllToplist } from '@/http/api.js'
export default {
  name: 'HomeToplist',
  data () {
    return {
      // 所有榜单
      toplist: [],
      // 前三榜单
      playlist: {}
    }
  },
  methods: {
    goToplistPage () {
      this.$router.push('toplist')
    }
  },
  created () {
    getAllToplist().then(res => {
      // console.log('所有榜单', res)
      this.toplist = res.list
      this.toplist.length = 3
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style lang="less" scoped>
  // 榜单
  .toplist-wrap {
    height: 527px;
    background-color: yellow;
    display: flex;

    .list-size {
      width: 230px;
      height: 412px;
    }

    // 标题栏
    .toplist-title {
      padding: 20px 0 0 19px;
      height: 100px;
      display: flex;

      .info-box {
        margin: 6px 0 0 10px;
      }

      img {
        width: 80px;
      }
    }

    .song-wrap {
      width: 230px;
      height: 350px;
      background-color: #666;

      // 歌曲信息
      .song-info {
        display: flex;
        align-items: center;
        height: 32px;
        width: 230px;
        background-color: #fff;
        border: 1px solid rgba(204, 204, 204, .5);
      }
    }
  }
</style>
