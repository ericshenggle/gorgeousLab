<template>
  <div class="galleryMain">
    <div class="searchBlock">
      <el-input v-model="input" placeholder="搜索商品"></el-input>
      <el-button type="primary" style="margin-left:50px;width:120px" @click="searchcosmetic">搜索</el-button>
    </div>
    <div class="cosmeticItems" v-for="item in info" :key="item">
      <router-link :to="{ name: 'cosmeticInfo', params: { ISBN: item.productId } }" tag="div">
        <div class="routerContent">
          <el-image :src="item.productGraph" style="height: 190px;margin:5px 9%" fit="fill"></el-image>
          <div class="cosmeticTitle">{{ item.productName }}</div>
          <div class="cosmeticPrice">￥{{ item.productPrice }}</div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ["info"],
  name: "Cosmetics",
  data() {
    return {
      input: "",
      info: [],
    };
  },
  methods: {
    jump() {
      console.log(111);
    },
    searchcosmetic() {
      console.log(this.input);
      this.$axios
        .post("/api/visiter/cosmetic_list_by_keyword", {
          keyWord: this.input,
        })
        .then((Response) => {
          this.info = Response.data.data.cosmeticList;
        });
    },
  },
  mounted() {
      console.log(info)
  },
};
</script>

<style>
.galleryMain {
  margin-top: 10px;
  border-top: 30px solid #409eff;
  padding-top: 5vh;
  width: 99%;
}
.searchBlock {
  margin-top: 0px;
  display: flex;
}
.cosmeticItems {
  float: left;
  width: 25%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: 18px;
  padding: 10px;
  border-radius: 20px;
}
.cosmeticItems:hover {
  box-shadow: 0 2px 30px 0 rgba(0, 0, 0, 0.1);
}
.cosmeticTitle {
  text-align: center;
  font-size: 20px;
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
}
.routerContent {
  width: 99%;
  height: 99%;
  text-align: center;
  align-items: center;
}
</style>
