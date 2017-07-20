<template>
	<div class="slider" ref="slider">
		<div class="slider-group" ref="sliderGroup">
			<slot></slot>			
		</div>
		<div class="dots">
			<span class="dot-item" v-for="(item,index) in dots" :class="{active: currentIndex === index}"></span>
		</div>
	</div>
</template>

<script>
	import { addCssClass } from 'common/js/dom';
	import BScroll from 'better-scroll';

	export default {
		data () {
			return {
				dots: [],
				currentIndex: 0
			};
		},
		props: {
			loop: {
				type: Boolean,
				default: true
			},
			autoplay: {
				type: Boolean,
				default: true
			},
			Interval: {
				type: Number,
				default: 2000
			}
		},
		mounted () {
			this.$nextTick(() => {
				this._getSliderWidth();
				this._initDots();
				this._initSlider();
			});
		},
		methods: {
			_getSliderWidth () {
				// 注意，这里有个特殊设置，是在recommend.vue的文件中，slider组件的容器中增加了v-if, 否则在children中还没有元素的时候，就来执行这段代码了。
				// 获取所有轮播图元素
				let children = this.$refs.sliderGroup.children;
				// 获取轮播图容器的宽度
				let sliderWidth = this.$refs.slider.clientWidth;
				let sliderWrapperWidth = 0;
				for (let i = 0; i < children.length; i++) {
					// 循环为每个元素设置cssClass
					addCssClass(children[i], 'slider-item');
					// 每个轮播图的尺寸都等于容器的尺寸
					children[i].style.width = sliderWidth + 'px';

					// 容器的总宽度等于每个图片的宽度之和
					sliderWrapperWidth += sliderWidth;
				}

				// 如果是循环的话，需要在前后各加一张图片，以使得无缝链接
				// 因此宽度需要加2个图片的宽度
				if (this.loop) {
					sliderWrapperWidth += 2 * sliderWidth;
				}

				// 容器的总宽度
				this.$refs.sliderGroup.style.width = sliderWrapperWidth + 'px';
			},
			_initDots () {
				this.dots = new Array(this.$refs.sliderGroup.children.length + 2).fill('');
			},
			_initSlider () {
				this.bscroll = new BScroll(this.$refs.slider, {
					scrollX: true,
					scrollY: false,
					momentum: false,
					snap: true,
					snapLoop: this.loop,
					snapThreshold: 0.3,
					snapSpeed: 400
				});
			}
		}
	};
</script>

<style scoped lang="less">
	@import '~less/variable.less';

	.slider {
		position: relative;
		display: flex;
		flex-flow: row nowrap;
		width: 100%;
		height: 150px;
		overflow: hidden;
		.slider-group {
			display: flex;
			flex-flow: row nowrap;
			.slider-item {
				img {	
					height: inherit;			
					width: inherit; /* 这里如果写100%有问题,原因不明，写inherit或者100vw均可实现每个轮播图占满屏的效果，先这样实现着 */
				}
			}
		}
		.dots {
			position: absolute; left: 50%; bottom:10px;
			transform: translate(-50%); /* 实现绝对定位元素水平垂直居中， 在不知道元素大小的时候，使用transform  http://www.zhangxinxu.com/wordpress/2013/11/margin-auto-absolute-%E7%BB%9D%E5%AF%B9%E5%AE%9A%E4%BD%8D-%E6%B0%B4%E5%B9%B3%E5%9E%82%E7%9B%B4%E5%B1%85%E4%B8%AD/  参考张鑫旭博客 */
			/* 当然，这里也可以使用text-align属性来实现  */
			.dot-item {
				width: 8px;
				height: 8px;
				border-radius: 50%;
				margin-right: 10px;
				background-color: @color-text-l;
				display:inline-block; /*必须转为块状元素，否则空的span标签设置宽高是无效的*/
				/* LESS nth元素的写法 */
				&:last-child {
					margin-right: 0px;
				}
				/* LESS 平行样式的写法 */
				&.active {
					width: 20px;
					border-radius: 5px;
					background: @color-text-ll;
				}
			}
		}


	}
</style>