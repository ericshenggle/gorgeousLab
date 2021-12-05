<template>
  <div class="homeMain">
    <div class="top-card">
      <div class="card-name">
        <h2 style="color:dodgerblue;display:inline-block;" v-if="this.$store.state.isFirm">{{ user.firmName }}</h2>
        <h2 style="color:dodgerblue;display:inline-block;" v-else>{{ user.userName }}</h2>
        <span id="admin">{{ tag }}</span>
        <h4 style="padding-top:10px" v-if="!this.$store.state.isFirm">邮箱： {{ user.userEmail }}</h4>
        <h4 style="padding-top:10px" v-if="this.$store.state.isFirm">电话： {{ user.firmTel }}</h4>
        <h4 style="padding-top:10px" v-else>电话： {{ user.userTel }}</h4>
        <h4 style="padding-top:10px" v-if="!this.$store.state.isFirm">地址： {{ user.userAddress }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["user"],
  computed: {
    tag() {
      return this.$store.state.isFirm ? "厂商" : "用户";
    },
  }
};
</script>

<style>
.homeMain {
  margin-top: 10vh;
  margin-left: 10vw;
}
.top-card {
  padding: 3vw;
  border: 10px solid #409eff;
  border-radius: 20px;
  display: flex;
}
.head-image {
  padding: 50px;
}
.card-name {
  padding-left: 4vw;
  padding-right: 10vw;
  align-items: center;
}
#admin {
  color: #67c23a;
  font-style: italic;
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 30px;
  position: relative;
  left: 10px;
  bottom: 10px;
  margin-left: 5px;
}
.show {
  height: 150px;
  display: block;
  background-position-y: 200px;
}
</style>
