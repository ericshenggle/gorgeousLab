//订单页面
<template>
  <div class="orderMain">
    <div>
      <el-tabs v-model="activeName" stretch>
        <el-tab-pane name="unpayed">
          <span slot="label" class="orderPane">未支付</span>
          <OrderList :list="unpayedList" :type="unpayed"></OrderList>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="payed">
          <span slot="label" class="orderPane">已支付</span>
          <OrderList :list="payedList" :type="payed"></OrderList>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import OrderList from "../../components/order/OrderList.vue";
export default {
  data() {
    return {
      activeName: "unpayed",
      unpayedList: [],
      unpayedTmp: [],
      payedList: [],
      payedTmp: [],
      unpayed: true,
      payed: false,
    };
  },
  components: {
    OrderList,
  },
  mounted() {
    if (!this.$store.state.isLogin) {
        this.$message.warning("请先登录");
        this.$router.push("/login");
    } else {
      this.$axios.get("/showOrder/").then((Response) => {
        console.log(Response.data.data);
        this.unpayedTmp = Response.data.data.orders;
        this.unpayedList = this.unpayedTmp.reverse();
      });
    }
  },
};
</script>

<style>
.orderMain {
  padding-top: 10vh;
  text-align: center;
  width: 70vw;
  margin: 0 auto;
}
.orderPane {
  font-size: 25px;
  font-weight: bold;
}
#tab-unpayed {
  margin-bottom: 1vh;
}
</style>
