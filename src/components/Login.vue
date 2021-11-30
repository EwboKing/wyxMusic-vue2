<template>
  <div class="login-wrap">
    <div class="header t-c-f f-w-b">
      登录
      <a-icon type="close" class="h-hand" @click="closeLoginDialog"/>
    </div>
    <!-- 登录/注册 -->
    <div v-if="!showMobForm" class="login-list p-40">
      <div class="main">
        <div class="plt"></div>
        <!-- 登录 -->
        <div class="login btn-gl" @click="toLogin">
          <i class="t-c-f">手机号登录</i>
        </div>
        <!-- 注册 -->
        <div class="register btn-gl">
          <i class="t-c-3">注册</i>
        </div>
      </div>
      <div class="must"></div>
    </div>
    <!-- 手机号登录 -->
    <div v-else class="login-form">
      <div class="mob-wrap p-t-30">
        <!-- 手机号 -->
        <div :class="{'phone-wrap':true,'err-info':showErr}">
          <div class="box">+86 </div>
          <a-input placeholder="请输入手机号" v-model="loginForm.phone" type="number"/>
        </div>
        <!-- 验证码 -->
        <div class="captcha m-t-10">
          <a-input class="c-input" placeholder="请输入验证码" v-model="loginForm.captcha" />
          <div class="button bg-btn2 p-r-5" @click="getcaptcha">
            <i class="bg-btn2">获取验证码</i>
          </div>
        </div>
        <!-- 错误 -->
        <div class="m-t-3" v-show="showErr">
          <a-alert v-if="!emptyPhone" message="请输入手机号" banner />
          <a-alert v-else message="请输入正确的手机号" banner />
        </div>
        <!-- 登录选项 -->
        <div class="opts m-t-10">
          <p class="t-c-6 fz-12">密码登录</p>
          <a-checkbox @change="checkChange" defaultChecked>自动登录</a-checkbox>
        </div>
        <!-- 登录 -->
        <div class="login btn-gl" @click="login">
          <i class="t-c-f">登录</i>
        </div>
      </div>
      <div class="footer fz-12">
        <p class="h-hand" @click="back">
          &lt; 返回上一层</p>
            <span class="t-c-9 h-hand">没有账号？免费注册 ></span>
      </div>
    </div>
    <!-- 验证码发送成功提示 -->
    <div v-show="showTipDialog" class="tipDialog t-c-3">验证码发送成功！</div>
  </div>
</template>

<script>
import { sendCaptcha } from '@/http/api'
export default {
  name: 'Login',
  data () {
    return {
      showMobForm: false,
      showErr: false,
      showTipDialog: false,
      emptyPhone: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
      loginForm: {
        phone: '',
        captcha: ''
      }
    }
  },
  methods: {
    // 进入登录界面
    toLogin () {
      this.showMobForm = true
    },
    // 返回
    back () {
      this.showMobForm = false
    },
    checkChange (e) {
      console.log(`checked = ${e.target.checked}`)
    },
    // 获取验证码
    getcaptcha () {
      const rule = /^(13[0-9]\d{8}|15[0-35-9]\d{8}|18[0-9]\{8}|14[57]\d{8})$/
      if (!rule.test(this.loginForm.phone)) {
        if (this.loginForm.phone) {
          this.emptyPhone = true
        }
        this.showErr = true
      } else {
        this.showErr = false
        sendCaptcha(this.loginForm.phone).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
        this.showTipDialog = true
        setTimeout(() => {
          this.showTipDialog = false
        }, 3000)
      }
    },
    // 登录
    login () {

    },
    // 关闭登录对话框
    closeLoginDialog () {
      this.$store.commit('setShowLoginDialog', false)
    }
  },
  created () {
    /* // document.body.style.overflow = 'hidden'
    document.addEventListener('mousewheel', e => {
      e.preventDefault()
      return false
    }) */
  }
}
</script>

<style lang="less" scoped>
  @import '../assets/css/global.less';

  // 覆盖默认样式
  /deep/ .ant-input {
    font-size: 12px;
    border-radius: 0;
    border: none ;
    &:focus {
      box-shadow: none;
    }
  }

  /deep/ .ant-alert-warning {
    background-color: transparent;
    padding: 0;

    .ant-alert-icon {
      color: #e33232;
      top: 4.5px;
      left: 0;
    }

    .ant-alert-message {
      font-size: 12px;
      padding: 0 0 0 20px;
    }
  }

  /deep/ .ant-checkbox-wrapper {
    font-size: 12px;
    color: #666;
    cursor: default;
  }

  /deep/ .ant-checkbox {
    cursor: default;

    .ant-checkbox-input {
      cursor: default;

    }
    &:hover{
      border-color: ;
    }
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }

  // 错误的信息
  .err-info{
    border-color: #f08b8b !important;
  }

  .login-wrap {
    width: 530px;
    height: 100%;
    border-radius: 4px;
    position: relative;
    background-color: #fff;
    border: 1px solid #c6c6c6;
    .header {
      line-height: 38px;
      border-radius: 4px 4px 0 0;
      background-color: #2d2d2d;
      display: flex;
      justify-content: space-between;
      padding: 0 12px 0 20px;
      align-items: center;
    }

    // 公共样式
    .btn-gl {
      margin-top: 10px;
      text-align: center;
      cursor: pointer;
      .bg-btn2;

      i {
        width: 219px;
        line-height: 31px;
        display: inline-block;
        font-size: 12px;
        .bg-btn2;
      }
    }

    .login {
      background-position: right -428px;

      i {
        background-position: 0 -387px;
      }

      &:hover {
        background-position: right -510px;

        i {
          background-position: 0 -469px;
        }
      }
    }

    // 登录/注册
    .login-list {
      display: flex;
      justify-content: center;

      .main {
        .plt {
          width: 224px;
          height: 120px;
          background: url(../assets/imgs/platform.png) no-repeat 13px 0;
        }

        .register {
          background-position: right -100px;

          i {
            background-position: 0 -59px;
          }

          &:hover {
            background-position: right -182px;

            i {
              background-position: 0 -141px;
            }
          }
        }
      }
    }

    // 登录
    .login-form {
      .mob-wrap {
        margin: 0 auto;
        width: 220px;
        height: 220px;

        // 手机号
        .phone-wrap {
          display: flex;
          align-items: center;
          width: 220px;
          border: 1px solid #cdcdcd;
          .box {
            line-height: 34px;
            text-align: center;
            width: 45px;

            border-right: 1px solid #cdcdcd;
          }
        }

        // 验证码
        .captcha {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .c-input {
            width: 135px;
            border: 1px solid #cdcdcd;
          }

          .button {
            width: 74px;
            height: 31px;
            background-position: right -100px;
            cursor: pointer;

            i {
              width: 70px;
              line-height: 31px;
              display: inline-block;
              background-position: 0 -59px;
              padding: 0 2px 0 7px;
              font-size: 12px;
            }

            &:hover {
              background-position: right -182px;

              i {
                background-position: 0 -141px;
              }
            }
          }
        }

        // 选项
        .opts {
          display: flex;
          justify-content: space-between;

          p:hover {
            cursor: pointer;
            text-decoration: underline;
          }
        }
      }

      .footer {
        display: flex;
        justify-content: space-between;
        line-height: 50px;
        padding: 0 20px;
        background-color: #f7f7f7;
        border-top: 1px solid #c6c6c6;

        p {
          color: #0c72c3;
        }
      }
    }
    // 成功提示窗口
    .tipDialog{
      position: absolute;
      top: 150px;
      left: 116px;
      width: 300px;
      line-height: 40px;
      text-align: center;
      background-color: #ffffff;
      border: 1px solid #c6c6c6;
      box-shadow: 1px 1px 10px #c6c6c6;
    }
  }
</style>
