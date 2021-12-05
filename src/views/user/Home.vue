<template>
  <div>
    <div class="main">
      <div class="main-left">
        <span class="main-left-title">
          <div>{{ user.username }}</div>
        </span>
        <el-menu :default-active="this.$route.path" class="menu" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
          <el-menu-item index="/user/home">
            <i class="el-icon-menu"></i>
            <span slot="title">个人中心</span>
          </el-menu-item>
          <el-menu-item index="/user/firmModify" v-if="this.$store.state.isFirm">
            <i class="el-icon-edit"></i>
            <span slot="title">修改信息</span>
          </el-menu-item>
          <el-menu-item index="/user/userModify" v-else>
            <i class="el-icon-edit"></i>
            <span slot="title">修改信息</span>
          </el-menu-item>
          <el-menu-item index="/user/firm/cosmetics" v-if="this.$store.state.isFirm">
            <i class="el-icon-plus"></i>
            <span slot="title">管理商品</span>
          </el-menu-item>
          <el-menu-item index="/user/favorite" v-else>
            <i class="el-icon-menu"></i>
            <span slot="title">收藏夹</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="main-right">
        <router-view :user="user" @update="update"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: { username: undefined },
      url: this.$store.state.isFirm ? "/showFirmInfo/" : "/showPersonInfo/",
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    get_info() {
      this.$axios.get(this.url).then((Response) => {
        if (Response.data.status === 0) {
          this.user = Response.data.data;
        }
      });
    },
    update() {
      this.$axios.get(this.url).then((Response) => {
        if (Response.data.status == 0) {
          this.user = Response.data.data;
        }
      });
    },
  },
  mounted() {
    if (this.$store.state.isLogin) {
      this.$axios.get(this.url)
      .then((Response) => {
        this.user = Response.data.data;
      })
      .catch((failResponse) => {
        console.log(failResponse);
      });
    } else {
      this.$message.warning("请先登录");
      this.$router.push("/login");
    }
  },
};
</script>

<style>
.main {
  display: flex;
}
.main-left {
  float: left;
  height: 100vh;
  width: auto;
  background-color: #545c64;
}
.menu {
  border: 0px;
  text-align: center;
}
.main-left-title {
  font-family: fantasy;
  text-align: center;
  padding: 5px;
  font-size: 20px;
  color: darkorange;
}
.main-right {
  margin: 30px 50px;
  display: flex;
}
</style>
