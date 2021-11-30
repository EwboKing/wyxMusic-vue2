<template>
  <div id="app">
    <div class="login" v-if="showLoginDialog">
      <Login></Login>
    </div>
    <div :class="{'content':showLoginDialog}">
      <AllHeader></AllHeader>
      <!-- <keep-alive include="Search"> -->
        <router-view v-if="isRouterAlive"></router-view>
      <!-- </keep-alive> -->

      <PlayerBar></PlayerBar>
      <SongAudio></SongAudio>
    </div>
    <div id="components-back-top-demo-custom">
      <a-back-top>
        <div class="ant-back-top-inner">
        </div>
      </a-back-top>
    </div>
    <!-- <a-pagination v-model="current" :total="50" show-less-items /> -->
  </div>

</template>

<script>
import AllHeader from '@/components/AllHeader'
import PlayerBar from '@/components/PlayerBar'
import SongAudio from '@/components/song-audio/SongAudio'
import Login from '@/components/Login'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  components: { AllHeader, SongAudio, Login, PlayerBar },
  computed: {
    ...mapGetters(['showLoginDialog'])
  },
  mounted () {
    window.addEventListener('touchmove', e => {
      // if (this.showLoginDialog) {
      e.stopPropagation()
      return false
      // e.preventDefault()
      // }
    }, false)
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  provide () {
    return {
      reload: this.reload
    }
  }
}
</script>

<style lang="less" scoped>
  #app{
    position: relative;
    padding-bottom: 120px;
    .login{
      position: absolute;
      top: 300px;
      left: 300px;
      z-index: 999;
    }
    #showLoginDialog{
      display: none;
    }
    .content{
      pointer-events: none !important;
      cursor: default !important;
    }
  }
  // 回到顶部
  #components-back-top-demo-custom .ant-back-top {
    bottom: 100px;
  }
  #components-back-top-demo-custom .ant-back-top-inner {
    height: 44px;
    width: 49px;
    line-height: 40px;
    border-radius: 3px;
    text-align: center;
    font-size: 12px;
    background: url(assets/imgs/sprite.png) no-repeat -265px -47px;
    &:hover{
      background-position: -325px -47px;
    }
  }
</style>
