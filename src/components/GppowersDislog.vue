<template>
  <div>
    <el-dialog title="收货地址" :visible.sync="dialogFormbl" @close="$emit('close')">
      
    </el-dialog>
  </div>
</template>

<script>
import { GetGppowers, SetArea } from "../api/request";
export default {
  props: {
    showAreaDialog: { type: Boolean },
    groupId: { type: String },
  },
  created() {
    GetGppowers();
  },
};
</script>

<style>
</style>