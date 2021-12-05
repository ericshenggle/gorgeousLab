<template>
  <div class="orderListMain">
    <el-table :data="list" class="orderTable" :row-key="keyID" @expand-change="getcosmeticInfo" :expand-row-keys="expands">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <div class="cosmeticTempOfOrder">
              <CosmeticTemp :info="cosmeticInfo"></CosmeticTemp>
            </div>
            <div class="orderListButton" v-if="type">
              <el-button type="danger" @click="cancel(props.row.orderId)">取消订单</el-button>
              <el-button type="warning" @click="edit(props.row.orderId, props.row.number)">修改订单</el-button>
              <el-button type="primary" @click="pay(props.row.orderId)">支付订单</el-button>
            </div>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="时间" prop="orderTime" header-align="center" align="center"> </el-table-column>
      <el-table-column label="订单ID" prop="orderId" header-align="center" align="center"> </el-table-column>
      <el-table-column label="数量" prop="number" header-align="center" align="center"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import CosmeticTemp from "../submit/CosmeticTemp.vue";
export default {
  name: "OrderList",
  props: ["list", "type"],
  data() {
    return {
      cosmeticInfo: [],
      temp: [],
      keyID(row) {
        return row.orderId;
      },
      expands: [],
    };
  },
  components: {
    CosmeticTemp,
  },
  methods: {
    getcosmeticInfo(row, expandedRows) {
      this.$axios.post("/showProduct/", { productId: row.productId}).then((Response) => {
        this.cosmeticInfo = Response.data.data;
      });
      //使得每次只展示一个订单内容
      var that = this;
      if (expandedRows.length) {
        that.expands = [];
        if (row) {
          that.expands.push(row.orderId);
        }
      } else {
        that.expands = [];
      }
    },
    cancel(id) {
      console.log("cancel");
      
    },
    pay(id) {
      
    },
    edit(id, address) {
      
    },
  },
};
</script>

<style>
.orderListMain {
  margin-top: 5vh;
}
.cosmeticTempOfOrder {
  text-align: center;
  margin: 0 auto;
}
.orderListButton {
  margin-top: 2vh;
  margin-bottom: 2vh;
  text-align: center;
  align-items: center;
  justify-content: space-between;
}
</style>
