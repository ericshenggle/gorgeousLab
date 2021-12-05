<template>
  <div>
    <div class="orderPay">
      <div class="payBlock">
        <div class="payTitle">订单号:{{ this.$route.params.id }}</div>
        <img src="../../assets/image/支付宝.jpg" />
        <div class="payButton">
          <el-button type="danger" @click="payFail">支付失败</el-button>
          <el-button type="primary" @click="paySuccess">支付成功</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    payFail() {
      this.$router.push("/order");
    },
    paySuccess() {
      this.$axios
        .post("api/pay_order", {
          orderId: this.$route.params.id,
        })
        .then((Response) => {
          if (Response.data.status != 0) {
            this.$message({
              message: Response.data.statusInfo.msg,
              type: "error",
            });
          } else {
            this.$axios.post("/api/create_message", {
              messageContent: Response.data.data.payDate + "  支付了订单  " + this.$route.params.id,
              messageType: "success",
            });
            this.$message({
              message: "订单支付完毕",
              type: "success",
            });
            this.$router.push("/");
          }
        });
    },
  },
};
</script>

<style>
.orderPay {
  margin: 10vh 10vw;
}
.payBlock {
  padding: 5vh;
  text-align: center;
  align-items: center;
  border: 10px solid #409eff;
  border-radius: 20px;
  width: 50vw;
  margin: 0 auto;
}
.payTitle {
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 5vh;
  color: #409eff;
}
.payButton {
  margin-top: 5vh;
}
</style>
