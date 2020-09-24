<template>
  <div>
    <el-dialog title="授權管理" :visible.sync="dialogFormbl" @close="$emit('close')" width="650px">
      <el-row :gutter="20">
        <el-col :span="16">
          <el-tree
            :data="data3"
            show-checkbox
            node-key="powerId"
            ref="tree"
            :props="{label:'powerName'}"
            @current-change="handleChangeNode"
            @check-change="handleCheckChange"
          ></el-tree>
        </el-col>
        <el-col :span="8">
          <el-checkbox
            v-model="checkAll"
            @change="handleCheckAllChange"
            :indeterminate="indeterminate"
          >全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox
              v-for="city in cities"
              :label="city.id"
              :key="city.id"
              @change="handleArea(city)"
            >{{city.name}}</el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="$emit('close')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { GetArea, SetArea, GetGppowers, EditGppowers } from "../api/request";

export default {
  name: "AreaDislog",
  props: {
    showAreaDialog: { type: Boolean },
    groupId: { type: String },
  },
  data() {
    return {
      checkAll: false,
      checkedCities: [],
      cities: [],
      indeterminate: false,
      data3: [],
      checkedArr: [],
    };
  },
  computed: {
    dialogFormbl: {
      get() {
        this.checkedCities = [];
        if (this.showAreaDialog) {
          this.initList();
          this.indeterminate = false;
          GetGppowers(this.groupId).then((res) => {
            this.data3 = res.data.data;
            // console.log(JSON.stringify(this.data3));
          });
        } else {
          this.checkedArr = [];
        }

        return this.showAreaDialog;
      },
      set(bl) {
        return bl;
      },
    },
  },
  watch: {
    data3() {
      let { checkedArr } = this;
      function fl(obj, tar, that) {
        if (obj instanceof Array) {
          obj.forEach((item) => {
            fl(item, tar);
          });
        } else {
          if (obj.state) {
            let bl = false;
            checkedArr.forEach((item) => {
              if (item[tar] == obj[tar]) {
                bl = true;
              }
            });
            if (!bl) {
              checkedArr.push(obj);
            }
          }
          if (obj.children.length > 0) {
            fl(obj.children, tar);
          }
        }
      }
      fl(this.data3, "powerId");
    },
    checkedArr() {
      // console.log(this.checkedArr);
      if (this.$refs.tree) {
        setTimeout(() => {
          this.$refs.tree.setCheckedNodes(this.checkedArr);
        }, 1);
      }
    },
  },
  methods: {
    handleNodeClick(val, node, val03) {
      console.log(val);
      console.log(node);
    },
    handleCheckChange(v1, v2) {
      // setTimeout(() => {
      //   if (this.data3.length > 0) {
      //     console.log(v1, v2);
      //   }
      // }, 1000);
    },
    handleChangeNode(val, bl, val02) {
      console.log(bl);
      if (bl.data.children == 0) {
        if (!bl.checked) {
          console.log(this.checkedArr);
          EditGppowers({
            operation: 1,
            powerId: val.powerId,
            groupId: this.groupId,
          })
            .then((res) => {
              console.log(res);
              this.checkedArr.push(val);
              let bl = false;
              this.checkedArr.forEach((item) => {
                if (item.powerId == val.powerId) {
                  bl = true;
                }
              });
              if (!bl) {
                checkedArr.push(val);
              }
              this.$message({
                type: "success",
                message: res.data.message,
              });
            })
            .catch((err) => {
              console.log(err.response);
              this.$message({
                type: "error",
                message: err.response ? err.response.data.message : err,
              });
            });
        } else {
          EditGppowers({
            operation: 2,
            powerId: val.powerId,
            groupId: this.groupId,
          })
            .then((res) => {
              console.log(val);
              this.checkedArr.forEach((item, index) => {
                console.log(item.powerId);
                if (item.powerId == val.powerId) {
                  console.log(val);
                  this.checkedArr.splice(index, 1);
                }
              });
              this.$message({
                type: "success",
                message: res.data.message,
              });
            })
            .catch((err) => {
              this.$message({
                type: "error",
                message: err.response ? err.response.data.message : err,
              });
            });
        }
      }
    },
    initList() {
      GetArea(this.groupId).then((res) => {
        let data = res.data.data;
        this.cities = data;
        let len = 0;
        data.forEach((item) => {
          if (item.checked) {
            len++;
            this.checkedCities.push(item.id);
          }
        });
        // console.log(len);
        // console.log(this.checkAll);
        if (data.length > len && len != 0) {
          this.indeterminate = true;
        }
        if (len == data.length) {
          this.checkAll = true;
        } else if (len == 0) {
          this.checkAll = false;
        }
      });
    },
    handleArea(item) {
      let groupId = this.groupId;
      //   let arr =[]
      if (item.checked) {
        SetArea({ groupId, operation: 2, powerId: item.id }).then((res) => {
          this.cities.forEach((i) => {
            if (i.id == item.id) {
              item.checked = false;
            }
          });
        });
      } else {
        SetArea({ groupId, operation: 1, powerId: item.id }).then((res) => {
          this.cities.forEach((i) => {
            if (i.id == item.id) {
              item.checked = true;
            }
          });
        });
      }

      //   SetArea({ operation: 1, powerId: id }).then((res) => {
      //     console.log(res);
      //   });
    },
    handleCheckAllChange(val) {
      console.log(val);
      let idArr = [];
      let groupId = this.groupId;
      this.cities.forEach((item) => {
        idArr.push(item.id);
      });
      this.checkedCities = val ? idArr : [];
      this.indeterminate = false;
      if (val) {
        SetArea({ groupId, operation: 3, powerId: "" }).then((res) => {
          this.initList();
        });
      } else {
        SetArea({ groupId, operation: 4, powerId: "" }).then((res) => {
          this.initList();
        });
      }
    },
    handleCheckedCitiesChange(value) {
      console.log(value);
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.indeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
  },
};
</script>

<style lang="less" scoped>
.el-checkbox {
  margin: 5px 0;
}
</style>