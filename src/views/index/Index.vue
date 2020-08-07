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
        <div
          class="item"
          v-for="(item,index) in applyList"
          :key="index"
          @click="goToDetail(item.id)"
        >
          <div class="top">
            <div class="left">单号：{{item.id}}</div>
            <div class="right">
              摊位类型：
              <span>{{item.businessType}}</span>
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
            <div class="status" :class="returnStatus(item)"></div>
          </div>
          <div class="time" v-if="item.status === 1">
            倒计时：
            <span>{{item.time}}</span>
          </div>
        </div>
      </div>
      <div class="empty-box" v-else></div>
    </div>
    <div class="bottom">
      <div class="add-button" @click="addNewApply">新增申请</div>
    </div>
  </div>
</template>

<script>
import * as api from "@/service/apiList";
import http from "@/service/service";
import { Toast, Notify , Dialog} from "vant";
import { Indicator } from "mint-ui";
import { Todate } from "@/common/tool/tool";
export default {
  data() {
    return {
      applyList: [],
    };
  },
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    getList() {
      let vm = this;
      Indicator.open();
      vm.applyList = [];
      http.get(api.GETSTALLLISTBYUSERID, {},vm).then((resp) => {
        Indicator.close();
        resp.data.data.map((v) => {
          vm.applyList.push({
            id: v.id,
            name: v.name,
            phone: v.phone,
            status: v.status,
            endTime: v.endTime,
            businessType: v.businessType,
            auditResult:v.auditResult,
            time: vm.InitTime(v.endTime),
          });
        });
        vm.timeInterval();
      });
    },
    goToDetail(id) {
      this.$router.push({
        path: "/applyDetail",
        query: {
          id: id,
        },
      });
    },
    timeInterval() {
      let vm = this;
      setInterval(() => {
        vm.applyList.map((v) => {
          v.time = vm.InitTime(v.endTime);
        });
      }, 1000);
    },
    InitTime(endTime) {
      var date = new Date();
      var now = date.getTime();
      //设置截止时间
      var future =
        new Date(String(endTime.split(" ")[0])).getTime() + 9 * 3600 * 1000;
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
    returnStatus(item) {
      let stu;
      if (item.status === 1) {
        stu =  "audit";
      } else if (item.status === 3) {
        stu = "lose";
      } else if (item.status === 2 && item.auditResult) {
        stu = "pass";
      } else if (item.status === 2 && !item.auditResult) {
        stu = "not-pass";
      }
      return stu;
    },
    back() {},
    logout() {
      Dialog.confirm({
        title: "退出账号",
        message: "确认要退出当前账号吗？",
      })
        .then(() => {
          this.$router.push({
            path: "/login",
          });
        })
        .catch(() => {
          // on cancel
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
    position: relative;
    background: #edf2f6;
    overflow-y: auto;
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
          .lose {
            background: url("../../assets/image/lose-efficacy.png") no-repeat;
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
  }
  .bottom {
    height: 50px;
    position: relative;
    background: #edf2f6;
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