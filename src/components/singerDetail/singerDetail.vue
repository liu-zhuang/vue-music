<template>
	<div class="singer-detail">
		<music-list
		:title="singer.singerName"
		:bg-img="singer.avator"></music-list>
	</div>
</template>
<script>
	import {mapGetters} from 'vuex';
	import MusicList from 'base/musiclist/musiclist';
	export default {
		name: 'singerDetail',
		components: {
			MusicList
		},
		created () {
			// 当在详情页面刷新时，跳转到歌手列表页面
			if (!this.singer.singerId) {
				this.$router.push({path: '/singer'});
			}
		},
		computed: {
			// singer () {
			//  return this.$store.getters.singer; 原始的方法 从store.getters中取值 也可以使用语法糖 mapGetters https://vuex.vuejs.org/zh-cn/getters.html
			// }
			// mapGetters https://vuex.vuejs.org/zh-cn/getters.html
			...mapGetters(['singer'])
		}
	};
</script>
<style scoped lang="less">
	@import '~less/variable.less';
	.singer-detail {
		position: fixed;
		top: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		z-index: 100;
		background-color: @color-background;
	}
</style>