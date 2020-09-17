<template>
  <div>
    <el-table :data="PositionList.list" border style="width: 100%">
      <el-table-column prop="code" :label="$t('message.code')" width="180"></el-table-column>
      <el-table-column prop="cnName" :label="$t('message.cn_name')" width="180"></el-table-column>
      <el-table-column prop="enName" :label="$t('message.en_name')" width="180"></el-table-column>
      <el-table-column prop="stateName" :label="$t('message.state_name')" width="180"></el-table-column>
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

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="pSizes"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-size="pageSize"
    ></el-pagination>
    <PositionDislogForm
      Operation="edit"
      :title="$t('message.edit')"
      :dialogFormVisible="dialogFormVisible"
      :formData="formData"
      @dialogVisible="dialogVisible"
      @update="initList"
    />
  </div>
</template>

<script>
import PositionDislogForm from "../../components/PositionDislogForm";
import { GetPositions, removePositions } from "../../api/request";
import exportExecl from "../../tool/exportExecl";
export default {
  components: {
    PositionDislogForm,
  },
  props: {
    keyWord: String,
  },
  data() {
    return {
      PositionList: {},
      total: 0,
      pageSize: 5,
      pageIndex: 1,
      pSizes: [],
      dialogFormVisible: false,
      formData: {},
    };
  },
  created() {
    this.initList();
    // console.log(this);
    let arr = [];
    for (let i = 1; i <= 5; i++) {
      arr.push(i);
    }
    // console.log(arr);
    this.pSizes = arr;
  },
  computed: {
    pages() {
      const { pageSize, pageIndex, keyWord } = this;
      return { pageSize, pageIndex, keyWord };
    },
  },
  watch: {
    pages() {
      this.initList();
    },
    "$parent.num"() {
      this.initList();
    },
    "$parent.num1"() {
      this.download();
    },
  },
  methods: {
    deleteRow(id) {
      console.log(id);
      // removeDept(id);
      this.$confirm(this.$t("message.delete_warning"), "提示", {
        confirmButtonText: this.$t("message.ok"),
        cancelButtonText: this.$t("message.cancel"),
        type: "warning",
      })
        .then(() => {
          removePositions(id).then((res) => {
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
                message: "",
              });
            }
          });
        })
        .catch(() => {});
    },
    editRow(row) {
      // console.log(row);
      this.formData = row;
      this.dialogFormVisible = true;
      // console.log(this.dialogFormVisible)
    },
    dialogVisible(bl) {
      this.dialogFormVisible = bl;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageIndex = val > this.total ? 1 : this.pageIndex;
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
    },

    getPositionList(pageIndex, pageSize, keyWord) {
      // let data;
      let res = GetPositions({ pageIndex, pageSize, keyWord }).then((res) => {
        return res.data.data;
      });
      return res;
    },
    //初始化列表数据
    initList() {
      this.getPositionList(this.pageIndex, this.pageSize, this.keyWord).then(
        (data) => {
          // console.log(data);
          if (data) {
            this.PositionList = data;
            if (data.list.length === 0 && data.totalCount != 0)
              this.pageIndex -= 1;
            // console.log(this.PositionList);
            this.total = data.totalCount;
          }
        }
      );
    },
    download() {
      console.log(11);
      GetPositions({ isPage: true }).then((res) => {
        // console.log(res.data.data.list);
        exportExecl(res.data.data.list, "Position" + +new Date());
      });
    },
  },
};
</script>

<style>
</style>