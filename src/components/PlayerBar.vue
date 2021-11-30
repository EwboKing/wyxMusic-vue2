<template>
  <div class="player-bar" ref="playBarRef">
    <div class="player">

      <!-- 操作 - 绝对定位 -->
      <div class="opts-wrap">
        <!-- 居中容器 -->
        <div class="opts">
          <!-- flex 布局 -->
          <div class="flex">
            <!-- 按钮 -->
            <div class="btns">
              <!-- 上一首 -->
              <div class="pre" title="上一首" @click="prev"></div>
              <!-- 播放/暂停 -->
              <div :class="playOrPauseIcon" @click="togglePlay" title="播放/暂停"></div>
              <!-- 下一首 -->
              <div class="next" title="下一首" @click="next"></div>
            </div>
            <!-- 歌曲图片 -->
            <div class="m-img m-r-15 h-hand" @click="goSongDetailById(id)"><img :src="picUrl"></div>
            <!-- 播放进度及信息 -->
            <div class="play-bar">
              <!-- 播放信息 -->
              <div class="play-info fz-12 m-t-3">
                <!-- 歌名 -->
                <p class="m-r-15" style="color: #e8e8e8;" @click="goSongDetailById(id)" :title="title">{{title}}</p>
                <!-- 歌手名 -->
                <div v-for="(item,index) in artist" :key="index">
                  <p @click="goArtistDetailById(item.id)" :title="item.name">{{item.name}}</p>
                  <span v-if="index < artist.length - 1">/</span>
                </div>
                <div class="link bg-player" v-if="title!=='title'"></div>
              </div>
              <!-- 进度条容器 -->
              <div class="time-bar">
                <div class="progress-box">
                  <!-- 进度条 -->
                  <div ref="progressRef" class="play-bg" @mousemove="mousemove" @click="handleChangePro">
                    <div ref="curProgressRef" class="cur-progress" :style="{ width : curlength + '%'}" >
                      <!-- 拖动点 -->
                      <div ref="idotRef" class="idot bg-iconall" @mousedown="mousedown" @mouseup="mouseup"></div>
                    </div>
                  </div>
                </div>
                <!-- 时间 -->
                <div class="time m-l-10">
                  <em class="current-time">{{nowTime}}</em> /
                  <em class="song-time">{{songTime}}</em>
                </div>
              </div>
            </div>
            <!-- 收藏/分享 -->
            <div class="opes m-l-25">
              <div class="icon-collect bg-player m-r-5" title="收藏"></div>
              <div class="icon-share bg-player" title="分享"></div>
            </div>
            <!-- 其他 -->
            <div class="others m-l-20">
              <!-- 音量条 -->
              <div class="m-vol" :style="{'visibility': showVol ? 'visible' : 'hidden'}">
                <div class="bg-player"></div>
                <a-slider v-model="curVol" :tooltipVisible="false" vertical :default-value="50" />
              </div>
              <!-- 音量 -->
              <div class="icon-vol icon-glo h-hand" @click="showVolBtn" :class="{'volno' : !curVol}"></div>
              <!-- 播放模式 -->
              <div :title="this.stip"
                :class="{'icon-loop':loopMode,'icon-shuffle':shuffleMode, 'icon-one':oneMode, 'icon-glo':true, 'h-hand':true}"
                @click="changePlayMode"></div>
              <!-- 播放列表 -->
              <div class="icon-playlist h-hand" title="播放列表" @click.stop="openList" >
                <span class="tip" v-if="addTip">已添加到播放列表</span>
                <span class="tip" v-if="startTip">已开始播放</span>
                <div class="list bg-player">{{listOfSongs.index.length}}</div>
              </div>
              <!-- 循环提示  -->
              <div class="stip bg-player" v-show="showStip">{{stip}}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 背景 -->
      <div class="updn">
        <div class="bg-player"></div>
      </div>

      <!-- 播放列表 -->
      <div class="listDialog" v-show="showList">
        <List></List>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'
import List from '@/components/float-list/List.vue'
export default {
  name: 'PlayerBar',
  components: { List },
  computed: {
    ...mapGetters([
      'isPlay',
      'id',
      'url',
      'title',
      'artist',
      'picUrl',
      'duration',
      'currentTime',
      'listIndex',
      'listOfSongs',
      'autoNext',
      'showList',
      'startTip',
      'addTip'
      // 'changeTime',
      // 'volume'
    ])
  },
  data () {
    return {
      // 播放进度
      nowTime: '00:00',
      songTime: '00:00',
      // 音量相关
      showVol: false,
      curVol: 50,
      // 播放模式
      loopMode: true,
      shuffleMode: false,
      oneMode: false,
      modeNum: 0,
      stip: '',
      showStip: false,
      // 进度条
      curlength: 0,
      prolength: 0,
      offsetProX: 0,
      // 拖动的标志
      tag: false,
      playOrPauseIcon: 'play'
    }
  },
  methods: {
    // 音量调节
    showVolBtn () {
      this.showVol = !this.showVol
      setTimeout(() => {
        this.showVol = false
      }, 5000)
    },
    // 改变播放模式
    changePlayMode () {
      const tips = ['循环', '随机', '单曲循环']
      this.modeNum += 1
      this.loopMode = false
      this.shuffleMode = false
      this.oneMode = false
      if (this.modeNum % 3 === 0) {
        // 循环模式
        this.loopMode = true
      } else if (this.modeNum % 3 === 1) {
        this.shuffleMode = true
        this.$store.commit('setIsLoop', false)
      } else {
        this.oneMode = true
        this.$store.commit('setIsLoop', true)
      }
      // 如果列表只有一首，开启单曲循环
      if (this.listOfSongs.index.length === 1) {
        this.$store.commit('setIsLoop', true)
      } else {
        this.$store.commit('setIsLoop', false)
      }
      this.stip = tips[this.modeNum % 3]
      this.showStip = true
      setTimeout(() => {
        this.showStip = false
      }, 3000)
    },
    // 控制音乐播放
    togglePlay () {
      this.isPlay ? this.$store.commit('setIsPlay', false) : this.$store.commit('setIsPlay', true)
      // if (this.isPlay) {
      //   this.$store.commit('setIsPlay', false)
      // } else {
      //   this.$store.commit('setIsPlay', true)
      // }
    },
    // 时间格式转换
    formatSeconds (val) {
      const time = parseInt(val)
      let res = ''
      const hour = parseInt(time / 3600)
      const min = parseInt((time / 60) % 60)
      const sec = parseInt(time % 60)
      if (hour > 0) {
        if (hour < 10) { res = `0${hour}:` } else { res = `${hour}:` }
      }
      if (min > 0) {
        if (min < 10) { res += `0${min}:` } else { res += `${min}:` }
      } else {
        res += '00:'
      }
      if (sec > 0) {
        if (sec < 10) { res += `0${sec}` } else { res += sec }
      } else {
        res += '00'
      }
      return res
    },
    // 拖动点事件
    mousedown () {
      this.tag = true
    },
    mouseup () {
      this.tag = false
    },
    mousemove (e) {
      if (!this.duration) {
        return false
      }

      if (this.tag) {
        const moveX = e.clientX - this.offsetProX
        let newPercent = moveX / this.prolength * 100
        if (newPercent > 99) {
          newPercent = 100
        }
        if (newPercent < 1) {
          newPercent = 0
        }
        this.curlength = newPercent
        this.changeTime(newPercent)
      }
    },
    // 点击进度条事件
    handleChangePro (e) {
      if (!this.tag) {
        const curl = (e.clientX - this.offsetProX) / this.prolength * 100
        this.curlength = curl
        this.changeTime(curl)
      }
    },
    // 更改歌曲进度
    changeTime (percent) {
      const newCurrentTime = percent * 0.01 * this.duration
      this.$store.commit('setChangeTime', newCurrentTime)
    },
    // 上一首
    prev () {
      console.log('执行了prev')
      // 歌曲列表数目大于1首才会执行
      if (this.listOfSongs.index.length > 1) {
        // 循环模式
        if (this.loopMode) {
          console.log('循环模式')
          // 不是第一首
          if (this.listIndex) {
            console.log('不是第一首')
            this.playSong(this.listOfSongs.playlist[this.listOfSongs.index[this.listIndex - 1]])
            // this.$store.commit('setListIndex', this.listIndex + 1)
          } else {
            console.log('第一首')
            this.playSong(this.listOfSongs.playlist[this.listOfSongs.index[this.listOfSongs.index.length - 1]])
            // this.$store.commit('setListIndex', 0)
          }
        } else if (this.shuffleMode) {
          // 随机模式
          console.log('随机模式')
          const num = _.random(this.listOfSongs.index.length - 1)
          this.playSong(this.listOfSongs.playlist[this.listOfSongs.index[num]])
          // this.$store.commit('setListIndex', num)
        } else {
          // 单曲循环
          console.log('单曲循环 -> 上一首')
          this.playSong(this.listOfSongs.playlist[this.listOfSongs.index[this.listIndex - 1]])
          // this.$store.commit('setListIndex', this.listIndex + 1)
        }
      }
    },
    // 下一首
    next (tag = 0) {
      console.log('执行了next')
      // 歌曲列表数目大于1首才会执行
      if (this.listOfSongs.index.length > 1) {
        // 循环模式
        if (this.loopMode) {
          console.log('循环模式')
          // 不是最后一首
          if (this.listIndex < this.listOfSongs.index.length - 1) {
            console.log('不是最后一首')
            this.playSong(this.listOfSongs.playlist[this.listOfSongs.index[this.listIndex + 1]])
            // this.$store.commit('setListIndex', this.listIndex + 1)
          } else {
            console.log('最后一首')
            this.playSong(this.listOfSongs.playlist[this.listOfSongs.index[0]])
            // this.$store.commit('setListIndex', 0)
          }
        } else if (this.shuffleMode) {
          // 随机模式
          console.log('随机模式')
          const num = _.random(this.listOfSongs.index.length - 1)
          this.playSong(this.listOfSongs.playlist[this.listOfSongs.index[num]])
          // this.$store.commit('setListIndex', num)
        } else {
          // 单曲循环模式点击下一首切换下一首
          if (!tag) {
            console.log('单曲循环 -> 下一首')
            this.playSong(this.listOfSongs.playlist[this.listOfSongs.index[this.listIndex + 1]])
            // this.$store.commit('setListIndex', this.listIndex + 1)
          }
        }
      }
    },
    // 打开/隐藏播放列表
    openList () {
      this.$store.commit('setShowList', !this.showList)
    }
  },
  mounted () {
    this.prolength = this.$refs.progressRef.getBoundingClientRect().width
    this.offsetProX = this.$refs.progressRef.offsetLeft
    // 点击其他区域关闭播放列表
    document.addEventListener('click', e => {
      const playBar = this.$refs.playBarRef
      if (playBar && this.showList) {
        if (!playBar.contains(e.target)) {
          this.$store.commit('setShowList', false)
        }
      }
    })
  },
  watch: {
    currentTime () {
      this.curlength = (this.currentTime / this.duration) * 100
      this.nowTime = this.formatSeconds(this.currentTime)
      this.songTime = this.formatSeconds(this.duration)
    },
    curVol () {
      this.$store.commit('setVolume', this.curVol / 100)
    },
    autoNext () {
      this.next(true)
    },
    listOfSongs () {
      const curIndex = _.indexOf(this.listOfSongs.index, this.id)
      // console.log('当前播放歌曲的索引为', this.listIndex)
      // console.log('实际索引为', curIndex)
      if (this.listOfSongs.index.length < 2) {
        if (this.listOfSongs.index.length === 1) {
          this.$store.commit('setIsLoop', true)
        } else {
          this.$store.commit('setIsLoop', false)
        }
      }
      this.$store.commit('setListIndex', curIndex)
    },
    id () {
      const curIndex = _.indexOf(this.listOfSongs.index, this.id)
      this.$store.commit('setListIndex', curIndex)
    },
    addTip () {
      setTimeout(() => {
        this.$store.commit('setAddTip', false)
      }, 3000)
    },
    startTip () {
      setTimeout(() => {
        this.$store.commit('setStartTip', false)
      }, 3000)
    },
    isPlay () {
      this.isPlay ? this.playOrPauseIcon = 'pause' : this.playOrPauseIcon = 'play'
    }
  }
}
</script>

<style lang="less" scoped>
  .player-bar {
    // display: flex;
    // justify-content: center;
    position: fixed;
    width: 100%;
    height: 0;
    // bottom: 300px;
    bottom: 0;
    left: 0;
    z-index: 1002;

    .player {
      position: absolute;
      top: -53px;
      height: 53px;
      width: 100%;
    }

    // 背景
    .updn {
      position: absolute;
      top: 0px;
      left: 0;
      width: 100%;
      z-index: 11;

      .bg-player {
        background-position: 0 0;
        background-repeat: repeat-x;
        height: 53px;
      }
    }

    // 操作
    .opts-wrap {
      position: absolute;
      width: 100%;
      z-index: 15;

      .opts {
        margin: 0 auto;
        width: 980px;

        .flex {
          display: flex;
          align-items: center;
          height: 58px;

          // 按钮
          .btns {
            display: flex;
            align-items: center;
            width: 137px;

            // 公共样式
            div {
              width: 28px;
              height: 28px;
              margin-right: 8px;
              cursor: pointer;
              background: url(../assets/imgs/playerbar/player.png);
            }

            // 上一首
            .pre {
              background-position: 0 -130px;

              &:hover {
                background-position: -30px -130px;
              }
            }

            // 播放
            .play {
              width: 36px;
              height: 36px;
              background-position: 0 -204px;

              &:hover {
                background-position: -40px -204px;
              }
            }

            // 暂停
            .pause {
              width: 36px;
              height: 36px;
              background-position: 0 -165px;

              &:hover {
                background-position: -40px -165px;
              }
            }

            // 下一首
            .next {
              background-position: -80px -130px;

              &:hover {
                background-position: -110px -130px;
              }
            }
          }

          // 歌曲图片
          .m-img {
            width: 34px;
            height: 34px;

            img {
              width: inherit;
              height: inherit;
            }
          }

          // 播放进度及信息
          .play-bar {
            height: 47px;

            // 播放信息
            .play-info {
              display: flex;
              height: 18px;

              p:hover {
                text-decoration: underline;
                cursor: pointer;
              }

              div {
                display: flex;
                color: #9b9b9b;
              }

              // 链接
              .link {
                width: 14px;
                height: 15px;
                background-position: -110px -103px;
                margin: 3px 0 0 13px;

                &:hover {
                  background-position: -130px -103px;
                }
              }
            }

            .time-bar {
              display: flex;
            }

            // 进度条宽度
            .progress-box {
              width: 466px;
              margin-top: 7px;
            }

            // 公共背景图
            .play-bg,
            .cur-progress {
              height: 9px;
              background: url(../assets/imgs/playerbar/statbar.png) no-repeat 0 9999px;
            }

            // 进度条
            .play-bg {
              width: 466px;
              position: absolute;
              background-position: right 0;

              // 当前进度
              .cur-progress {
                background-position: left -66px;
                position: absolute;

                // 拖动点
                .idot {
                  width: 22px;
                  height: 24px;
                  position: absolute;
                  top: -7px;
                  right: -8px;
                  background-position: 0 -250px;

                  &:hover {
                    background-position: 0 -280px;
                  }
                }
              }
            }

            // 时间显示
            .time {
              color: #797979;
              font-size: 12px;
              margin-top: 2px;
            }
          }

          // 收藏/分享
          .opes {
            display: flex;

            div {
              width: 25px;
              height: 25px;
              cursor: pointer;
            }

            .icon-collect {
              background-position: -88px -163px;

              &:hover {
                background-position: -88px -189px;
              }
            }

            .icon-share {
              background-position: -114px -163px;

              &:hover {
                background-position: -114px -189px;
              }
            }
          }

          // 其他
          .others {
            position: relative;
            display: flex;

            // 公共样式
            .icon-glo {
              width: 25px;
              height: 25px;
              margin-right: 5px;
              background: url(../assets/imgs/playerbar/player.png) no-repeat 0 9999px;
            }

            // 音量条
            .m-vol {
              position: absolute;
              top: -124px;
              left: -4px;

              /deep/ .ant-slider-vertical {
                margin: 11.5px 0 0 10px;
                height: 92px;
              }

              /deep/ .ant-slider-handle {
                width: 12px;
                height: 12px;
                margin-left: -3.5px;
                background-color: #b9180f;
                border: solid 3.5px #fff;
                box-shadow: none;

                &:hover {
                  box-shadow: 0 0 10px #fff !important;
                }
              }

              /deep/ .ant-slider-track {
                background-color: #c70c0c;
              }

              /deep/ .ant-slider-rail {
                background-color: #181818 !important;
              }

              .ant-tooltip-open {
                color: transparent !important;
              }

              // vol 背景
              .bg-player {
                width: 32px;
                height: 113px;
                position: absolute;
                background-position: 0 -503px;
              }
            }

            // 音量
            .icon-vol {
              background-position: -2px -248px;

              &:hover {
                background-position: -31px -248px;
              }
            }

            // 静音
            .volno {
              background-position: -104px -69px;

              &:hover {
                background-position: -126px -69px;
              }
            }

            // 循环
            .icon-loop {
              background-position: -3px -344px;

              &:hover {
                background-position: -33px -344px;
              }
            }

            // 随机
            .icon-shuffle {
              background-position: -66px -248px;

              &:hover {
                background-position: -93px -248px;
              }
            }

            // 单曲
            .icon-one {
              background-position: -66px -344px;

              &:hover {
                background-position: -93px -344px;
              }
            }

            // 播放列表
            .icon-playlist {
              font-size: 12px;

              // 提示
              .tip {
                display: block;
                width: 152px;
                height: 49px;
                line-height: 37px;
                position: absolute;
                top: -61px;
                left: 0;
                text-align: center;
                color: #fff;
                background: url(../assets/imgs/playerbar/player.png) no-repeat 0 -287px;
              }

              // 列表
              .list {
                width: 59px;
                line-height: 27px;
                color: #666;
                background-position: -42px -68px;
                text-shadow: 0 1px 0 #080707;
                text-align: center;
                padding-left: 21px;

                &:hover {
                  background-position: -42px -98px;
                }
              }
            }

            // 循环提示
            .stip {
              position: absolute;
              text-align: center;
              color: #fff;
              line-height: 34px;
              width: 81px;
              top: -46px;
              left: 4px;
              height: 39px;
              background-position: 0 -457px;
              font-size: 12px;
              cursor: default;
            }
          }
        }
      }
    }

    // 播放列表/歌词
    .listDialog {
      position: absolute;
      left: 50%;
      bottom: 47px;
      width: 986px;
      height: 300px;
      margin-left: -500px;

    }
  }
</style>
