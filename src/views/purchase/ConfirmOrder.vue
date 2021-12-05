<template>
  <div class="confirmMain">
    <div class="confirmStep">
      <el-steps :active="2" align-center finish-status="success" process-status="finish">
        <el-step title="选择" description="浏览挑选喜欢的书籍"></el-step>
        <el-step title="填写" description="请填写您想购买的数量"></el-step>
        <el-step title="提交" description="确认后生成订单"></el-step>
      </el-steps>
    </div>
    <div style="margin-top:5vh;height:1px"></div>
    <CosmeticTemp :info="info"></CosmeticTemp>
    <div class="addressEditTitle">订单数量</div>
    <div class="addressEdit">
      {{ this.Number}}
    </div>
    <div class="confirmOrderButton">
      <el-button type="primary" @click="orderConfirm" class="submitButtonContent">提交订单</el-button>
    </div>
  </div>
</template>

<script>
import CosmeticTemp from "../../components/submit/CosmeticTemp.vue";
export default {
  components: {
    CosmeticTemp,
  },
  data() {
    return {
      info: [],
      Number: this.$route.params.num,
      orderTime: ""
    };
  },
  mounted() {
    this.$axios.post("/showProduct/", {productId: this.$route.params.ISBN}).then((Response) => {
      this.info = Response.data.data;
      console.log(Response.data.data);
    });
  },
  methods: {
    orderConfirm() {
    　let date = new Date();
      let yy = date.getFullYear();
      let mm = date.getMonth()+1;
      let dd = date.getDate();
      let hh = date.getHours();
      let mf = date.getMinutes()<10 ? '0'+date.getMinutes() : date.getMinutes();
      let ss = date.getSeconds()<10 ? '0'+date.getSeconds() : date.getSeconds();
    　this.orderTime = yy+'/'+mm+'/'+dd+' '+hh+':'+mf+':'+ss;
      this.$axios
        .post("/buyProduct/", {
          productId: this.$route.params.ISBN,
          Number: this.Number,
          orderTime: this.orderTime
        })
        .then((Response) => {
          if (Response.data.status === 0) {
            console.log(Response.data);
            this.$message({
              message: "订单已生成!",
              type: "success",
            });
            this.$router.push("/order");
          } else {
            this.$message({
              message: Response.data.msg,
              type: "warning",
            });
            this.$router.push({ name: "submitOrder", params: { ISBN: this.info.productId } });
          }
        }
      );
    },
  },
};
</script>

<style>
.confirmMain {
  margin-top: 5vh;
  align-items: center;
  text-align: center;
  margin-left: 10vw;
  margin-right: 10vw;
}
.confirmStep {
  margin-left: auto;
  margin-right: auto;
}
.confirmOrderButton {
  margin-top: 8vh;
}
.addressConfirmTitle {
  width: 60vw;
  margin: 0 auto;
  font-weight: 700;
  text-align: center;
  font-size: 25px;
  margin-top: 5vh;
}
</style>
