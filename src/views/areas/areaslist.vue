<template>
  <div>
    <div class="tableAndPagination">
      <el-table :data="holidayData.list" border style="width: 100%" :stripe="true">
        <el-table-column prop="code" :label="$t('message.code')" width="150"></el-table-column>
        <el-table-column prop="cnName" :label="$t('message.cn_name')" width="220"></el-table-column>
        <el-table-column prop="enName" :label="$t('message.en_name')" width="220"></el-table-column>
        <el-table-column prop="address" :label="$t('message.address')" width="260"></el-table-column>
        <el-table-column prop="stateName" :label="$t('message.state_name')" width="220"></el-table-column>
        <el-table-column prop="remark" :label="$t('message.remark')"></el-table-column>
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
    </div>
    <AreasDislog
      Operation="edit"
      :dialogFormVisible="dialogFormVisible"
      :formData="formData"
      @close="dialogFormVisible=false"
      @update="initList"
    />
  </div>
</template>

<script>
import { GetAreas, DelAreas } from "../../api/request";
import AreasDislog from "../../components/AreasDislog";
export default {
  props: {
    num: Number,
    keyWord: String,
  },
  components: {
    AreasDislog,
  },
  data() {
    return {
      holidayData: {},
      formData: {},
      dialogFormVisible: false,
      pageSize: 5,
      pageIndex: 1,
    };
  },
  created() {
    this.initList();
  },
  watch: {
    num() {
      if (this.num > 0) {
        this.initList();
      }
    },
    keyWord() {
      this.initList();
    },
  },
  methods: {
    editRow(val) {
      this.formData = val;
      this.dialogFormVisible = true;
    },
    deleteRow(id) {
      this.$confirm(this.$t("message.delete_warning"), "提示", {
        confirmButtonText: this.$t("message.ok"),
        cancelButtonText: this.$t("message.cancel"),
        type: "warning",
      })
        .then(() => {
          DelAreas(id)
            .then((res) => {
              this.$message({
                type: "info",
                message: res.data.message,
              });
              this.initList();
            })
            .catch((err) => {
              this.$message({
                type: "error",
                message: err.response ? err.response.data.message : err,
              });
            });
        })
        .catch((err) => {});
    },
    GetHolidaysList(obj) {
      GetAreas(obj)
        .then((res) => {
          this.holidayData = res.data.data;
          // console.log(res.data.data);
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: err.response ? err.response.data.message : err,
          });
        });
    },
    initList() {
      let { pageSize, pageIndex, keyWord } = this;
      this.GetHolidaysList({ pageSize, pageIndex, keyWord });
    },
  },
};
</script>

<style>
</style>