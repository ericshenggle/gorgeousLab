<template>
  <div class="cosmeticTempInfo">
    <div class="cosmeticTempInfoImg">
      <img :src="info.productGraph" style="height:200px" />
      <!-- <el-image :src="info.pictureBase" style="height:200px" fit="contain"></el-image> -->
    </div>
    <div class="cosmeticTempInfoWord">
      <div class="cosmeticTempInfoName">{{ info.productName }}</div>
      <div>
        <div class="cosmeticTempInfoPA">厂商：{{ info.firmName }}</div>
      </div>
      <div class="cosmeticTempInfoPrice">单价：￥{{ info.productPrice }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["info"],
  name: "CosmeticTemp",
};
</script>

<style>
.cosmeticTempInfo {
  margin: 5vh 5vw;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
  align-items: center;
  display: flex;
  padding: 20px;
}
.cosmeticTempInfoImg {
  margin-left: 12vw;
}
.cosmeticTempInfoWord {
  margin-left: 10vw;
  text-align: left;
  height: 200px;
}
.cosmeticTempInfoName {
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
}
.cosmeticTempInfoPA {
  font-size: 20px;
  font-weight: bold;
  color: dimgray;
  margin-bottom: 8px;
}
.cosmeticTempInfoPrice {
  margin-top: 30px;
  font-size: 30px;
  font-weight: bold;
  background-color: orangered;
  color: white;
  padding: 5px;
}
</style>
