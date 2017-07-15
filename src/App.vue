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
 @import '~less/variable.less'; // less别名
#app {
  color: @color-theme;
}
</style>
