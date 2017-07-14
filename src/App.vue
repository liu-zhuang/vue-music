<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
};
</script>

<style scoped lang="less" rel="stylesheet/less">
@import '~less/index.less'; // common 别名
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: @color-theme;
  margin-top: 60px;
  background-color: @color-background;

}
</style>
