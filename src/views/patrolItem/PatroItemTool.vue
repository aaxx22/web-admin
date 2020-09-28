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
      <el-button type="primary" size="small" icon="el-icon-printer" @click="download('print')">打印</el-button>
      <PatorDislog
        Operation="add"
        :title="$t('message.add')"
        :dialogVisible="dialogFormVisible"
        @close="dialogFormVisible=false"
        :formData="{state:true,options:[]}"
        @update="$emit('update')"
      />
    </div>
    <div class="form">
      <el-input size="small" v-model="keyword" :placeholder="$t('message.p_input_key_word')"></el-input>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-search"
        @click="$emit('search',keyword)"
      >{{$t('message.search')}}</el-button>
    </div>
  </div>
</template>

<script>
import PatorDislog from "../../components/PatorDislog";
import { GetPatroList } from "../../api/request";
import exportExecl from "../../tool/exportExecl";

export default {
  components: {
    PatorDislog,
  },
  data() {
    return {
      keyword: "",
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
      GetPatroList({ isPage: true })
        .then((res) => {
          let arr = res.data.data.list;
          let newArr = [];
          let aaa = arr.forEach((item) => {
            if (item.options.length > 0) {
              let str = "";
              item.options.forEach((item1) => {
                str += "," + item1.name;
              });
              item.options = str.substring(1);
            }
            newArr.push(item);
          });
          exportExecl(
            res.data.data.list,
            "Dept" + +new Date(),
            type,
            "巡查項信息列表"
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
</style>