<template>
  <div>
    <div class="register">
      <el-form :inline="true" :rules="rules" label-position="left" label-width="80px" :model="registerForm">
        <el-form-item prop="username">
          <span slot="label" style="font-weight:bold">用户名</span>
          <el-input v-model="registerForm.username" placeholder="请输入用户名" class="regInput"></el-input>
        </el-form-item>
        <br />
        <el-form-item prop="password">
          <span slot="label" style="font-weight:bold">密码</span>
          <el-input type="password" v-model="registerForm.password" placeholder="请输入密码" class="regInput"></el-input>
        </el-form-item>
        <br />
        <el-form-item prop="re_password">
          <span slot="label" style="font-weight:bold">确认密码</span>
          <el-input type="password" v-model="registerForm.re_password" placeholder="请再次输入密码" class="regInput"></el-input>
        </el-form-item>
        <br />
        <el-form-item prop="email">
          <span slot="label" style="font-weight:bold">电子邮箱</span>
          <el-input v-model="registerForm.email" placeholder="请输入电子邮箱" class="regInput"></el-input>
        </el-form-item>
        <br />
        <el-form-item prop="phone">
          <span slot="label" style="font-weight:bold">电话</span>
          <el-input v-model="registerForm.phone" placeholder="请输入电话号码" class="regInput"></el-input>
        </el-form-item>
        <br />
        <el-form-item prop="address">
          <span slot="label" style="font-weight:bold">地址</span>
          <el-input v-model="registerForm.address" placeholder="请输入地址" class="regInput"></el-input>
        </el-form-item>
        <br />
        <el-button type="primary" @click="register" style="width:100px;height:40px">注册</el-button>
      </el-form>
      <el-link class="link-btn-right" @click="$router.push('/register_firm')">厂家注册</el-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registerForm: {
        username: "",
        password: "",
        re_password: "",
        email: "",
        phone: "",
        address: ""
      },
      rules: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        re_password: [{ required: true, message: "请再次输入密码", trigger: "blur" }],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
      },
    };
  },
  methods: {
    register() {
      if (this.registerForm.password != this.registerForm.re_password) {
        this.$message.warning("两次密码不一致");
        return;
      }
      this.$axios
        .post("/userRegister/", {
          userName: this.registerForm.username,
          userPwd: this.registerForm.password,
          userEmail: this.registerForm.email,
          userTel: this.registerForm.phone,
          userAddress: this.registerForm.address,
        })
        .then((Response) => {
          if (Response.data.status === 0) {
            this.$message.success("注册成功");
            this.$router.push("/login");
          } else {
            this.$message.warning(Response.data.msg);
          }
        })
        .catch((failResponse) => {
          console.log(failResponse);
        });
    },
  },
};
</script>

<style>
.register {
  text-align: center;
  margin-top: 10vh;
}
.regInput {
  margin-bottom: 2vh;
}
.link-btn-right {
  margin-left: 27%;
  font-size: 12px !important;
  line-height: 39px;
}
</style>
