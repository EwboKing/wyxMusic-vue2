<template>
  <vxe-table
    stripe
    highlight-current-column
    highlight-hover-row
    :data="songList"
    :show-header="false"
    :cellClassName="indexClass"
    @cell-mouseenter="tableMouseEnter"
    @cell-mouseleave="tableMouseLeave">
    <vxe-column type="seq" width="50"></vxe-column>
    <!-- 播放图标 -->
    <vxe-column width="25">
      <i class="bg-table play-icon h-hand" @click="addToPlaylist(obj.id,obj.name,obj.ar,obj.al,obj.dt,playSong)"></i>
    </vxe-column>
    <vxe-column :cell-render="{ name: 'showSongList', opts: { dataPath : 'name' } }" width="235"></vxe-column>
    <vxe-column :cell-render="{ name: 'showSongList',opts: { dataPath : 'btns' ,showBtns : true} }" width="110"></vxe-column>
    <vxe-column :cell-render="{ name: 'showSongList', opts: { dataPath : 'artists' } }" width="90"></vxe-column>
    <vxe-column :cell-render="{ name: 'showSongList', opts: { dataPath : 'ablum' } }" width="130"></vxe-column>
  </vxe-table>
</template>

<script>
import { mapGetters } from 'vuex'
import VXETable from 'vxe-table'
import ShowSongList from '@/components/playlist/ShowSongList'

export default {
  name: 'SongList',
  data () {
    return {
      // id: '',
      // dt: 0,
      obj: {}
    }
  },
  props: {
    songList: {
      type: Array
    }
  },
  beforeMount () {
    VXETable.renderer.add('showSongList', {
      renderDefault (h, renderOpts, params) {
        const { row } = params
        // console.log(renderOpts.opts.dataPath)
        return [<ShowSongList rowIndex = { params.rowIndex } dataRow = { row } dataPath = { renderOpts.opts.dataPath }
          showBtns = { renderOpts.opts.showBtns }></ShowSongList>]
      }
    })
  },
  computed: {
    ...mapGetters(['playListCurIdx', 'listOfSongs'])
  },
  methods: {
    tableMouseEnter (e) {
      // console.log('@@', e.data[e.rowIndex])
      // this.id = e.data[e.rowIndex].id
      // this.dt = e.data[e.rowIndex].dt
      this.obj = e.data[e.rowIndex]
      this.$store.commit('setPlaylistCurIdx', e.rowIndex)
    },
    tableMouseLeave () {
      this.$store.commit('setPlaylistCurIdx', -1)
    },
    indexClass ({ row, rowIndex, column, columnIndex }) {
      if (columnIndex === 0) { return 'col-999' }
    }
    // handlePlay () {
    //   console.log(this.songList)
    // }
  }
}
</script>

<style lang="less" scoped>
  // 覆盖默认样式
  .vxe-table--render-default{
    font-size: 12px;
    color: #333;
  }
  /deep/.vxe-body--column{
    padding: 5px 0 !important;
  }

  .play-icon {
    position: absolute;
    top: 7px;
    left: 0;
    width: 17px;
    height: 17px;
    background-position: 0 -103px;

    &:hover {
      background-position: 0 -128px;
    }
  }

  /deep/ .vxe-body--row{
    .col-999{
      padding-left: 4px !important;
      color: #999;
    }
  }

</style>
