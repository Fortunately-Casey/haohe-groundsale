<template>
  <div class="index">
    <div class="header">
      <div class="back" @click="back">
        <!-- <van-icon name="arrow-left" />返回 -->
      </div>我的申请
      <div class="logout" @click="logout">退出登录</div>
    </div>
    <div class="content">
      <div class="apply-list" v-if="applyList.length">
        <div class="item" v-for="(item,index) in applyList" :key="index">
          <div class="top">
            <div class="left">单号：{{item.oddNumber}}</div>
            <div class="right">
              摊位号：
              <span>{{item.boothNumber}}</span>
            </div>
          </div>
          <div class="item-content">
            <div class="card">
              <div class="card-image"></div>
            </div>
            <div class="info">
              <div class="name">{{item.name}}</div>
              <div class="phone">{{item.phone}}</div>
            </div>
            <div class="status" :class="returnStatus(item.status)"></div>
          </div>
          <div class="time">
            倒计时：
            <span>{{item.time}}</span>
          </div>
        </div>
      </div>
      <div class="empty-box" v-else></div>
      <div class="add-button" @click="addNewApply">新增申请</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      applyList: [
        {
          oddNumber: "202006010001",
          boothNumber: "A01",
          name: "张东升",
          phone: "18662858322",
          startTime: "2020-08-01",
          status: 1,
          time: "",
        },
        {
          oddNumber: "202006010002",
          boothNumber: "A02",
          name: "张东升",
          phone: "18662858322",
          status: 2,
          startTime: "2020-08-01",
          time: "",
        },
        {
          oddNumber: "202006010003",
          boothNumber: "A03",
          name: "张东升",
          phone: "18662858322",
          status: 3,
          startTime: "2020-08-02",
          time: "",
        },
      ],
    };
  },
  mounted() {
    let vm = this;
    vm.applyList.map((v) => {
      v.time = vm.InitTime(v.startTime);
    });
    setInterval(() => {
      vm.applyList.map((v) => {
        v.time = vm.InitTime(v.startTime);
      });
    }, 1000);
  },
  methods: {
    InitTime(startTime) {
      var date = new Date();
      var current = new Date(startTime).getTime();
      var now = date.getTime();
      var future = Number(current) + 3 * 24 * 3600 * 1000;
      //设置截止时间
      // var endDate = new Date("2020-8-2 17:00:00");
      var end = future;
      //时间差
      var leftTime = future - now;
      // //定义变量 d,h,m,s保存倒计时的时间
      var d, h, m, s;
      if (leftTime >= 0) {
        // d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
        h = Math.floor(leftTime / 1000 / 60 / 60);
        m = Math.floor((leftTime / 1000 / 60) % 60);
        s = Math.floor((leftTime / 1000) % 60);
      }
      return h + ":" + m + ":" + s;
      return leftTime;
    },
    addNewApply() {
      if (this.applyList.length === 0) {
        this.$router.push({
          path: "/agreement",
        });
      } else {
        this.$router.push({
          path: "/addApply",
        });
      }
    },
    returnStatus(status) {
      let stu;
      switch (status) {
        case 1:
          stu = "pass";
          break;
        case 2:
          stu = "not-pass";
          break;
        case 3:
          stu = "audit";
          break;
      }
      return stu;
    },
    back() {},
    logout() {
      this.$router.push({
        path: "/login",
      });
    },
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
    background: #edf2f6;
    .apply-list {
      .item {
        background-color: #fff;
        // height: 103px;
        padding: 0 20px;
        font-size: 14px;
        position: relative;
        margin-bottom: 10px;
        .top {
          height: 38px;
          border-bottom: 1px solid #ddd;
          display: flex;
          .left,
          .right {
            flex: 1;
            line-height: 38px;
          }
          .right {
            text-align: right;
            span {
              color: #ed8936;
            }
          }
        }
        .item-content {
          height: 65px;
          display: flex;
          .card {
            width: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            .card-image {
              width: 52px;
              height: 40px;
              background: url("../../assets/image/card.png") no-repeat;
              background-size: 100% 100%;
            }
          }
          .info {
            flex: 1;
            display: flex;
            flex-direction: column;
            .name,
            .phone {
              flex: 1;
              line-height: 32.5px;
              font-weight: 100;
            }
          }
          .status {
            width: 72px;
            height: 72px;
            position: absolute;
            right: 25px;
            top: 25px;
          }
          .pass {
            background: url("../../assets/image/pass.png") no-repeat;
            background-size: 100% 100%;
          }
          .not-pass {
            background: url("../../assets/image/not-pass.png") no-repeat;
            background-size: 100% 100%;
          }
          .audit {
            background: url("../../assets/image/audit.png") no-repeat;
            background-size: 100% 100%;
          }
        }
        .time {
          border-top: 1px solid #ddd;
          height: 30px;
          font-size: 12px;
          text-align: right;
          line-height: 30px;
          span {
            color: red;
          }
        }
      }
    }
    .empty-box {
      width: 156px;
      height: 160px;
      background: url("../../assets/image/empty-box.png") no-repeat;
      background-size: 100% 100%;
      position: absolute;
      left: 50%;
      top: 40%;
      transform: translate(-50%, -50%);
    }
    .empty-box::after {
      content: "暂无申请";
      position: absolute;
      left: 50%;
      top: 200px;
      transform: translateX(-50%);
      font-size: 16px;
      color: #a0aec0;
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