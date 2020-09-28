<template>
  <div>
    <PatroItemTool @search="handleSearch" @update="$children[1].initList()" />
    <router-view :keyWord="keyword"></router-view>
  </div>
</template>

<script>
import PatroItemTool from "./PatroItemTool";
export default {
  components: {
    PatroItemTool,
  },
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    handleSearch(val) {
      this.keyword = val;
    },
  },
};
</script>

<style>
</style>