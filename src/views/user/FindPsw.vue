<template>
  <div>
    <div class="findpsw">
      <el-form :inline="true" :rules="rules" label-position="left" label-width="80px" :model="passwordForm">
        <el-form-item label="电子邮箱" style="position:relative;left:60px;" prop="email">
          <el-input v-model="passwordForm.email" placeholder="请输入电子邮箱"></el-input>
        </el-form-item>
        <el-form-item style="position:relative;left:60px;">
          <el-button type="primary" plain @click="getVerificationCode">发送验证码</el-button>
        </el-form-item>
        <br />
        <el-form-item label="验证码" prop="verificationCode">
          <el-input v-model="passwordForm.verificationCode" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="新密码" prop="password">
          <el-input type="password" v-model="passwordForm.password" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="确认密码" prop="re_password">
          <el-input type="password" v-model="passwordForm.re_password" placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <br />
        <el-button type="primary" @click="submit">修改</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      passwordForm: {
        password: "",
        re_password: "",
        email: "",
        verificationCode: "",
      },
      rules: {
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        re_password: [{ required: true, message: "请再次输入密码", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        verificationCode: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    };
  },
  methods: {
    getVerificationCode() {
      if (this.passwordForm.email === "") {
        this.$message.warning("请填写电子邮箱");
        return;
      }
      this.$axios
        .post("/api/send_email", {
          email: this.passwordForm.email,
        })
        .then((Response) => {
          if (Response.data.status === 0) {
            this.$message.success("发送成功");
          } else {
            console.log(Response.data.status);
          }
        })
        .catch((failResponse) => {
          console.log(failResponse);
        });
    },
    submit() {
      if (Object.values(this.passwordForm).some((item) => item === "")) {
        this.$message.warning("请填写所有必要信息");
        return;
      }
      this.$axios
        .post("/api/find_change_password", {
          password: this.passwordForm.password,
          re_password: this.passwordForm.re_password,
          email: this.passwordForm.email,
          verificationCode: this.passwordForm.verificationCode,
        })
        .then((Response) => {
          if (Response.data.status === 0) {
            this.$message.success("发送成功");
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
.findpsw {
  text-align: center;
  margin-top: 30px;
}
</style>
