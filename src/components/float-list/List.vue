<template>
  <div class="list">
    <div class="listhd t-c-f">
      <p class="f-w-b">播放列表({{listOfSongs.index.length}})</p>
      <!-- 删除 -->
      <div class="clear" title="删除" @click.stop="removeAll">
        <div class="icon-clear"></div>
        <p>清除</p>
      </div>
      <div class="title-box">
        <p>{{title}}</p>
        <a-icon type="close" class="close" @click="closeList"/>
      </div>

    </div>
    <div class="listbd">
      <img :src="picUrl" class="img-bg">
      <div class="mask"></div>
      <!-- 显示歌曲列表 -->
      <div class="song-list" v-if="listOfSongs.index.length">
        <ListOfSongs></ListOfSongs>
      </div>
      <!-- 空列表 -->
      <div class="empty-list" v-else>
        <div class="tips">
          <i class="bg-pl m-r-12"></i>
          <em class="m-t-5">你还没有添加任何歌曲</em>
          <br>
          去首页<span @click="toDiscover">发现音乐</span>，或在<span @click="toMy">我的音乐</span>收听自己收藏的歌单
        </div>
      </div>
      <!-- <div class="bline"></div> -->
      <div class="lyric-wrap">
        <Lyric></Lyric>
      </div>
      <div class="bline2"></div>
      <div class="mask2"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ListOfSongs from '@/components/float-list/ListOfSongs.vue'
import Lyric from '@/components/float-list/Lyric.vue'
export default {
  name: 'List',
  components: { ListOfSongs, Lyric },
  computed: {
    ...mapGetters(['listOfSongs', 'title', 'picUrl'])
  },
  methods: {
    closeList () {
      this.$store.commit('setShowList', false)
    },
    // 清空播放列表
    removeAll () {
      // console.log(this.listOfSongs)
      this.$store.commit('clearListOfSongs')
    },
    toDiscover () {
      this.$router.push('discover')
    },
    toMy () {

    }
  }
}
</script>

<style lang="less" scoped>
  .list{
    // 头部
    .listhd{
      background: url(../../assets/imgs/playerbar/playlist_bg.png) no-repeat 0 0;
      height: 41px;
      padding: 8px 0 0 25px;
      display: flex;
      justify-content: space-between;
      position: relative;
      .title-box{
        width: 422px;
        text-align: center;
        position: relative;
        .close{
          position: absolute;
          top: 4px;
          right: 17px;
          color: #666;
          cursor: pointer;
          &:hover{
            color: #7c7c7c;
          }
        }
      }
      // 清除全部
      .clear{
        position: absolute;
        top: 10px;
        left: 500px;
        display: flex;
        align-items: center;
        color: #ccc;
        font-size: 12px;
        cursor: pointer;
        p{
          margin: 0 0 2px 5px;
        }
        .icon-clear{
          width: 13px;
          height: 16px;
          background: url(../../assets/imgs/playerbar/playlist.png) no-repeat -51px 0;

        }
        &:hover{
          color: #e2e2e2;
          text-decoration: underline;
          .icon-clear{
            background-position: -51px -20px;
          }
        }
      }
    }
    // 内容
    .listbd{
      width: 984px;
      height: 260px;
      position: absolute;
      left: 0;
      top: 40px;
      overflow: hidden;
      background: url(../../assets/imgs/playerbar/playlist_bg.png) no-repeat;
      background-position: -1014px 0;
      background-repeat: repeat-y;
      // img
      .img-bg{
        position: absolute;
        width: 980px;
        height: auto;
        filter: blur(30px);
        z-index: 1;
        left: 2px;
        top: -360px;
        opacity: 0.2;
      }
      // mask
      .mask{
        position: absolute;
        left: 2px;
        top: 0;
        z-index: 2;
        width: 560px;
        height: 260px;
        background: #121212;
        opacity: .5;
      }
      .bline{
        .mask;
        left: 554px;
        top: -1px;
        width: 6px;
        background: #000000;
      }
      .mask2{
        .mask;
        position: absolute;
        left: 560px;
        z-index: 3;
        width: 422px;
        opacity: .01;
        background: #121212;
      }
      // 显示歌曲列表
      .song-list{
        .mask;
        z-index: 4;
        // width: 553px;
        opacity: .7;
        background-color: #161616;
      }
      // 空列表
      .empty-list{
        .mask;
        z-index: 4;
        overflow: hidden;
        font-size: 12px;
        opacity: 1;
        .tips{
          color: #aaa;
          padding-top: 85px;
          text-align: center;
          line-height: 43px;
          // font-size: 12px;
          .bg-pl{
            position: relative;
            top: -4px;
            display: inline-block;
            width: 36px;
            height: 29px;
            background-position: -138px 0;
            vertical-align: middle;
          }
          span{
            text-decoration: underline;
            cursor: pointer;
          }
        }
      }
      // 歌词
      .lyric-wrap{
        position: absolute;
        right: 40px;
        top: 0;
        z-index: 4;
        margin: 21px 0 20px 0;
        height: 219px;
        width: 354px;
        overflow: hidden;
      }
      .bline2{
        .bline;
        left: 976px;
      }
    }
  }
</style>
