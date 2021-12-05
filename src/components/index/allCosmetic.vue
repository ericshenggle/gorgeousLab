<template>
  <div>
    <Cosmetics :info="info"></Cosmetics>
  </div>
</template>

<script>
import Cosmetics from "./Cosmetics.vue";
export default {
  components: {
    Cosmetics,
  },
  data() {
    return {
      info: [],
    };
  },
  mounted() {
    this.$axios.get("/viewProducts/").then((Response) => {
      this.info = Response.data.data.products;
    });
  },
};
</script>

<style></style>
