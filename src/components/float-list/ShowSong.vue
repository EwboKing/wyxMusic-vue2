<template>
  <div>
    <div v-if="!showBtns">
      <div class="show" :style="{ 'color':rowId === curId ? '#fff' : '' }">
        <p>
          <span v-for="(item,index) in dataName" :key="index">
            <span class="span" @click.stop="goDetail(item.id)">{{item.name}}</span>
            <em>{{slash(index, dataName.length) }}</em>
          </span>
        </p>

      </div>
    </div>
    <div v-else>
      <div class="btns" :style="{'visibility': rowId === curId ? 'visible' : 'hidden' }">
        <!-- 收藏 -->
        <div class="icon-collect bg" title="收藏"></div>
        <!-- 分享 -->
        <div class="icon-share bg" title="分享"></div>
        <!-- 下载 -->
        <div class="icon-download bg" title="下载"></div>
        <!-- 删除 -->
        <div class="icon-delete bg" title="删除" @click.stop="removeSong"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ShowSong',
  props: {
    dataRow: {
      type: Object
    },
    dataPath: {
      type: String,
      default: ''
    },
    rowId: {
      type: Number,
      default: -1
    },
    showBtns: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      op: 0
    }
  },
  computed: {
    ...mapGetters(['curId', 'listIndex', 'id', 'listOfSongs']),
    dataName () {
      if (this.dataPath === 'artists') {
        return this.dataRow.ar
      } else {
        return [this.dataRow]
      }
    },
    slash () {
      return function (idx, length) {
        return this.dataPath === 'artists' && idx < length - 1 ? '/' : ''
      }
    }
  },
  methods: {
    removeSong () {
      this.$store.commit('removeSong', this.curId)
      if (this.id === this.curId && this.listIndex > 0) {
        this.playSong(this.listOfSongs.playlist[this.listOfSongs.index[this.listIndex - 1]])
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../assets/css/show.less';
</style>
