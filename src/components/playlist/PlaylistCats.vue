<template>
  <div class="playlist-cats">
    <div class="hd"><i class="bg-iconall"></i></div>
    <div class="bd">
      <div class="all" @click="goNewPlaylistPage()">
        <p class="bg-btn">全部风格</p>
      </div>
      <div class="cont" v-for="item in cats" :key="item.id">
        <div class="side">
          <i class="bg-icon" :style="{'--xy' : tagsXY(item.id)}"></i>
          <span class="f-w-b">{{item.name}}</span>
        </div>
        <div class="tags">
          <span v-for="(item1,index) in tags" :key="index">
            <em class="em h-t-d-u" :class="{'em-active':item1.name === activeCat}"  v-if="item.id === item1.category" @click="goNewPlaylistPage(item1.name)">{{item1.name}}</em>
            <em class="rod" v-if="item.id === item1.category" ></em>
          </span>
        </div>
      </div>
    </div>
    <div class="ft"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { tags, cats } from '@/assets/data/tagsData.js'
export default {
  name: 'PlaylistCats',
  computed: {
    ...mapGetters(['activeCat'])
  },
  data () {
    return {
      tags,
      cats
    }
  },
  methods: {
    tagsXY (id) {
      switch (id) {
        case 0 : {
          return '-20px -735px'
        }
        case 1 : {
          return '0 -60px'
        }
        case 2 : {
          return '0 -88px'
        }
        case 3 : {
          return '0 -117px'
        }
        case 4 : {
          return '0 -141px'
        }
        default : return false
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .playlist-cats{
    width: 720px;
    font-size: 12px;
    position: absolute;
    top: -5px;
    left: -100px;

    // 头部
    .hd{
      height: 32px;
      background: url(../../assets/imgs/sltlyr.png) no-repeat;
      i{
        background-position: -48px 0;
        display: inline-block;
        width: 24px;
        height: 11px;
        position: absolute;
        top: 2px;
        left: 132px;
      }
    }
    // 主部
    .bd{
      width: 720px;
      height: 361px;
      padding: 0 10px;
      background: url(../../assets/imgs/sltlyr.png) repeat-y -720px 0;
      // 全部风格
      .all{
        border-bottom: 1px solid #e6e6e6;
        margin-bottom: 8px;

        .bg-btn{

          width: 75px;
          height: 26px;
          line-height: 26px;
          text-align: center;
          cursor: pointer;
          background-position: 0 -64px;
          margin-left: 26px;

          &:hover{
            text-decoration: underline;
          }
        }
      }
      // 侧边栏
      .cont{
        color: #333;
        // 大标签
        .side{
          width: 96px;
          float: left;
          padding: 10px 0 0 25px;
          // border-right: 1px solid #e6e6e6;
          i{
            width: 24px;
            height: 24px;
            display: inline-block;
            vertical-align: middle;
            margin-right: 8px;
            background-position: var(--xy);
            // background-position: var(--x) var(--y);
          }
        }
        .tags{
          // padding: 0 10px;
          margin-left: 96px;
          // height: 40px;
          line-height: 40px;

          // 具体标签
          .em{
            cursor: pointer;
            white-space: nowrap;
          }
          // 竖杆
          .rod{
            content: "";
            margin-left: 9px;
            padding-left: 9px;
            border-left: 1px solid #c0c4cc;
            height: 12px;
            display: inline-block;
            vertical-align: middle;
          }
          // 激活的标签
          .em-active{
            background: #a7a7a7;
            color: #fff;
            padding: 2px 6px;
          }
        }
      }
    }
    // 尾部
    .ft{
      height: 20px;
      background: url(../../assets/imgs/sltlyr.png) no-repeat -1440px -12px;
    }
  }
</style>
