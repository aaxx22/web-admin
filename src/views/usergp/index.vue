<template>
  <div>
    <UsergpTool @update="$children[1].initList()" @search="handleSearch" />
    <router-view :keyWord="key"></router-view>
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
      key:""
    }
  },
  methods: {
    handleSearch(val){
      this.key= val
    }
  },
};
</script>

<style>
</style>