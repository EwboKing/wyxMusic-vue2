import Vue from 'vue'
import Vuex from 'vuex'
import config from './config.js'
import user from './user.js'
import search from './search.js'
import song from './song.js'
import playlist from './playlist.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    config,
    user,
    search,
    song,
    playlist
  }
})
