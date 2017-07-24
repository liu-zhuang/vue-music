<template>
	<div>
		<div class="loading">
			<img src="./loading.gif">
			<p class="text">{{ltext}}</p>
		</div>
		<div class="mask" v-if="hasMask">			
		</div>
	</div>
</template>

<script>
	export default {
		name: 'loading',
		props: {
			ltext: {
				type: String,
				default: '加载中...'
			},
			hasMask: {
				type: Boolean,
				default: true
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
		z-index: 1000;
		img{
			width: 20px;
			height:20px;
		}
		.text {
			color: @color-text-d;
			font-size: @font-size-small-s
		}
	}

	.mask {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: white;
		z-index: 999;
		opacity: 0.3;
	}
</style>