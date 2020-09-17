<template>
  <div class="login">
    <div class="loginForm">
      <loginForm @handleLogin="login" />
    </div>
  </div>
</template>

<script>
import loginForm from "../components/loginForm";
export default {
  name: "login",
  components: {
    loginForm,
  },
  data() {
    return {
      userAndPwd: {
        password: "123456",
        username: "admin",
      },
    };
  },
  methods: {
    login(data) {
      let bl = true;
      for (let i in data) {
        //   console.log(i);
        if (data[i] !== this.userAndPwd[i]) {
          bl = false;
        }
      }
      if (bl) {
        this.$message("登錄成功");
        this.$router.push({ path: "/" });
      } else {
        this.$message("用戶名或密碼輸入錯誤");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  background-color: #f8f8f8;
  min-height: 100%;
  width: 100%;
  .loginForm {
    width: 520px;
    padding-top: 260px;
    margin: auto;
  }
}
</style>