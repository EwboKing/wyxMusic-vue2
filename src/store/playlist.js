const playlist = {
  state: {
    playlistCurIdx: -1,
    activeCat: ''
  },
  getters: {
    playlistCurIdx: state => state.playlistCurIdx,
    activeCat: state => {
      if (window.sessionStorage.getItem('activeCat')) {
        state.activeCat = window.sessionStorage.getItem('activeCat')
      }
      return state.activeCat
    }
  },
  mutations: {
    setPlaylistCurIdx: (state, playlistCurIdx) => { state.playlistCurIdx = playlistCurIdx },
    setActiveCat: (state, activeCat) => {
      state.activeCat = activeCat
      window.sessionStorage.setItem('activeCat', activeCat)
    }
  }
}

export default playlist
