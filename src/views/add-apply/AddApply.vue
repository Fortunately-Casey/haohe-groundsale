<template>
  <div class="add-apply">
    <div class="header">
      <div class="back" @click="back">
        <van-icon name="arrow-left" />返回
      </div>新增申请
    </div>
    <div class="content" v-show="isAdd">
      <div class="title">第一经营人</div>
      <van-cell-group>
        <van-field v-model="name" label="真实姓名" placeholder="请输入真实姓名" />
        <van-field v-model="linkPhone" type="number" label="手机号码" placeholder="请输入手机号码" />
      </van-cell-group>
      <div class="idCard">
        <van-uploader
          v-model="certBackPic"
          multiple
          :max-count="1"
          :after-read="uploadImgs"
          capture="camera"
          image-fit="cover"
        />
        <van-uploader
          v-model="certFrontPic"
          multiple
          :max-count="1"
          :after-read="uploadImgs"
          capture="camera"
          image-fit="cover"
        />
      </div>
      <div class="id-name">
        <div class="card1">身份证背面</div>
        <div class="card2">身份证正面</div>
      </div>
      <van-cell-group>
        <van-field v-model="householdNumber" type="number" label="户号" placeholder="请输入户号" />
      </van-cell-group>
      <div class="houseID">
        <van-uploader
          v-model="householdPicBack"
          multiple
          :max-count="1"
          :after-read="uploadImgs"
          capture="camera"
          image-fit="cover"
        />
        <van-uploader
          v-model="householdPicFront"
          multiple
          :max-count="1"
          :after-read="uploadImgs"
          capture="camera"
          image-fit="cover"
        />
      </div>
      <div class="id-name">
        <div class="card1">户口本首页</div>
        <div class="card2">申请人户籍页</div>
      </div>
      <div class="title">
        其他经营人（直系亲属）
        <span @click="addPerson">添加人员</span>
      </div>
      <div v-if="isShowPeopleList">
        <van-swipe-cell
          v-for="(item,index) in otherOperators"
          :key="index"
          style="margin-bottom:10px"
        >
          <van-cell-group>
            <van-field v-model="item.linkman" label="人员姓名" placeholder="请输入真实姓名" />
            <van-field v-model="item.linkPhone" type="number" label="手机号码" placeholder="请输入手机号码" />
          </van-cell-group>
          <template #right>
            <van-button
              square
              text="删除"
              type="danger"
              class="delete-button"
              @click="deleteItem(index)"
            />
          </template>
        </van-swipe-cell>
      </div>
      <div class="title">经营范围及摊位类型</div>
      <van-field
        readonly
        clickable
        name="picker"
        :value="range"
        label="经营范围"
        placeholder="点击选择经营范围"
        @click="isShowRange = true"
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
        @click="isShowType = true"
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
    <div class="signtext" v-show="!isAdd">
      <h2>承 诺 书</h2>
      <p>
        本人
        <span>{{name}}</span>，
        <span>{{type}}</span>摊点经营者。为积极营造文明经营的社会环境，形成文明、和谐、有序的良好景区秩序，本人在此郑重承诺如下：
      </p>
      <p>1、依法经营，诚实守信。遵守从业道德，文明、诚信、规范经营，所售商品质量合格，不出售违禁品，发生纠纷自行协调解决；言语文明，礼貌待客，不强买强卖、欺行霸市。</p>
      <p>2、爱护环境，禁绝噪声。保持卫生整洁，每天收摊后自觉打扫；经营时声响不超过30分贝，不使用喇叭叫卖。</p>
      <p>3、指定范围，禁止游摊。按照申请的项目及摊位进行经营，不扩面、不游摊，未经允许不延长经营时间。</p>
      <p>
        4、遵守规定，服从管理。及时缴纳管理费及保证金，摆摊人员共计
        <span>{{otherOperators.length + 1}}</span>人，持证上岗，证件严禁外借，遵守景区条例及各项景区管理规定，树立安全防范意识，不私拉电线，不损害景区公共基础设施及绿化树木。
      </p>
      <p>5、如遇不可抗拒情况，如举办大型活动、广场改造、局部施工等，无条件服从管理处的相关调整。</p>
      <p>6、违反以上承诺内容，同意管理处予以不良记录。累计三次不良记录，以及经营者被多次投诉且情况属实，或被行政处罚、治安处罚的，立即予以清退，且保证金不予退还。</p>
    </div>
    <div class="signature" v-show="!isAdd">
      <div class="title">
        签署姓名
        <span @click="clear">清空</span>
      </div>
      <canvas id="canvas" ref="canvas" width="320" height="120"></canvas>
    </div>
    <div class="bottom">
      <div class="chose-button" @click="next" v-if="isShownext">下一步</div>
      <div class="chose-button" @click="confirm" v-if="!isShownext">提交申请</div>
    </div>
  </div>
</template>

<script>
import * as api from "@/service/apiList";
import http from "@/service/service";
import { Toast, Notify } from "vant";
import { Indicator } from "mint-ui";
import { Todate, getRandomString } from "@/common/tool/tool";
import SignaturePad from "signature_pad";
export default {
  data() {
    return {
      isAdd: true,
      isShownext: true,
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
      formData: {},
      checked: false,
      Signature_Pad: "",
      signImage: "",
    };
  },
  created() {
    this.getBusinessScope1();
    this.getBusinessScope2();
  },
  mounted() {
    this.Signature_Pad = new SignaturePad(this.$refs.canvas, {
      backgroundColor: "#fff",
    });
  },
  methods: {
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
      if (this.isAdd) {
        this.$router.push({
          path: "/index",
        });
      } else {
        this.clear();
        this.isAdd = true;
      }
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
    next() {
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
      var phoneReg = /^1[3456789]\d{9}$/;
      vm.otherOperators.map((v) => {
        if (!v.linkman || !v.linkPhone) {
          flag = false;
        } else {
          flag = true;
        }
        if (!phoneReg.test(Number(v.linkPhone))) {
          Toast({
            message: "请输入合法其他经营人手机！",
            iconClass: "icon icon-success",
          });
          flag = false;
        }
      });
      if (!flag) {
        Notify({ type: "warning", message: "请填写正确的其他经营人信息！" });
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

      if (!phoneReg.test(Number(vm.linkPhone))) {
        Toast({
          message: "请输入合法手机号！",
          iconClass: "icon icon-success",
        });
        return;
      }
      if (this.isAdd) {
        this.isAdd = false;
      } else {
        if (this.Signature_Pad._isEmpty) {
          Toast("请签名");
          return;
        }
        const data = this.$refs.canvas.toDataURL();
        const myBlob = this.dataURLToBlob(data);
        this.signImage = myBlob;
        this.isAdd = true;
        this.isShownext = false;
      }
    },
    uploadImgs(file) {
      // 大于1MB的jpeg和png图片都缩小像素上传
      if (/\/(?:jpeg|png)/i.test(file.file.type) && file.file.size > 1000000) {
        // 创建Canvas对象(画布)
        let canvas = document.createElement("canvas");
        // 获取对应的CanvasRenderingContext2D对象(画笔)
        let context = canvas.getContext("2d");
        // 创建新的图片对象
        let img = new Image();
        // 指定图片的DataURL(图片的base64编码数据)
        img.src = file.content;
        // 监听浏览器加载图片完成，然后进行进行绘制
        img.onload = () => {
          // 指定canvas画布大小，该大小为最后生成图片的大小
          canvas.width = 600;
          canvas.height = 800;
          /* drawImage画布绘制的方法。(0,0)表示以Canvas画布左上角为起点，400，300是将图片按给定的像素进行缩小。
          如果不指定缩小的像素图片将以图片原始大小进行绘制，图片像素如果大于画布将会从左上角开始按画布大小部分绘制图片，最后的图片就是张局部图。*/
          context.drawImage(img, 0, 0, 600, 800);
          // 将绘制完成的图片重新转化为base64编码，file.file.type为图片类型，0.92为默认压缩质量
          file.content = canvas.toDataURL(file.file.type, 1);
          // console.log(file)
          // 最后将base64编码的图片保存到数组中，留待上传。
        };
      }
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
      var phoneReg = /^1[3456789]\d{9}$/;
      vm.otherOperators.map((v) => {
        if (!v.linkman || !v.linkPhone) {
          flag = false;
        } else {
          flag = true;
        }
        if (!phoneReg.test(Number(v.linkPhone))) {
          Toast({
            message: "请输入合法其他联系人手机！",
            iconClass: "icon icon-success",
          });
          flag = false;
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
      if (!phoneReg.test(Number(vm.linkPhone))) {
        Toast({
          message: "请输入合法手机号！",
          iconClass: "icon icon-success",
        });
        return;
      }
      var certFrontPic = this.blobToFile(
        this.dataURLtoBlob(this.certFrontPic[0].content),
        this.certFrontPic[0].file.name
      );
      var certBackPic = this.blobToFile(
        this.dataURLtoBlob(this.certBackPic[0].content),
        this.certBackPic[0].file.name
      );
      var householdPicBack = this.blobToFile(
        this.dataURLtoBlob(this.householdPicBack[0].content),
        this.householdPicBack[0].file.name
      );
      var householdPicFront = this.blobToFile(
        this.dataURLtoBlob(this.householdPicFront[0].content),
        this.householdPicFront[0].file.name
      );
      Indicator.open();
      vm.formData = new FormData();
      let picName1 = getRandomString(10);
      let picName2 = getRandomString(10);
      let picName3 = getRandomString(10);
      let picName4 = getRandomString(10);
      vm.formData.append("name", vm.name);
      vm.formData.append("linkPhone", vm.linkPhone);
      vm.formData.append("businessScope", vm.range);
      vm.formData.append("householdNumber", vm.householdNumber);
      vm.formData.append("businessType", vm.type);
      vm.formData.append("linkMans", JSON.stringify(vm.otherOperators));
      vm.formData.append("certBackPic", certBackPic, `${picName1}.png`);
      vm.formData.append("certFrontPic", certFrontPic, `${picName2}.png`);
      vm.formData.append(
        "householdPicBack",
        householdPicBack,
        `${picName3}.png`
      );
      vm.formData.append(
        "householdPicFront",
        householdPicFront,
        `${picName4}.png`
      );
      let signatureName = getRandomString(10);
      vm.formData.append("signaturePic", vm.signImage, `${signatureName}.png`);
      http.upload(api.STALLCOMMIT, vm.formData).then((resp) => {
        Indicator.close();
        if (resp.data.success) {
          this.$router.push({
            path: "/applyFinished",
            query: {
              type: vm.type,
              date: resp.data.data,
            },
          });
          Notify({ type: "success", message: "申请成功!" });
        } else {
          Notify({ type: "danger", message: resp.data.message });
        }
      });
    },
    dataURLtoBlob: function (dataurl) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },
    blobToFile: function (theBlob, fileName) {
      theBlob.lastModifiedDate = new Date();
      theBlob.name = fileName;
      return theBlob;
    },
    clear() {
      this.Signature_Pad.clear();
    },
    commit() {},
    dataURLToBlob(dataURL) {
      var parts = dataURL.split(";base64,");
      var contentType = parts[0].split(":")[1];
      var raw = window.atob(parts[1]);
      var rawLength = raw.length;
      var uInt8Array = new Uint8Array(rawLength);
      for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uInt8Array], { type: contentType });
    },
  },
  components: {},
};
</script>
<style lang="less" scoped>
.add-apply {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #edf2f6;
  .delete-button {
    height: 100%;
  }
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
  .signtext {
    flex: 1;
    overflow-y: scroll;
    padding: 0 10px;
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
      text-indent: 20px;
      font-size: 12px;
      line-height: 30px;
      span {
        color: #ff0202;
        padding: 0;
      }
    }
  }
  .signature {
    height: 150px;
    text-align: center;
    // display: flex;
    // flex-direction: column;
    .title {
      height: 30px;
      text-align: center;
      line-height: 30px;
      position: relative;
      span {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: green;
      }
    }
    canvas {
      // flex: 1;
      padding: 0 10px;
      margin: 0 auto;
    }
  }
  .bottom {
    height: 60px;
    background: #edf2f6;
    display: flex;
    align-items: center;
    justify-content: center;
    .chose-button {
      width: 250px;
      height: 35px;
      text-align: center;
      line-height: 35px;
      border-radius: 4px;
      color: #fff;
      background: #ed8936;
      font-size: 16px;
    }
  }
}
</style>