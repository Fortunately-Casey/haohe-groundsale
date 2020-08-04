<template>
  <div class="commit-letter">
    <div class="header">
      <!-- <div class="back" @click="back">
        <van-icon name="arrow-left" />返回
      </div> -->
      申请完成
    </div>
    <div class="content">
      <p>
        您已申请
        <span>{{type}}</span>摊位
      </p>
      <p>请您于<span style="color:#dd2626">{{date}} 17:00</span>前，携带身份证、户口本等相关证件，前往濠河管理中心进行现场审核，逾期作废。</p>
      <p>审核内容包括：</p>
      <p>（1）确认摊位号</p>
      <p>（2）缴纳押金、管理费</p>
      <p style="text-align:right">南通濠河管理处</p>
    </div>
    <div class="bottom-agree" :class="checked?'checked':'unchecked'">
      <div class="chose-button" @click="back">返回首页</div>
    </div>
  </div>
</template>

<script>
import { Notify, Toast } from "vant";
export default {
  data() {
    return {
      checked: false,
      Signature_Pad: "",
      type:"",
      date:""
    };
  },
  created() {
    this.type = this.$route.query.type;
    this.date = this.$route.query.date.split(" ")[0];
  },
  mounted() {
  
  },
  methods: {
    back() {
      this.$router.push({
        path: "/index",
      });
    },
  },
};
</script>
<style lang="less" scoped>
.commit-letter {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #edf2f6;
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
    overflow-y: auto;
    padding: 20px 20px 0 20px;
    background-color: #fff;
    h2 {
      text-align: center;
      line-height: 30px;
      font-weight: bold;
      font-size: 16px;
    }
    h3 {
      text-indent: 20px;
    }
    p {
      font-size: 12px;
      line-height: 30px;
      span {
        color: #ff7112;
        padding: 0;
      }
    }
  }
  .bottom-agree {
    width: 100%;
    height: 60px;
    font-size: 16px;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-content: center;
    .chose-button {
      width: 250px;
      height: 35px;
      text-align: center;
      line-height: 35px;
      border-radius: 4px;
      color: #fff;
      background: #ed8936;
      font-size: 16px;
      position: absolute;
      left: 50%;
      bottom: 10px;
      transform: translateX(-50%);
    }
  }
}
</style>