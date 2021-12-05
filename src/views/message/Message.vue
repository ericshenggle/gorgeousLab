<template>
  <div class="MessagesMain">
    <div v-for="item in messageList" :key="item" class="messageBlock">
      <el-alert :title="item.messageContent" :type="item.messageType" center show-icon :closable="false" effect="dark"> </el-alert>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messageList: [],
    };
  },
  mounted() {
    this.$axios.get("/api/my_info").then((Response) => {
      if (Response.headers.flag == -1) {
        this.$message.warning("请先登录");
        this.$router.push("/login");
      }
    });
    this.$axios.get("/api/get_message").then((Response) => {
      this.messageList = Response.data.data.messageList.reverse();
    });
  },
};
</script>

<style>
.MessagesMain {
  margin: 10vh 20vw;
}
.messageBlock {
  margin-top: 5vh;
  margin-bottom: 5vh;
}
</style>
