const config = {
  state: {
    // HOST: 'http://localhost:3000',
    activePath: ''
  },
  getters: {
    activePath: state => {
      let activePath = state.activePath
      if (!activePath) {
        activePath = JSON.parse(window.sessionStorage.getItem('activePath'))
      }
      return activePath
    }
  },
  mutations: {
    setActivePath: (state, activePath) => {
      state.activePath = activePath
      window.sessionStorage.setItem('activePath', JSON.stringify(activePath))
    }
  }
}

export default config
