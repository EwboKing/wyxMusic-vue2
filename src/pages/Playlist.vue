<template>
  <div class="playlist">
    <div class="playlist-wrap p-40">
      <div class="top">
        <div class="title t-c-3">
          <span class="fz-24 m-r-12">{{$route.query.cat?$route.query.cat:'全部'}}</span>
          <!-- 选择分类 -->
          <a-dropdown :trigger="['click']">
            <div class="chooseCate bg-btn2">
              <i class="bg-btn2">
                选择分类
                <em class="bg-icon"></em>
              </i>
            </div>
            <PlaylistCats slot="overlay" :activeCat="activeCat"></PlaylistCats>
          </a-dropdown>
        </div>
        <div class="hot bg-btn" @click="hotCat">热门</div>
      </div>
      <div class="bar">
        <div class="content-card" :style="{'--emptyWidth':emptyWidth}">
          <PlaylistClass :defaultPlaylist="defaultPlaylist" :showCreator="true" :isEll="true"></PlaylistClass>
          <div class="empty" :style="{'--emptyWidth' : emptyWidth}" v-if="emptyWidth"></div>
        </div>
        <a-pagination v-if="total > 25" style="margin: 0 auto;padding-top: 20px;" v-model="curPage" :total="total" @change="onChange" :pageSize="25"/>
      </div>

    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { getTopPlaylist } from '@/http/api.js'
import { tags } from '@/assets/data/tagsData.js'
import PlaylistClass from '@/components/playlist/PlaylistClass'
import PlaylistCats from '@/components/playlist/PlaylistCats'
export default {
  name: 'Playlist',
  components: { PlaylistClass, PlaylistCats },
  inject: ['reload'],
  data () {
    return {
      tags,
      // 显示歌单
      defaultPlaylist: [],
      // 数量
      total: 0,
      emptyWidth: '',
      has: false,
      cat: '',
      curPage: 1,
      order: '',
      activeCat: ''
    }
  },
  methods: {
    // 页码改变
    onChange (page) {
      if (!this.$route.query.cat) {
        this.cat = '全部'
      }
      this.goNewPlaylistPage(this.cat, this.order, page)
    },
    // 获取歌单列表
    getPlaylistByPage (page, order) {
      // this.curPage = page
      if (!this.$route.query.cat) {
        this.cat = this.tags[_.random(this.tags.length - 1)].name
      }
      // console.log(this.cat, page)
      getTopPlaylist(this.cat, page, order).then(res => {
        // console.log(res.playlists)
        this.total = res.total
        this.defaultPlaylist = res.playlists
        this.defaultPlaylist.forEach(item => {
          item.playCount = this.viewCountsChange(item.playCount)
        })
        // console.log(this.total)
      }).catch(err => {
        console.log(err)
      })
    },
    hotCat () {
      this.goNewPlaylistPage(this.cat, 'hot')
    }
  },
  created () {
    // 获取路由参数
    this.cat = this.$route.query.cat
    this.curPage = this.$route.query.page ? this.$route.query.page * 1 : 1
    this.order = this.$route.query.order
    // 获取歌单列表
    this.getPlaylistByPage(this.curPage, this.order)
    const num = 5 - this.total % 5
    if (num !== 5) {
      this.emptyWidth = num * 140 + (num - 1) * 30 + 'px'
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.reload()
    next()
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('setActiveCat', '')
    next()
  }
}
</script>

<style lang="less" scoped>
  // 重置分页样式
  @import '../assets/css/pagination.less';

  .playlist {
    width: 980px;
    margin: 0 auto;
    padding-bottom: 60px;
  }

  .playlist-wrap {
    width: 900px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 auto;

    .top {
      width: 900px;
      height: 42px;
      border-bottom: 2px solid #C10D0C;
      display: flex;
      justify-content: space-between;
      // 标题
      .title{
        display: flex;
        align-items: center;
        position: relative;
        .chooseCate{
          cursor: pointer;
          font-size: 12px;
          padding-right: 3px;
          background-position: right -100px;
          i{
            padding: 0 10px 0 15px;
            display: inline-block;
            line-height: 31px;
            background-position: 0 -59px;
            color: #0c73c2;
          }
          em{
            vertical-align: middle;
            margin-left: 2px;
            display: inline-block;
            width: 8px;
            height: 5px;
            background-position: -70px -543px;
          }
          &:hover{
            background-position: right -182px;
            i{
              background-position: 0 -141px;
            }
          }
        }
      }
      // 热门
      .hot{
        width: 46px;
        height: 29px;
        line-height: 29px;
        text-align: center;
        border-radius: 3px;
        background-position: 0 0;
        font-size: 12px;
        color: #fff;
        cursor: pointer;
        &:hover{
          text-decoration: underline;
        }
      }
    }

    .bar {
      display: flex;
      flex-wrap: wrap;
    }

    // 添加空div
    .empty{
      width: var(--emptyWidth);
    }
  }

</style>
