<template>
  <div>
    <el-tag
      type="danger"
      v-for="(item,index) in routeArr"
      :key="index"
      @click="changeRoute(item)"
      :class="{active:$route.name==item.name}"
      v-if="item.name"
    >
      {{item.name}}
      <i class="el-icon-error" @click="removeTag(item)" title="關閉"></i>
    </el-tag>
  </div>
</template>

<script>
import { throttle } from "../utils/common";
export default {
  props: {
    from: { type: Object },
  },
  data() {
    return {
      routeArr: this.$store.state.routeArr,
      timer: null,
    };
  },
  methods: {
    removeTag(rt) {
      if (this.routeArr.length === 1) {
        // throttle(function () {
        //   console.log(this);
        //   this.$message({
        //     message: "至少需要保留一個標簽頁",
        //     type: "warning",
        //   });
        // }, 2000).call(this);
        this.msg();

        return;
      }
      if (rt.name == this.$route.name) {
        this.$router.go(-1);
      }
      this.$store.dispatch("removeTag", rt);
      console.log(rt);
    },
    changeRoute(rt) {
      this.$router.push(rt);
    },
    msg: throttle(function () {
      this.$message({
        message: "至少需要保留一個標簽頁",
        type: "warning",
      });
    }, 2500),
  },
};
</script>

<style lang="less" scoped>
div {
  height: 50px;
  border-bottom: 1px solid #ccc;
  border-top: 1px solid #ccc;
  display: flex;
  align-items: center;
  .el-tag {
    margin: 0 5px;
    position: relative;
    cursor: pointer;
    height: 28px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    border-radius: 1px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    i {
      font-size: 14px;
      position: relative;
      left: 4px;
      &:hover {
        color: #777;
      }
    }
  }
  .active {
    background-color: #42b983;
    color: #fff;
    border-color: #42b983;
    .el-icon-error:hover {
      color: #f0f0f0;
    }
  }
}
</style>