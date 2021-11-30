<template>
  <div class="album-wrap m-t-50">
    <div class="tag-wrap">
      <div class="tag-title">
        <span class="title-text" @click="goAlbumlistPage">新碟上架</span>
      </div>
      <div class="more">
        <span class="h-hand h-t-d-u fz-12" @click="goAlbumlistPage">更多</span>
        <i class="icon-more"></i>
      </div>
    </div>
    <div class="album-list-wrap">
      <div class="album-list">
        <div class="m-t-28" v-for="item in albumNewestList" :key="item.id">
          <div class="album-item">
            <div style="position: relative;" class="h-hand album-img-list" @click="goAlbumDetailById(item.id)">
              <div class="img-mask "></div>
              <div class="img-wrap m-b-7">
                <img :src="item.picUrl" class="img">
              </div>
              <i class="listen-icon"></i>
            </div>
            <p class="t-d-u h-hand h-t-d-u t-c-0" @click="goAlbumDetailById(item.id)">{{item.name}}</p>
            <p class="t-d-u h-hand h-t-d-u t-c-6 fz-12" @click="goAlbumDetailById(item.id)">{{item.artist.name}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import '@/assets/css/home/homeTag.less'
import { getAlbumNewestList } from '@/http/api.js'
export default {
  name: 'AlbumNewest',
  data () {
    return {
      // 新碟上架
      albumNewestList: []
    }
  },
  methods: {
    goAlbumlistPage () {
      this.$router.push('album')
    }
  },
  created () {
    getAlbumNewestList().then(res => {
      // console.log('新碟', res)
      this.albumNewestList = res.albums
      this.albumNewestList.length = 5
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style lang="less" scoped>
  // 新碟上架

  .album-list-wrap {
    height: 186px;
    border: 1px solid #d3d3d3;
    background-color: #f5f5f5;
    margin: 20px 0 37px;

  }

  // 碟片列表
  .album-list {
    margin: 0 auto;
    width: 645px;
    display: flex;
    justify-content: space-between;

    // 碟片
    .album-item {
      width: 118px;
      height: 150px;

      .album-img-list:hover{
        .listen-icon{
          display: block;
        }
      }

      .img-mask {
        position: absolute;
        width: 100px;
        height: 100px;
        background: url(../../assets/imgs/coverall.png) no-repeat;
        background-position: 0 -570px;
      }

      .img-wrap {
        width: 118px;
        background: url(../../assets/imgs/coverall.png) no-repeat;
        background-position: 0 -570px;
      }

      .img {
        width: 100px;
        height: 100px;
      }

      p {
        width: 90%;
        line-height: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 0;
      }

      .listen-icon{
        display: none;
        position: absolute;
        top: 71px;
        left: 70px;
        width: 22px;
        height: 22px;
        background: url(../../assets/imgs/iconall.png);
        background-position: 0 -85px;
      }

      .listen-icon:hover{
        background-position: 0 -110px;
      }

    }
  }
</style>
