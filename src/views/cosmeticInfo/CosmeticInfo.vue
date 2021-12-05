<template>
  <div>
    <div class="cosmeticInfoMain">
      <div class="cosmeticInfoMainLeft">
        <img :src="info.productGraph" class="cosmeticInfoImg" />
      </div>
      <div class="cosmeticInfoMainRight">
        <div class="cosmeticName">{{ info.productName }}</div>
        <div class="cosmeticAuPu">
          <div>厂商：{{ info.firmName }}</div>
          <div>商品类别：{{ info.productType }}</div>
        </div>
        <div class="cosmeticAuPu">评分：
        <el-rate v-model="value" disabled show-score :colors="colors" score-template="{value}"></el-rate>
        </div>
        <div class="cosmeticInfoPrice">￥{{ info.productPrice }}</div>
        <div class="cosmeticInfoButton">
          <el-button type="primary" icon="el-icon-sell" @click="skip" style="width:150px;font-size:20px">购买</el-button>
          <el-button icon="el-icon-star-on" style="font-size: 20px;" circle  @click="collect"></el-button>
        </div>
        <el-dialog title="收藏至下列哪个文件夹" :visible.sync="dialogTableVisible" width="400px">
          <el-table :data="gridData" border="true">
            <el-table-column type="index"> </el-table-column>
            <el-table-column property="favouriteName" label="收藏夹名" width="180px" align="center"></el-table-column>
            <el-table-column label="确定是否添加" width="180px" align="center">
              <template slot-scope="scope">
                <el-button type="primary" plain @click="submitCollect(scope.row.favouriteId)">添加</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>
        <div class="cosmeticCount">
          <div class="cosmeticCountTitle">库存</div>
          <div class="cosmeticCountNum">{{ info.productNumber}}</div>
        </div>
      </div>
    </div>
    <div class="contentMain">
      <div class="contentTitle">简介</div>
      <div class="contentIntro">{{ info.productIntro }}</div>
      <div class="contentTitle">评论区</div>
      <div class="contentIntro">
        <el-input type="textarea" :rows="2" placeholder="添加评论..." v-model="textarea"></el-input>
        <el-rate v-model="value2" show-text class="contentRate"></el-rate>
        <el-button type="primary" @click="submit" class="contentButton">提交</el-button>
      </div>
      <div v-for="item in commentsTmp" :key="item">
        <el-descriptions title="用户评论">
          <el-descriptions-item label="昵称">{{ item.userName }}</el-descriptions-item>
          <el-descriptions-item label="评论时间">{{ item.commentTime }}</el-descriptions-item>
          <el-descriptions-item label="评论内容">{{ item.commentContent }}</el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "../../components/common/Nav";
export default {
  components: {
    Nav,
  },
  data() {
    return {
      info: {},
      productId: 0,
      value: 0,
      value2: 0,
      commentsList: [],
      commentsTmp: [],
      gridData: [],
      textarea: "",
      commentTime: "",
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      dialogTableVisible: false
    };
  },
  mounted() {
    this.productId = this.$route.params.ISBN;
    this.$axios.post("/showProduct/", {
      productId: this.productId,
    }).then((Response) => {
      this.info = Response.data.data;
      this.value = this.info.grade;
      this.commentsList = this.info.comments;
      this.commentsTmp = this.commentsList.reverse();
      console.log(Response.data.data);
    });
  },
  methods: {
    collect() {
      if (!this.$store.state.isLogin) {
        this.$message.warning("请先登录");
        this.$router.push("/login");
      } else if (this.$store.state.isFirm) {
        this.$message.warning("您是厂家无法进行收藏");
      } else {
        console.log(this.info.productId);
        this.$axios
        .get("/showFavourite/")
        .then((Response) => {
          if (Response.data.status === 0) {
            this.gridData = Response.data.data.favourite;
          }
        })
        .catch((failResponse) => {
          console.log(failResponse);
        });
        this.dialogTableVisible = true;
      }
    },
    skip() {
      if (!this.$store.state.isLogin) {
        this.$message.warning("请先登录");
        this.$router.push("/login");
      } else if (this.$store.state.isFirm) {
        this.$message.warning("您是厂家无法购买");
      } else {
        console.log(this.info.productId);
        this.$router.push({ name: "submitOrder", params: { ISBN: this.info.productId } });
      }
    },
    update() {
      this.$axios.post("/showProduct/", {
        productId: this.productId,
      }).then((Response) => {
        this.info = Response.data.data;
        this.value = this.info.grade;
        this.commentsList = this.info.comments;
        this.commentsTmp = this.commentsList.reverse();
        console.log(Response.data.data);
      });
    },
    submit() {
      if (this.textarea === "" || this.value2 === 0) {
        this.$message.warning("请填写必要信息");
      } else if (!this.$store.state.isLogin) {
        this.$message.warning("请先登录");
        this.$router.push("/login");
      } else if (this.$store.state.isFirm) {
        this.$message.warning("未有该权限");
      } else {
        let date = new Date();
        let yy = date.getFullYear();
      　let mm = date.getMonth()+1;
      　let dd = date.getDate();
      　let hh = date.getHours();
      　let mf = date.getMinutes()<10 ? '0'+date.getMinutes() : date.getMinutes();
      　let ss = date.getSeconds()<10 ? '0'+date.getSeconds() : date.getSeconds();
      　this.commentTime = yy+'/'+mm+'/'+dd+' '+hh+':'+mf+':'+ss;
        this.$axios.post("/addComment/", {
          commentContent: this.textarea,
          commentGrade: this.value2,
          productId: this.productId,
          commentTime: this.commentTime
        }).then((Response) => {
          if (Response.data.status === 0) {
            this.update();
            this.$message.success("评论成功");
          } else {
            this.$message.warning(Response.data.msg);
          }
        });
      }
    },
    submitCollect(id) {
      this.$axios.post("/addFavProduct/", {
          favouriteId: id,
          productId: this.productId,
        }).then((Response) => {
          if (Response.data.status === 0) {
            this.$message.success(Response.data.msg);
          } else {
            this.$message.warning(Response.data.msg);
          }
        });
    }
  },
};
</script>

<style>
.cosmeticInfoMain {
  width: 100vw;
  display: flex;
}
.cosmeticInfoMainLeft {
  margin-top: 10vh;
  margin-left: 10vw;
  width: 35vw;
}
.cosmeticInfoMainRight {
  margin-top: 10vh;
  width: 35vw;
  margin-left: 8vw;
  margin-right: 10vw;
}
.cosmeticInfoImg {
  height: 60vh;
  margin-left: 10vw;
}
.cosmeticName {
  font-weight: 1000;
  font-size: 40px;
  margin-bottom: 20px;
  padding: 5px;
}
.cosmeticAuPu {
  margin-bottom: 5px;
  color: dimgray;
  font-size: 20px;
  padding: 10px;
  border-top: 0.5px solid dimgray;
  border-bottom: 0.5px solid dimgray;
}
.cosmeticCount {
  padding: 10px;
  border-bottom: 0.5px solid dimgray;
}
.cosmeticCountTitle {
  font-size: 20px;
  color: dimgray;
}
.cosmeticCountNum {
  font-size: 25px;
  font-weight: bold;
  color: #409eff;
  margin-left: 20px;
}
.cosmeticInfoPrice {
  margin-top: 20px;
  padding: 5px;
  color: orangered;
  font-size: 30px;
}
.cosmeticInfoButton {
  padding: 10px;
  margin-top: 10px;
  font-size: 30px;
  font-weight: bold;
}
.contentMain {
  margin: 10vh 10vw;
  border-top: 5px solid #ec4887;
}
.contentTitle {
  margin-top: 5vh;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
}
.contentList {
  margin-top: 5vh;
  display: flex;
  justify-content: space-between;
}
.contentButton {
  text-align: right;
}
.contentRate {
  text-align: left;
}
.contentIntro {
  margin: 5vh 10vw;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 30px;
  text-align: center;
  word-break: break-all;
  word-wrap: break-word;
}
</style>
