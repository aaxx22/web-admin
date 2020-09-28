<template>
  <div class="deptTool" ref="deptTool" v-resize="handleResize" :class="{isdf:!is500}">
    <div class="left">
      <el-button
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="dialogFormVisible = true"
      >{{$t('message.add')}}</el-button>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-download"
        @click="download('export')"
      >{{$t('message.export')}}</el-button>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-printer"
        @click="download('print')"
      >打印</el-button>
      <UserDislogForm
        Operation="add"
        :title="$t('message.add')"
        :dialogFormVisible="dialogFormVisible"
        @dialogVisible="dialogVisible"
        :formData="{state:true}"
        @update="$emit('update')"
      />
    </div>
    <div class="form">
      <el-input size="small" v-model="form.keyword" :placeholder="$t('message.p_input_key_word')"></el-input>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-search"
        @click="$emit('search',form.keyword)"
      >{{$t('message.search')}}</el-button>
    </div>
  </div>
</template>

<script>
import exportExecl from "../../tool/exportExecl";
import UserDislogForm from "../../components/UserDislogForm";
import { GetUsers } from "../../api/request";

export default {
  components: {
    UserDislogForm,
  },
  data() {
    return {
      form: {
        keyword: "",
        status: true,
      },
      dialogFormVisible: false,
      is500: true,
    };
  },

  methods: {
    dialogVisible(bl) {
      this.dialogFormVisible = bl;
    },
    handleResize() {
      this.is500 = this.$refs.deptTool.clientWidth > 500;
    },
    download(type) {
      GetUsers({ isPage: true }).then((res) => {
        exportExecl(res.data.data.list, "Users" + +new Date(),type,"員工信息報表");
      });
    },
  },
};
</script>

<style lang="less" scoped>

</style>