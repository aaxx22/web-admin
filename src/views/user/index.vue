<template>
  <div>
    <userTool />
    <router-view></router-view>
  </div>
</template>
<script>
import userTool from "./userTool";
export default {
  components: {
    userTool,
  },
};
</script>