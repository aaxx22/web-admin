<template>
  <div class="PositionTool" ref="PositionTool" v-resize="handleResize" :class="{isdf:!is500}">
    <div class="left">
      <el-button
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="handleAdd"
      >{{$t('message.add')}}</el-button>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-download"
        @click="download('export')"
      >{{$t('message.export')}}</el-button>
      <el-button type="primary" size="small" icon="el-icon-printer" @click="download('print')">打印</el-button>
      <StaffDislogForm
        Operation="add"
        :title="$t('message.add')"
        :dialogFormbl="dialogFormVisible"
        @changeFormVisible="dialogFormVisible=false"
        :formData="{state:true}"
        @update="$emit('parentupdata')"
      />
    </div>
    <div class="form">
      <el-select v-model="form.deptId" :placeholder="$t('message.p_sel_dept_name')" size="small">
        <el-option v-for="item in deptList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-select
        v-model="form.positionId"
        :placeholder="$t('message.p_sel_position_name')"
        size="small"
      >
        <el-option v-for="item in positionList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-input size="small" v-model="form.keyWord" :placeholder="$t('message.p_input_key_word')"></el-input>
      <el-button
        size="small"
        type="primary"
        icon="el-icon-search"
        @click="search"
      >{{$t('message.search')}}</el-button>
    </div>
  </div>
</template>

<script>
import StaffDislogForm from "../../components/StaffDislogForm";
import { GetStaff, combosGet } from "../../api/request";
import exportExecl from "../../tool/exportExecl";
export default {
  components: {
    StaffDislogForm,
  },
  data() {
    return {
      dialogFormVisible: false,
      is500: true,
      deptList: [],
      positionList: [],
      form: {
        deptId: "",
        positionId: "",
        keyWord: "",
      },
    };
  },
  created() {
    combosGet("depts").then((res) => {
      this.deptList = [...res.data.data];
      this.deptList.unshift({ id: "", name: this.$t("message.all") });
    });

    combosGet("positions").then((res) => {
      this.positionList = [...res.data.data];
      this.positionList.unshift({ id: "", name: this.$t("message.all") });
    });
  },
  methods: {
    search() {
      this.$store.commit("searchStaff", this.form);
    },
    handleAdd() {
      this.dialogFormVisible = true;
    },
    handleResize() {
      this.is500 = document.querySelector(".el-main").clientWidth > 500;
    },
    download(type) {
      GetStaff({ isPage: true }).then((res) => {
        exportExecl(res.data.data.list, "Staff" + +new Date(),type,"員工信息報表");
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>