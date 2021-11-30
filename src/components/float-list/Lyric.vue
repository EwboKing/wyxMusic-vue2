<template>
  <div class="lyric">
    <div class="lrc" ref="lyricArrRef" v-if="lrc.length" style="transition: all 0.6s linear;">
      <p v-for="(item,index) in lrc" :key="item.uid" :data-index="index" ref="lyricRef" :style="lyricColor(index)">{{item.lyric}}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Lyric',
  data () {
    return {
      lrc: [],
      lrcIndex: 0
    }
  },
  methods: {
    // 解析歌词
    parseLyric (text) {
      // 每行歌词的数组
      const lineArr = text.split('\n')
      // 时间格式的正则
      const regTime = /\[\d{2}:\d{2}.\d{2,3}\]/
      const res = []
      lineArr.forEach(item => {
        const obj = {}
        const time = item.match(regTime)
        if (item.split(']')[1]) {
          obj.lyric = item.split(']')[1].trim() === '' ? '' : item.split(']')[1].trim()
          obj.time = time ? this.formatLyricTime(time[0].slice(1, time[0].length - 1)) : 0
          obj.uid = Math.random().toString().slice(-6)
          if (obj.lyric === '') {
            console.log('这一行没有歌词')
          } else {
            res.push(obj)
          // console.log(res)
          }
        }
      })
      // console.log(res)
      return res
    },
    formatLyricTime (time) { // 格式化歌词的时间 转换成 sss:ms
      const regMin = /.*:/
      const regSec = /:.*\./
      const regMs = /\./

      const min = parseInt(time.match(regMin)[0].slice(0, 2))
      let sec = parseInt(time.match(regSec)[0].slice(1, 3))
      const ms = time.slice(time.match(regMs).index + 1, time.match(regMs).index + 3)
      if (min !== 0) {
        sec += min * 60
      }
      return Number(sec + '.' + ms)
    },
    lyricColor (index) {
      if (this.lrcIndex === index) {
        return {
          color: '#ffffff',
          'font-size': '14px'
        }
      } else {
        return {
          color: '#989898',
          'font-size': '12px'
        }
      }
    }
  },
  computed: {
    ...mapGetters(['lyric', 'currentTime'])
  },
  watch: {
    lyric () {
      this.lrc = this.parseLyric(this.lyric)
    },
    currentTime () {
      for (let i = 0; i < this.lrc.length; i++) {
        if (this.currentTime > (parseInt(this.lrc[i].time))) {
          const index = this.$refs.lyricRef[i].dataset.index
          if (i === parseInt(index)) {
            this.lrcIndex = i
            this.$refs.lyricArrRef.style.transform = `translateY(${170 - (30 * (i + 3))}px)`
          }
        }
      }
    }
  },
  mounted () {
    if (this.lyric) { this.lrc = this.parseLyric(this.lyric) }
  }
}
</script>

<style lang="less" scoped>
  .lyric{
    text-align: center;
    .lrc{
      transform: translateY(0px);
    }
  }
</style>
