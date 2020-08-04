    <template>
  <div class="add-apply">
    <div class="header">
      <div class="back" @click="back">
        <van-icon name="arrow-left" />返回
      </div>申请详情
    </div>
    <div class="content">
      <div class="title">第一经营人</div>
      <van-cell-group>
        <van-field v-model="name" label="真实姓名" placeholder="请输入真实姓名" disabled/>
        <van-field v-model="linkPhone" label="手机号码" placeholder="请输入手机号码" disabled/>
      </van-cell-group>
      <div class="idCard">
        <van-uploader v-model="certBackPic" multiple :max-count="1" capture="camara" disabled :deletable="false"/>
        <van-uploader v-model="certFrontPic" multiple :max-count="1" capture="camara" disabled :deletable="false"/>
      </div>
      <div class="id-name">
        <div class="card1">身份证背面</div>
        <div class="card2">身份证正面</div>
      </div>
      <van-cell-group>
        <van-field v-model="householdNumber" label="户号" placeholder="请输入户号" disabled/>
      </van-cell-group>
      <div class="houseID">
        <van-uploader v-model="householdPicBack" multiple :max-count="1" capture="camara" disabled :deletable="false"/>
        <van-uploader v-model="householdPicFront" multiple :max-count="1" capture="camara" disabled :deletable="false"/>
      </div>
      <div class="id-name">
        <div class="card1">户口本首页</div>
        <div class="card2">申请人户籍页</div>
      </div>
      <div class="title">
        其他经营人（直系亲属）
      </div>
      <div v-if="isShowPeopleList">
        <van-cell-group
          v-for="(item,index) in otherOperators"
          :key="index"
          style="margin-bottom:10px"
        >
          <!-- <left-slider :index="index" @deleteItem="deleteItem(index)" :ref="index"> -->
            <van-field v-model="item.linkman" label="人员姓名" placeholder="请输入真实姓名" disabled/>
            <van-field v-model="item.linkPhone" label="手机号码" placeholder="请输入手机号码" disabled/>
          <!-- </left-slider> -->
        </van-cell-group>
      </div>
      <div class="title">经营范围及摊位类型</div>
      <van-field
        readonly
        clickable
        name="picker"
        :value="range"
        label="经营范围"
        placeholder="点击选择经营范围"
      />
      <van-popup v-model="isShowRange" position="bottom">
        <van-picker
          show-toolbar
          :columns="rangeColumns"
          @confirm="rangeConfirm"
          @cancel="isShowRange = false"
        />
      </van-popup>
      <van-field
        readonly
        clickable
        name="picker"
        :value="type"
        label="摊位类型"
        placeholder="点击选择摊位类型"
      />
      <van-popup v-model="isShowType" position="bottom">
        <van-picker
          show-toolbar
          :columns="typeColumns"
          @confirm="typeConfirm"
          @cancel="isShowType = false"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
import * as api from "@/service/apiList";
import http from "@/service/service";
import { Toast, Notify } from "vant";
import { Indicator } from "mint-ui";
import LeftSlider from "@/components/LeftSlider.vue";
import { Todate } from "@/common/tool/tool";
export default {
  data() {
    return {
      name: "",
      linkPhone: "",
      value: "",
      householdNumber: "",
      isShowPeopleList: true,
      checked: false,
      range: "",
      otherOperators: [
        {
          linkman: "",
          linkPhone: "",
        },
      ],
      type: "",
      rangeColumns: [],
      typeColumns: [],
      certBackPic: [],
      certFrontPic: [],
      householdPicBack: [],
      householdPicFront: [],
      isShowRange: false,
      isShowType: false,
    };
  },
  created() {
    this.getBusinessScope1();
    this.getBusinessScope2();
    this.getDetail();
  },
  methods: {
    getDetail() {
      let vm = this;
      Indicator.open();
      http.get(api.GETSTALLAPPLICATIONINFO,{
        id: vm.$route.query.id
      }).then((resp) => {
        Indicator.close();
        console.log(resp.data.data);
        let res = resp.data.data;
        vm.name = res.name;
        vm.linkPhone = res.linkPhone;
        vm.householdNumber = res.householdNumber;
        vm.otherOperators = res.linkMEN;
        vm.range = res.businessScope;
        vm.type = res.businessType;
        vm.certBackPic = [{
          url:res.certBackPic
        }]
        vm.certFrontPic = [{
          url:res.certFrontPic
        }]
        vm.householdPicBack = [{
          url:res.householdPicBack
        }]
        vm.householdPicFront = [{
          url:res.householdPicFront
        }]
      })
    },
    getBusinessScope2() {
      let vm = this;
      Indicator.open();
      vm.rangeColumns = [];
      http
        .get(api.GETBUSINESSSCOPE, {
          nameType: 2,
        })
        .then((resp) => {
          Indicator.close();
          resp.data.data.map((v) => {
            vm.rangeColumns.push(v.Name);
          });
        });
    },
    getBusinessScope1() {
      let vm = this;
      Indicator.open();
      vm.typeColumns = [];
      http
        .get(api.GETBUSINESSSCOPE, {
          nameType: 1,
        })
        .then((resp) => {
          Indicator.close();
          resp.data.data.map((v) => {
            vm.typeColumns.push(v.Name);
          });
        });
    },
    back() {
      this.$router.push({
        path: "/index",
      });
    },
    deleteItem(index) {
      // this.$refs.index.restSlideDelete();
      this.otherOperators.splice(index, 1);
    },
    addPerson() {
      if (this.otherOperators.length >= 3) {
        Notify({ type: "warning", message: "最多添加三位其他经营人！" });
        return;
      }
      this.otherOperators.push({
        linkman: "",
        linkPhone: "",
      });
    },
    rangeConfirm(value) {
      this.range = value;
      this.isShowRange = false;
    },
    typeConfirm(value) {
      this.type = value;
      this.isShowType = false;
    },
    nextStep() {
      if (this.checked) {
      } else {
        Notify({ type: "warning", message: "请勾选阅读方案后进行下一步！" });
      }
    },
    next() {
      this.$router.push({
        path: "/commitLetter",
      });
    },
    confirm() {
      let vm = this;
      let flag = true;
      if (
        !vm.name ||
        !vm.linkPhone ||
        !vm.householdNumber ||
        !vm.type ||
        !vm.range
      ) {
        Notify({ type: "warning", message: "请填写完整的信息！" });
        return;
      }
      vm.otherOperators.map((v) => {
        if (!v.linkman || !vm.linkPhone) {
          flag = false;
        }else {
          flag = true;
        }
      });
      if (!flag) {
        Notify({ type: "warning", message: "请填写完整的其他经营人信息！" });
        return;
      }
      if (vm.certBackPic.length === 0 || vm.certFrontPic.length === 0) {
        Notify({ type: "warning", message: "请拍摄完整的身份证信息！" });
        return;
      }
      if (
        vm.householdPicBack.length === 0 ||
        vm.householdPicFront.length === 0
      ) {
        Notify({ type: "warning", message: "请拍摄完整的户口本信息！" });
        return;
      }
      Indicator.open();
      let formData = new FormData();
      formData.append("name", vm.name);
      formData.append("linkPhone", vm.linkPhone);
      formData.append("businessScope", vm.range);
      formData.append("householdNumber", vm.householdNumber);
      formData.append("businessType", vm.type);
      formData.append("linkMans", JSON.stringify(vm.otherOperators));
      formData.append("certBackPic", vm.certBackPic[0].file);
      formData.append("certFrontPic", vm.certFrontPic[0].file);
      formData.append("householdPicBack", vm.householdPicBack[0].file);
      formData.append("householdPicFront", vm.householdPicFront[0].file);
      http.upload(api.STALLCOMMIT, formData).then((resp) => {
        Indicator.close();
        if (resp.data.success) {
          this.$router.push({
            path: "/applyFinished",
            query:{
              type:vm.type,
              date:Todate(resp.data.data)
            }
          });
          Notify({ type: "success", message: "申请成功!" });
        } else {
          Notify({ type: "danger", message: resp.data.message });
        }
      });
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
    .idCard,
    .houseID {
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
        color: #728096;
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