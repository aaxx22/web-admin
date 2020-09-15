<template>
  <div class="user">
    <el-dropdown trigger="click" @command="loginOut">
      <span class="el-dropdown-link">
        admin
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown" @command="loginOut">
        <el-dropdown-item>{{$t('message.user_info')}}</el-dropdown-item>
        <el-dropdown-item>修改密碼</el-dropdown-item>
        <el-dropdown-item command="loginOut">退出登錄</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <img src="../assets/headImg.png" alt />
  </div>
</template>

<script>
export default {
  methods: {
    loginOut(command) {
      console.log(command);
      if (command === "loginOut") {
        localStorage.removeItem("userinfo");
        this.$router.push({ path: "/login" });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.user {
  height: 50px;
  line-height: 50px;
  .el-dropdown-selfdefine {
    cursor: default;
  }
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    vertical-align: middle;
    margin-left: 10px;
  }
}
</style>