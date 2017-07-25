<template>
	<div class="singer-detail">
		<span>{{singer.singerName}}</span>
	</div>
</template>
<script>
	import {mapGetters} from 'vuex';

	export default {
		name: 'singerDetail',
		created () {
			console.log(this.$route.path, this.$route.params, this.$route.query, this.$route.matched);
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
	.singer-detail {
		position: fixed;
		top: 88px;
		bottom: 10px;
		width: 100%;
		height: 100%;
		overflow: hidden;
		z-index: 100;
		background-color: #FFF;
	}
</style>