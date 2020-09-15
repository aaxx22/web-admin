<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
    <a href :download="'execl'+date+'.xlsx'" id="downloadA"></a>
    <el-button type="success" @click="changeData(tableData)">成功按钮</el-button>
  </div>
</template>

<script>
// import { delete } from 'vue/types/umd';
// import { delete } from 'vue/types/umd';
import XLSX from "xlsx";

export default {
  data() {
    return {
      num: 0,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          children: {
            name: "00000000",
          },
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          children: {
            name: "1111111",
          },
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          children: {
            name: "222222",
          },
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          children: {
            name: "333333333",
          },
        },
      ],
      date: 0,
    };
  },
  mounted() {
    console.log("test1第一次加载");
  },
  methods: {
   
  },
};
</script>

<style>
</style>