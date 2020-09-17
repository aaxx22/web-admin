<template>
  <div class="home">
    <Map></Map>
  </div>
</template>

<script>
import Map from '../components/Map';
export default {
  name:"home",
  components:{
    Map
  }
};
</script>

<style scoped>
.home{
  width: 100%;
  height: 100%;
}
</style>