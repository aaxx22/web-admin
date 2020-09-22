<template>
  <div>
    <el-dialog
      width="650px"
      :title="title"
      :visible.sync="dialogFormbl"
      @close="$emit('dialogVisible', false)"
    >
      <el-form :model="form" :rules="rules">
        <el-form-item prop="code" :label="$t('message.code')" :label-width="formLabelWidth">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item prop="cnName" :label="$t('message.cn_name')" :label-width="formLabelWidth">
          <el-input v-model="form.cnName"></el-input>
        </el-form-item>
        <el-form-item prop="enName" :label="$t('message.en_name')" :label-width="formLabelWidth">
          <el-input v-model="form.enName"></el-input>
        </el-form-item>

        <el-form-item :label="$t('message.state_name')" :label-width="formLabelWidth">
          <el-switch v-model="form.state" :width="60"></el-switch>
        </el-form-item>
        <el-form-item :label="$t('message.remark')" :label-width="formLabelWidth">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$emit('dialogVisible', false)">取 消</el-button>
        <el-button type="primary" @click="dialogVisible(true)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { EditUserGps, AddUserGp } from "../api/request";
export default {
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
        cnName: [
          { required: true, message: "中文名稱不能為空", trigger: "blur" },
        ],
        enName: [
          { required: true, message: "英文名稱不能為空", trigger: "blur" },
        ],
      },
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
    },
    dialogFormVisible() {
      if (!this.dialogFormVisible) {
        this.form = JSON.parse(JSON.stringify(this.formData));
      }
    },
  },
  methods: {
    dialogVisible(bl) {
      if (!this.check(this.form.code)) {
        this.$message({
          type: "error",
          message: "編號不能為空",
        });
        return;
      }
      if (!this.check(this.form.cnName)) {
        this.$message({
          type: "error",
          message: "中文名稱不能為空",
        });
        return;
      }
      if (!this.check(this.form.enName)) {
        this.$message({
          type: "error",
          message: "英文名稱不能為空",
        });
        return;
      }
      this.$emit("dialogVisible", false);
      if (bl) {
        let { cnName, code, enName, id, remark, state } = this.form;
        if (this.Operation == "edit") {
          EditUserGps({ cnName, code, enName, id, remark, state })
            .then((result) => {
              this.$message({
                type: "success",
                message: result.data.message,
              });
              this.$emit("update");
            })
            .catch((err) => {
              this.$message({
                type: "error",
                message: err.response?err.response.data.message:err,
              });
            });
        } else if (this.Operation == "add") {
          AddUserGp({ cnName, code, enName, remark, state })
            .then((result) => {
              this.$message({
                type: "success",
                message: result.data.message,
              });
              this.$emit("update");
            })
            .catch((err) => {
              this.$message({
                type: "error",
                message: err.response?err.response.data.message:err,
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
</style>