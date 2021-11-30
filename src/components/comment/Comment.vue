<template>
  <div class="comment">
    <!-- 头部 -->
    <div class="head">
      <p class="t-c-3 fz-20">评论</p>
      <span class="m-l-20 m-t-8">共{{comments.length}}条评论</span>
    </div>
    <!-- 文本输入 -->
    <div class="iptarea"></div>

    <!-- 评论列表 -->
    <div class="hotCmmts" v-if=" curPage === 1 && hotComments.length">
      <div class="ncmmt">精彩评论</div>
      <MsgList :comments="hotComments"></MsgList>
    </div>
    <br><br>
    <div class="cmmts">
      <div class="ncmmt" v-if="curPage === 1">最新评论({{total}})</div>
      <MsgList :comments="comments"></MsgList>
    </div>
    <!-- 分页 -->
    <div style="display: flex;">
      <a-pagination v-if="total > 20 " style="margin: 0 auto;padding-top: 20px;" :total="total" @change="onChange" :pageSize="20"/>
    </div>
  </div>
</template>

<script>
import { getCommentById } from '@/http/api.js'
import MsgList from '@/components/comment/MsgList'
export default {
  name: 'Comment',
  components: { MsgList },
  props: ['id'],
  data () {
    return {
      total: 0,
      comments: [],
      hotComments: [],
      curPage: 1
    }
  },
  methods: {
    // 获取评论
    getCmmts (page = 1) {
      getCommentById(this.id, page).then(res => {
        if (page === 1) {
          this.total = res.total
          this.hotComments = res.hotComments
        }
        // console.log(res)
        this.comments = res.comments
      }).catch(err => {
        console.log(err)
      })
    },
    // 页码改变
    onChange (page) {
      this.curPage = page
      this.getCmmts(page)
    }
  },
  created () {
    this.getCmmts()
  }
}
</script>

<style lang="less" scoped>
  // 分页样式
  @import '../../assets/css/pagination.less';
  .comment{
    // 头部
    .head{
      display: flex;
      height: 33px;
      border-bottom: 2px solid #c20c0c;
      font-size: 12px;
      color: #666;
    }
    // 输入框
    .iptarea{
      height: 98px;
      margin: 20px 0;
      background-color: #bfa;
    }
    .ncmmt{
      font-size: 12px;
      font-weight: bold;
      color: #333;
      height: 20px;
      border-bottom: 1px solid #cfcfcf;
    }

  }
</style>
