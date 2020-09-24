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
        @click="download"
      >{{$t('message.export')}}</el-button>
      <DislogForm
        Operation="add"
        :title="$t('message.add')"
        :dialogFormVisible="dialogFormVisible"
        @close="dialogFormVisible=false"
        :formData="{state:true, lng: 116.404, lat: 39.915 }"
        @update="$emit('update')"
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
import DislogForm from "../../components/AreasDislog";
import { GetAreas } from "../../api/request";
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
    download() {
      GetAreas({ isPage: true })
        .then((res) => {
          exportExecl(res.data.data.list, "Areas" + +new Date());
        })
        .catch((err) => {
          console.log(err);
        });
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
  flex-direction: row;
  padding: 0 10px;
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