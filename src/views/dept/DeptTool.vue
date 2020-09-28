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
      <DislogForm
        Operation="add"
        :title="$t('message.add')"
        :dialogFormVisible="dialogFormVisible"
        @dialogVisible="dialogVisible"
        :formData="{state:true}"
        @update="$emit('parentUpdata')"
      />
    </div>
    <div class="form">
      <el-input size="small" v-model="form.keyword" :placeholder="$t('message.p_input_key_word')"></el-input>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-search"
        @click="$emit('searchData',form.keyword)"
      >{{$t('message.search')}}</el-button>
    </div>
  </div>
</template>

<script>
import DislogForm from "../../components/DislogForm";
import { GetDept } from "../../api/request";
import exportExecl from "../../tool/exportExecl";

export default {
  components: {
    DislogForm,
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
  mounted() {
    this.is500 = this.$refs.deptTool.clientWidth > 500;
  },
  methods: {
    dialogVisible(bl) {
      this.dialogFormVisible = bl;
    },
    handleResize() {
      this.is500 = this.$refs.deptTool.clientWidth > 500;
    },
    download(type) {
      GetDept({ isPage: true }).then((res) => {
        exportExecl(res.data.data.list, "Dept" + +new Date(),type,"部門信息報表");
      }).catch(err=>{
        console.log(err);
      })
    },
  },
};
</script>

<style lang="less" scoped>
</style>