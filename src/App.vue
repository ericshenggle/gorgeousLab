<template>
  <div>
    <Nav></Nav>
    <router-view />
  </div>
</template>

<script>
import Nav from "./components/common/Nav";

export default {
  components: {
    Nav,
  },
  name: 'App',
  created() {
    //在页面加载时读取localStorage里的状态信息
    localStorage.getItem("userMsg") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("userMsg"))));
    
    //在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener("beforeunload",()=>{
        localStorage.setItem("userMsg",JSON.stringify(this.$store.state))
    })
  },
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
</style>
