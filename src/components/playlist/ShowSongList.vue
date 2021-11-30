<template>
  <div>
    <div v-if="!showBtns">
      <div class="show">
        <p class="p-t h-hand">
          <span v-for="(item,index) in dataName" :key="index">
            <span class="span" @click="goDetail(item.id)">{{item.name}}</span>
            <span class="alia" v-if="dataPath === 'name' && dataRow.alia.length" :title="dataRow.alia[0]"> - ({{dataRow.alia[0]}})</span>
            <em v-if="dataPath === 'artists' && index < dataName.length - 1">/</em>
          </span>
        </p>
      </div>
    </div>
    <div class="btns" v-else>
      <div class="duration" v-if="!btnOrTime">
        {{dataRow.dt | dateFormat(true)}}
      </div>
      <div class="opts" v-else>
        <!-- 添加 -->
        <div class="icon-add bg-icon" title="添加到播放列表" @click="sss"></div><!-- addToPlaylist(dataRow.id, dataRow.dt) -->
        <!-- 收藏 -->
        <div class="icon-collect bg-table" title="收藏"></div>
        <!-- 分享 -->
        <div class="icon-share bg-table" title="分享"></div>
        <!-- 下载 -->
        <div class="icon-download bg-table" title="下载"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ShowSongList',
  props: {
    dataRow: {
      type: Object
    },
    dataPath: {
      type: String,
      default: ''
    },
    rowIndex: {
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
      btnOrTime: false
    }
  },
  computed: {
    ...mapGetters(['playlistCurIdx']),
    dataName () {
      if (this.dataPath === 'artists') {
        return this.dataRow.ar
      } else if (this.dataPath === 'album') {
        return [this.dataRow.al]
      } else {
        return [this.dataRow]
      }
    }
  },
  watch: {
    playlistCurIdx () {
      this.rowIndex === this.playlistCurIdx ? this.btnOrTime = true : this.btnOrTime = false
    }
  },
  methods: {
    sss () {
      console.log(this.dataRow)
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../assets/css/show.less';
</style>
