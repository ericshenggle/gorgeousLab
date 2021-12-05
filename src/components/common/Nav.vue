<template>
  <div class="main">
    <div class="right">
      <div class="nav">
        <div class="icon" @click="$router.push('/')">
          <span> GorgeousLab</span>
        </div>
        <el-menu :default-active="this.$route.path" class="el-menu-demo" mode="horizontal" active-text-color="#5698c3" router>
          <el-menu-item index="/"><i class="el-icon-goods"></i>首页</el-menu-item>
          <el-menu-item index="/order"><i class="el-icon-shopping-cart-2"></i>订单</el-menu-item>
          <el-submenu index="--" v-if="this.$store.state.isLogin">
            <template slot="title"><i class="el-icon-user"></i>个人中心</template>
            <el-menu-item index="/user/home">个人主页</el-menu-item>
            <el-menu-item index="/user/firmModify" v-if="$store.state.isFirm">修改信息</el-menu-item>
            <el-menu-item index="/user/userModify" v-else>修改信息</el-menu-item>
            <el-menu-item index="/user/firm/cosmetics" v-if="$store.state.isFirm">管理商品</el-menu-item>
            <el-menu-item index="/user/favorite" v-else>收藏夹</el-menu-item>
            <el-menu-item index="" @click="logout">退出系统</el-menu-item>
          </el-submenu>
          <el-submenu index="--" v-else>
            <template slot="title"><i class="el-icon-user"></i>尚未登陆</template>
            <el-menu-item index="/register_user">用户注册</el-menu-item>
            <el-menu-item index="/register_firm">厂家注册</el-menu-item>
            <el-menu-item index="/login">登录</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
    };
  },
  methods: {
    logout() {
      this.$axios.get("/log_out/").then((Response) => {
        if (Response.data.status === 0) {
          this.$store.commit("updateState");
          this.$message.success("退出成功");
          localStorage.removeItem("Login");
          localStorage.removeItem("Firm");
          this.$router.push("/");
        }
      });
    },
  },
};
</script>

<style>
.left {
  background-color: #c5308c;
  height: 100vh;
}
.logo {
  color: white;
  text-align: center;
  padding: 10px;
  margin: 10px;
  border: 1px solid white;
}
/* .right {
  display: flex;
} */
.nav {
  height: 60px;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px grey solid;
  /* background-color: aliceblue; */
  align-items: center;
}
.content {
  padding: 8px;
}
.icon {
  width: 300px;
  padding-left: 30px;
  font-size: 25px;
  color: rgb(238, 76, 170);
}
</style>
