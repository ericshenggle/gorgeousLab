<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="添加商品" name="add">
        <el-form :inline="true" label-position="left" label-width="80px" :model="cosmeticForm">
          <el-form-item label="商品名">
            <el-input v-model="cosmeticForm.productName"></el-input>
          </el-form-item>
          <br />
          <el-form-item label="分类">
            <el-radio-group v-model="cosmeticForm.productType">
              <el-radio label="底妆类"></el-radio>
              <el-radio label="唇装类"></el-radio>
              <el-radio label="眼妆类"></el-radio>
              <el-radio label="化妆工具"></el-radio>
              <el-radio label="卸妆类"></el-radio>
            </el-radio-group>
          </el-form-item>
          <br /><el-form-item label="价格">
            <el-input v-model="cosmeticForm.productPrice"></el-input>
          </el-form-item>
          <br /><el-form-item label="库存">
            <el-input v-model="cosmeticForm.productNum"></el-input>
          </el-form-item>
          <br /><el-form-item label="简介">
            <el-input type="textarea" v-model="cosmeticForm.productIntro"></el-input>
          </el-form-item>
          <br /><el-form-item label="图片">
            <Avatar @picture="cosmeticForm.productGraph = $event"></Avatar>
          </el-form-item>
          <br />
          <el-button type="primary" @click="submit">提交</el-button>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="已上架商品" name="show">
        <div class="cosmeticItems1" v-for="(item, index) in result" :key="item">
          <router-link :to="{ name: 'cosmeticInfo', params: { ISBN: item.productId } }" tag="div">
            <div class="routerContent">
              <el-image :src="item.productGraph" style="height: 190px;width: 180px;margin:5px 9%" fit="fill"></el-image>
              <div class="cosmeticTitle">{{ item.productName }}</div>
              <div class="cosmeticNum">库存：{{ item.productNum }}</div>
              <div class="cosmeticPrice">￥{{ item.productPrice }}</div>
            </div>
          </router-link>
          <body style="text-align: center">
          <el-button type="primary"  @click="remove(index)" >下架该商品</el-button>
          </body>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Avatar from "../submit/Avatar.vue";

export default {
  components: {
    Avatar,
  },
  data() {
    return {
      cosmeticForm: {
        productName: "",
        productPrice: "",
        productIntro: "",
        productType: "",
        productNum: "",
        productGraph: ""
      },
      activeName: "add",
      keyword: "",
      result: [],
    };
  },
  methods: {
    submit() {
      let form = this.cosmeticForm;
      if (Object.values(form).some((item) => item === "")) {
        this.$message.warning("请填写所有必要信息");
        return;
      }
      let url = "/uploadProduct/";
      let msg = "添加成功";
      this.$axios
        .post(url, form)
        .then((Response) => {
          if (Response.data.status === 0) {
            this.$message.success(msg);
            this.$router.push("/user/firm/cosmetics");
          } else {
            this.$message.warning(Response.data.msg);
          }
        })
        .catch((failResponse) => {
          console.log(failResponse);
        });
    },
    remove(index) {
      this.$axios
        .post("/deleProduct/", {
          productId: this.result[index].productId,
        })
        .then((Response) => {
          if (Response.data.status === 0) {
            this.$message.success(Response.data.msg);
            this.result.splice(index, 1);
          }
        });
    },
    handleClick(tab) {
      if (tab.name === "show") {
        this.$axios
        .get("/showUploadProduct/")
        .then((Response) => {
          if (Response.data.status === 0) {
            this.result = Response.data.data.products;
          }
        })
        .catch((failResponse) => {
          console.log(failResponse);
        });
      }
    }
  },
};
</script>

<style>
.cosmeticItems1 {
  float: left;
  width: 250px;
  height: 350px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  margin: 8px;
  padding: 2px;
  border-radius: 5px;
}
.cosmeticItems1:hover {
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
}
.cosmeticTitle {
  text-align: center;
  font-size: 15px;
  font-weight: bold;
}
.cosmeticNum {
  text-align: center;
  font-size: 8px;
  font-weight: bold;
}
.PandA {
  text-align: center;
  font-size: 15px;
}
.cosmeticPrice {
  color: orangered;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}</style>
