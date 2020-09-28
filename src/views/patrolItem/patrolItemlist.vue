<template>
  <div>
    <div class="tableAndPagination">
      <el-table :data="patorList" border style="width: 100%" :stripe="true">
        <el-table-column prop="code" :label="$t('message.code')" width="180"></el-table-column>
        <el-table-column prop="cnName" :label="$t('message.cn_name')" width="180"></el-table-column>
        <el-table-column prop="enName" :label="$t('message.en_name')" width="180"></el-table-column>
        <el-table-column prop="enterTypeName" :label="$t('message.enter_type')" width="180"></el-table-column>
        <el-table-column prop="enterLimitName" :label="$t('message.enter_limit')" width="180"></el-table-column>
        <el-table-column prop="stateName" :label="$t('message.state_name')" width="180"></el-table-column>
        <el-table-column prop="remark" :label="$t('message.remark')"></el-table-column>
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
        :current-page="1"
        :page-sizes="pSizes"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :page-size="pageSize"
      ></el-pagination>
    </div>

    <PatorDislog
      :formData="formData"
      @close="dialogVisible = false"
      :dialogVisible="dialogVisible"
      @update="initList"
      Operation="edit"
    />
  </div>
</template>

<script>
import { GetPatroList, DelPatro } from "../../api/request";
import PatorDislog from "../../components/PatorDislog";
export default {
  props: { keyWord: { type: String, default: "" } },
  components: {
    PatorDislog,
  },
  data() {
    return {
      patorList: [],
      dialogVisible: false,
      formData: {},
      total: 0,
      pageSize: 10,
      pageIndex: 1,
      pSizes: [],
    };
  },
  created() {
    this.initList();
    // console.log(this);
    let arr = [];
    for (let i = 1; i <= 5; i++) {
      arr.push(this.pageSize * i);
    }
    // console.log(arr);
    this.pSizes = arr;
  },
  computed: {
    update() {
      let { pageIndex, pageSize, keyWord } = this;
      return { pageIndex, pageSize, keyWord };
    },
  },
  watch: {
    update() {
      this.initList();
    },
  },
  methods: {
    initList() {
      let { pageSize, pageIndex, keyWord } = this;
      GetPatroList({ pageIndex, pageSize, keyWord }).then((res) => {
        console.log(res.data);
        this.patorList = res.data.data.list;
        this.total = res.data.data.totalCount;
      });
    },
    deleteRow(id) {
      console.log(id);
      this.$confirm(this.$t("message.delete_warning"), "提示", {
        confirmButtonText: this.$t("message.ok"),
        cancelButtonText: this.$t("message.cancel"),
        type: "warning",
      })
        .then(() => {
          DelPatro(id).then((res) => {
            this.$message({
              type: "success",
              message: res.data.message,
            });
            this.initList()
          });
        })
        .catch(() => {});
    },
    editRow(val) {
      this.dialogVisible = true;
      this.formData = val;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageIndex = val > this.total ? 1 : this.pageIndex;
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
    },
  },
};
</script>

<style>
</style>