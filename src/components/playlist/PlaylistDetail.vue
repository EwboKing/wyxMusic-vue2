<template>
  <div class="module p-t-40">
    <div class="wrap">
      <!-- 左 -->
      <div class="content-l">
        <!-- 内容容器 -->
        <div class="content-wrap">

          <!-- 顶部 -->
          <div class="top">
            <div class="img-wrap">
              <img :src="playlistDetail.coverImgUrl">
              <i class="jp bg-icon2" v-if="playlistDetail.highQuality"></i>
              <span class="mask"></span>
            </div>
            <div class="detail-wrap">
              <div class="title m-b-14">
                <i class="icon" v-if="!playlistDetail.highQuality"></i>
                <!-- 精品 -->
                <i class="icon m-r-10 bg-icon2" v-else></i>
                <p class="title-text">{{playlistDetail.name}}</p>
              </div>
              <!-- 用户信息 -->
              <div class="user-info m-b-20">
                <img :src="avatarUrl" alt="" class="user-img">
                <span class="username h-t-d-u">{{nickname}}</span>
                <img src="../../assets/imgs/player.png">
                <!-- <p class="time t-c-9">{{getCreateTime()}}</p> -->
                <p class="time t-c-9">{{playlistDetail.createTime | dateFormat(false,true)}}</p>
                <span class="t-c-9 m-t-2">创建</span>
              </div>
              <!-- 操作 -->
              <div class="content-operation">
                <!-- 播放 -->
                <p class="play" title="播放" @click="addAllToPlaylist(songList,true)">
                  <i class="icon p-l-8">
                    <em class="bg-btn2 fz-12 t-c-f m-r-2 "></em>
                    <span class="fz-12">播放</span>
                  </i>
                </p>
                <!-- 添加 -->
                <p class="add-btn" title="添加到播放列表" @click="addAllToPlaylist(songList)"></p>
                <!-- 文件夹 -->
                <p class="a-g f-wrap">
                  <i class="folder">({{subscribedCount}})</i>
                </p>
                <!-- 分享 -->
                <p class="a-g">
                  <i class="share">({{playlistDetail.shareCount}})</i>
                </p>
                <!-- 下载 -->
                <p class="a-g">
                  <i class="download">下载</i>
                </p>
                <!-- 评论 -->
                <p class="a-g">
                  <i class="comment">(<span>{{playlistDetail.commentCount}}</span>)</i>
                </p>
              </div>
              <!-- 标签 -->
              <div class="tags m-t-25 m-b-9">
                <p class="fz-12 t-c-6" style="margin: 0;">标签：</p>
                <a href="" class="bg-btn2 tag-bg p-r-9 m-r-10" v-for="(item,index) in playlistDetail.tags" :key="index">
                  <i class="fz-12 t-c-7 bg-btn2">{{item}}</i>
                </a>
              </div>
              <!-- 介绍 -->
              <p class="introduce t-c-6 fz-12" v-if="!isFold && description.length > 100">
                介绍：{{description.slice(0, 97) + '...'}}
              </p>
              <p class="introduce t-c-6 fz-12" v-else>
                介绍：{{description}}
              </p>
              <div v-if="description.length > 100">
                <div class="fold" @click="handleFold" v-if="!isFold">
                  <span>展开</span>&nbsp;
                  <i class="bg-icon"></i>
                </div>
                <div class="fold" @click="handleFold" v-else>
                  <span>收起</span>&nbsp;
                  <i class="bg-icon fl"></i>
                </div>
              </div>
            </div>
          </div>

          <!-- 歌曲容器 -->
          <div class="song-wrap m-t-30">
            <div class="song-title">
              <div class="title">
                <p class="t-c-3 fz-20">歌曲列表</p>
                <span class="m-l-20 m-t-8">{{total}}首歌</span>
              </div>
              <p>
                播放：<span style="color: #c20c0c;font-weight: bold;">{{playCount}}</span>次
              </p>
            </div>
            <!-- 显示歌曲列表 -->
            <SongList :songList="songList"></SongList>
          </div>
          <!-- v-if="songList.length < playlistDetail.trackIds.length" -->
          <!-- 显示更多 -->
          <div class="see-more">
            <div class="text">查看更多内容，请下载客户端</div>
            <div class="d-button" @click="goDownloadPage">立即下载</div>
          </div>
          <!-- 评论 -->
          <div class="m-t-40">
            <Comment :id="id"></Comment>
          </div>
        </div>

      </div>
      <!-- 右 -->
      <div class="content-r"></div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getPlaylistDetailById } from '@/http/api.js'
import SongList from '@/components/playlist/SongList'
import Comment from '@/components/comment/Comment'
export default {
  name: 'PlaylistDetail',
  components: { SongList, Comment },
  inject: ['reload'],
  data () {
    return {
      // 路由参数 id
      id: 0,
      // 歌单详情
      playlistDetail: [],
      // 歌单描述
      description: [],
      // 歌单图片
      avatarUrl: '',
      // 歌单创建者名字
      nickname: '',
      // 歌曲列表
      songList: [],
      // 歌曲数量
      total: 0,
      // 播放次数
      playCount: 0,
      // 是否折叠
      isFold: false,
      // 收藏人数
      subscribedCount: 0
    }
  },
  methods: {
    // 获取数据
    getDate () {
      // 未登录
      getPlaylistDetailById(this.id).then(res => {
        // console.log(res.playlist)
        this.playlistDetail = res.playlist
        this.description = res.playlist.description
        this.avatarUrl = res.playlist.creator.avatarUrl
        this.nickname = res.playlist.creator.nickname
        this.songList = res.playlist.tracks
        this.total = res.playlist.trackIds.length
        this.playCount = res.playlist.playCount
        this.subscribedCount = this.viewCountsChange(res.playlist.subscribedCount)
        // console.log(this.songList.length)
      }).catch(err => {
        console.log(err)
      })
    },
    handleFold () {
      this.isFold = !this.isFold
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getDate()
  },
  computed: {
    ...mapGetters(['listOfSongs', 'activePath'])
  },
  watch: {
    // 监听路由变化
    $route (n) {
      this.goPlaylistDetailById(n.query.id)
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.reload()
    next()
  }
}
</script>

<style lang="less" scoped>
  @import '../../assets/css/content-layout.less';
  @import '../../assets/css/global.less';

  .module {
    border: 1px solid #d3d3d3;
    border-width: 0 1px;
    font-size: 12px;
  }

  .content-l {
    width: 710px !important;
    padding: 0 !important;

    .content-wrap {
      width: 640px;
      margin: 0 auto;
    }

    // 顶部
    .top {
      width: 640px;
      height: 100%;
      // min-height: 200px;
      // max-height: 335px;
      display: flex;
      justify-content: space-between;

      // 图片区域
      .img-wrap {
        width: 200px;
        height: 200px;
        position: relative;

        img {
          width: 200px;
          height: 200px;
        }

        // 精品
        .jp{
          width: 50px;
          height: 50px;
          background-position: -80px -220px;
          position: absolute;
          top: 0;
          left: 0;
        }

        .mask {
          position: absolute;
          top: -4px;
          left: -4px;
          width: 208px;
          height: 208px;
          background: url(../../assets/imgs/coverall.png) no-repeat;
          background-position: 0 -1285px;
        }
      }

      // 详情
      .detail-wrap {
        width: 410px;
        height: 100%;

        // 标题
        .title {
          // display: flex;
          // align-items: center;

          // 歌单图标
          .icon {
            float: left;
            width: 54px;
            height: 24px;
            margin: 5px 10px 0 0;
            background: url(../../assets/imgs/icon.png) no-repeat;
            background-position: 0 -243px;
          }
          // 精品歌单
          .bg-icon2{
            width: 72px;
            background: url(../../assets/imgs/icon2.png) no-repeat;
            background-position: -110px -275px;
          }

          .title-text{
            font-size: 20px;
            margin-left: 64px;
            color: #333;
          }
        }

        // 用户信息
        .user-info {
          display: flex;
          align-items: center;
          font-size: 12px;

          // 用户头像
          .user-img {
            width: 35px;
            height: 35px;
            cursor: pointer;

            &:hover {
              text-decoration: underline;
            }
          }

          // 用户名字
          .username {
            color: #0373c2;
            cursor: pointer;
            margin: 0 3px 0 10px;
          }

          img {
            width: 13px;
            height: 13px;
          }

          // 时间
          .time {
            margin: 0;
            width: 70px;
            height: 15px;
            margin-left: 15px;
            overflow: hidden;
            text-align: center;
          }
        }

        // 操作
        .content-operation {
          display: flex;

          // 播放
          .play {
            display: flex;
            width: 66px;
            height: 31px;
            background-position: right -428px;

            .icon {
              display: flex;
              align-items: center;
              width: 61px;
              height: 31px;
              background-position: 0 -387px;

              em {
                float: left;
                width: 20px;
                height: 18px;
                background-position: 0 -1622px;
              }

              span {
                display: inline-block;
                color: #fff;
              }
            }

            &:hover {
              background-position: right -469px;

              .icon {
                background-position: 0 -469px;
              }

              em {
                background-position: -28px -1622px;
              }
            }
          }

          // 添加
          .add-btn {
            width: 31px;
            height: 31px;
            background-position: 0 -1588px;
            margin-left: -3px;
            margin-right: 5px;

            &:hover {
              background-position: -40px -1588px;
            }
          }

          // 公共样式
          p,
          i {
            .bg-btn2();
            cursor: pointer;
          }

          .a-g {
            // margin-left: 6px;
            margin-right: 6px;
            padding-right: 5px;
            // width: 65px;
            height: 31px;
            // display: flex;
            float: left;
            background-position: right -1020px;

            i {
              // width: 61px;
              // padding-right: 2px;
              float: left;
              line-height: 31px;
              font-size: 12px;
              padding:0 3px 0 27px;
              color: #333;
              white-space: nowrap;
            }

            &:hover {
              background-position: right -1106px;
            }
          }

          // 文件夹
          .f-wrap {
            // width: 80px;
            background-position: right -1020px;

            .folder {
              // width: 77px;
              background-position: 0 -977px;
            }

            &:hover {
              background-position: right -1106px;

              .folder {
                background-position: 0 -1063px;
              }
            }
          }

          // 分享
          .share {
            background-position: 0 -1225px;

            &:hover {
              background-position: 0 -1268px;
            }
          }

          // 下载
          .download {
            background-position: 0 -2761px;

            &:hover {
              background-position: 0 -2805px;
            }
          }

          // 评论
          .comment {
            background-position: 0 -1465px;

            &:hover {
              background-position: 0 -1508px;
            }
          }

        }

        // 标签
        .tags {
          display: flex;
          align-items: center;

          // 标签块
          .tag-bg {
            background-position: right -27px;

            // width: 50px;
            i {
              display: block;
              line-height: 22px;
              background-position: 0 0;
              padding: 0 3px 0 13px;
            }

            &:hover {
              background-position: right -1430px;

              i {
                background-position: 0 -1400px;
              }
            }
          }

        }

        // 介绍
        .introduce {
          // overflow: hidden;
          // text-overflow: ellipsis;
          // height: var(--height);
          white-space: pre-wrap;
        }
        // 展开/收起
        .fold{
          float: right;
          span{
            cursor: pointer;
            color: #0c73c2;
            &:hover{
              text-decoration: underline;
            }
          }
          i{
            width: 11px;
            height: 8px;
            display: inline-block;
            background-position: -65px -520px;
          }
          .fl{
            background-position: -45px -520px;
          }
        }
      }

    }

    // 歌曲
    .song-wrap {

      // 标题
      .song-title {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        height: 33px;
        border-bottom: 2px solid #c20c0c;
        font-size: 12px;
        color: #666;

        .title {
          display: flex;
          align-items: center;
        }
      }
    }

    // 更多
    .see-more {
      margin: 30px 0 10px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: column;
      height: 66px;

      .d-button {
        width: 120px;
        line-height: 30px;
        background-image: linear-gradient(90deg, #ff5a4c 0%, #ff1d12 100%);
        border-radius: 18px;
        font-size: 12px;
        color: #fff;
        text-align: center;
        cursor: pointer;
      }

      .text {
        color: #333;
        font-size: 13px;
      }
    }

  }

  .content-r {
    width: 270px !important;
    background-color: #40A9FF;
  }
</style>
