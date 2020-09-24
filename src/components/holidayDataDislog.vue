<template>
  <div>
    <el-dialog
      width="650px"
      :title="title"
      :visible.sync="dialogFormbl"
      @close="$emit('dialogVisible')"
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
        <el-form-item prop="at" :label="$t('message.date')" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.at"
            type="date"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item :label="$t('message.holiday_flag')" :label-width="formLabelWidth">
          <el-radio v-model="form.flag" :label="true">公假</el-radio>
          <el-radio v-model="form.flag" :label="false">勞假</el-radio>
        </el-form-item>
        <el-form-item :label="$t('message.state_name')" :label-width="formLabelWidth">
          <el-switch v-model="form.state" :width="60"></el-switch>
        </el-form-item>
        <el-form-item :label="$t('message.remark')" :label-width="formLabelWidth">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$emit('dialogVisible')">取 消</el-button>
        <el-button type="primary" @click="dialogVisible(true)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { EditHolidays, AddHolidays } from "../api/request";
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
      value1: "",
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
      //   this.$emit("dialogVisible");
      console.log(this.form);
      if (bl) {
        let { cnName, code, enName, id, remark, state, flag, at } = this.form;
        let data = { cnName, code, enName, remark, state, flag, at };
        if (this.Operation == "edit") {
          data.id = id;
          EditHolidays(data)
            .then((result) => {
              this.$message({
                type: "success",
                message: result.data.message,
              });
              this.$emit("update");
              this.$emit("dialogVisible");
            })
            .catch((err) => {
              console.log(err);
            });
        } else if (this.Operation == "add") {
          AddHolidays(data)
            .then((result) => {
              this.$message({
                type: "success",
                message: result.data.message,
              });
              this.$emit("update");
              this.$emit("dialogVisible");
            })
            .catch((err) => {
              console.log(err);
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