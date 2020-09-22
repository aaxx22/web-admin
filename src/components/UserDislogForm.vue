<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogFormbl"
      @close="$emit('dialogVisible', false)"
      width="800px"
    >
      <el-form :model="form" :rules="rules">
        <div class="df">
          <el-form-item :label="$t('message.person_photo')" :label-width="formLabelWidth">
            <div class="imgOption">
              <img
                :src="$baseUrl+imgUrl+'?'+(Math.floor(Math.random()*88800+200))"
                v-if="imgUrl"
                alt
                class="headImg"
              />
              <el-upload
                class="avatar-uploader"
                :action="$baseUrl+'/api/utils/uploadFile'"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <div class="upimg">點擊上傳頭像</div>
              </el-upload>
            </div>
          </el-form-item>
          <div class="box">
            <el-form-item prop="code" :label="$t('message.code')" :label-width="formLabelWidth">
              <el-input v-model="form.code"></el-input>
            </el-form-item>
            <el-form-item
              prop="userName"
              :label="$t('message.user_name')"
              :label-width="formLabelWidth"
            >
              <el-input v-model="form.userName"></el-input>
            </el-form-item>
            <el-form-item :label="$t('message.password')" :label-width="formLabelWidth">
              <el-input v-model="form.password"></el-input>
            </el-form-item>
          </div>
        </div>

        <div class="df">
          <el-form-item
            prop="cnName"
            :label="$t('message.group_name')"
            :label-width="formLabelWidth"
          >
            <el-select
              @change="handleGroupChange"
              v-model="groupVal"
              :placeholder="$t('message.p_input_group_name')"
            >
              <el-option
                v-for="item in groupsList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            prop="enName"
            :label="$t('message.staff_name')"
            :label-width="formLabelWidth"
          >
            <el-select
              @change="handleStaffChange"
              v-model="staffVal"
              :placeholder="$t('message.p_sel_staff_name')"
            >
              <el-option
                v-for="item in staffList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item prop="state" :label="$t('message.state_name')" :label-width="formLabelWidth">
          <el-switch v-model="form.state" :width="60"></el-switch>
        </el-form-item>
        <el-form-item :label="$t('message.remark')" :label-width="formLabelWidth">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$emit('dialogVisible', false)">{{$t('message.cancel')}}</el-button>
        <el-button type="primary" @click="dialogVisible(true)">{{$t('message.ok')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { EditUser, AddUser, combosGet } from "../api/request";
export default {
  name: "UserDislogForm",
  props: {
    dialogFormVisible: {
      type: Boolean,
    },
    formData: {
      type: Object,
    },
    title: {
      type: String,
    },
    Operation: {
      type: String,
    },
  },
  data() {
    return {
      form: { state: true },
      formLabelWidth: "120px",
      rules: {
        code: [{ required: true, message: "編號不能為空", trigger: "blur" }],
        cnName: [{ required: true, message: "分組不能為空", trigger: "blur" }],
        enName: [{ required: true, message: "員工不能為空", trigger: "blur" }],
        userName: [
          { required: true, message: "用戶名不能為空", trigger: "blur" },
        ],
        state: [{ required: true, message: "狀態不能為空", trigger: "blur" }],
      },
      groupsList: [],
      staffList: [],
      groupVal: "",
      staffVal: "",
      imgUrl: "",
    };
  },
  computed: {
    dialogFormbl: {
      get() {
        return this.dialogFormVisible;
      },
      set() {},
    },
  },
  watch: {
    formData() {
      this.form = JSON.parse(JSON.stringify(this.formData));
      this.groupVal = this.form.group ? this.form.group.name : "";
      this.form.groupId = this.form.group ? this.form.group.id : "";
      this.staffVal = this.form.staff ? this.form.staff.name : "";
      this.form.staffId = this.form.staff ? this.form.staff.id : "";
      this.imgUrl = this.form.photo ? this.form.photo : "";
    },
    dialogFormVisible() {
      if (!this.dialogFormVisible) {
        this.form = JSON.parse(JSON.stringify(this.formData));
      }
    },
    "form.photo"() {
      this.imgUrl = this.form.photo;
    },
  },
  created() {
    combosGet("userGroups").then((res) => {
      this.groupsList = res.data.data;
    });
    combosGet("staffs").then((res) => {
      this.staffList = res.data.data;
    });
  },
  methods: {
    handleAvatarSuccess(res, file) {
      if (res.status === 2000) {
        this.$message({
          type: "success",
          message: "頭像上傳成功",
        });
        this.form.photo = res.data;
        this.imgUrl = res.data;

        console.log(this.form);
      } else {
        this.$message({
          type: "error",
          message: "頭像上傳失敗",
        });
      }
      //   this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPng = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是圖片格式!");
      //   return false;
      // }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      console.log(file);
      return isJPG && isLt2M;
    },

    handleGroupChange(val) {
      this.form.groupId = val;
    },
    handleStaffChange(val) {
      this.form.staffId = val;
    },
    dialogVisible(bl) {
      console.log(this.form);
      if (!this.check(this.form.code)) {
        this.$message({
          type: "error",
          message: "編號不能為空",
        });
        return;
      }
      if (!this.check(this.form.groupId)) {
        this.$message({
          type: "error",
          message: "分組不能為空",
        });
        return;
      }
      if (!this.check(this.form.staffId)) {
        this.$message({
          type: "error",
          message: "員工不能為空",
        });
        return;
      }
      if (!this.check(this.form.userName)) {
        this.$message({
          type: "error",
          message: "用戶名不能為空",
        });
        return;
      }
      this.$emit("dialogVisible", false);
      if (bl) {
        let {
          groupId,
          code,
          staffId,
          id,
          remark,
          state,
          userName,
          photo,
          password,
        } = this.form;
        if (this.Operation === "edit") {
          // console.log(({ cnName, code, enName, id, remark, state } = this.form));
          EditUser({
            groupId,
            code,
            staffId,
            id,
            remark,
            state,
            userName,
            password,
            photo,
          })
            .then((res) => {
              // res.data.message
              this.$message({
                type: "success",
                message: res.data.message,
              });
              this.$emit("update");
            })
            .catch((err) => {
              this.$message({
                type: "error",
                message: err.response.data.message,
              });
            });
        } else if (this.Operation === "add") {
          // console.log(({ cnName, code, enName, id, remark, state } = this.form));
          AddUser({
            groupId,
            code,
            staffId,
            remark,
            state,
            userName,
            password,
            photo,
          })
            .then((res) => {
              // res.data.message
              this.$message({
                type: "success",
                message: res.data.message,
              });
              this.$emit("update");
            })
            .catch((err) => {
              this.$message({
                type: "error",
                message: err.response.data.message,
              });
            });
        }
      }
    },
    check(str) {
      if (!str) return false;
      if (!str.trim()) return false;
      return true;
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.el-switch__core {
  height: 28px;
  border-radius: 250px;
  .el-switch.is-checked &::after {
    left: 100%;
    margin-left: -27px;
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 1px;
    border-radius: 100%;
    transition: all 0.3s;
    width: 26px;
    height: 26px;
    background-color: #fff;
  }
}
.df {
  display: flex;
}
.df div {
  flex: 1;
}
.df .box {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.imgOption {
  width: 150px;
  height: 150px;
  position: relative;
  border: 1px solid #ccc;
  .headImg {
    min-width: 150px;
    min-height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
  }
  /deep/.avatar-uploader .el-upload {
    min-width: 100%;
    min-height: 150px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  // .avatar-uploader-icon {
  //   font-size: 28px;
  //   color: #8c939d;
  //   width: 78px;
  //   height: 78px;
  //   line-height: 78px;
  //   text-align: center;
  // }
  .avatar-uploader:hover {
    opacity: 1;
  }
  .avatar-uploader {
    position: absolute;
    z-index: 100000;
    opacity: 0;
    min-width: 100%;
    max-height: 180px;
  }
  .upimg {
    position: absolute;
    width: 100%;
    height: 20%;
    background: rgba(0, 0, 0, 0.3);
    font-size: 14px;
    line-height: 36px;
    bottom: 0;
    color: #f8f8f8;
  }
}
</style>