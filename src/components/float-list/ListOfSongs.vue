<template>
  <vxe-table
    :show-header="false"
    border="none"
    class="mytable-scrollbar"
    height="260"
    :data="listOfSongs.index"
    :cell-style="cellStyle"
    @cell-mouseenter="tableMouseEnter"
    @cell-mouseleave="tableMouseLeave"
    @cell-click="handlePlaySong">
    <!-- 播放图标 -->
    <vxe-column width="25">
      <template scope="scope">
        <i v-show="scope.row === id" class="bg-pl play-icon"></i>
      </template>
    </vxe-column>
    <!-- 歌曲名字 -->
    <vxe-column :cell-render="{ name: 'showSong',opts: { dataPath : 'name' } }" width="256"></vxe-column>
    <!-- 按钮 -->
    <vxe-column :cell-render="{ name: 'showSong',opts: { dataPath : 'btns' ,showBtns : true} }" width="100">
    </vxe-column>
    <!-- 歌手 -->
    <vxe-column :cell-render="{ name: 'showSong',opts: { dataPath : 'artists' } }" width="100"></vxe-column>
    <!-- 歌曲时长 -->
    <vxe-column>
      <template scope="scope">
        <span>{{listOfSongs.playlist[scope.row].dt| dateFormat(true)}}</span>
      </template>
    </vxe-column>
  </vxe-table>
</template>

<script>
import { mapGetters } from 'vuex'
import VXETable from 'vxe-table'
import ShowSong from '@/components/float-list/ShowSong'
// :sync-resize="listOfSongs.index.length"
var _this = null

export default {
  name: 'ListOfSongs',
  data () {
    return {}
  },
  beforeMount () {
    _this = this
    VXETable.renderer.add('showSong', {
      renderDefault (h, renderOpts, params) {
        const { row } = params
        return [<ShowSong rowId = { row } dataRow = { _this.listOfSongs.playlist[row] } dataPath = { renderOpts.opts.dataPath } showBtns = { renderOpts.opts.showBtns } > </ShowSong>]
      }
    })
  },
  computed: {
    ...mapGetters(['listOfSongs', 'id'])
  },
  methods: {
    // 鼠标移入
    tableMouseEnter (e) {
      // console.log(this.listOfSongs)
      // console.log(e)
      this.$store.commit('setCurId', e.data[e.rowIndex])
    },
    // 鼠标移出
    tableMouseLeave () {
      this.$store.commit('setCurId', -1)
    },
    // 点击播放
    handlePlaySong (e) {
      const id = this.listOfSongs.index[e.rowIndex]
      this.playSong(this.listOfSongs.playlist[id])
      // this.$store.commit('setListIndex', e.rowIndex)
    },
    // 歌曲播放的样式
    cellStyle ({ row, rowIndex, column }) {
      // console.log('&&', row, rowIndex, column)
      if (row === this.id) {
        // this.$store.commit('setListIndex', rowIndex)
        return {
          'background-color': 'rgba(0,0,0)',
          color: '#fff'
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
  // 覆盖默认样式
  /deep/ .vxe-cell {
    padding-left: 5px !important;
  }

  /deep/ .vxe-table--body-wrapper {
    background-color: #1f2327 !important;
  }

  /deep/ .vxe-body--row {
    &:hover {
      cursor: pointer;
    }
  }

  /deep/ .row--hover {
    color: #fff !important;
    background-color: rgba(0, 0, 0) !important;
  }

  .play-icon {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 10px;
    height: 13px;
    background-position: -182px 0;
  }

  .vxe-table--render-default {
    font-size: 12px;
    color: #9b9b9b;
  }

  /deep/.vxe-body--column {
    padding: 5px 0 !important;
  }

  /*滚动条整体部分*/
  .mytable-scrollbar ::-webkit-scrollbar {
    width: 6px;
    height: 1px;
  }
  /*滚动条的轨道*/
  .mytable-scrollbar ::-webkit-scrollbar-track {
    background-color: #000;
  }
  /*滚动条里面的小方块，能向上向下移动*/
  .mytable-scrollbar ::-webkit-scrollbar-thumb {
    background-color: #868686;
    border-radius: 5px;
    border: 1px solid #a6a6a6;
  }
  .mytable-scrollbar ::-webkit-scrollbar-thumb:hover {
    cursor: pointer !important;
    // background-color: #A8A8A8;
  }
  .mytable-scrollbar ::-webkit-scrollbar-thumb:active {
    // background-color: #787878;
  }
  /*边角，即两个滚动条的交汇处*/
  .mytable-scrollbar ::-webkit-scrollbar-corner {
    // background-color: #FFFFFF;
  }
</style>
