<template>
  <div class="form">
    <div class="text">
      <i class="iconfont icon-yonghu"></i>
      <input
        type="text"
        :placeholder="$t('message.p_input_user_name')"
        v-model="loginForm.username"
        ref="usn"
      />
    </div>
    <div class="pwd">
      <i class="iconfont icon-mima"></i>
      <input
        :type="pwd"
        :placeholder="$t('message.p_input_password')"
        v-model="loginForm.password"
        @keypress.enter="handleLogin"
        ref="pwd"
      />
      <i class="iconfont isShow" :class="isPwd" @click="isShow"></i>
    </div>
    <div class="btn" @click="handleLogin">{{$t('message.login')}}</div>

    <div style="margin-top:20px;">
      <p>{{$t('message.user_name')}}：admin</p>
      <p>{{$t('message.password')}}：123456</p>
    </div>
  </div>
</template>

<script>
import { login } from "../api/request";
export default {
  data() {
    return {
      pwd: "password",
      loginForm: {
        username: "admin",
        password: "123456",
      },
    };
  },
  computed: {
    isPwd() {
      return this.pwd == "password" ? "icon-guanbi-yanjing" : "icon-yanjing";
    },
  },
  methods: {
    isShow() {
      this.pwd = this.pwd == "password" ? "text" : "password";
    },
    handleLogin() {
      if (this.loginForm.username === "") {
        this.$message({
          message: "登錄名不能為空",
          type: "warning",
        });
        this.$refs.usn.focus();
        return;
      }
      if (this.loginForm.password === "") {
        this.$message({
          message: "密碼不能為空",
          type: "warning",
        });
        this.$refs.pwd.focus();
        return;
      }

      try {
        login(this.loginForm)
          .then((res) => {
            console.log(res.data);
            this.$store.commit("storeUserInfo", res.data.data);
            let data = res.data;
            if (data.status === 2000) {
              this.$message({
                message: data.message,
                type: "success",
              });
            }
            this.$router.push({ path: "/" });
          })
          .catch((err) => {
            // console.log(err);
            console.log(err.response);
            if (err.response) {
              this.$message({
                message: err.response.data.message,
                type: "error",
              });
            } else {
              this.$message({
                message: "服務器錯誤，請稍後再試",
                type: "error",
              });
            }
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../style/iconfont/login.css");
.form {
  width: 100%;
  .text,
  .pwd {
    width: 100%;
    height: 50px;
    background-color: rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    margin-bottom: 20px;
    font-size: 18px;
    line-height: 50px;
    display: flex;
    input {
      height: 100%;
      flex: 1;
      color: #222;
    }
    i {
      font-size: 26px;
      color: #bbb;
      margin: 0 10px;
      &.icon-mima {
        font-weight: 800;
      }
    }
    .isShow {
      font-size: 20px;
      cursor: pointer;
    }
  }
  .btn {
    color: #ffffff;
    background-color: #1890ff;
    border-color: #1890ff;
    height: 35px;
    font-size: 14px;
    text-align: center;
    line-height: 35px;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background: #46a6ff;
      border-color: #46a6ff;
    }
  }
}
</style>