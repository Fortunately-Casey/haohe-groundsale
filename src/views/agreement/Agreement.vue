<template>
  <div class="agreement">
    <div class="header">
      <div class="back" @click="back">
        <van-icon name="arrow-left" />返回
      </div>我的申请
      <div class="logout">退出登录</div>
    </div>
    <div class="content">
      <h2>环西广场夜间临时摊位准入实施方案</h2>
      <p>为进一步强化环西广场的秩序管理，营造整洁有秩的景区环境，丰富广场健身休闲气氛，结合国家鼓励“地摊经济”的政策引导以及环西广场的实际情况，现制定本实施方案，具体如下：</p>
      <h3>一、允许经营项目</h3>
      <p>1、儿童玩具、纪念品、工艺品等。</p>
      <p>2、不存在安全隐患的小型游乐项目，占地10平方米以内。</p>
      <p>3、服装衣饰。</p>
      <p>4、图书音像。</p>
      <p>5、绿植花卉。</p>
      <p>所有项目声响不得超过30分贝，且严禁使用喇叭叫卖。所售商品质量合格，严禁出售违禁品。</p>
      <h3>二、临时摊位设置</h3>
      <p>1、广场西北侧香樟树池周边。自北向南10个树池，每个树池周边3个摊位（南侧、西侧、北侧），共30个，编号A1-A30。</p>
      <p>2、上述摊位以南，靠近西侧铁链护栏，每两个立柱之间为1处摊位，共10个，编号B1-B10。</p>
      <h3>三、临时摊位设置时段</h3>
      <p>
        2020年
        <span>8-10月</span>份开放，每晚
        <span>18:00-22:00</span>。
      </p>
      <h3>四、相关费用</h3>
      <p>1、管理费：A类300元/月，B类500元/月。当年费用一次性收取，进场前缴纳，主要用于垃圾清运、秩序维护等广场管理工作。</p>
      <p>2、保证金：每个摊位1000元，进场前缴纳，原则上租期到期后予以退还（无息）。</p>
      <h3>五、申办流程</h3>
      <p>1、有意向者自行踏勘现场。联系人：董俊13814613012。</p>
      <p>2、申请人通过公示的APP小程序，扫码注册，登陆后填写相关信息，选取所需摊位。</p>
      <p>3、申请人在系统上初步选取摊位后，需在三个工作日内至濠河管理处核验申请人身份信息、其余摆摊人员证明材料，并按要求缴纳相关费用。未完成上述流程的，视为放弃所选摊位。</p>
      <h3>六、注意事项</h3>
      <p>1、摊位申请遵循先来后到及摇号抢单原则，每人最多可申请2个摊位。</p>
      <p>2、规定的3个月经营期限必须满额租用，但可申请延长，延期管理费用以月为单位按实结算。</p>
      <p>3、申请者本人需与濠河管理处签订承诺书，违反承诺书的予以不良记录。累计三次不良记录，或被多次投诉且情况属实，或被行政处罚、治安处罚的，立即予以清退，且保证金不予退还。</p>
      <p>4、摆摊人员必须是本人或直系亲属，至濠河管理处统一办理摊位证，随身携带，严禁外接。直系亲属需提供户口本、结婚证或属地派出所书面证明。</p>
      <p>5、持证摊位当年有效，次年重新摇号确定。</p>
      <p>6、所售商品出现质量纠纷自行协调解决，否则由市场监管部门依法依规处理。</p>
    </div>
    <div class="bottom-agree" :class="checked?'checked':'unchecked'">
      <div class="checkbox">
        <van-checkbox v-model="checked" shape="square" icon-size="16px" checked-color="#ed8936"></van-checkbox>
      </div>
      <div class="text" style="color:#fff" @click.stop="nextStep">{{checked?'下一步':'我已阅读方案'}}</div>
    </div>
  </div>
</template>

<script>
import { Notify } from "vant";
export default {
  data() {
    return {
      checked: false,
    };
  },
  methods: {
    back() {
      this.$router.push({
        path: "/index",
      });
    },
    nextStep() {
      if (this.checked) {
        this.$router.push({
          path: "/addApply",
        });
      } else {
        Notify({ type: "warning", message: "请勾选阅读方案后进行下一步！" });
      }
    },
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
        color: #ff0202;
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
    .checkbox {
      width: 140px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-right: 10px;
    }
    .text {
      flex: 1;
      line-height: 60px;
    }
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
</style>