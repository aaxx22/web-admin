<template>
  <div>
    <UsergpTool @update="num++" />
    <router-view :update="num"></router-view>
  </div>
</template>

<script>
import UsergpTool from "./UsergpTool";
export default {
  components: {
    UsergpTool,
  },
  data() {
    return {
      num: 0,
    };
  },
};
</script>

<style>
</style>