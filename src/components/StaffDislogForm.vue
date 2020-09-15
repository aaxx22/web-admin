<template>
  <div>
    <el-dialog
      title="编辑"
      :visible.sync="dialogFormVisible"
      @close="$emit('changeFormVisible')"
      width="65%"
      top="2vh"
    >
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
        <el-form-item :label="$t('message.card_no')" :label-width="formLabelWidth">
          <el-input v-model="form.cardNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.idcard')" :label-width="formLabelWidth">
          <el-input v-model="form.idCard" auto-complete="off"></el-input>
        </el-form-item>
        <div class="df">
          <el-form-item :label="$t('message.dept_name')" :label-width="formLabelWidth">
            <el-select @change="handleDeptChange" v-model="deptVal" placeholder="请选择">
              <el-option
                v-for="item in deptList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('message.position_name')" :label-width="formLabelWidth">
            <el-select @change="handlePositionChange" v-model="positionVal" placeholder="请选择">
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
          <el-form-item :label="$t('message.entry_at')" :label-width="formLabelWidth">
            <el-date-picker v-model="form.entryAt" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('message.birthday')" :label-width="formLabelWidth">
            <el-date-picker
              @change="handleBirthday"
              v-model="form.birthday"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div class="df">
          <el-form-item :label="$t('message.age')" :label-width="formLabelWidth">
            <el-input v-model="form.age" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('message.sex_name')" :label-width="formLabelWidth">
            <el-radio v-model="form.sex" :label="true">男</el-radio>
            <el-radio v-model="form.sex" :label="false">女</el-radio>
          </el-form-item>
        </div>
        <div class="df">
          <el-form-item :label="$t('message.phone')" :label-width="formLabelWidth">
            <el-input v-model="form.phone" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('message.state_name')" :label-width="formLabelWidth">
            <!-- <el-input v-model="form.stateName" auto-complete="off"></el-input> -->
            <el-select @change="handleStaffChange" v-model="staffVal" placeholder="请选择">
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
        <el-button @click="handleClick(false)">取 消</el-button>
        <el-button type="primary" @click="handleClick(true)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { combosGet } from "../api/request";
export default {
  props: {
    formData: {
      type: Object,
    },
    dialogFormVisible: {
      type: Boolean,
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
    };
  },
  computed: {
    deptName() {
      return this.form.dept ? this.form.dept.name : "";
    },
  },
  watch: {
    formData() {
      this.form = JSON.parse(JSON.stringify(this.formData));
      this.deptVal = this.form.dept ? this.form.dept.name : "";
      this.staffVal = this.form.stateName;
      this.positionVal = this.form.positionVal ? this.form.positionVal.name : "";
      console.log(this.form);
    },
    dialogFormVisible() {
      if (!this.dialogFormVisible) {
        this.form = JSON.parse(JSON.stringify(this.formData));
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
    // console.log(staffStateList);
  },
  methods: {
    handleClick(bl) {
      this.$emit("changeFormVisible");
    },
    handleBirthday(e) {
      console.log(+e);
    },
    handleDeptChange(e) {
      console.log(e);
    },
    handlePositionChange(e) {
      console.log(e);
    },
    handleStaffChange(e) {
      console.log(e);
    },
  },
};
</script>

<style lang="less" scoped>
.df {
  display: flex;
  div {
    flex: 1;
  }
  .el-date-editor.el-input {
    width: 100%;
  }
  .el-select {
    width: 100%;
  }
}
</style>