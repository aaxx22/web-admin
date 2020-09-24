<template>
  <div>
    <AreasTool @update="num++" @searchData="handleSearch" />
    <router-view :num="num" :keyWord="keyword"></router-view>
  </div>
</template>

<script>
import AreasTool from "./AreasTool";
export default {
  components: {
    AreasTool,
  },
  data() {
    return {
      num: 0,
      keyword: "",
    };
  },
  methods: {
    handleSearch(k) {
      this.keyword = k;
    },
  },
};
</script>

<style>
</style>