<template>
  <div>
    <div class="tableAndPagination">
      <el-table :data="staffList" border style="width: 100%" :stripe="true">
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
            >{{ $t("message.edit") }}</el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.row.id)"
              type="text"
              size="small"
            >{{ $t("message.delete") }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <StaffDislogForm
      @changeFormVisible="dialogFormVisible = false"
      :dialogFormbl="dialogFormVisible"
      :formData="formData"
      :title="$t('message.edit')"
      @update="handleDisalogUpdate"
    />
  </div>
</template>

<script>
import { GetStaff, removeStaff } from "../../api/request";
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
      total: 0,
      searchForm: {},
      pageSizes: [],
    };
  },
  mounted() {
    let arr = [];
    for (let i = 1; i <= 5; i++) {
      arr.push(this.pageSize * i);
    }
    this.pageSizes = arr;
    this.initStaffList();
  },
  computed: {
    pages() {
      const { pageIndex, pageSize, searchForm } = this;
      return { pageIndex, pageSize, searchForm };
    },
  },
  watch: {
    pages() {
      this.initStaffList(this.searchForm);
    },
    "$store.state.staffSearchForm"() {
      this.searchForm = this.$store.state.staffSearchForm;
    },
  },
  methods: {
    editRow(row) {
      // console.log(this.searchForm);
      this.dialogFormVisible = true;
      this.formData = row;
    },
    handleDisalogUpdate() {
      this.initStaffList();
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageIndex = val;
    },
    initStaffList(form) {
      let { pageIndex, pageSize } = this;

      GetStaff({ pageIndex, pageSize, ...form })
        .then((res) => {
          let arr = res.data.data.list;
          let newArr = [];
          try {
            arr.forEach((item) => {
              Object.keys(item).forEach((key) => {
                // console.log(key);
                if (key.indexOf("At") !== -1) {
                  // console.log(item);
                  if (item[key])
                    item[key] = item[key].substring(0, item[key].indexOf(" "));
                }
              });

              newArr.push(item);
            });
          } catch (error) {
            console.log(error);
          }
          console.log(newArr);
          this.staffList = newArr;

          this.total = res.data.data.totalCount;
        })
        .catch((err) => err);
    },
    deleteRow(id) {
      removeStaff(id);
      this.$confirm(this.$t("message.delete_warning"), "提示", {
        confirmButtonText: this.$t("message.ok"),
        cancelButtonText: this.$t("message.cancel"),
        type: "warning",
      })
        .then(async () => {
          let res = await removeStaff(id);
          console.log(res);
          if (res.data.status === 2000) {
            this.$message({
              type: "success",
              message: res.data.message,
            });
            this.initList();
          } else {
            this.$message({
              type: "error",
              message: res.data.message,
            });
          }
        })
        .catch(() => {});
    },
  },
};
</script>

<style>
</style>