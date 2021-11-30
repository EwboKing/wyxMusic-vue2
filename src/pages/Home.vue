<template>
  <div class="home">
    <Swiper></Swiper>
    <div class="module">
      <div class="wrap">

        <!-- 左侧 -->
        <div class="content-l">
          <!-- 热门推荐 -->
          <HotRecommend />
          <!-- 新碟上架 -->
          <AlbumNewest />
          <!-- 排行榜 -->
          <HomeToplist />
        </div>

        <!-- 右侧 -->
        <div class="content-r">
          <HotSinger></HotSinger>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import Swiper from '@/components/home/Swiper'
import HotRecommend from '@/components/home/HotRecommend'
import AlbumNewest from '@/components/home/AlbumNewest'
import HotSinger from '@/components/home/HotSinger'
import HomeToplist from '@/components/home/HomeToplist'
export default {
  name: 'Home',
  components: { Swiper, HotRecommend, AlbumNewest, HotSinger, HomeToplist },
  data () {
    return {
      // 所有榜单
      toplist: [],
      playlist: {}
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
  @import '../assets/css/content-layout.less';
</style>
