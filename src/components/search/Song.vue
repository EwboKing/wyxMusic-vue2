<template>
  <vxe-table
    stripe
    highlight-current-column
    highlight-hover-row
    :show-header="false"
    :data="songList"
    @cell-mouseenter="tableMouseEnter"
    @cell-mouseleave="tableMouseLeave">
    <vxe-column width="20">
      <i class="bg-table play-icon h-hand" @click="addToPlaylist(info.id, info.name, info.artists, info.album, info.duration, playSong)"></i>
    </vxe-column>
    <vxe-column :cell-render="{ name: 'showReslut', opts: { dataPath : 'name' } }" width="390"></vxe-column>
    <vxe-column :cell-render="{ name: 'showReslut',opts: { dataPath : 'btns' ,showBtns : true} }" width="100">
    </vxe-column>
    <vxe-column :cell-render="{ name: 'showReslut', opts: { dataPath : 'artists', renderType : 'slash' } }" width="130">
    </vxe-column>
    <vxe-column :cell-render="{ name: 'showReslut', opts: { dataPath : 'album', renderType : 'quotes' } }" width="160">
    </vxe-column>
    <vxe-column field="duration">
      <template scope="scope">
        <span>{{scope.row.duration | dateFormat(true)}}</span>
      </template>
    </vxe-column>
  </vxe-table>
</template>

<script>
import { mapGetters } from 'vuex'
import VXETable from 'vxe-table'
import ShowReslut from '@/components/show/ShowResult'

export default {
  name: 'Song',
  props: ['songList'],
  data () {
    return {
      info: {},
      total: 0,
      curPage: 1
    }
  },
  beforeMount () {
    VXETable.renderer.add('showReslut', {
      renderDefault (h, renderOpts, params) {
        const { row } = params
        // console.log(renderOpts.opts.dataPath)
        return [<ShowReslut rowIndex = { params.rowIndex } dataRow = { row } dataPath = { renderOpts.opts.dataPath }
          renderType = { renderOpts.opts.renderType } showBtns = { renderOpts.opts.showBtns }></ShowReslut>]
      }
    })
  },
  computed: {
    ...mapGetters(['listOfSongs'])
  },
  methods: {
    tableMouseEnter (e) {
      this.info = e.data[e.rowIndex]
      this.$store.commit('setCurIdx', e.rowIndex)
    },
    tableMouseLeave () {
      this.$store.commit('setCurIdx', -1)
    }
  }
}
</script>

<style lang="less" scoped>

  .play-icon {
    position: absolute;
    top: 14px;
    left: 7px;
    width: 17px;
    height: 17px;
    background-position: 0 -103px;

    &:hover {
      background-position: 0 -128px;
    }
  }
  .vxe-table--render-default{
    font-size: 12px;
    color: #333;
  }
</style>
