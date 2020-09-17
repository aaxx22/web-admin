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
        @click="$emit('download')"
      >{{$t('message.export')}}</el-button>
      <DislogForm
        Operation="add"
        :title="$t('message.add')"
        :dialogFormVisible="dialogFormVisible"
        @dialogVisible="dialogVisible"
        :formData="{}"
        @update="$emit('parentUpdata')"
      />
    </div>
    <div class="form">
      <el-input size="small" v-model="form.keyword" :placeholder="$t('message.p_input_key_word')"></el-input>
      <el-button type="primary" size="small" icon="el-icon-search" @click="$emit('searchData',form.keyword)">{{$t('message.search')}}</el-button>
    </div>
  </div>
</template>

<script>
import DislogForm from "../../components/DislogForm";

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
      is500: false,
    };
  },
 
  methods: {
    dialogVisible(bl) {
      this.dialogFormVisible = bl;
    },
    handleResize() {
      this.is500 = this.$refs.deptTool.clientWidth > 500;
    },
  },
};
</script>

<style lang="less" scoped>
.deptTool {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  &.isdf{
    flex-direction: column;
    align-items: flex-start;
    height: 80px;
  }
  .form {
    height: 80%;
    display: flex;
    align-items: center;
    .el-input {
      width: auto;
      margin-right: 20px;
    }
    > div {
      width: 120px;
    }
  }
}
</style>