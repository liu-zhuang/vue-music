<template>
	<div class="m-header">
		<div class="icon"></div>
		<h1 class="title">Vue Music</h1>
	</div>
</template>
<script>
	export default {
		name: 'm-header'
	};
</script>
<style scoped lang="less">
	@import '~less/variable.less';
	@import '~less/mixin.less';
	.m-header {
		display: flex;
		flex-direction:row;
		justify-content:center;
		align-items:center;
		position: relative;
		height: 44px;
		font-size: 0;
		color: @color-theme;
		.icon {
			display: inline-block;
			width:30px;
			height: 32px;
			.bg-image('logo');
			background-size: 30px 32px;
			margin-right:10px;
		}
		.title {
			display: inline-block;
			font-size: @font-size-large;
		}
	}
</style>
