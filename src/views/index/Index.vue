<template>
  <div class="index">
    <div class="header">
      <div class="back" @click="back">
        <van-icon name="arrow-left" />返回
      </div>我的申请
      <div class="logout">退出登录</div>
    </div>
    <div class="content">
      <div class="empty-box"></div>
      <div class="add-button" @click="addNewApply">新增申请</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      applyList:[]
    };
  },
  methods: {
    addNewApply() {
      if(this.applyList.length === 0) {
        this.$router.push({
          path:"/agreement"
        })
      }
    },
    back() {},
  },
};
</script>

<style lang="less" scoped>
.index {
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
    .empty-box {
      width: 156px;
      height: 160px;
      background: url("../../assets/image/empty-box.png") no-repeat;
      background-size: 100% 100%;
      position: absolute;
      left: 50%;
      top: 40%;
      transform: translate(-50%,-50%);
    }
    .add-button {
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