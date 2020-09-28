<template>
  <div>
    <PositionTool
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
      keyWord: "",
    };
  },
  methods: {
    handleSunUpdata() {
      this.num++;
    },
    handleSearch(e) {
      this.keyWord = e;
    },
  },
};
</script>