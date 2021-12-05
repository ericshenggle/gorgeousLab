<template>
  <div class="submitMain">
    <div class="submitStep">
      <el-steps :active="1" align-center finish-status="success" process-status="finish">
        <el-step title="选择" description="浏览挑选喜欢的商品"></el-step>
        <el-step title="填写" description="请填写您想购买的数量"></el-step>
        <el-step title="提交" description="确认后生成订单"></el-step>
      </el-steps>
    </div>
    <div style="margin-top:5vh;height:1px"></div>
    <CosmeticTemp :info="info"></CosmeticTemp>
    <div class="addressEditTitle">选择想购买的数量</div>
    <div class="addressEdit">
      <el-input-number v-model="number" :min="1"></el-input-number>
    </div>
    <div class="submitOrderButton">
      <el-button type="primary" @click="numberConfirm" class="submitButtonContent">确认订单</el-button>
    </div>
  </div>
</template>

<script>
import CosmeticTemp from "../../components/submit/CosmeticTemp.vue";
export default {
  data() {
    return {
      info: [],
      address: "",
      number: 1,
    };
  },
  components: {
    CosmeticTemp,
  },
  methods: {
    numberConfirm() {
      this.$router.push({ name: "confirmOrder", params: { ISBN: this.info.productId, num: this.number } });
    },
  },
  mounted() {
    this.$axios.post("/showProduct/", { productId: this.$route.params.ISBN}).then((Response) => {
      this.info = Response.data.data;
    });
  },
};
</script>

<style>
.submitMain {
  margin-top: 5vh;
  margin-left: 10vw;
  margin-right: 10vw;
}
.submitStep {
  width: 80vw;
}
.addressEditTitle {
  width: 60vw;
  margin-left: 10vw;
  font-weight: 700;
  text-align: center;
  font-size: 25px;
  margin-top: 5vh;
}
.addressEdit {
  width: 60vw;
  margin-top: 5vh;
  margin-left: 10vw;
  align-items: center;
  text-align: center;
  margin-bottom: 5vh;
}
.submitOrderButton {
  width: 60vw;
  margin-left: 10vw;
  align-items: center;
  text-align: center;
}
.submitButtonContent {
  width: 200px;
  height: 50px;
  font-size: 20px;
  margin-bottom: 10vh;
}
</style>
