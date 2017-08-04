<template>
	<div id="app">
		<m-header></m-header>
		<tab></tab>
		<!-- 缓存页面 -->
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
		<player></player>
	</div>
</template>

<script>
import MHeader from 'com/m-header/m-header'; // 驼峰写法
import Tab from 'com/tab/tab';
import Player from 'com/player/player';

export default {
	name: 'app',
	components: {
		MHeader,
		Tab,
		Player
	}
};
</script>

<style scoped lang="less" rel="stylesheet/less">
 @import '~less/variable.less'; // less别名
 #app {
 	color: @color-theme;
 }
</style>
