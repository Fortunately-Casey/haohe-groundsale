<template>
  <div class="add-apply">
    <div class="header">
      <div class="back" @click="back">
        <van-icon name="arrow-left" />返回
      </div>新增申请
    </div>
    <div class="content">
      <div class="title">第一经营人</div>
      <van-cell-group>
        <van-field v-model="value" label="真实姓名" placeholder="请输入真实姓名" />
        <van-field v-model="value" label="手机号码" placeholder="请输入手机号码" />
      </van-cell-group>
      <div class="idCard">
        <van-uploader v-model="fileList" multiple :max-count="1" capture="camara" />
        <van-uploader v-model="fileList1" multiple :max-count="1" capture="camara" />
      </div>
      <div class="id-name">
        <div class="card1">身份证背面</div>
        <div class="card2">身份证正面</div>
      </div>
      <div class="title">
        其他经营人（直系亲属）
        <span @click="addPerson">添加人员</span>
      </div>
      <div v-if="isShowPeopleList">
        <van-cell-group
          v-for="(item,index) in otherOperators"
          :key="index"
          style="margin-bottom:10px"
        >
          <left-slider :index="index" @deleteItem="deleteItem(index)" :ref="index">
            <van-field v-model="item.name" label="人员姓名" placeholder="请输入真实姓名" />
            <van-field v-model="item.phone" label="手机号码" placeholder="请输入手机号码" />
          </left-slider>
        </van-cell-group>
      </div>
      <div class="title">经营范围及摊位</div>
      <van-cell is-link title="经营范围" @click="isShowRange = true" />
      <van-action-sheet v-model="isShowRange" :actions="actions" @select="onSelect" />
    </div>
    <div class="bottom">
      <div class="chose-button">选择摊位</div>
    </div>
  </div>
</template>

<script>
import { Notify } from "vant";
import LeftSlider from "@/components/LeftSlider.vue";
export default {
  data() {
    return {
      isShowPeopleList: true,
      checked: false,
      value: "",
      otherOperators: [],
      actions: [
        { name: "儿童玩具、纪念品、工艺品", id: "111" },
        { name: "小型游乐项目", id: "111" },
        { name: "服装衣饰", id: "111" },
        { name: "图书音像", id: "111" },
        { name: "绿植花卉", id: "111" },
      ],
      fileList: [],
      fileList1: [],
      isShowRange: false,
    };
  },
  methods: {
    back() {
      this.$router.push({
        path: "/index",
      });
    },
    onSelect(value) {
      console.log(value);
    },
    deleteItem(index) {
      // this.$refs.index.restSlideDelete();
      this.otherOperators.splice(index,1);
    },
    addPerson() {
      if (this.otherOperators.length >= 3) {
        Notify({ type: "warning", message: "最多添加三位其他经营人！" });
        return;
      }
      this.otherOperators.push({
        name: "",
        phone: "",
      });
    },
    nextStep() {
      if (this.checked) {
      } else {
        Notify({ type: "warning", message: "请勾选阅读方案后进行下一步！" });
      }
    },
  },
  components: {
    LeftSlider,
  },
};
</script>
<style lang="less" scoped>
.add-apply {
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
    background: #edf2f6;
    padding-bottom: 60px;
    position: relative;
    overflow-y: scroll;
    .title {
      height: 40px;
      line-height: 40px;
      padding-left: 16px;
      color: #728096;
      font-size: 14px;
      span {
        float: right;
        color: #48bb78;
        margin-right: 10px;
      }
    }
    .idCard {
      display: flex;
      padding: 15px 0 0 15px;
      background-color: #fff;
    }
    .id-name {
      display: flex;
      background-color: #fff;
      padding-left: 20px;
      padding-bottom: 10px;
      .card1,
      .card2 {
        width: 120px;
        text-align: center;
        color: #2d3748;
      }
      .card2 {
        margin-left: 10px;
      }
    }
  }
  .bottom {
    height: 60px;
    background: #edf2f6;
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