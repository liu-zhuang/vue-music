<template>
	<ul class="tab">
		<li class="item">
			<router-link to="/recommend"><a>推荐</a></router-link>
		</li>
		<li class="item">
			<router-link to="/singer"><a>歌手</a></router-link>
		</li>
		<li class="item">
			<router-link to="/rank"><a>排行</a></router-link>
		</li>
		<li class="item">
			<router-link to="/search"><a>搜索</a></router-link>
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
		height: 44px;
		box-sizing: border-box;
		.item {
			flex: 1 0 auto;
			text-align: center;
			display: flex;
			flex-direction: column;
			justify-content: center;
		}
	}
	.router-link-active a {
		border-bottom: solid 2px @color-theme;
		color: @color-theme;
	}
</style>
