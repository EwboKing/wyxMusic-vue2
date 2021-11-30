<template>
  <div>
    <div v-if="!showBtns">
      <div class="show" :style="{'color':renderType === 'quotes'?'#666':'#333'}">
        <p>
          <span v-for="(item,index) in dataName" :key="index" :class="{'fcolor' : item.name === keyword}">
            {{leftChar}}<span class="span" @click="goDetail(item.id)">{{item.name}}</span>{{rightChar}}
            <span class="alia" v-if="dataPath === 'name' && dataRow.alias.length" :title="dataRow.alias[0]"> -
              ({{dataRow.alias[0]}})</span>
            <em>{{slash(index, dataName.length) }}</em>
          </span>
        </p>

      </div>
    </div>
    <div class="btns" v-else>
      <div class="opts" :style="{'visibility': rowIndex === curIdx ? 'visible' : 'hidden' }">
        <!-- 添加 -->
        <div class="icon-add bg-icon" title="添加到播放列表"
          @click="addToPlaylist(dataRow.id,dataRow.name,dataRow.artists,dataRow.album,dataRow.duration)"></div>
        <!-- 收藏 -->
        <div class="icon-collect bg-table" title="收藏" @click="sss"></div>
        <!-- 分享 -->
        <div class="icon-share bg-table" title="分享"></div>
        <!-- 下载 -->
        <div class="icon-download bg-table" title="下载"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
export default {
  name: 'ShowReslut',
  props: {
    dataRow: {
      type: Object
    },
    dataPath: {
      type: String,
      default: ''
    },
    renderType: {
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
  computed: {
    ...mapGetters(['curIdx', 'keyword', 'listOfSongs', 'playlistCurIdx']),
    // dataName () {
    //   // return this.dataRow[this.dataPath]?this.dataRow[this.dataPath]:
    //   // if (this.dataPath === 'artists') {
    //   //   return this.dataRow.artists
    //   // } else if (this.dataPath === 'album') {
    //   //   return [this.dataRow.album]
    //   // } else {
    //   //   return [this.dataRow]
    //   // }
    // },
    leftChar () {
      return this.renderType === 'quotes' ? '《' : ''
    },
    rightChar () {
      return this.renderType === 'quotes' ? '》' : ''
    },
    slash () {
      return function (idx, length) {
        return this.renderType === 'slash' && idx < length - 1 ? '/' : ''
      }
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
