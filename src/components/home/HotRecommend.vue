<template>
  <!-- 热门推荐 -->
  <div>
    <!-- 标签栏 -->
    <div class="tag-wrap p-r-10">
      <!-- 热门推荐 -->
      <div class="tag-title">
        <span class="title-text t-c-3 h-hand m-l-34 fz-20" @click="goPlaylistPage">热门推荐</span>
      </div>
      <!-- 标签元素 -->
      <div class="tags">
        <div class="tag-item h-t-d-u h-hand m-t-2 fz-12" v-for="item in hotTagList" :key="item.path"
          @click="goNewPlaylistPage(item.name)">{{item.name}}</div>
      </div>
      <!-- 更多 -->
      <div class="more">
        <span class="h-hand h-t-d-u fz-12" @click="goPlaylistPage">更多</span>
        <i class="icon-more"></i>
      </div>
    </div>
    <!-- 歌单列表容器 -->
    <div>
      <PlaylistClass :defaultPlaylist="personalizedPlaylist"></PlaylistClass>
    </div>
  </div>
</template>

<script>
import { getPersonalizedPlaylist } from '@/http/api.js'
import { hotTagList } from '@/assets/data/tagsData.js'
import PlaylistClass from '@/components/playlist/PlaylistClass'
export default {
  name: 'HotRecommend',
  components: { PlaylistClass },
  data () {
    return {
      // 推荐歌单
      personalizedPlaylist: [],
      // 热门标签分类
      hotTagList
    }
  },
  methods: {
    goPlaylistPage () {
      this.$router.push('playlist')
    }
  },
  created () {
    getPersonalizedPlaylist(8).then(res => {
      // console.log('歌单', res)
      this.personalizedPlaylist = res.result
      this.personalizedPlaylist.forEach(item => {
        item.playCount = this.viewCountsChange(item.playCount)
      })
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style lang="less" scoped>
  @import '../../assets/css/home/homeTag.less';
</style>
