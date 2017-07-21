<template>
	<ul class="tab">
		<li class="item">
			<router-link to="/recommend">推荐</router-link>
		</li>
		<li class="item">
			<router-link to="/singer">歌手</router-link>
		</li>
		<li class="item">
			<router-link to="/rank">排行</router-link>
		</li>
		<li class="item">
			<router-link to="/search">搜索</router-link>
		</li>
	</ul>
</template>

<script>
	export default {
		name: 'Tab'
	};
</script>

<style lang="less">
	@import '~less/variable.less';
	.tab{
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		margin: 10px 0 ;
		.item {
			flex: 1 0 auto;
			text-align: center;
		}
	}

	.router-link-active {
		border-bottom: solid 2px @color-theme;
		color: @color-theme;
	}
</style>
