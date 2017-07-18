<template>
	<div class="slider" ref="slider">
		<div class="slider-group" ref="sliderGroup">
			<slot></slot>
		</div>
		<div class="slider-dot">
			
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	export default {
		name: 'slider',
		props: {
		},
		mounted () {
			this.$nextTick(() => {
				this._setSliderWidth();
				this._initSlider();
			});
		},
		methods: {
			_setSliderWidth () {
				let sliderWidth = this.$refs.slider.clientWidth;
				this.children = this.$refs.sliderGroup.children;
				console.log(sliderWidth, this.children, this.children.length);
				for (let i = 0; i < this.children.length; i++) {
					console.log(i);
					this.children[i].style.width = sliderWidth + 'px';
				}
				this.$refs.sliderGroup.style.width = (this.children.length * sliderWidth + 2) + 'px';
				console.log(this.$refs.sliderGroup.style.width);
			},
			_initSlider () {
				 this.scroll = new BScroll(this.$refs.slider, {
					scrollX: true,
					scrollY: false,
					momentum: false,
					snap: true,
					snapLoop: true,
					snapThreshold: 0.3,
					snapSpeed: 400,
					click: true
				});
			}
		}
	};
</script>

<style scoped lang="less">
	.slider-group {
		width: 100%;
		height: 150px;
		display: flex;
		flex-flow: row nowrap;	
		justify-content: flex-start;
		overflow: hidden;
		.slider-item {
			flex: 0 0 auto;
		}
	}
</style>