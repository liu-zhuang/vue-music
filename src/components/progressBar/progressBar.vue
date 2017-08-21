<template>
	<div class="progressBar-wrapper">
		<div ref="bar" class="bar-inner">
			<div ref="progress" class="progress"></div>
			<div ref="progressBtn" @touchstart.stop="moveStart"  @touchmove.stop="move"  @touchend="moveEnd" class="progress-btn-wrapper">
				<div class="progress-btn"></div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		data () {
			return {};
		},
		props: {
			percent: {
				type: Number,
				default: 0
			}
		},
		methods: {
			move (e) {
				console.log(e);
				console.log(1);
			},
			moveStart (e) {
				console.log('start');
				console.log(e);
			},
			moveEnd (e) {
				console.log('end');
				console.log(e);
			}
		},
		watch: {
			percent (val) {
				const bar = this.$refs.bar;
				this.$refs.progress.style.width = `${bar.clientWidth * val}px`;
				if (bar.clientWidth * val > 8) {
					this.$refs.progressBtn.style.transform = `translateX(${bar.clientWidth * val - 8}px)`;
				}
			}
		}
	};
</script>
<style type="text/css" lang="less" scoped>
	@import '~common/less/variable.less';
	.progressBar-wrapper {
		width: 100%;
		height: 30px;
		.bar-inner {
			position: relative;
			top: 13px;
			width: 100%;
			height: 4px;
			background-color: rgba(0, 0, 0, 0.3);
			.progress {
				background: @color-theme;
				width: 0px;
				height: 100%;
			}
			.progress-btn-wrapper {
				position: absolute;
				box-sizing: border-box;
				width: 30px;
				height: 30px;
				top: -15px;
				border:solid 1px red;
				.progress-btn {
					position: relative;
					top: 7px;
					width: 16px;
					height: 16px;
					background-color: @color-theme;
					border-radius: 50%;
					border: solid 3px @color-text;
				}
			}
		}
	}
	
</style>
