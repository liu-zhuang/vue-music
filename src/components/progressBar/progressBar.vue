<template>
	<div class="progressBar-wrapper">
		<div ref="bar" class="bar-inner">
			<div ref="progress" class="progress"></div>
			<div class="progress-btn-wrapper">
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
		watch: {
			percent (val) {
				const bar = this.$refs.bar;
				this.$refs.progress.style.width = `${bar.clientWidth * val}px`;
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
		}
	}
	
</style>
