<template>
	<div class="progressBar-wrapper" ref="progressBarWrapper" @click="click">
		<div ref="bar" class="bar-inner">
			<div ref="progress" class="progress"></div>
			<div ref="progressBtn" @touchstart.stop="moveStart"  @touchmove.stop="move"  @touchend="moveEnd" class="progress-btn-wrapper">
				<div class="progress-btn"></div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import {prefixStyle} from 'common/js/dom';
	const prefixTransform = prefixStyle('transform');
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
		created () {
			this.touch = {};
		},
		methods: {
			move (e) {
				if (!this.touch.init) {
					return;
				}
				// 移动的距离 可正可负
				let offset = e.touches[0].pageX - this.touch.start;
				// 保证不会移动到进度条的左侧外侧
				const maxWidth = this.$refs.progressBarWrapper.clientWidth;
				const newOffset = Math.min(this.touch.left + offset, maxWidth);
				this._offset(newOffset);
			},
			moveStart (e) {
				// 标记当前开始touch
				this.touch.init = true;
				// 记录开始的位移
				this.touch.start = e.touches[0].pageX;
				// 记录初始的位置
				this.touch.left = this.$refs.progress.clientWidth;
			},
			moveEnd (e) {
				this.touch.init = false;
				// touch end 的时候，计算目前播放的百分比，并通知出去
				// 这里忽略了进度按钮的宽度，懒的去算了
				this._triggerChange();
			},
			click (e) {
				// 该元素与页面的距离
				const rect = this.$refs.progressBarWrapper.getBoundingClientRect();
				const offsetWidth = e.pageX - rect.left;
				this._offset(offsetWidth);
				this._triggerChange();
			},
			_offset (offset) {
				this.$refs.progress.style.width = `${offset}px`;
				if (offset > 8) {
					this.$refs.progressBtn.style[prefixTransform] = `translateX(${offset - 8}px)`;
				}
			},
			_triggerChange () {
				let percent = this.$refs.progress.clientWidth / this.$refs.progressBarWrapper.clientWidth;
				this.$emit('percentChange', percent);
			}
		},
		watch: {
			percent (val) {
				if (val > 0 && !this.touch.init) {
					const bar = this.$refs.bar;
					const offset = bar.clientWidth * val;
					this._offset(offset);
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
