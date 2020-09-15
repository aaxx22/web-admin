<template>
  <div>
    <PositionTool @download="handleDownload" @parentupdata="handleSunUpdata" />
    <router-view></router-view>
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
      num1:0
    };
  },
  methods: {
    handleSunUpdata() {
      this.num++;
    },
    handleDownload() {
      this.num1++;
    },
  },
};
</script>