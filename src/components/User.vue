<template>
  <div class="user">
    <el-dropdown trigger="click" @command="loginOut">
      <span class="el-dropdown-link">
        {{userInfo?userInfo.userName:''}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown" @command="loginOut">
        <el-dropdown-item command="changePassword">設置</el-dropdown-item>
        <el-dropdown-item command="loginOut">退出登錄</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <img :src="userInfo?$baseUrl+userInfo.photo:''" alt />
    <el-dialog width="500px" title="設置" :visible.sync="dialogFormVisible">
      <el-tabs v-model="activeName2" type="card">
        <el-tab-pane label="修改密碼" name="password">
          <el-form
            :model="form"
            status-icon
            :rules="rules2"
            ref="ruleForm2"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item :label="$t('message.user_name')">
              <span>{{userInfo.userName}}</span>
            </el-form-item>
            <el-form-item :label="$t('message.old_password')" prop="oldPassWord">
              <el-input
                type="password"
                v-model="form.oldPassWord"
                auto-complete="off"
                :placeholder="$t('message.p_input_old_password')"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('message.new_password')" prop="newPassWord">
              <el-input
                type="password"
                v-model="form.newPassWord"
                auto-complete="off"
                :placeholder="$t('message.p_input_new_password')"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('message.confirm_password')" prop="confirmPassword">
              <el-input
                type="password"
                v-model="form.confirmPassword"
                auto-complete="off"
                :placeholder="$t('message.p_input_confirm_password')"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="修改用戶名" name="username">
          <el-form
            :model="uform"
            status-icon
            :rules="rules3"
            ref="ruleForm3"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item :label="'現'+$t('message.user_name')">
              <span>{{userInfo.userName}}</span>
            </el-form-item>
            <el-form-item :label="$t('message.new_user_name')" prop="newUserName">
              <el-input
                v-model="uform.newUserName"
                auto-complete="off"
                :placeholder="$t('message.p_input_new_user_name')"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('message.password')" prop="passWord">
              <el-input
                type="password"
                v-model="uform.passWord"
                auto-complete="off"
                :placeholder="$t('message.p_input_password')"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          v-if="activeName2=='password'"
          @click="handleClick1('ruleForm2')"
        >确 定</el-button>
        <el-button
          type="primary"
          v-if="activeName2=='username'"
          @click="handleClick2('ruleForm3')"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { ChangePassword, ChangeUserName } from "../api/request";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("message.p_input_new_password")));
      } else {
        if (this.form.confirmPassword !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("message.p_input_confirm_password")));
      } else if (value !== this.form.newPassWord) {
        callback(new Error("密碼輸入不一致"));
      } else {
        callback();
      }
    };
    return {
      activeName2: "password",
      userInfo: {},
      uform: {
        oldUserName: "",
        newUserName: "",
        passWord: "",
      },
      form: {
        oldPassWord: "",
        newPassWord: "",
        confirmPassword: "",
      },
      dialogFormVisible: false,
      formLabelWidth: "80px",
      rules3: {
        newUserName: [
          {
            required: true,
            message: this.$t("message.user_name_not_empty"),
            trigger: "blur",
          },
        ],
        passWord: [
          {
            required: true,
            message: this.$t("message.password_not_empty"),
            trigger: "blur",
          },
        ],
      },
      rules2: {
        newPassWord: [
          { required: true, validator: validatePass, trigger: "blur" },
        ],
        confirmPassword: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
        oldPassWord: [
          {
            required: true,
            message: this.$t("message.p_input_old_password"),
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.userInfo = this.$store.state.userInfo.userInfo
      ? this.$store.state.userInfo.userInfo
      : JSON.parse(window.localStorage.getItem("userInfo"));
  },
  methods: {
    loginOut(command) {
      console.log(this.form);
      if (command === "loginOut") {
        localStorage.removeItem("userInfo");
        localStorage.removeItem("token");
        this.$router.push({ path: "/login" });
      } else if (command == "changePassword") {
        this.form.UserName = this.userInfo.userName;
        this.dialogFormVisible = true;
      }
    },
    handleClick1(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(this.form);
          ChangePassword(this.form)
            .then((res) => {
              console.log(res);
              this.$message({
                type: "success",
                message: res.data.message,
              });
              this.$router.push("/login");
              window.localStorage.removeItem("userInfo");
              window.localStorage.removeItem("token");
              this.dialogFormVisible = false;
              this.$refs[formName].resetFields();
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleClick2(e) {
      this.uform.oldUserName = this.userInfo.userName;

      // return;

      this.$refs[e].validate((valid) => {
        if (valid) {
          ChangeUserName(this.uform)
            .then((res) => {
              console.log(res);
              this.$message({
                type: "success",
                message: res.data.message,
              });

              this.dialogFormVisible = false;
              this.userInfo.userName = this.uform.newUserName;
              console.log(this.userInfo);
              let data = {
                userInfo: { ...this.userInfo },
                token: window.localStorage.getItem("token"),
              };
              this.$store.commit("storeUserInfo", data);
              this.$refs[e].resetFields();
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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