import _ from 'lodash'
const song = {
  state: {
    // 当前歌曲列表
    listOfSongs: { playlist: {}, index: [] },
    // 是否播放中
    isPlay: false,
    // 是否循环
    isLoop: false,
    // 歌曲地址
    url: '',
    // 歌曲 id
    id: '',
    // 音乐时长
    duration: 0,
    // 当前音乐的播放位置
    currentTime: 0,
    // 指定音乐的播放位置
    changeTime: 0,
    // 歌名
    title: '',
    // 歌手
    artist: [],
    // 歌曲图片
    picUrl: '',
    // 是否自动播放
    autoNext: true,
    // 歌词
    lyric: '',
    // 单个歌单信息
    tempList: {},
    // 当前歌曲在歌单中的位置
    listIndex: 0,
    // 音量
    volume: 50,
    // 鼠标移入行 id
    curId: -1,
    // 显示/隐藏播放列表
    showList: false,
    // 开始播放的提示
    startTip: false,
    // 添加到播放列表的提示
    addTip: false
  },
  getters: {
    listOfSongs: state => {
      let listOfSongs = state.listOfSongs
      // if (!listOfSongs.index.length) {
      listOfSongs = JSON.parse(window.localStorage.getItem('listOfSongs'))
      // }
      // console.log('store', listOfSongs)
      return listOfSongs
    },
    isPlay: state => {
      const isPlay = state.isPlay

      // if (!isPlay) { isPlay = JSON.parse(window.localStorage.getItem('isPlay') || null) }
      return isPlay
    },
    isLoop: state => state.isLoop,
    url: state => {
      let url = state.url
      if (!url) { url = JSON.parse(window.localStorage.getItem('url') || null) }
      return url
    },
    id: state => {
      let id = state.id
      if (!id) { id = JSON.parse(window.localStorage.getItem('id') || null) }
      return id
    },
    duration: state => {
      let duration = state.duration
      if (!duration) { duration = JSON.parse(window.localStorage.getItem('duration') || null) }
      return duration
    },
    currentTime: state => {
      let currentTime = state.currentTime
      if (!currentTime) { currentTime = JSON.parse(window.localStorage.getItem('currentTime') || null) }
      return currentTime
    },
    changeTime: state => {
      let changeTime = state.changeTime
      if (!changeTime) { changeTime = JSON.parse(window.localStorage.getItem('changeTime') || null) }
      return changeTime
    },
    title: state => {
      let title = state.title
      if (!title) { title = JSON.parse(window.localStorage.getItem('title') || null) }
      return title
    },
    artist: state => {
      let artist = state.artist
      // if (!artist) { artist = JSON.parse(window.localStorage.getItem('artist') || null) }
      artist = JSON.parse(window.localStorage.getItem('artist'))
      return artist
    },
    picUrl: state => {
      let picUrl = state.picUrl
      if (!picUrl) { picUrl = JSON.parse(window.localStorage.getItem('picUrl') || null) }
      return picUrl
    },
    autoNext: state => {
      let autoNext = state.autoNext
      if (!autoNext) { autoNext = JSON.parse(window.localStorage.getItem('autoNext') || null) }
      return autoNext
    },
    lyric: state => {
      let lyric = state.lyric
      if (!lyric) { lyric = JSON.parse(window.localStorage.getItem('lyric') || null) }
      return lyric
    },
    tempList: state => {
      let tempList = state.tempList
      if (!tempList) { tempList = JSON.parse(window.localStorage.getItem('tempList') || null) }
      return tempList
    },
    listIndex: state => {
      let listIndex = state.listIndex
      if (listIndex !== 0) { listIndex = JSON.parse(window.localStorage.getItem('listIndex')) }
      return listIndex
    },
    volume: state => {
      let volume = state.volume
      if (!volume) { volume = JSON.parse(window.localStorage.getItem('volume')) }
      return volume
    },
    curId: state => state.curId,
    showList: state => state.showList,
    startTip: state => state.startTip,
    addTip: state => state.addTip
  },
  mutations: {
    setListOfSongs: (state, obj) => {
      // 添加的歌曲不存在才允许添加操作
      const list = JSON.parse(window.localStorage.getItem('listOfSongs'))
      if (!list.playlist[obj.id]) {
        // console.log(!list.playlist[obj.id])
        list.index.push(obj.id)
        list.playlist[obj.id] = obj
        state.listOfSongs = list
        // console.log('store', list)
        window.localStorage.setItem('listOfSongs', JSON.stringify(list))
      }
    },
    // 清空播放列表
    clearListOfSongs: state => {
      const list = { playlist: {}, index: [] }
      state.listOfSongs = list
      window.localStorage.setItem('listOfSongs', JSON.stringify(list))
      // console.log(state.listOfSongs)
    },
    removeSong: (state, id) => {
      const list = JSON.parse(JSON.stringify(state.listOfSongs))
      delete list.playlist[id]
      list.index = _.without(list.index, id)
      // console.log('store', list)
      state.listOfSongs = list
      window.localStorage.setItem('listOfSongs', JSON.stringify(list))
    },
    setIdsArr: (state, idsArr) => {
      state.idsArr = idsArr
      window.localStorage.setItem('idsArr', JSON.stringify(idsArr))
    },
    setIsPlay: (state, isPlay) => {
      state.isPlay = isPlay
      // window.localStorage.setItem('isPlay', JSON.stringify('isPlay'))
    },
    setIsLoop: (state, isLoop) => {
      state.isLoop = isLoop
    },
    setUrl: (state, url) => {
      state.url = url
      window.localStorage.setItem('url', JSON.stringify(url))
    },
    setId: (state, id) => {
      state.id = id
      window.localStorage.setItem('id', JSON.stringify(id))
    },
    setDuration: (state, duration) => {
      state.duration = duration
      window.localStorage.setItem('duration', JSON.stringify(duration))
    },
    setCurrentTime: (state, currentTime) => {
      state.currentTime = currentTime
      window.localStorage.setItem('currentTime', JSON.stringify(currentTime))
    },
    setChangeTime: (state, changeTime) => {
      state.changeTime = changeTime
      window.localStorage.setItem('changeTime', JSON.stringify(changeTime))
    },
    setTitle: (state, title) => {
      state.title = title
      window.localStorage.setItem('title', JSON.stringify(title))
    },
    setArtist: (state, artist) => {
      state.artist = artist
      window.localStorage.setItem('artist', JSON.stringify(artist))
    },
    setPicUrl: (state, picUrl) => {
      state.picUrl = picUrl
      window.localStorage.setItem('picUrl', JSON.stringify(picUrl))
    },
    setAutoNext: (state, autoNext) => {
      state.autoNext = autoNext
      window.localStorage.setItem('autoNext', JSON.stringify(autoNext))
    },
    setLyric: (state, lyric) => {
      state.lyric = lyric
      window.localStorage.setItem('lyric', JSON.stringify(lyric))
    },
    setTempList: (state, tempList) => {
      state.tempList = tempList
      window.localStorage.setItem('tempList', JSON.stringify(tempList))
    },
    setListIndex: (state, listIndex) => {
      state.listIndex = listIndex
      window.localStorage.setItem('listIndex', JSON.stringify(listIndex))
    },
    setVolume: (state, volume) => {
      state.volume = volume
      window.localStorage.setItem('volume', JSON.stringify(volume))
    },
    setCurId: (state, curId) => { state.curId = curId },
    setShowList: (state, showList) => { state.showList = showList },
    setStartTip: (state, startTip) => { state.startTip = startTip },
    setAddTip: (state, addTip) => { state.addTip = addTip }

  }
}

export default song
