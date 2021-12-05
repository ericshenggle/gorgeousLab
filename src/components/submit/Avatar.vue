<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action=""
      accept=".jpg, .png"
      :limit="1"
      :auto-upload="false"
      :on-change="getFile"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleUploadRemove"
      :on-exceed="handleExceed"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      <div slot="tip">只能上传jpg/png文件，且不超过16M</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Avatar",
  props: ["old_pic"],
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      imageUrl: this.old_pic,
      image_base64: this.old_pic,
    };
  },
  methods: {
    getFile(file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.getBase64(file.raw).then((res) => {
        if (res.length > 0) {
          this.image_base64 = res;
        }
        this.$emit("picture", this.image_base64);
      });
    },
    getBase64(file) {
      return new Promise(function(resolve, reject) {
        const reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function() {
          imgResult = reader.result;
        };
        reader.onerror = function(error) {
          reject(error);
        };
        reader.onloadend = function() {
          resolve(imgResult);
        };
      });
    },
    handleExceed() {
      this.$message.warning("只能上传一张jpg/png文件");
    },
    handleUploadRemove() {
      this.imageUrl = "";
    },
    handlePictureCardPreview() {
      this.dialogImageUrl = this.imageUrl;
      this.dialogVisible = true;
    },
  },
  watch: {
    old_pic(new_value) {
      this.imageUrl = new_value;
    },
  },
  // mounted(){
  //   if(this.old_pic!==undefined){
  //     this.imageUrl = this.old_pic
  //     console.log(this.old_pic)
  //   }
  // }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  height: 178px;
  display: block;
}
</style>
