<template>
  <div class="search">
    <div class="search-card p-40">
      <!-- 搜索框 -->
      <div class="search-box">
        <a-input-search placeholder="音乐/视频/电台/用户" enter-button @search="onSearch(value)" v-model="value"/>
      </div>
      <!-- 搜索提示 -->
      <div class="search-tip">
        <div class="snote">
          <em class="fz-12" v-if="keyword">搜索“{{keyword}}”，找到<span style="color: #c20c0c;"> {{total}} </span>{{tag}}</em>
        </div>
      </div>
      <!-- 搜索结果 -->
      <div class="result-card">
        <div class="result-container">
          <a-tabs :default-active-key="type" @change="tabsChange" size="large" v-model="type">
            <a-tab-pane key="1" tab="单曲">
              <div v-if="songs.length">
                <Song :songList="songs"></Song>
              </div>
            </a-tab-pane>
            <a-tab-pane key="100" tab="歌手">
              <div v-if="artists.length">
                <Artists :artists="artists"></Artists>
              </div>
            </a-tab-pane>
            <a-tab-pane key="10" tab="专辑">
              <Albums :albums="albums"></Albums>
            </a-tab-pane>
            <a-tab-pane key="1014" tab="视频">
              3
              <!-- <Song></Song> -->
            </a-tab-pane>
            <a-tab-pane key="1006" tab="歌词">
              4
              <!-- <Song></Song> -->
            </a-tab-pane>
            <a-tab-pane key="1000" tab="歌单">
              5
              <!-- <Song></Song> -->
            </a-tab-pane>
          </a-tabs>
          <div class="line"></div>
          <div style="display: flex;" v-if="total > 20">
            <a-pagination style="margin: 0 auto;padding-top: 20px;" v-model="curPage" :total="total" @change="pageChange" :pageSize="30"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { searchByKeyword } from '@/http/api.js'
// import { mapGetters } from 'vuex'
import Song from '@/components/search/Song'
import Artists from '@/components/search/Artists'
import Albums from '@/components/search/Albums'
export default {
  name: 'Search',
  inject: ['reload'],
  components: { Song, Artists, Albums },
  data () {
    return {
      value: '',
      // 搜索关键字
      keyword: '',
      // 搜索类型
      type: 1,
      // 搜索数量
      total: 0,
      // 搜索结果
      songs: [],
      artists: [],
      albums: [],
      // 当前页码
      curPage: 1,
      // 搜索标签提示
      tag: '',
      curKey: 1
    }
  },

  methods: {
    // 标签页改变
    tabsChange (key) {
      // const keyArr = [1, 100, 10, 1014, 1006, 1000]
      this.onSearch(this.keyword, key)
    },
    // 获取搜索结果
    getResList (keyword, type = 1, page = 1) {
      if (keyword !== '') {
        searchByKeyword(keyword, type, page).then(res => {
          // console.log(res)
          switch (type) {
            case '1' : {
              this.tag = '首单曲'
              if (page === 1) {
                this.total = res.result.songCount
              }
              this.songs = res.result.songs
              break
            }
            case '100': {
              this.tag = '个歌手'
              if (page === 1) {
                this.total = res.result.artistCount
              }
              this.artists = this.changeColor(res.result.artists)
              break
            }
            case '10': {
              this.tag = '张专辑'
              if (page === 1) {
                this.total = res.result.albumCount
              }
              this.albums = this.changeColor(res.result.albums)
              break
            }
            case '1014': {
              this.tag = '个视频'
              break
            }
            case '1006': {
              this.tag = '个歌词'
              break
            }
            case '1000': {
              this.tag = '个歌单'
              break
            }
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    // 页码改变
    pageChange (page) {
      this.getResList(this.value, this.type, page)
    }
  },
  computed: {
    // ...mapGetters(['showSnote', 'searchCount'])
  },
  watch: {
    keyword () {
      this.value = this.keyword
    }
  },
  created () {
    // 获取参数
    this.keyword = this.$route.query.keyword
    this.type = this.$route.query.type
    // 获取搜索结果
    this.getResList(this.keyword, this.type)
  },
  beforeRouteUpdate (to, from, next) {
    this.reload()
    next()
  }
}
</script>

<style lang="less" scoped>
  @import '../assets/css/pagination.less';
  // 修改搜索框默认样式
  /deep/ .ant-input{
    height: 40px;
    border: 1px solid #ccc;
    box-shadow: inset 0px 2px 6px #ccc;
    font-size: 12px;
    color: #333;
  }
  /deep/ .ant-input-search-button{
    width: 50px;
    height: 40px;
    border: none;
    transition: none;
    background: url(../assets/imgs/sprite.png) no-repeat -370px 0;
    i{
      display: none;
    }
    &:hover{
      background-position: -430px 0;
    }
  }

  // 修改标签页的默认样式
  /deep/ .ant-tabs-ink-bar{
    background-color: #d13030;
    top: -1.5px;
    height: 2.5px;
  }

  /deep/ .ant-tabs-tab-active{
    color: #333;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    background: #fff !important;
  }

  /deep/ .ant-tabs-tab:hover{
    color: #333;
    &::after{
      content: '';
      width: 152px;
      height: 2.5px;
      position: absolute;
      top: -1.5px;
      left: -1px;
      background-color: #d13030;
    }
  }

  /deep/ .ant-tabs-tab{
    width: 150px;
    text-align: center;
    margin: 0;
    padding: 20px 0;
    background: #f8f8f8;
  }

  /deep/ .ant-tabs-bar{
    margin: 0;
  }

  /deep/ .ant-tabs-nav{
    border: 2px solid #ccc;
  }

  .search {
    width: 980px;
    margin: 0 auto;

    .search-card {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  // 搜索框
  .search-box {
    width: 420px;
    // height: 40px;
    // background: url(../assets/imgs/sprite.png) no-repeat 0 0;
  }

  // 搜索提示
  .search-tip {
    margin: 28px 0 17px;
    width: 100%;
  }

  .result-card {
    // width: 900px;
    // background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    .result-container{
      width: 100%;
      height: 100%;
      position: relative;
      // background-color: #f1f3f4;
    }
  }

</style>
