<template>
  <div>
    <el-dialog title="提示" :visible.sync="dialogBl" width="700px" @close="$emit('close')">
      <el-form :model="form">
        <el-form-item :label="$t('message.code')" :label-width="formLabelWidth">
          <el-input v-model="form.code" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.cn_name')" :label-width="formLabelWidth">
          <el-input v-model="form.cnName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.en_name')" :label-width="formLabelWidth">
          <el-input v-model="form.enName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.enter_type')" :label-width="formLabelWidth">
          <el-radio
            v-model="form.enterType"
            :label="+item.id"
            v-for="item in enterTypes"
            :key="item.id"
          >{{ item.name }}</el-radio>
        </el-form-item>
        <el-form-item :label="$t('message.enter_limit')" :label-width="formLabelWidth">
          <!-- 录入数据 -->
          <div v-if="form.enterType==3">
            <el-radio
              v-model="enterLimit"
              :label="+item.id"
              v-for="(item,index) in enterLimits"
              :key="index"
            >{{ item.name }}</el-radio>
          </div>
          <!-- 二选一 -->
          <div v-if="form.enterType==1">
            <el-radio
              v-model="Types2To1"
              :label="item.name"
              v-for="(item) in Types2To1s"
              :key="item.name"
            >{{ item.name }}</el-radio>
          </div>
          <!-- 多选一 -->
          <div class="options" v-if="form.enterType==2">
            <el-row>
              <el-col :span="18">
                <el-input v-model="option.cnName" :placeholder="$t('message.p_input_opt_name')"></el-input>
              </el-col>
              <el-col :span="6">
                <el-button type="primary" @click="handleAddOption">添加</el-button>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="6" v-for="(item, index) in form.options" :key="index">
                <el-tag
                  :closable="true"
                  @close="handleClose(item.id)"
                >{{item.name?item.name:item.cnName}}</el-tag>
              </el-col>
            </el-row>
          </div>
        </el-form-item>
        <el-form-item :label="$t('message.state_name')" :label-width="formLabelWidth">
          <el-switch v-model="form.state" :width="60"></el-switch>
        </el-form-item>
        <el-form-item :label="$t('message.def_val')" :label-width="formLabelWidth">
          <el-input v-model="form.defVal"></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.remark')" :label-width="formLabelWidth">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('close')">取 消</el-button>

        <el-button type="primary" @click="handleConfirm">確 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { combosGet, EditPatro, AddPatro } from "../api/request";
export default {
  props: {
    dialogVisible: Boolean,
    formData: { type: Object, default: {} },
    Operation: String,
  },
  data() {
    return {
      form: {},
      formLabelWidth: "120px",
      activeName: "",
      enterTypes: [],
      enterLimits: [],
      Types2To1s: [],
      enterLimit: 0,
      Types2To1: "",
      option: {},
      optionOrderid: 0,
    };
  },
  computed: {
    dialogBl: {
      get() {
        return this.dialogVisible;
      },
      set(bl) {
        return bl;
      },
    },
  },
  watch: {
    formData() {
      this.form = JSON.parse(JSON.stringify(this.formData));
    },
    dialogVisible() {
      if (this.dialogVisible) {
        this.getForm();
        this.form = JSON.parse(JSON.stringify(this.formData));
        this.enterLimit = this.form.enterLimit ? this.form.enterLimit : 0;
        if (this.formData.enterType != 2) {
          if (this.formData.enterType == 1) {
            let arr = [];
            this.formData.options.forEach((item) => {
              arr.push(item.name);
            });
            this.Types2To1 = arr.join("/");
            console.log(this.form);
          }
          this.form.options && (this.form.options.length = 0);
        }
      } else {
        this.enterTypes = [];
        this.enterLimits = [];
        this.Types2To1s = [];
        this.enterLimit = 0;
        this.Types2To1 = "";
        this.option = {};
        this.optionOrderid = 0;
      }
    },
  },
  methods: {
    handleAddOption() {
      if (!this.option.cnName) {
        this.$message.error("選項名稱不能為空");
        return;
      }
      this.option.enName = this.option.cnName;
      this.option.orderId = this.optionOrderid++;
      this.form.options.push(this.option);
      this.option = {};
    },
    handleConfirm() {
      if (this.form.enterType != 3) {
        this.form.enterLimitId = -1;
        this.form.enterTypeId = this.form.enterType;
        if (this.form.enterType == 1) {
          this.Types2To1s.forEach((item) => {
            if (this.Types2To1 == item.name) {
              let arr1 = [];
              let arr = item.name.split("/");
              arr.forEach((item1, index1) => {
                let obj = {};
                obj.cnName = item1;
                obj.enName = item1;
                obj.orderId = index1;
                arr1.push(obj);
              });
              this.form.options = arr1;
            }
          });
        } else if (this.form.enterType == 2) {
          console.log("多选一");
        }
      } else {
        this.form.enterLimitId = this.enterLimit;
        this.form.enterLimitName = "";
        this.form.enterTypeId = 3;
        this.enterLimits.forEach((item) => {
          if (item.id == this.enterLimit) {
            let obj = {};
            obj.cnName = item.name;
            obj.enName = item.name;
            obj.orderId = 0;
            this.form.options[0] = obj;
          }
        });
        // console.log(this.enterLimit);
      }

      console.log(this.form);
      if (this.Operation == "edit") {
        EditPatro(this.form)
          .then((res) => {
            this.$message({
              type: "success",
              message: res.data.message,
            });
            this.$emit("close");
            this.$emit("update");
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (this.Operation == "add") {
        AddPatro(this.form)
          .then((res) => {
            this.$message({
              type: "success",
              message: res.data.message,
            });
            this.$emit("close");
            this.$emit("update");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    getForm() {
      combosGet("enterTypes").then((res) => {
        this.enterTypes = res.data.data;
      });
      combosGet("enterLimits").then((res) => {
        this.enterLimits = res.data.data;
      });
      combosGet("2To1Types").then((res) => {
        console.log(res.data);
        this.Types2To1s = res.data.data;
      });
    },
    handleClose(val) {
      console.log(val);
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