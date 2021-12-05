<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="添加收藏夹" name="add">
        <el-form :inline="true" label-position="left" label-width="80px" :model="favouriteForm">
          <el-form-item label="名称">
            <el-input v-model="favouriteForm.favouriteName"></el-input>
          </el-form-item>
          <br />
          <el-button type="primary" @click="submit">提交</el-button>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="已有收藏夹" name="show">
        <div class="cosmeticItems2" v-for="(item, index) in result" :key="item" @click="showProduct(item.favouriteId)">
            <body style="text-align: center">
              <i class="el-icon-folder-opened" style="font-size: 100px;"></i>
            </body>
            <div class="cosmeticTitle">{{ item.favouriteName }}</div>
          <body style="text-align: center">
          <el-button type="primary"  @click="remove(index)" >删除</el-button>
          </body>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="收藏详情" :visible.sync="dialogTableVisible" top="5vh" width="740px">
      <el-table :data="gridData" border="true" max-height="600" >
        <el-table-column property="productName" label="商品名" width="150" align="center"></el-table-column>
        <el-table-column label="图片" align="center" width="250">
          <template slot-scope="scope">
            <el-image :src="scope.row.productGraph" fit="fill"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="查看商品详情" width="150" align="center">
          <template slot-scope="scope">
            <el-button type="primary" plain @click="showProductDetail(scope.row.productId)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column label="移除该商品" width="150" align="center">
          <template slot-scope="scope">
            <el-button type="danger" plain @click="removeProduct(scope.row.productId, scope.$index)">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data() {
    return {
      favouriteForm: {
        favouriteName: ""
      },
      activeName: "add",
      keyword: "",
      result: [],
      gridData: [],
      dialogTableVisible: false,
      url: require("../../assets/image/favourite.jpg"),
      favouriteId: 0,
    };
  },
  methods: {
    submit() {
      let form = this.favouriteForm;
      if (Object.values(form).some((item) => item === "")) {
        this.$message.warning("请填写所有必要信息");
        return;
      }
      let url = "/addFavourite/";
      let msg = "添加成功";
      this.$axios
        .post(url, form)
        .then((Response) => {
          if (Response.data.status === 0) {
            this.$message.success(msg);
            this.$router.push("/user/favorite");
          } else {
            this.$message.warning(Response.data.msg);
          }
        })
        .catch((failResponse) => {
          console.log(failResponse);
        });
    },
    remove(index) {
      this.$axios
        .post("/deleFavourite/", {
          favouriteId: this.result[index].favouriteId,
        })
        .then((Response) => {
          if (Response.data.status === 0) {
            this.$message.success(Response.data.msg);
            this.result.splice(index, 1);
          }
        });
    },
    handleClick(tab) {
      if (tab.name === "show") {
        this.$axios
        .get("/showFavourite/")
        .then((Response) => {
          if (Response.data.status === 0) {
            this.result = Response.data.data.favourite;
          }
        })
        .catch((failResponse) => {
          console.log(failResponse);
        });
      }
    },
    showProduct(id) {
      this.favouriteId = id
      this.$axios
        .post("/showFavProduct/", {
          favouriteId: this.favouriteId,
        })
        .then((Response) => {
          if (Response.data.status === 0) {
            this.gridData = Response.data.data.products;
          }
        });
        this.dialogTableVisible = true;
    },
    showProductDetail(prodcutId) {
      this.$router.push({ name: 'cosmeticInfo', params: { ISBN: prodcutId } });
    },
    removeProduct(id, index) {
      this.$axios.post("/deleFavProduct/", {
          favouriteId: this.favouriteId,
          productId: id,
        }).then((Response) => {
          if (Response.data.status === 0) {
            this.$message.success(Response.data.msg);
          } else {
            this.$message.warning(Response.data.msg);
          }
        });
      this.gridData.splice(index, 1);
    }
  },
};
</script>

<style>
.cosmeticItems2 {
  float: left;
  width: 150px;
  height: 180px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  margin: 8px;
  padding: 2px;
  border-radius: 5px;
}
.cosmeticItems1:hover {
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
}
.cosmeticTitle {
  text-align: center;
  font-size: 15px;
  font-weight: bold;
}
.cosmeticNum {
  text-align: center;
  font-size: 8px;
  font-weight: bold;
}
.PandA {
  text-align: center;
  font-size: 15px;
}
.cosmeticPrice {
  color: orangered;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}</style>
