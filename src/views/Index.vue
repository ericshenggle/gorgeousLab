<template>
  <div>
    <div class="indexMain">
      <div class="carousel">
        <el-carousel :interval="3000" type="card" indicator-position="outside" class="imageCarousel">
          <el-carousel-item v-for="(item, index) in top" :key="item">
            <router-link :to="{ name: 'cosmeticInfo', params: { ISBN: index } }" tag="div">
              <img style="height:300px" :src="item.url" />
            </router-link>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="indexInfo">
        <div class="indexInfoRight">
          <div class="cosmeticsTitle">商品一览</div>
          <router-view :info="info"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cosmetics from "../components/index/Cosmetics.vue";
export default {
  components: {
    Cosmetics,
  },
  data() {
    return {
      info: [],
      top: [
        {
          url: require("../assets/image/1.jpg"),
        },
        {
          url: require("../assets/image/2.jpg"),
        },
        {
          url: require("../assets/image/3.jpg"),
        },
        {
          url: require("../assets/image/4.jpg"),
        },
        {
          url: require("../assets/image/5.jpg"),
        },
      ],
    };
  },
  methods: {
    handleSelect(bookCat) {
      console.log("select" + bookCat);
      this.$store.commit("changeCategory", bookCat);
    },
    speCategory(id) {
      return "/category/" + id;
    },
  },
};
</script>

<style>
.indexMain {
  width: 100vw;
}
.carousel {
  margin-top: 5vh;
  margin-left: 5vw;
  width: 90vw;
  height: 320px;
  border: 5px solid #14a133;
  border-radius: 10px;
  padding: 10px;
}
.imageCarousel {
  text-align: center;
  align-items: center;
  height: 340px;
}
.indexInfo {
  margin-top: 5vh;
  margin-left: 10vw;
  margin-right: 10vw;
  display: flex;
}
.indexInfoLeft {
  width: 20vw;
}
.indexInfoRight {
  margin-left: 5vw;
  margin-right: 1vw;
  width: 99%;
}
.el-menu-vertical-demo {
  border-right: 3px solid #ff40af;
}
.selectTitle {
  font-size: 20px;
  text-align: center;
  color: dimgray;
  margin-bottom: 20px;
  margin-top: 35px;
}
.cosmeticsTitle {
  color: #ce1581;
  font-size: 40px;
}
</style>
