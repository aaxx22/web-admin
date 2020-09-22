<template>
  <div class="aside">
    <el-menu
      :default-active="active"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isExpand"
      :unique-opened="true"
      background-color="rgb(48, 65, 86)"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true"
    >
      <el-submenu v-for="(item,index) in menuArr" :key="index" :index="item.id">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{item.name}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item :index="item.url" v-if="item.children.length == 0">{{item.name}}</el-menu-item>

          <div v-for="(item1,index1) in item.children" :key="index1">
            <el-menu-item
              :index="item1.url"
              v-if="item1.children.length == 0"
              :route="{path:item1.url}"
            >{{item1.name}}</el-menu-item>
            <div v-if="item1.children.length>0">
              <el-submenu :index="item1.id">
                <span slot="title">{{item1.name}}</span>
                <el-menu-item
                  v-for="(item3,index3) in item1.children"
                  :key="index3"
                  :index="item3.url"
                >{{item3.name}}</el-menu-item>
              </el-submenu>
            </div>
          </div>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { getMenus } from "../api/request";
export default {
  props: {
    isExpand: { type: Boolean },
  },
  data() {
    return {
      active: this.$route.path,
      isCollapse: true,
      menuArr: [],
    };
  },
  watch: {},
  mounted() {
    getMenus()
      .then((data) => {
        this.menuArr = data.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
    this.$store.dispatch("routeChange", this.$route);
    this.active = this.$route.path;
    // console.log(this.$route);
  },
  watch: {
    $route(to, from) {
      this.$store.dispatch("routeChange", to);
      this.active = to.path;
      this.from = from;
    },
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
  },
};
</script>

<style lang="less" scoped>
.aside {
  height: 100%;
  background-color: rgb(48, 65, 86);
  .el-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    line-height: 200px;
    overflow: hidden;
  }
  .el-menu {
    border: none;
  }
  .el-menu-item.is-active {
    background-color: rgb(48, 65, 86) !important;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu-item-group__title {
    padding: 0;
  }
}
.el-menu-item:hover {
  background-color: #001528 !important;
}
.el-submenu:hover {
  background-color: #001528 !important;
}
.el-submenu__title:hover {
  background-color: #001528 !important;
}
.el-menu-item.is-active:hover {
  background-color: #001528 !important;
}
</style>