<template>
  <div>
    <PositionTool
      @download="handleDownload"
      @parentupdata="handleSunUpdata"
      @searchData="handleSearch"
    />
    <router-view :keyWord="keyWord"></router-view>
  </div>
</template>
<script>
import PositionTool from "./PositionTool";
export default {
  components: {
    PositionTool,
  },
  data() {
    return {
      num: 0,
      num1: 0,
      keyWord: "",
    };
  },
  methods: {
    handleSunUpdata() {
      this.num++;
    },
    handleDownload() {
      this.num1++;
    },
    handleSearch(e) {
      this.keyWord = e;
      console.log(e);
    },
  },
};
</script>