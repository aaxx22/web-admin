<template>
  <div class="index">
    <!-- <a id="downloadA" ></a> -->
    <el-container>
      <Elaside :isExpand="isExpand" />
      <el-container>
        <el-header style="display:flex;align-items:center;justify-content: space-between;">
          <div style="line-height:60px" @click="isExpand=!isExpand">
            <i class="el-icon-menu" style="font-size:26px;"></i>
          </div>

          <div class="userinfo">
            <User />
          </div>
        </el-header>
        <TagView :from="from"></TagView>
        <el-main style="position:relative;">
          <transition :name="transitionName">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </transition>
          <!-- <div class="reload" title="刷新" @click="reload">
            <i class="el-icon-refresh"></i>
          </div>-->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import TagView from "../components/TagView";
import User from "../components/User";
import Elaside from "../components/aside";
export default {
  components: {
    TagView,
    User,
    Elaside,
  },
  data() {
    return {
      active: this.$route.name,
      from: {},
      isExpand: false,
      screenWidth: 0,
      transitionName: "",
    };
  },
  mounted() {
    this.$store.dispatch("routeChange", this.$route);
    this.active = this.$route.name;
    this.isExpand = document.body.clientWidth < 1000 ? true : false;
    window.onresize = () => {
      this.isExpand = document.body.clientWidth < 1000 ? true : false;
    };
  },
  watch: {
    $route(to, from, next) {
      this.$store.dispatch("routeChange", to);
      this.active = to.name;
      this.from = from;
      if (to.meta.index > from.meta.index) {
        //设置动画名称
        this.transitionName = "slide-left";
      } else {
        this.transitionName = "slide-right";
      }
    },
    "window.innerWidth"() {
      console.log(111);
      this.isExpand = window.innerWidth > 1000 ? true : false;
    },
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.index,
.index > .el-container,
.el-menu-vertical-demo {
  height: 100%;
  border-right: none;
}
.el-header,
.el-footer {
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
  overflow: hidden;
}
.reload {
  position: absolute;
  top: 20px;
  right: 30px;
  width: 40px;
  height: 40px;
  font-size: 30px;
  text-align: center;
  line-height: 40px;

  background-color: #fff;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
  width: 100%;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.el-main {
  color: #333;
  padding: 0;
}
.el-menu-item-group__title {
  padding: 0;
}
body > .el-container {
  margin-bottom: 40px;
}
.el-menu-item,
.el-submenu {
  width: 200px;
  overflow: hidden;
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

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>