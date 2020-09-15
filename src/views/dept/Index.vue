<template>
  <div ref="dept">
    <DeptTool @download="handleDownload" @parentUpdata="handleSunUpdata" />
    <router-view></router-view>
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
    };
  },
  mounted() {
    console.log(this.$refs.dept);
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