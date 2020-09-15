<template>
  <div>
    <el-table :data="staffList" border style="width: 100%">
      <el-table-column prop="code" :label="$t('message.code')" width="120"></el-table-column>
      <el-table-column prop="cnName" :label="$t('message.cn_name')" width="120"></el-table-column>
      <el-table-column prop="enName" :label="$t('message.en_name')" width="120"></el-table-column>
      <el-table-column prop="sexName" :label="$t('message.sex_name')" width="100"></el-table-column>
      <el-table-column prop="idCard" :label="$t('message.idcard')" width="180"></el-table-column>
      <el-table-column prop="email" :label="$t('message.email')" width="180"></el-table-column>
      <el-table-column prop="stateName" :label="$t('message.state_name')" width="180"></el-table-column>
      <el-table-column prop="remark" :label="$t('message.remark')" width="180"></el-table-column>
      <el-table-column prop="entryAt" :label="$t('message.entry_at')" width="180"></el-table-column>
      <el-table-column prop="dept.name" :label="$t('message.dept_name')" width="180"></el-table-column>
      <el-table-column fixed="right" :label="$t('message.oper')" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="editRow(scope.row)"
            type="text"
            size="small"
          >{{$t('message.edit')}}</el-button>
          <el-button
            @click.native.prevent="deleteRow(scope.row.id)"
            type="text"
            size="small"
          >{{$t('message.delete')}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <StaffDislogForm
      @changeFormVisible="dialogFormVisible=false"
      :dialogFormVisible="dialogFormVisible"
      :formData="formData"
    />
  </div>
</template>

<script>
import { GetStaff } from "../../api/request";
import StaffDislogForm from "../../components/StaffDislogForm";
export default {
  components: {
    StaffDislogForm,
  },
  data() {
    return {
      staffList: [],
      pageIndex: 1,
      pageSize: 10,
      formData: {},
      dialogFormVisible: false,
    };
  },
  mounted() {
    this.initStaffList();
  },
  methods: {
    editRow(row) {
      this.dialogFormVisible = true;
      this.formData = row;
    },
    async initStaffList() {
      let { pageIndex, pageSize } = this;
      let res = await GetStaff({ pageIndex, pageSize });
      this.staffList = res.data.data.list;
    },
  },
};
</script>

<style>
</style>