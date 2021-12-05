<template>
  <div class="modifyMain">
    <el-tabs v-model="activeName" class="tabLine">
      <el-tab-pane name="info" class="paneInfo">
        <span slot="label" class="tabInfo">修改信息</span>
        <el-form :inline="true" label-position="left" label-width="50px" :model="modifyForm" class="modifyForm">
          <el-form-item label-width="100px" style="margin-top:3vh">
            <span slot="label" style="font-size:20px;font-weight: bold;">昵称</span>
            <el-input v-model="modifyForm.userName" style="font-size:20px:width:300px"></el-input>
          </el-form-item>
          <br />
          <el-form-item label-width="100px" style="margin-top:3vh">
            <span slot="label" style="font-size:20px;font-weight: bold;">邮箱</span>
            <el-input v-model="modifyForm.userEmail" style="font-size:20px:width:300px"></el-input>
          </el-form-item>
          <br />
          <el-form-item label-width="100px" style="margin-top:3vh">
            <span slot="label" style="font-size:20px;font-weight: bold;">电话</span>
            <el-input v-model="modifyForm.userTel" style="font-size:20px:width:300px"></el-input>
          </el-form-item>
          <br />
          <el-form-item label-width="100px" style="margin-top:3vh">
            <span slot="label" style="font-size:20px;font-weight: bold;">收货地址</span>
            <el-input type="textarea" :autosize="{minRows:4}" v-model="modifyForm.userAddress" style="font-size:20px"></el-input>
          </el-form-item>
          <br />
          <el-button type="primary" style="margin-top:3vh;width:120px;height:50px" @click="modifyInfo">修改</el-button>
        </el-form>
      </el-tab-pane>
      <el-tab-pane name="password" class="paneInfo">
        <span slot="label" class="tabInfo">修改密码</span>
        <el-form :inline="true" :rules="rules" label-position="left" label-width="80px" :model="pswForm" class="modifyForm">
          <el-form-item style="margin-top:3vh" label-width="140px" prop="new_password">
            <span slot="label" style="font-size:20px;font-weight: bold;">新密码</span>
            <el-input type="password" v-model="pswForm.newPwd" placeholder="请输入新密码" style="font-size:20px:width:300px"></el-input>
          </el-form-item>
          <br />
          <el-form-item style="margin-top:3vh" label-width="140px" prop="re_new_password">
            <span slot="label" style="font-size:20px;font-weight: bold;">确认新密码</span>
            <el-input type="password" v-model="pswForm.re_new_password" placeholder="请再次输入新密码" style="font-size:20px:width:300px"></el-input>
          </el-form-item>
          <br />
          <el-button type="primary" style="margin-top:3vh;width:120px;height:50px" @click="modifyPsw">提交</el-button>
        </el-form>
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
  props: ["user"],
  data() {
    return {
      modifyForm: {
        userName: "",
        userAddress: "",
        userEmail: "",
        userTel: ""
      },
      pswForm: {
        newPwd: "",
        re_new_password: "",
      },
      activeName: "info",
      rules: {
        newPwd: [{ required: true, message: "请输入新密码", trigger: "blur" }],
        re_new_password: [{ required: true, message: "请再次输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    modifyInfo() {
      this.$axios
        .post("/changeUserInfo/", {
          userName: this.modifyForm.userName === "" ? this.user.userName : this.modifyForm.userName,
          userAddress: this.modifyForm.userAddress === "" ? this.user.userAddress : this.modifyForm.userAddress,
          userEmail: this.modifyForm.userEmail === "" ? this.user.userEmail : this.modifyForm.userEmail,
          userTel: this.modifyForm.userTel === "" ? this.user.userTel : this.modifyForm.userTel,
        })
        .then((Response) => {
          if (Response.data.status === 0) {
            this.$emit("update");
            this.$message.success("修改成功");
            this.$router.push("/user/home");
          } else {
            this.$message.warning(Response.data.msg);
          }
        })
        .catch((failResponse) => {
          console.log(failResponse);
        });
    },
    modifyPsw() {
      if (Object.values(this.pswForm).some((item) => item === "")) {
        this.$message.warning("请填写所有必要信息");
        return;
      }
      if (this.pswForm.newPwd != this.pswForm.re_new_password) {
        this.$message.warning("两次密码不一致");
        return;
      }
      this.$axios
        .post("/changeUserPwd/", this.pswForm)
        .then((Response) => {
          if (Response.data.status === 0) {
            this.$emit("update");
            this.$message.success("修改成功");
            this.$router.push("/user/home");
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
.modifyMain {
  margin-top: 10vh;
  margin-left: 15vw;
}
.paneInfo {
  width: 400px;
}
.tabInfo {
  font-size: 25px;
  font-weight: bold;
  line-height: 50px;
}
.tabAlter {
  font-size: 25px;
  font-weight: bold;
  line-height: 50px;
}
#tab-info {
  margin-bottom: 2vh;
}
.modifyForm {
  width: 50vw;
}
</style>
