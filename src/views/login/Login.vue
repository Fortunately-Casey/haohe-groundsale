<template>
  <div class="login" :style="{ height: bodyHeight ? bodyHeight + 'px' : '100%' }">
    <div class="login-top"></div>
    <div class="login-title"></div>
    <div class="login-content">
      <div class="login-box" v-if="isLogin">
        <div class="input">
          <i class="iconfont">&#xe71f;</i>
          <input type="text" placeholder="输入手机号" @blur="blur"/>
        </div>
        <div class="input">
          <i class="iconfont">&#xe601;</i>
          <input type="text" placeholder="输入密码" @blur="blur"/>
        </div>
        <div class="login-button" @click="loginConfirm">登 录</div>
      </div>
      <div class="register-box" v-else>
        <div class="input">
          <i class="iconfont">&#xe71f;</i>
          <input type="text" placeholder="输入手机号" @blur="blur"/>
        </div>
        <div class="input">
          <i class="iconfont">&#xe601;</i>
          <input type="text" placeholder="输入8-20位登录密码" @blur="blur"/>
        </div>
        <div class="input">
          <i class="iconfont">&#xe601;</i>
          <input type="text" placeholder="请再次输入密码" @blur="blur"/>
        </div>
        <div class="agreement">
          <van-checkbox v-model="checked" shape="square" icon-size="14px" checked-color="#a0aec0"></van-checkbox>
          <span>同意</span>
          <span class="agree">《用户服务协议》</span>
        </div>
        <div class="register-button">注 册</div>
      </div>
      <p v-if="isLogin">
        还没有账户？请先
        <span @click="register">注册</span>
      </p>
      <p v-else>
        已有账户？立即
        <span @click="login">登录</span>
      </p>
    </div>
    <div class="bottom">版权所有©南通市濠河管理处｜技术支持:南通市测绘院有限公司</div>
  </div>
</template>

<script>
import { blur } from "@/common/tool/tool";
export default {
  data() {
    return {
      bodyHeight: "",
      isLogin: true,
      checked: false,
    };
  },
  mounted() {
    this.bodyHeight = document.documentElement.clientHeight;
  },
  methods: {
    register() {
      this.isLogin = false;
    },
    login() {
      this.isLogin = true;
    },
    loginConfirm() {
      this.$router.push({
        path:'/index'
      })
    },
    blur() {
      blur();
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  position: relative;
  .login-top {
    width: 325px;
    height: 180px;
    background: url("../../assets/image/login-top.png") no-repeat;
    background-size: 100% 100%;
    margin-top: 30px;
  }
  .login-title {
    width: 294px;
    height: 20px;
    background: url("../../assets/image/login-title.png") no-repeat;
    background-size: 100% 100%;
    margin-top: 20px;
  }
  .login-content {
    width: 250px;
    height: 200px;
    margin-top: 20px;
  }
  .login-box,
  .register-box {
    .input {
      position: relative;
      margin-bottom: 15px;
      i {
        position: absolute;
        left: 6px;
        top: 50%;
        transform: translateY(-55%);
        font-size: 20px;
        color: #a0aec0;
      }
      input {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 4px;
        width: 250px;
        box-sizing: border-box;
        height: 35px;
        line-height: 35px;
        font-size: 14px; 
        -webkit-appearance: none;
        padding-left: 25px;
        font-size: 14px;
      }
      ::-webkit-input-placeholder { 
        color: #a0aec0;
      }
    }
    .login-button,
    .register-button {
      width: 250px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      border-radius: 4px;
      color: #fff;
      background-color: #fff;
      background: #ed8936;
      font-size: 18px;
    }
    .agreement {
      margin: 10px 0;
      display: flex;
      align-items: center;
      color: #a0aec0;
      span {
        margin-left: 5px;
      }
      .agree {
        color: #ed8936;
      }
    }
  }
  p {
    font-size: 10px;
    margin: 20px 0;
    text-align: center;
    color: #a0aec0;
    span {
      color: #ed8936;
    }
  }
  .bottom {
    position: absolute;
    bottom: 0;
    z-index: 999;
    width: 100%;
    height: 32px;
    background-color: #fff;
    background: #e2e8f0;
    font-size: 10px;
    color: #728096;
    letter-spacing: -1px;
    font-size: 10px;
    text-align: center;
    line-height: 32px;
  }
}
</style>