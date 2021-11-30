<template>
  <div class="user-menu-hover">
    <i class="arr"></i>
    <div class="msg">
      <div class="my-home g-l">
        <i class="icon-home"></i>
        <p>我的主页</p>
      </div>
      <div class="my-msg g-l">
        <i class="icon-msg"></i>
        <p>我的消息</p>
      </div>
      <div class="my-vip g-l">
        <i class="icon-vip"></i>
        <p>VIP会员</p>
      </div>
    </div>
    <div class="per">
      <div class="setting g-l">
        <i class="icon-set"></i>
        <p>个人设置</p>
      </div>
      <div class="real-name g-l">
        <i class="icon-real"></i>
        <p>实名认证</p>
      </div>
    </div>
    <div class="quit g-l">
      <i class="icon-quit"></i>
      <p>退出</p>
    </div>

  </div>
</template>

<script>
export default {
  name: 'UserMenuHover'
}
</script>

<style lang="less" scoped>
  .user-menu-hover {
    position: absolute;
    width: 158px;
    height: 210px;
    background: #2b2b2b;
    border: 1px solid #202020;
    box-shadow: 0 8px 24px 0 rgb(0 0 0 / 50%);
    border-radius: 4px;
    top: 10px;

    // 公共样式
    .g-l {
      display: flex;
      width: 158px;
      height: 34px;
      line-height: 34px;
      font-size: 12px;
      color: #ccc;
      padding-left: 24px;
      cursor: pointer;

      &:hover{
        background-color: #353535;
        color: #FFFFFF;
      }

      i {
        width: 18px;
        height: 18px;
        margin: 8.5px 10px 0 0 ;
        background: url(../../assets/imgs/user/toplist.png) no-repeat 0 9999px;
      }

      // 图标样式
     .icon-home{
       background-position: 0 -80px;
     }

     .icon-msg{
       background-position: -20px -120px;
     }

     .icon-vip{
       background-position: 0 -221px;
     }

     .icon-set{
       background-position: 0 -140px;
     }

     .icon-real{
       background-position: -20px -142px;
     }

     .icon-quit{
       background-position: 0 -200px;
     }
    }

    // 边框
    .msg,.per,.quit{
      overflow: hidden;
    }

    .per{
      border: 1px solid #232323;
      border-width: 1px 0;
    }

    // 三角
    .arr{
      width: 14px;
      height: 8px;
      background: url(../../assets/imgs/user/toplist.png) no-repeat -20px 0;
      position: absolute;
      top: -7px;
      right: 70px;
    }
  }
</style>
