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
    this.$axios
      .post("/api/visiter/book_list_by_category", {
        categoryName: this.$store.state.category,
      })
      .then((Response) => {
        this.info = Response.data.data.bookList;
        // console.log(Response.data.data.bookList);
      });
  },
  watch: {
    "$store.state.category": function() {
      //   console.log(this.$store.state.category);
      this.$axios
        .post("/api/visiter/book_list_by_category", {
          categoryName: this.$store.state.category,
        })
        .then((Response) => {
          this.info = Response.data.data.bookList;
          console.log(Response.data.data.bookList);
        });
    },
  },
};
</script>

<style></style>
