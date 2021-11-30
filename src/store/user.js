const user = {
  state: {
    // 登录状态
    loginStatus: false,
    // 显示登录对话框
    showLoginDialog: false,
    // 初始化token
    token: ''
  },
  getters: {
    loginStatus: state => {
      let loginStatus = state.loginStatus
      if (!loginStatus) {
        loginStatus = JSON.parse(window.localStorage.getItem('loginStatus') || false)
      }
      return loginStatus
    },
    showLoginDialog: state => state.showLoginDialog,
    token: state => {
      let token = state.token
      if (!token) {
        token = JSON.parse(window.localStorage.getItem('token'))
      }
      return token
    }
  },
  mutations: {
    setLoginStatus: (state, loginStatus) => {
      state.loginStatus = loginStatus
      window.localStorage.setItem('loginStatus', JSON.stringify('loginStatus'))
    },
    setShowLoginDialog: (state, showLoginDialog) => { state.showLoginDialog = showLoginDialog },
    setToken: (state, token) => {
      state.token = token
      window.localStorage.setItem('token', JSON.stringify(token))
    }
  }
}

export default user
