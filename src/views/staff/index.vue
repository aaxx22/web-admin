<template>
  <div>
    <staffTool />
    <router-view></router-view>
  </div>
</template>
<script>
import staffTool from "./staffTool";
export default {
  name:"staffIndex",
  components: {
    staffTool,
  },
};
</script>