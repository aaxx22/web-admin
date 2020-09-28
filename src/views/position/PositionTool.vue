
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
      <PositionDislogForm
        Operation="add"
        :title="$t('message.add')"
        :dialogFormVisible="dialogFormVisible"
        @dialogVisible="dialogVisible"
        :formData="{}"
        @update="$emit('parentupdata')"
      />
    </div>
    <div class="form">
      <el-input size="small" v-model="form.keyword" :placeholder="$t('message.p_input_key_word')"></el-input>
      <el-button
        size="small"
        type="primary"
        icon="el-icon-search"
        @click="$emit('searchData',form.keyword)"
      >{{$t('message.search')}}</el-button>
    </div>
  </div>
</template>

<script>
import PositionDislogForm from "../../components/PositionDislogForm";
import { GetPositions } from '../../api/request';
import exportExecl from '../../tool/exportExecl';
export default {
  components: {
    PositionDislogForm,
  },
  data() {
    return {
      form: {
        keyWord: "",
        status: true,
      },
      dialogFormVisible: false,
      is500: true,
    };
  },
  methods: {
    handleAdd() {
      this.dialogFormVisible = true;
    },
    dialogVisible(bl) {
      this.dialogFormVisible = bl;
    },
    handleResize() {
      this.is500 = document.querySelector(".el-main").clientWidth > 500;
    },
    download(type) {
      console.log(11);
      GetPositions({ isPage: true }).then((res) => {
        // console.log(res.data.data.list);
        exportExecl(res.data.data.list, "Position" + +new Date(), type,"職位信息報表");
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>