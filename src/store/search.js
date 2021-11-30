const search = {
  state: {
    keyword: '',
    showSnote: false,
    curIdx: -1,
    searchCount: 0
  },
  getters: {
    keyword: state => {
      let keyword = state.keyword
      if (!keyword) {
        keyword = window.sessionStorage.getItem('keyword')
      }
      return keyword
    },
    showSnote: state => state.showSnote,
    curIdx: state => state.curIdx,
    searchCount: state => state.searchCount
  },
  mutations: {
    setKeyword: (state, keyword) => {
      state.keyword = keyword
      window.sessionStorage.setItem('keyword', keyword)
    },
    setShowSnote: (state, status) => { state.showSnote = status },
    setCurIdx: (state, idx) => { state.curIdx = idx },
    setSearchCount: (state, num) => { state.searchCount = num }
  }
}

export default search
