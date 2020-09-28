<template>
  <div>
    <el-dialog title="提示" :visible.sync="dialogBl" width="1180px" @close="$emit('close')" top="5vh">
      <el-row>
        <el-col :span="6">
          <el-form :model="form" style="padding-right: 10px;">
            <el-form-item label="圖片" :label-width="formLabelWidth">
              <img
                v-if="Operation=='edit'"
                @click="handleBigImg(form.photo)"
                :src="$baseUrl+form.photo"
                alt
              />
              <el-upload
                class="upload-demo"
                :action="$baseUrl+'/api/utils/uploadFile'"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :on-success="handleSuccess"
                multiple
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="fileList"
              >
                <el-button size="small" type="primary">{{Operation=='edit'?'重新上传':'点击上传'}}</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
            <el-form-item prop="code" :label="$t('message.code')" :label-width="formLabelWidth">
              <el-input v-model="form.code"></el-input>
            </el-form-item>
            <el-form-item
              prop="cnName"
              :label="$t('message.cn_name')"
              :label-width="formLabelWidth"
            >
              <el-input v-model="form.cnName"></el-input>
            </el-form-item>
            <el-form-item
              prop="enName"
              :label="$t('message.en_name')"
              :label-width="formLabelWidth"
            >
              <el-input v-model="form.enName"></el-input>
            </el-form-item>

            <el-form-item :label="$t('message.address')" :label-width="formLabelWidth">
              <el-input v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item :label="$t('message.state_name')" :label-width="formLabelWidth">
              <el-switch v-model="form.state" :width="60"></el-switch>
            </el-form-item>
            <el-form-item :label="$t('message.remark')" :label-width="formLabelWidth">
              <el-input v-model="form.remark"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="18">
          <el-input v-model="addressKeyword" placeholder="请输入地址来直接查找相关位置"></el-input>
          <baidu-map
            class="bmView"
            :scroll-wheel-zoom="true"
            :center="location"
            :zoom="zoom"
            @click="getLocationPoint"
            v-if="dialogBl"
          >
            <bm-view style="width: 100%; height:500px; flex: 1"></bm-view>
            <bm-local-search :keyword="addressKeyword" :auto-viewport="true" style="display: none"></bm-local-search>
            <bm-marker :position="dot" :dragging="true" animation="BMAP_ANIMATION_BOUNCE"></bm-marker>
            <bm-circle
              :center="dot"
              :radius="form.radius"
              fillColor="blue"
              :stroke-opacity="0.5"
              @lineupdate="updateCirclePath"
              :editing="true"
            ></bm-circle>
          </baidu-map>
        </el-col>
      </el-row>
      <div class="slier">
        <span>範圍(單位：米)：</span>
        <el-slider :min="50" :max="5000" v-model="form.radius"></el-slider>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="$emit('close')">取消</el-button>
        <el-button type="primary" @click="handleClick">確定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible" width="60%" @close="dialogVisible=false">
      <img :src="bigImg" alt />
    </el-dialog>
  </div>
</template>

<script>
import { EditAreas, AddAreas } from "../api/request";
export default {
  props: {
    dialogFormVisible: Boolean,
    formData: Object,
    Operation: String,
  },
  data() {
    return {
      activeName2: "first",
      form: {},
      formLabelWidth: "80px",
      location: {},
      zoom: 14,
      addressKeyword: "",
      dot: { lng: 116.404, lat: 39.915 },
      fileList: [],
      dialogVisible: false,
      bigImg: "",
    };
  },
  computed: {
    dialogBl: {
      get() {
        return this.dialogFormVisible;
      },
      set(bl) {
        return bl;
      },
    },
  },
  watch: {
    formData() {
      this.form = JSON.parse(JSON.stringify(this.formData));
      // this.form.radius = this.form.radius ? this.form.radius : 50;
      this.location.lat = this.form.lat;
      this.location.lng = this.form.lng;
      this.dot = JSON.parse(JSON.stringify(this.location));
      this.zoom = 14;
      // console.log(this.dot);
      //   this.dot = {};
      this.addressKeyword = "";
      //   this.location = {};
    },
    "form.radius"() {
      console.log(this.form.radius);
    },
    // dialogFormVisible() {
    //   if (!this.dialogFormVisible) {
    //     this.zoom = 10;
    //     this.dot = {};
    //     this.addressKeyword = "";
    //     this.location = {};
    //   }
    // },
  },
  methods: {
    handleBigImg(e) {
      this.dialogVisible = true;
      this.bigImg = this.$baseUrl + e;
      console.log(e);
    },
    handleSuccess(res) {
      this.form.photo = res.data;
    },
    handleRemove(file, fileList) {
      this.form.photo = "";
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning("最多只能上傳一張圖片");
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleClick() {
      console.log(this.dot);
      this.form.lat = this.dot.lat;
      this.form.lng = this.dot.lng;
      if (!this.check(this.form.code)) {
        this.$message({
          type: "error",
          message: "編號不能為空",
        });
        return;
      }
      if (!this.check(this.form.cnName)) {
        this.$message({
          type: "error",
          message: "中文名稱不能為空",
        });
        return;
      }
      if (!this.check(this.form.enName)) {
        this.$message({
          type: "error",
          message: "英文名稱不能為空",
        });
        return;
      }
      if (!this.check(this.form.address)) {
        this.$message({
          type: "error",
          message: "地址不能為空",
        });
        return;
      }
      if (this.Operation == "edit") {
        EditAreas(this.form)
          .then((res) => {
            this.$message({
              type: "success",
              message: res.data.message,
            });
            this.$emit("close");
            this.$emit("update");
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (this.Operation == "add") {
        AddAreas(this.form)
          .then((res) => {
            this.$message({
              type: "success",
              message: res.data.message,
            });
            this.$emit("close");
            this.$emit("update");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    updateCirclePath(e) {
      this.dot = e.target.getCenter();
      this.form.radius = e.target.getRadius();
    },
    getLocationPoint(e) {
      this.lng = e.point.lng;
      this.lat = e.point.lat; /* 创建地址解析器的实例 */
      let geoCoder = new BMap.Geocoder(); /* 获取位置对应的坐标 */
      geoCoder.getPoint(this.addressKeyword, (point) => {
        this.selectedLng = point.lng;
        this.selectedLat = point.lat;
      });
      /* 利用坐标获取地址的详细信息 */
      geoCoder.getLocation(e.point, (res) => {
        //   console.log(res);
        this.dot = res.point;
        this.form.address = res.address;
        this.zoom = 12;
        console.log(res);
        // console.log(this.dot);
      });
    },
    check(str) {
      if (!str) return false;
      if (!str.trim()) return false;
      return true;
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.el-switch__core {
  height: 28px;
  border-radius: 250px;
  .el-switch.is-checked &::after {
    left: 100%;
    margin-left: -27px;
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 1px;
    border-radius: 100%;
    transition: all 0.3s;
    width: 26px;
    height: 26px;
    background-color: #fff;
  }
}

/deep/.BMap_cpyCtrl.BMap_noprint,
/deep/.anchorBL {
  display: none;
}
/deep/.BMap_vectex_node {
  background: none;
}
</style>