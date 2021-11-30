<template>
  <div class="swiper">
    <div class="wrap-outer">
      <div class="wrap">
        <!-- 轮播图 -->
        <a-carousel arrows autoplay :autoplaySpeed="5000">
          <!-- 左箭头 -->
          <div slot="prevArrow" class="arrow-box" style="left: -60px;zIndex: 1">
            <a-icon type="left" />
          </div>
          <!-- 右箭头 -->
          <div slot="nextArrow" class="arrow-box" style="right: -60px">
            <a-icon type="right" />
          </div>
          <!-- 轮播图片 -->
          <div v-for="(item,index) in swiperList" :key="index" >
            <img :src="item.imageUrl" class="img h-hand" @click="handleImgClick (item)">
          </div>
        </a-carousel>

        <!-- 下载副栏 -->
        <div class="download-wrap">
          <div class="download-btn h-hand" @click="goDownloadPage"></div>
          <p class="fz-12">PC 安卓 iPhone WP iPad Mac 六大客户端</p>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { getBannersList } from '@/http/api.js'
export default {
  name: 'Swiper1',
  data () {
    return {
      swiperList: [],
      backgroundImageUrl: null
    }
  },
  created () {
    getBannersList().then(res => {
      // console.log(res)
      res.banners.forEach(item => {
        this.swiperList.push({ imageUrl: item.imageUrl, url: item.url, targetId: item.targetId })
      })
    }).catch(err => {
      console.log(err)
    })
  },
  mounted () {
    this.backgroundImageUrl = 'url(http:p1.music.126.net/DbQly-TX2-uOVdoWVOfaYQ==/109951166605117743.jpg)'
  },
  methods: {
    handleImgClick (item) {
      // console.log(item)
      if (!item.targetId) {
        window.open(item.url)
      } else {
        this.$router.push(`/song?id=${item.targetId}`)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  // 轮播图

  .ant-carousel .arrow-box {
    width: 45px;
    height: 80px;
    font-size: 45px;
    padding-top: 18px;
    margin-top: -42px;
    color: #fff;
  }

  .ant-carousel .arrow-box:before {
    display: none;
  }

  .ant-carousel /deep/ .arrow-box:hover {
    color: #fff;
    // background-color: rgba(31, 45, 61, 0.11);
    background-color: #b8b8b8;
    opacity: 0.8;
  }

  .swiper {
    background-color: #232323;
    // border-bottom: 2px solid #000;
  }

  // 外层容器居中
  .wrap-outer {
    width: 983px;
    height: 270px;
    margin: 0 auto;

  }

  // 内层容器
  .wrap {
    position: relative;

    // 图片样式
    .img {
      height: 270px;
    }

    // 下载副栏
    .download-wrap {
      width: 254px;
      height: 270px;
      // height: 260px;
      position: absolute;
      top: 0;
      right: 0;
      background: url(../../assets/imgs/download/download.png) no-repeat 0 0;
      // box-shadow: 0 1px 20px #000;
      box-shadow: 5px 0px 5px -5px black, -5px 0px 5px -5px black;
      // 下载按钮
      .download-btn {
        width: 276px;
        height: 68px;
        margin: 174px 0 0 18px;
        background: url(../../assets/imgs/download/download.png) no-repeat 0 0;
        background-position: 0 9999px;
        overflow: hidden;
      }

      // 鼠标移入下载按钮
      .download-btn:hover {
        background-position: 1.5px -271.5px;
      }

      p {
        width: 100%;
        text-align: center;
        margin:0 auto;
        color: #8d8d8d;
      }
    }
  }

  .background-img-blur {
    // background-color: #000;
    width: 100%;
    height: 285px;
    top: 0;
    position: absolute;
    z-index: 0;
    overflow: hidden;
    background-size: 6000px;

  }
</style>
