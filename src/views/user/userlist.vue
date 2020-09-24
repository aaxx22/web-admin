<template>
  <div>
    <div class="tableAndPagination">
      <el-table :data="DeptList.list" border style="width: 100%" :stripe="true">
        <el-table-column prop="code" :label="$t('message.code')" width="180"></el-table-column>
        <el-table-column prop="userName" :label="$t('message.user_name')" width="180"></el-table-column>
        <el-table-column prop="group.name" :label="$t('message.group_name')" width="180"></el-table-column>
        <el-table-column prop="staff.name" :label="$t('message.staff_name')" width="180"></el-table-column>
        <el-table-column prop="stateName" :label="$t('message.state_name')" width="180"></el-table-column>
        <el-table-column prop="photo" :label="$t('message.photo')">
          <template slot-scope="scope">
            <img
              :src="$baseUrl+scope.row.photo"
              alt="加載失敗"
              style="width:50px;height:50px;border-radius:50px;"
            />
          </template>
        </el-table-column>
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
    </div>
    <UserDislogForm
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
import UserDislogForm from "../../components/UserDislogForm";
import { GetUsers, removeUser } from "../../api/request";

export default {
  components: {
    UserDislogForm,
  },
  props: {
    keyWord: {
      type: String,
    },
  },
  data() {
    return {
      DeptList: {},
      total: 0,
      pageSize: 10,
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
      arr.push(this.pageSize * i);
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
        .then(async () => {
          let res = await removeUser(id);
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

    getUserList(pageIndex, pageSize, keyWord) {
      let data;
      let res = GetUsers({ pageIndex, pageSize, keyWord })
        .then((res) => {
          return res.data.data;
        })
        .catch((err) => {
          return err;
        });

      // console.log(res);
      return res;
    },
    //初始化列表数据
    initList() {
      this.getUserList(this.pageIndex, this.pageSize, this.keyWord)
        .then((data) => {
          console.log(data);
          if (data) {
            this.DeptList = data;
            if (data.list.length === 0) this.pageIndex -= 1;
            // console.log(this.DeptList);
            this.total = data.totalCount;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
