<template>
  <div>
    <userTool @update="$children[1].initList()" @search="handleSearch" />
    <router-view :keyWord="key"></router-view>
  </div>
</template>
<script>
import userTool from "./userTool";
export default {
  components: {
    userTool,
  },
  data() {
    return {
      key: "",
    };
  },
  methods: {
    handleSearch(val) {
      this.key = val;
    },
  },
};
</script>