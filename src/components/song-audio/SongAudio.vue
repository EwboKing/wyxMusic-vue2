<template>
  <div class="song-audio">
    <audio ref="audioRef"
      :src="url"
      controls="controls"
      preload="true"
      :loop="isLoop"
      @canplay="startPlay"
      @ended="ended"
      @timeupdate="timeupdate">
    </audio>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getMusicUrlById } from '@/http/api'
export default {
  name: 'SongAudio',
  computed: {
    ...mapGetters([
      'id',
      'url',
      'isPlay',
      'currentTime',
      'changeTime',
      'autoNext',
      'volume',
      'isLoop',
      'listOfSongs'
    ])
  },
  watch: {
    isPlay () {
      this.togglePlay()
    },
    // 跳转到指定播放位置
    changeTime (n) {
      this.$refs.audioRef.currentTime = n
    },
    // 改变音量
    volume (n) {
      this.$refs.audioRef.volume = n
    }
  },
  methods: {
    startPlay () {
      const player = this.$refs.audioRef
      // console.log(this.isPlay)
      this.$store.commit('setDuration', player.duration)
      // console.log('&', this.$refs.audioRef.duration)

      // 谷歌禁止自动播放
      if (!this.defaultTag) {
        this.checkMusicUrl(this.url)
        // player.play()
        this.$store.commit('setIsPlay', true)
      } else {
        this.defaultTag = false
      }
    },
    // 播放/暂停
    togglePlay () {
      if (this.listOfSongs.index.length || this.url) {
        if (this.isPlay) {
          // 没有播放源则重新获取
          this.checkMusicUrl(this.url)
        } else {
          this.$refs.audioRef.pause()
        }
      }
    },
    // 播放完成之后触发
    ended () {
      this.$store.commit('setIsPlay', false)
      this.$store.commit('setCurrentTime', 0)
      this.$store.commit('setAutoNext', !this.autoNext)
    },
    // 音乐播放时记录音乐的播放位置
    timeupdate () {
      this.$store.commit('setCurrentTime', this.$refs.audioRef.currentTime)
      // console.log(this.$refs.audioRef.currentTime)
    },
    checkMusicUrl (url) {
      if (!url) {
        console.log('音乐地址无效')
        getMusicUrlById(this.id).then(res => {
          this.$store.commit('setUrl', res.data[0].url)
          this.$refs.audioRef.play()
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.$refs.audioRef.play()
      }
    }
  },
  data () {
    return {
      defaultTag: true
    }
  },
  created () {
    this.defaultTag = true
  }
}
</script>

<style lang="less" scoped>
  .song-audio{
    display: none;
  }
</style>
