<template>
	<div id="app">
		<m-header></m-header>
		<tab></tab>
		<!-- 缓存页面 -->
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>

<script>
import MHeader from 'com/m-header/m-header'; // 驼峰写法
import Tab from 'com/tab/tab';

export default {
	name: 'app',
	components: {
		MHeader,
		Tab
	}
};
</script>

<style scoped lang="less" rel="stylesheet/less">
 @import '~less/variable.less'; // less别名
 #app {
 	color: @color-theme;
 }
</style>
