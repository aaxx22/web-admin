<template>
  <div>
    <el-table :data="holidayData.list" border style="width: 100%">
      <el-table-column prop="code" :label="$t('message.code')" width="180"></el-table-column>
      <el-table-column prop="cnName" :label="$t('message.cn_name')" width="180"></el-table-column>
      <el-table-column prop="enName" :label="$t('message.en_name')" width="180"></el-table-column>
      <el-table-column prop="at" :label="$t('message.date')" width="180"></el-table-column>
      <el-table-column prop="flagName" :label="$t('message.holiday_flag')" width="180"></el-table-column>
      <el-table-column prop="stateName" :label="$t('message.state_name')" width="180"></el-table-column>
      <el-table-column prop="remark" :label="$t('message.remark')"></el-table-column>
      <el-table-column fixed="right" :label="$t('message.oper')" width="150">
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
    <holidayDataDislog
      Operation="edit"
      :title="$t('message.edit')"
      :dialogFormVisible="dialogFormVisible"
      :formData="formData"
      @dialogVisible="dialogFormVisible=false"
      @update="initList"
    />
  </div>
</template>

<script>
import { GetHolidays } from "../../api/request";
import holidayDataDislog from "../../components/holidayDataDislog";
export default {
  components: {
    holidayDataDislog,
  },
  data() {
    return {
      holidayData: {},
      formData: {},
      dialogFormVisible: false,
    };
  },
  created() {
    this.initList();
  },
  methods: {
    editRow(val) {
      this.formData = val;
      this.dialogFormVisible = true;
    },
    initList() {
      GetHolidays({ pageSize: 5, pageIndex: 1 })
        .then((res) => {
          this.holidayData = res.data.data;
          console.log(res.data.data);
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: err.response ? err.response.data.message : err,
          });
        });
    },
  },
};
</script>

<style>
</style>