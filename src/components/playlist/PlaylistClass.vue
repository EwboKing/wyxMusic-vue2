<template>
  <div class="content-card">
    <div class="content-wrap m-t-25" v-for="(item, idx) in defaultPlaylist" :key="idx">
      <div class="div-box">
        <!-- 底部遮罩 -->
        <div class="mask-bottom t-c-c m-t-113">
          <i class="listen-icon"></i>
          <span class="play-num m-t-5">{{item.playCount}}</span>
          <i class="play-icon h-hand" @click="playAll(item.id)"></i>
        </div>
        <!-- 图片遮罩 -->
        <div class="img-mask h-hand" @click="goPlaylistDetailById(item.id)"></div>
        <img :src="item.coverImgUrl || item.picUrl">
        <i class="jp bg-icon2" v-if="item.highQuality"></i>
      </div>
      <p class="fz-14 h-hand h-t-d-u" :class="{p:isEll}" href="" @click="goPlaylistDetailById(item.id)">{{item.name}}</p>
      <p v-if="showCreator" class="p-c">
        <em class="t-c-9">by </em>
        <span class="creator">{{item.creator.nickname}}</span>
        <img v-if="item.creator.avatarDetail" :src="item.creator.avatarDetail.identityIconUrl" class="img">
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getPlaylistDetailById } from '@/http/api.js'
export default {
  name: 'PlaylistClass',
  computed: {
    ...mapGetters(['listOfSongs'])
  },
  props: {
    defaultPlaylist: {
      type: Array
    },
    showCreator: {
      type: Boolean,
      default: false
    },
    isEll: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    playAll (id) {
      getPlaylistDetailById(id).then(res => {
        this.addAllToPlaylist(res.playlist.tracks, true)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../assets/css/content-playlist.less';
</style>
