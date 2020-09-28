<template>
  <div ref="dept">
    <DeptTool
      @searchData="handleSearch"
      @parentUpdata="handleSunUpdata"
    />
    <router-view :keyWord="keyword"></router-view>
  </div>
</template>
<script>
import DeptTool from "./DeptTool";
export default {
  components: {
    DeptTool,
  },
  data() {
    return {
      num: 0,
      num1: 0,
      keyword: "",
    };
  },
  mounted() {
    console.log(this.$refs.dept);
  },
  methods: {
    handleSunUpdata() {
      this.num++;
    },
    handleSearch(e) {
      this.keyword = e;
    },
  },
};
</script>