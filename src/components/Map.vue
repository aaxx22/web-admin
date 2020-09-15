<template>
  <div id="BaiduMap" ref="BaiduMap"></div>
</template>

<script>
import loadBMap from "../utils/loadBMap";
export default {
  data() {
    return {
      BMap: null,
    };
  },
  async mounted() {
    this.initMap();
    setTimeout(() => {
      console.log(this.BMap);
    }, 50);
  },
  methods: {
    async initMap() {
      // console.log(this.$refs);
      let containerWidth = this.$refs.BaiduMap.clientWidth;
      let containerHeight = this.$refs.BaiduMap.clientHeight;
      let BMap = await loadBMap("itoEzU0OpDZG7ksjY0r5e1FY6842xWnl");
      this.BMap = BMap;
      console.log(this.BMap);
      let map = new BMap.Map("BaiduMap");
      let point = new BMap.Point(115.311113, 23.122226);
      map.centerAndZoom(point, 12);
      map.enableScrollWheelZoom(true);
      let str = `
					 <div style="width: 50px;height: 50px;background: #ff0;">23333</div>
			`;
      let div = document.createElement("div");

      div.innerHTML = str;
      // map.pointToOverlayPixel(new BMap.Point(112.311113, 24.122226));
      // console.log(map.getPanes());
      map.getPanes().labelPane.appendChild(div);
      console.log(map.panBy);
      map.panBy(containerWidth / 2, containerHeight / 2);

      // let aa = new BMap.Overlay();
      // map.addOverlay(str);
    },
  },
};
</script>

<style lang="less" scoped>
#BaiduMap {
  width: 100%;
  height: 100%;
}
</style>