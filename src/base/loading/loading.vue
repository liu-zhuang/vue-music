<template>
	<div class="loading">
		<img src="./loading.gif">
		<p class="text">{{text}}</p>
	</div>
</template>

<script>
	export default {
		name: 'loading',
		props: {
			text: {
				type: String,
				default: '加载中...'
			}
		}
	};
</script>

<style scoped lang="less">
	@import '~less/variable.less';

	.loading {
		position: fixed;
		width: 200px;
		height: 20px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
		img{
			width: 20px;
			height:20px;
		}
		.text {
			color: @color-text-d;
			font-size: @font-size-small-s
		}
	}
</style>