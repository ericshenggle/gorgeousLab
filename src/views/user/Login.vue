<template>
  <div>
    <div class="login">
      <el-form :inline="true" :rules="rules" label-position="left" label-width="150px" :model="loginForm">
        <el-form-item prop="username">
          <span slot="label" style="font-weight:bold">用户类型</span>
          <el-select class="loginInput" v-model="loginForm.userType">
            <el-option
              v-for="item in allType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item prop="username">
          <span slot="label" style="font-weight:bold">用户名</span>
          <el-input v-model="loginForm.username" placeholder="请输入用户名" class="loginInput"></el-input>
        </el-form-item>
        <br />
        <el-form-item prop="password">
          <span slot="label" style="font-weight:bold">密码</span>
          <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" class="loginInput" ></el-input>
        </el-form-item>
        <br />
        <el-button type="primary" @click="login" style="width:150px;height:40px">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allType: [{
        value: "firm",
        label: "厂家用户",
      },{
        value: "user",
        label: "个人用户",
      },
      ],
      loginForm: {
        userType: "",
        username: "",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    login() {
      if (Object.values(this.loginForm).some((item) => item === "")) {
        this.$message.warning("请填写所有必要信息");
        return;
      }
      if (this.loginForm.userType === "user") {
        this.$axios
        .post("/login/", {
          type: this.loginForm.userType,
          userName: this.loginForm.username,
          userPwd: this.loginForm.password
        })
        .then((Response) => {
          if (Response.data.status === 0) {
            this.$message.success("登录成功");
            this.$store.commit("updateUserState");
            localStorage.setItem("Login", true);
            localStorage.setItem("Firm", false);
            this.$router.push("/");
          } else {
            this.$message.warning(Response.data.msg);
          }
        })
        .catch((failResponse) => {
          console.log(failResponse);
        });
      } else if (this.loginForm.userType === "firm") {
        this.$axios
        .post("/login/", {
          type: this.loginForm.userType,
          firmName: this.loginForm.username,
          firmPwd: this.loginForm.password
        })
        .then((Response) => {
          if (Response.data.status === 0) {
            this.$message.success("登录成功");
            this.$store.commit("updateFirmState");
            localStorage.setItem("Login", true);
            localStorage.setItem("Firm", true);
            this.$router.push("/user/firm/cosmetics");
          } else {
            this.$message.warning(Response.data.msg);
          }
        })
        .catch((failResponse) => {
          console.log(failResponse);
        });
      }
      
    },
  },
};
</script>

<style>
.login {
  margin-top: 20vh;
  text-align: center;
}
.loginInput {
  margin-bottom: 5vh;
  height: 50px;
}
</style>
