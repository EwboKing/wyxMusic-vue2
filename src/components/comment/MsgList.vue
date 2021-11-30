<template>
  <div>
    <div class="cmmts" v-for="item in comments" :key="item.userId">
      <!-- 用户头像 -->
      <div class="p-r-10">
        <img :src="item.user.avatarUrl" class="img">
      </div>
      <!-- 评论 -->
      <div class="cntwrap">
        <div>
          <router-link to="/">{{item.user.nickname}}</router-link>
          <!-- 标识和 vip -->
          <img v-if="item.user.avatarDetail" :src="item.user.avatarDetail.identityIconUrl" class="img-id" >
          <img v-if="item.user.vipType" :src="vipData[item.user.vipRights.redVipLevel].url" class="img-vip" >
          ：{{item.content}}
        </div>
        <!-- 回复 -->
        <div class="reply" v-if="item.beReplied.length">
          <span>
            <i class="bd">◆</i>
            <i class="bg">◆</i>
          </span>
          <p v-if="item.beReplied[0].content">
            <router-link to="/">{{item.beReplied[0].user.nickname}}</router-link>
            <!-- 标识 -->
            <img v-if="item.user.avatarDetail" :src="item.user.avatarDetail.identityIconUrl" class="img-id" >
            ：<em>{{item.beReplied[0].content}}</em>
          </p>
          <p v-else>该评论已删除</p>
        </div>
        <!-- 底部 -->
        <div class="footer m-t-15">
          <div class="time">{{getcmmtTime(item.timeStr,item.time)}}</div>
          <div class="opts">
            <i @click="zan"></i>
            <span class="t-c-3" v-if="item.likedCount">({{item.likedCount}})</span>
            <span class="m-8">|</span>
            <span class="t-c-6 h-hand h-t-d-u">回复</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { vipData } from '@/assets/data/vipData.js'
export default {
  name: 'MsgList',
  props: {
    comments: {
      type: Array
    }
  },
  methods: {
    zan () {
      console.log(this.comments)
    },
    getcmmtTime (str, time) {
      const fun = this.$root.$options.filters.dateFormat
      const t = fun(time, true, true)
      const dt = new Date()
      let m = (dt.getMonth() + 1 + '').padStart(2, '0')
      let d = (dt.getDate() + '').padStart(2, '0')
      if (str.endsWith('天前')) {
        d = d - parseInt(str)
        return `${m}月${d}日 ${t}`
      } else if (str.indexOf('-') !== -1) {
        const arr = str.split('-')
        m = arr[0]
        d = arr[1]
        return `${m}月${d}日 ${t}`
      } else {
        return str
      }
    }
  },
  data () {
    return {
      vipData
    }
  }
}
</script>

<style lang="less" scoped>
  // 评论列表
  .cmmts {
    display: flex;
    padding: 15px 0;
    border-top: 1px dotted #ccc;
    font-size: 12px;
    color: #333;

    // 头像
    .img {
      width: 50px;
      height: 50px;
    }

    // 评论
    .cntwrap {
      width: 100%;
      white-space: pre-wrap;
      a {
        color: #0c73c2;

        &:hover {
          text-decoration: underline;
        }
      }

      // vip 标识
      .img-vip{
        height: 12px;
        margin-left: 5px;
        vertical-align: -1px;
      }

      // 身份标识
      .img-id{
        .img-vip;
        width: 13px;
        height: 13px;
      }

      // 回复
      .reply{
        border: 1px solid #dedede;
        line-height: 20px;
        margin-top: 20px;
        padding: 8px 19px;
        background: #f4f4f4;
        position: relative;
        span{
          position: absolute;
          top: -12px;
          left: 21px;
          .bd{
            color: #dedede;
            position: absolute;
            top: 0;
            left: 0;
          }
          .bg{
            .bd;
            top: 1px;
            color: #f4f4f4;
          }
        }
        p{
          color: #666;
          margin: 0;
        }
      }

      .footer {
        display: flex;
        justify-content: space-between;
        color: #999;

        i {
          width: 15px;
          height: 14px;
          display: inline-block;
          margin: -4px 6px 0 0;
          cursor: pointer;
          background: url(../../assets/imgs/icon2.png) no-repeat -150px 0;

          &:hover {
            background-position: -150px -20px;
          }
        }
      }
    }
  }
</style>
