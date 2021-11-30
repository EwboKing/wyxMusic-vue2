import { getMusicUrlById, getSongBySongId, getLyric } from '@/http/api'
export default {
  methods: {
    viewCountsChange (num) {
      const newNum = ['', '']
      if (num < 100000) {
        return num
      } else {
        newNum[0] = parseInt(num / 10000)
        newNum[1] = '万'
        return newNum.join('')
      }
    },
    // 添加一首歌到播放列表
    async addToPlaylist (id, name, ar, al, dt, callback) {
      if (!al.picUrl) {
        const { songs } = await getSongBySongId(id)
        al = songs[0].al
      }
      const obj = { id, name, ar, al, dt }

      if (!this.listOfSongs.playlist[id]) {
        this.$store.commit('setListOfSongs', obj)
      }

      if (callback) {
        callback(obj)
        this.$store.commit('setStartTip', true)
      } else {
        this.$store.commit('setAddTip', true)
      }

      /**
      getMusicUrlById(id).then(res => {
        // this.$set(songInfo, 'musicUrl', res.data[0].url)

        getSongBySongId(id).then(res => {
          // this.$set(songInfo, 'name', res.songs[0].name)
          // this.$set(songInfo, 'artists', res.songs[0].ar)
          // this.$set(songInfo, 'picUrl', res.songs[0].al.picUrl)

          getLyric(id).then(res => {
            // this.$set(songInfo, 'lyric', res.lrc.lyric)

            // this.$store.commit('setListOfSongs', songInfo)

            if (callback) {
              // callback(songInfo)
              // this.$store.commit('setStartTip', true)
            } else {
              // this.$store.commit('setAddTip', true)
            }
          }).catch(err => {
            console.log(err)
          })
        }).catch(err => {
          console.log(err)
        })
      }).catch(err => {
        console.log(err)
      })
      **/
    },
    // 播放歌曲
    async playSong (obj) {
      // 播放图标
      this.playOrPauseIcon = 'pause'
      // console.log('playSong', obj)
      const { data: musicUrl } = await getMusicUrlById(obj.id)
      const { lrc } = await getLyric(obj.id)
      // 设置歌曲 id
      this.$store.commit('setId', obj.id)
      // 设置歌曲图片
      this.$store.commit('setPicUrl', obj.al.picUrl)
      // 设置歌曲名字
      this.$store.commit('setTitle', obj.name)
      // 设置歌手名字
      this.$store.commit('setArtist', obj.ar)
      // 设置音乐地址
      this.$store.commit('setUrl', musicUrl[0].url)
      // 设置歌词
      this.$store.commit('setLyric', lrc.lyric)
      // 开始播放
      this.$store.commit('setIsPlay', true)
    },
    // 添加歌单的所有歌曲到播放列表并判断是否播放第一首
    addAllToPlaylist (arr, isPlay = false) {
      arr.forEach(item => {
        if (!isPlay) {
          this.addToPlaylist(item.id, item.name, item.ar, item.al, item.dt)
        } else {
          this.addToPlaylist(item.id, item.name, item.ar, item.al, item.dt, this.playSong)
          isPlay = false
        }
      })
    },
    // 打开登录对话框
    openLoginDialog () {
      this.$store.commit('setShowLoginDialog', true)
    },
    // 判断前往详情页的类型
    goDetail (id) {
      if (this.dataPath === 'artists') {
        this.goArtistDetailById(id)
      } else if (this.dataPath === 'album') {
        this.goAlbumDetailById(id)
      } else {
        this.goSongDetailById(id)
      }
      this.$store.commit('setShowList', false)
    },
    // 前往歌曲详情页
    goSongDetailById (id) { this.$router.push({ path: '/song', query: { id: id } }) },
    // 前往专辑详情页
    goAlbumDetailById (id) { this.$router.push({ path: '/album', query: { id: id } }) },
    // 前往歌手详情页
    goArtistDetailById (id) { this.$router.push({ path: '/artist', query: { id: id } }) },
    // 前往歌单详情页
    goPlaylistDetailById (id) { this.$router.push({ path: '/playlist', query: { id: id } }) },
    // 前往下载页面
    goDownloadPage () { this.$router.push('/download') },
    // 根据标签、页码前往/刷新歌单页面
    goNewPlaylistPage (cat, order, page) {
      this.$store.commit('setActiveCat', cat)
      this.$router.push({
        path: '/discover/playlist',
        query: {
          cat,
          order,
          page
        }
      })
    },
    // 搜索
    onSearch (keyword, type = 1) {
      if (keyword) {
        this.$store.commit('setKeyword', keyword)
        this.$router.push({
          path: '/search',
          query: {
            keyword,
            type
          }
        })
      }
    },
    // 关键字变色
    changeColor (arr) {
      arr.map((item, index) => {
        if (this.keyword) {
          // 匹配关键字正则
          const replaceReg = new RegExp(this.keyword, 'g')
          // 变色替换v-html值
          const replaceString = '<span style="color: #0c73c2;">' + this.keyword + '</span>'
          if (arr[index].name) {
            arr[index].name = item.name.replace(replaceReg, replaceString)
          }
          if (arr[index].artist) {
            arr[index].artist.name = item.artist.name.replace(replaceReg, replaceString)
          }
        }
      })
      return arr
    },
    // 去除字符串的 html 标签元素
    delHtmlTag (str) {
      return str.replace(/<[^>]+>/g, '')
    }

  },
  beforeMount () {
    const path = this.$route.path === '/' ? '/discover' : this.$route.path
    this.$store.commit('setActivePath', path)
  }
}
