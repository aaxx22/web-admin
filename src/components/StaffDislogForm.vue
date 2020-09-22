<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dislogShow"
      @close="$emit('changeFormVisible',false)"
      width="65%"
      top="2vh"
      :fullscreen="fullscreen"
    >
      <el-form :model="form" :rules="rules">
        <div class="df head">
          <el-form-item :label="$t('message.person_photo')" :label-width="formLabelWidth">
            <div class="imgOption">
              <img :src="$baseUrl+form.photo" v-if="form.photo" alt class="headImg" />
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
              <el-input v-model="form.code" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item
              prop="cnName"
              :label="$t('message.cn_name')"
              :label-width="formLabelWidth"
            >
              <el-input v-model="form.cnName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item
              prop="enName"
              :label="$t('message.en_name')"
              :label-width="formLabelWidth"
            >
              <el-input v-model="form.enName" auto-complete="off"></el-input>
            </el-form-item>
          </div>
        </div>

        <el-form-item prop="cardNo" :label="$t('message.card_no')" :label-width="formLabelWidth">
          <el-input v-model="form.cardNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="cardNo" :label="$t('message.idcard')" :label-width="formLabelWidth">
          <el-input v-model="form.cardNo" auto-complete="off"></el-input>
        </el-form-item>
        <div class="df">
          <el-form-item
            prop="deptId"
            :label="$t('message.dept_name')"
            :label-width="formLabelWidth"
          >
            <el-select
              @change="handleDeptChange"
              :value-key="form.dept?form.dept.id:''"
              v-model="deptVal"
              :placeholder="$t('message.p_sel_dept_name')"
            >
              <el-option
                v-for="item in deptList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            prop="positionId"
            :label="$t('message.position_name')"
            :label-width="formLabelWidth"
          >
            <el-select
              @change="handlePositionChange"
              :value-key="form.position?form.position.id:''"
              v-model="positionVal"
              :placeholder="$t('message.p_sel_position_name')"
            >
              <el-option
                v-for="item in positionList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="df">
          <el-form-item
            prop="entryAt"
            :label="$t('message.entry_at')"
            :label-width="formLabelWidth"
          >
            <el-date-picker
              @change="handleEntryAt"
              value-format="yyyy-MM-dd"
              v-model="form.entryAt"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('message.birthday')" :label-width="formLabelWidth">
            <el-date-picker
              @change="handleBirthday"
              v-model="form.birthday"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div class="df">
          <el-form-item :label="$t('message.email')" :label-width="formLabelWidth">
            <el-input v-model="form.email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item prop="sex" :label="$t('message.sex_name')" :label-width="formLabelWidth">
            <el-radio v-model="form.sex" :label="true">男</el-radio>
            <el-radio v-model="form.sex" :label="false">女</el-radio>
          </el-form-item>
        </div>
        <div class="df">
          <el-form-item :label="$t('message.phone')" :label-width="formLabelWidth">
            <el-input v-model="form.phone" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item
            prop="state"
            :label="$t('message.state_name')"
            :label-width="formLabelWidth"
          >
            <!-- <el-input v-model="form.stateName" auto-complete="off"></el-input> -->
            <el-select
              @change="handleStaffChange"
              v-model="staffVal"
              :placeholder="$t('message.p_sel_staff_name')"
            >
              <el-option
                v-for="item in staffStateList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>

        <el-form-item :label="$t('message.address')" :label-width="formLabelWidth">
          <el-input v-model="form.address" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item :label="$t('message.remark')" :label-width="formLabelWidth">
          <el-input v-model="form.remark" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$emit('changeFormVisible')">{{$t('message.cancel')}}</el-button>
        <el-button type="primary" @click="handleClick(true)">{{$t('message.ok')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { combosGet, AddStaff, EditStaff } from "../api/request";
export default {
  props: {
    formData: {
      type: Object,
    },
    dialogFormbl: {
      type: Boolean,
    },
    title: {
      type: String,
    },
  },
  data() {
    return {
      form: {},
      formLabelWidth: "100px",
      deptList: [],
      positionList: [],
      staffStateList: [],
      deptVal: "",
      positionVal: "",
      staffVal: "",
      imageUrl: "",
      rules: {
        code: [{ required: true, message: "編號不能為空", trigger: "blur" }],
        cnName: [
          { required: true, message: "中文名稱不能為空", trigger: "blur" },
        ],
        enName: [
          { required: true, message: "英文名稱不能為空", trigger: "blur" },
        ],
        cardNo: [{ required: true, message: "卡號不能為空", trigger: "blur" }],
        idCard: [
          { required: true, message: "身份證號碼不能為空", trigger: "blur" },
        ],
        deptId: [
          { required: true, message: "部門名稱不能為空", trigger: "blur" },
        ],
        positionId: [
          { required: true, message: "職位名稱不能為空", trigger: "blur" },
        ],
        entryAt: [
          { required: true, message: "入職日期不能為空", trigger: "blur" },
        ],
        state: [{ required: true, message: "狀態不能為空", trigger: "blur" }],
        sex: [{ required: true, message: "性別不能為空", trigger: "blur" }],
      },
      fullscreen: false,
    };
  },
  computed: {
    deptName() {
      return this.form.dept ? this.form.dept.name : "";
    },
    // dislogShow() {
    //   let { dialogFormbl } = this;
    //   return dialogFormbl;
    // },
    dislogShow: {
      get() {
        let { dialogFormbl } = this;
        return dialogFormbl;
      },
      set() {},
    },
  },
  watch: {
    formData() {
      this.initForm();
    },
    dislogShow() {
      if (!this.dislogShow) {
        this.initForm();
      }
    },
  },
  async created() {
    let dept = await combosGet("depts");
    this.deptList = dept.data.data;
    let position = await combosGet("positions");
    this.positionList = position.data.data;
    let staffStateList = await combosGet("staffJobStates");
    this.staffStateList = staffStateList.data.data;
    // alert(document.body.clientWidth);
    this.fullscreen = document.body.clientWidth < 500 ? true : false;

    // console.log(staffStateList);
  },
  methods: {
    handleClick(bl) {
      console.log(this.form);
      if (!this.checkData(this.form)) {
        return;
      }

      if (bl) {
        if (this.title === this.$t("message.add")) {
          AddStaff(this.form)
            .then((res) => {
              this.$message({
                type: "success",
                message: res.data.message,
              });
              this.$emit("update");
            })
            .catch((err) => {
              this.$message.error(err.response.message);
            });
        } else if (this.title === this.$t("message.edit")) {
          EditStaff(this.form)
            .then((res) => {
              this.$message({
                type: "success",
                message: res.data.message,
              });
              this.$emit("update");
            })
            .catch((err) => {
              this.$message.error(err.response.message);
            });
        }
      }
      this.$emit("changeFormVisible", false);
      // console.log("更新", +new Date());
      // this.$emit("update");
    },
    handleBirthday(e) {
      console.log(e);
      this.form.birthday = e;
    },
    handleEntryAt(e) {
      console.log(e);
      this.form.entryAt = e;
    },
    handleDeptChange(dept) {
      this.form.deptId = dept;
    },
    handlePositionChange(position) {
      this.form.positionId = position;
    },
    handleStaffChange(e) {
      this.form.state = +e;
    },
    handleAvatarSuccess(res, file) {
      // console.log("res", res);
      // console.log("file", file);
      if (res.status === 2000) {
        this.$message({
          type: "success",
          message: "頭像上傳成功",
        });
        this.form.photo = res.data;
        console.log(this.form);
      } else {
        this.$message({
          type: "error",
          message: "頭像上傳失敗",
        });
      }
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      console.log(file);
      return isJPG && isLt2M;
    },

    //当上传图片后，调用onchange方法，获取图片本地路径
    onchange(file, fileList) {
      var _this = this;
      var event = event || window.event;
      var file = event.target.files[0];
      var reader = new FileReader();
      //转base64
      reader.onload = function (e) {
        _this.imageUrl = e.target.result; //将图片路径赋值给src
      };
      reader.readAsDataURL(file);
    },
    check(str) {
      if (!str) return false;
      if (!str.trim()) return false;
      return true;
    },
    checkData(form) {
      if (!this.check(form.code)) {
        this.$message({
          type: "error",
          message: "編號不能為空!",
        });
        return false;
      } else if (!this.check(form.cnName)) {
        this.$message({
          type: "error",
          message: "中文名稱不能為空!",
        });
        return false;
      } else if (!this.check(form.enName)) {
        this.$message({
          type: "error",
          message: "英文名稱不能為空!",
        });
        return false;
      } else if (!this.check(form.cardNo)) {
        this.$message({
          type: "error",
          message: "卡號不能為空!",
        });
        return false;
      } else if (!this.check(form.idCard)) {
        this.$message({
          type: "error",
          message: "身份證號碼不能為空!",
        });
        return false;
      } else if (!this.check(form.deptId)) {
        this.$message({
          type: "error",
          message: "部門名稱不能為空!",
        });
        return false;
      } else if (!this.check(form.positionId)) {
        this.$message({
          type: "error",
          message: "職位名稱不能為空!",
        });
        return false;
      } else if (!this.check(form.entryAt)) {
        this.$message({
          type: "error",
          message: "入職日期不能為空!",
        });
        return false;
      } else if (!form.state) {
        this.$message({
          type: "error",
          message: "狀態不能為空!",
        });
        return false;
      }
      return true;
    },
    initForm() {
      this.form = JSON.parse(JSON.stringify(this.formData));
      this.form.deptId = this.form.dept ? this.form.dept.id : "";
      this.form.positionId = this.form.position ? this.form.position.id : "";
      this.deptVal = this.form.dept ? this.form.dept.name : "";
      this.staffVal = this.form.stateName;
      this.positionVal = this.form.position ? this.form.position.name : "";
    },
  },
};
</script>

<style lang="less" scoped>
.df {
  display: flex;
  align-items: center;
  > div {
    flex: 1;
  }
  .el-date-editor.el-input {
    width: 100%;
  }
  .el-select {
    width: 100%;
  }
}
.df.head {
  display: flex;
  > .el-form-item {
    flex: 1;
    min-width: 300px;
  }
  > .box {
    flex: 3;
  }
}
.imgOption {
  max-width: 150px;
  height: 180px;
  border: 1px solid #ccc;
  position: relative;
  .headImg {
    min-width: 100%;
    min-height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
  }
  /deep/.avatar-uploader .el-upload {
    min-width: 100%;
    min-height: 180px;
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