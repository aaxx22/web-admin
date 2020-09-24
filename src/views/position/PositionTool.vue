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
        @click="$emit('download')"
      >{{$t('message.export')}}</el-button>
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
  },
};
</script>

<style lang="less" scoped>
.PositionTool {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 0 10px;
  transition: all 0.3s;
  &.isdf {
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