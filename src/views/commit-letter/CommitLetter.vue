<template>
  <div class="commit-letter">
    <div class="header">
      <div class="back" @click="back">
        <van-icon name="arrow-left" />返回
      </div>承诺书
    </div>
    <div class="content">
      <h2>承 诺 书</h2>
      <p>
        本人
        <span>邱佳佳</span>，系环西文化广场
        <span>A01</span>摊点经营者。为积极营造文明经营的社会环境，形成文明、和谐、有序的良好景区秩序，本人在此郑重承诺如下：
      </p>
      <p>1、依法经营，诚实守信。遵守从业道德，文明、诚信、规范经营，所售商品质量合格，不出售违禁品，发生纠纷自行协调解决；言语文明，礼貌待客，不强买强卖、欺行霸市。</p>
      <p>2、爱护环境，禁绝噪声。保持卫生整洁，每天收摊后自觉打扫；经营时声响不超过30分贝，不使用喇叭叫卖。</p>
      <p>3、指定范围，禁止游摊。按照申请的项目及摊位进行经营，不扩面、不游摊，未经允许不延长经营时间。</p>
      <p>
        4、遵守规定，服从管理。及时缴纳管理费及保证金，摆摊人员共计
        <span>3</span>人，持证上岗，证件严禁外借，遵守景区条例及各项景区管理规定，树立安全防范意识，不私拉电线，不损害景区公共基础设施及绿化树木。
      </p>
      <p>5、如遇不可抗拒情况，如举办大型活动、广场改造、局部施工等，无条件服从管理处的相关调整。</p>
      <p>6、违反以上承诺内容，同意管理处予以不良记录。累计三次不良记录，以及经营者被多次投诉且情况属实，或被行政处罚、治安处罚的，立即予以清退，且保证金不予退还。</p>
    </div>
    <div class="signature">
      <div class="title">
        签署姓名
        <span @click="clear">清空</span>
      </div>
      <canvas id="canvas" ref="canvas" width="320" height="120"></canvas>
    </div>
    <div class="bottom-agree" :class="checked?'checked':'unchecked'">
      <div class="chose-button" @click="commit">确认</div>
    </div>
  </div>
</template>

<script>
import SignaturePad from "signature_pad";
import { Notify, Toast } from "vant";
export default {
  data() {
    return {
      checked: false,
      Signature_Pad: "",
    };
  },
  mounted() {
    this.Signature_Pad = new SignaturePad(this.$refs.canvas, {
      backgroundColor: "#fff",
    });
  },
  methods: {
    clear() {
      this.Signature_Pad.clear();
    },
    back() {
      this.$router.go(-1);
    },
    commit() {
      // const img = this.Signature_Pad.saveAsImg();
      if (this.Signature_Pad._isEmpty) {
        Toast("请签名");
        return;
      }
      // console.log();
      const data = this.$refs.canvas.toDataURL();
      const myBlob = this.dataURLToBlob(data);
      console.log(myBlob)
      // const formData = new FormData();
    },
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
        color: #ff7112;
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