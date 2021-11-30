<template>
  <div class="albums">
    <div class="items" v-for="item in albums" :key="item.id">
      <div class="cover h-hand" @click="goAlbumDetailById(item.id)">
        <i class="bg-iconall" @click.stop="getSongs(item.id)"></i>
        <img :src="`${item.picUrl}?param=130y130`" >
        <span class="mask"></span>
      </div>
      <p class="al" :title="delHtmlTag(item.name)">
        <span v-html="item.name" @click="goAlbumDetailById(item.id)" >{{item.name}}</span>
      </p>
      <p class="ar" :title="delHtmlTag(item.artist.name)">
        <span v-html="item.artist.name" @click="goArtistDetailById(item.artist.id)"></span>
      </p>
    </div>
    <div class="empty" :style="{'--emptyWidth' : emptyWidth}" v-if="emptyWidth"></div>
  </div>
</template>

<script>
import { getAlbumDetailById } from '@/http/api.js'
import { mapGetters } from 'vuex'
export default {
  name: 'Albums',
  props: ['albums'],
  computed: {
    ...mapGetters(['keyword', 'listOfSongs'])
  },
  created () {
    const num = 5 - this.albums.length % 5
    if (num !== 5) {
      this.emptyWidth = num * 180 + 'px'
    }
  },
  watch: {
    albums () {
      const num = 5 - this.albums.length % 5
      if (num !== 5) {
        this.emptyWidth = num * 180 + 'px'
      }
    }
  },
  data () {
    return {
      emptyWidth: ''
    }
  },
  methods: {
    // 获取专辑歌曲添加到播放列表并播放
    getSongs (id) {
      getAlbumDetailById(id).then(res => {
        this.addAllToPlaylist(res.songs, true)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .albums{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 20px;
    .items{
      width: 180px;
      padding-bottom: 30px;
      .cover{
        position: relative;
        .mask{
          width: 153px;
          height: 130px;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
          background: url(../../assets/imgs/coverall.png) no-repeat 0 -850px;
        }

        &:hover{
          .bg-iconall{
            width: 28px;
            height: 28px;
            background-position: 0 -140px;
            display: inline-block;
            position: absolute;
            bottom: 10px;
            right: 60px;
            z-index: 2;
            &:hover{
              background-position: 0 -170px;
            }
          }
        }
      }
      p{
        margin: 0;
        width: 130px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        span{
          cursor: pointer;
          &:hover{
            text-decoration: underline;
          }
        }
      }
      .al{
        color: #000;
        margin: 8px 0 3px;
      }
      .ar{
        font-size: 12px;
      }
    }
    .empty{
      width: var(--emptyWidth);
    }
  }
</style>
