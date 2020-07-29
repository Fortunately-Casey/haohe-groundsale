<template>
  <div class="agreement">
    <div class="header">
      <div class="back" @click="back">
        <van-icon name="arrow-left" />返回
      </div>我的申请
      <div class="logout">退出登录</div>
    </div>
    <div class="content">
      <div class="bottom-agree" :class="checked?'checked':'unchecked'">
        <van-checkbox v-model="checked" shape="square" icon-size="16px" checked-color="#ed8936"></van-checkbox>
        <span style="color:#fff" @click="nextStep">{{checked?'下一步':'我已阅读方案'}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Notify } from 'vant';
export default {
  data() {
    return {
      checked: false,
    };
  },
  methods: {
    back() {
      this.$router.push({
        path:"/index"
      })
    },
    nextStep() {
      if(this.checked) {
        this.$router.push({
          path:"/addApply"
        })
      }else {
        Notify({ type: 'warning', message: '请勾选阅读方案后进行下一步！' });
      }
    }
  },
};
</script>
<style lang="less" scoped>
.agreement {
  height: 100%;
  display: flex;
  flex-direction: column;
  .header {
    height: 40px;
    background-color: #ed8936;
    color: #fff;
    text-align: center;
    line-height: 40px;
    position: relative;
    font-size: 16px;
    .back {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .logout {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
    }
  }
  .content {
    flex: 1;
    padding-bottom: 60px;
    position: relative;
    .bottom-agree {
      width: 100%;
      height: 60px;
      position: absolute;
      left: 0;
      bottom: 0;
      font-size: 16px;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-content: center;
    }
    .unchecked {
      background: #a0aec0;
    }
    .checked {
      background: #ed8936;
    }
    span {
      line-height: 60px;
      padding-left: 10px;
    }
  }
}
</style>