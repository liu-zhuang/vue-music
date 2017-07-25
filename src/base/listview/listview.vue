<template>
	<!-- <div class="listview"> -->
	<scroll ref="scroll" :probeType="3" :data="data" :listenScroll="true" class="scroll-wrapper" @scroll="onScroll">
		<div>
			<div v-for="group in data" class="group" ref="group">
				<h3 class="group-title">{{group.title}}</h3>
				<div v-for="singer in group.data" class="group-content" @click="onSingerClick(singer)">
					<img v-lazy="singer.avator" class="avator">
					<span class="name">{{singer.singerName}}</span>
				</div>
			</div>
		</div>		
		<ul class="shortcut">
			<li class="item" v-for="(shortcut, index) in shortcutList"
			@touchstart.stop.prevent="onTouchStartShortcut"
			@touchmove.stop.prevent="onTouchMoveShortcut"
			:data-index="index"
			:class="{'active':currentIndex===index}"
			>{{shortcut}}</li>
		</ul>
		<div ref="fixedTitle" v-show="currentTitle" class="fixed-title">
			{{currentTitle}}
		</div>
	</scroll>
		<!-- <div class="shortcut">
			
	</div> -->
	<!-- </div> -->
</template>
<script>
	import Scroll from 'base/scroll/scroll';
	import {getData} from 'common/js/dom';
	export default {
		name: 'listview',
		created () {
			// 因为不涉及双向绑定，因此不需要直接写在data里面
			this.touch = {};
			this.$nextTick(() => {
				this._calcHeight();
			});
		},
		data () {
			return {
				currentIndex: 0,
				scrollY: 0,
				diff: 0
			};
		},
		components: {
			Scroll
		},
		props: {
			data: {
				type: Array,
				default: []
			}
		},
		computed: {
			shortcutList () {
				return this.data.map(item => {
					return item.title;
				});
			},
			currentTitle () {
				if (!this.scrollY) {
					return '';
				} else if (this.scrollY && this.scrollY > 0) {
					return '';
				} else {
					return this.shortcutList[this.currentIndex];
				}
			}
		},
		watch: {
			diff (newVal) {
				if (newVal < 30) {
					const distance = 30 - newVal;
					this.$refs.fixedTitle.style.transform = `translateY(-${distance}px)`;
				} else {
					this.$refs.fixedTitle.style.transform = '';
				}
			}
		},
		methods: {
			onTouchStartShortcut (event) {
				// 获取当前在右边的索引
				const index = getData(event.target, 'index');
				// 找到左边的父容器
				const group = this.$refs.group;
				// 将索引转为Int型, 以便高亮显示
				this.currentIndex = parseInt(index);
				// 调用scroll的滚动到元素的事件
				this.$refs.scroll.scrollToElement(group[index], 0);
				// 滑动时的起始位置
				this.touch.pageYStart = event.touches[0].pageY;
			},
			onTouchMoveShortcut (event) {
				// 滑动开始时index
				const startIndex = parseInt(getData(event.target, 'index'));
				// 在字母上滑动手指时的事件
				this.touch.pageYEnd = event.touches[0].pageY;

				// 根据每个字母的高度 font-size:12 上下margin各2 等于16 算出滑动了几个字母
				const distance = Math.floor((this.touch.pageYEnd - this.touch.pageYStart) / 16);
				// 当前索引等于移动了几个+初始索引
				let index = startIndex + distance;
				const group = this.$refs.group;

				// 设置滚动的上下边界
				if (index < 0) {
					this.currentIndex = 0;
				} else if (index >= group.length) {
					this.currentIndex = group.length - 1;
				} else {
					this.currentIndex = index;
				}
				// 滚动到当前应该所在的索引处
				this.$refs.scroll.scrollToElement(group[this.currentIndex], 0);
			},
			onScroll (pos) {
				// 滚动时，传入当前的纵坐标，计算当前右边应该高亮哪个字母
				this._calcPosition(pos.y);
				this.scrollY = pos.y;
			},
			onSingerClick (singer) {
				this.$emit('singerClick', singer);
			},
			_calcHeight () {
				// 计算歌手列表中各个group的高度
				const group = this.$refs.group;
				this.heightArray = [];
				// 默认增加一个0
				this.heightArray.push(0);
				for (let i = 0; i < group.length; i++) {
					this.heightArray[i + 1] = this.heightArray[i] + group[i].clientHeight;
				}
			},
			_calcPosition (posY) {
				// 向下滚动时纵坐标是负数，向上滚动应该不改变选中第一个的状态
				if (posY > 0) {
					this.currentIndex = 0;
				} else if (posY < -this.heightArray[this.heightArray.length - 1]) {
					// 滚到最下面的时候应该选中最后一个
					this.currentIndex = this.heightArray.length - 1;
				} else {
					// 在首尾之间正常滚动时
					// 计算当前位置区间,找出第一个大于的位置
					let matchPos = this.heightArray.findIndex((val, index) => {
						return val > Math.abs(posY);
					});
					this.diff = this.heightArray[matchPos] - Math.abs(posY);
					// 因为this.heightArray是从0开始的，因此当前选中Index要-1
					if (matchPos !== -1) {
						this.currentIndex = matchPos - 1;
					} else {
						this.currentIndex = 0;
					}
				}
			}
		}
	};
</script>
<style scoped lang="less">
	@import '~less/variable.less';

	.scroll-wrapper {
		height: 100%;
		.group{
			display: flex;
			width: 100%;
			flex-flow: column nowrap;
			padding-bottom: 20px;
			.group-title {
				padding-left: 20px;
				height: 30px;
				line-height: 30px;
				background-color: @color-highlight-background;
				color: @color-text-l;
				font-size: @font-size-small;
			}
			.group-content {
				box-sizing: border-box;
				width: 100%;
				height: 70px;
				padding: 20px 0 0 30px;
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
				.avator {
					width: 50px;
					height: 50px;
					border-radius: 50%;
				}
				.name {
					font-size: @font-size-medium;
					color: @color-text-l;
					margin-left: 20px;
				}
			}
		}
	}
	.shortcut {
		position: fixed;
		width: 20px;
		right: 10px;
		top:50%;
		transform: translateY(-40%);
		background-color: white;
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		background: @color-background-d;
		font-family: Helvetica;
		.item {
			margin: 2px 0;
			font-size: 12px;
			text-align: center;
			color: @color-text-l;
			font-size: @font-size-small;
			&:first-child {
				margin-top: 5px;
			}
			&:last-child {
				margin-bottom: 5px;
			}
			&.active {
				color: @color-theme;
			}
		}
		border-radius: 10px;
	}
	.fixed-title {
		position: fixed;
		top: 88px;
		left: 0;
		width: 100%;
		padding-left: 20px;
		height: 30px;
		line-height: 30px;
		background-color: @color-highlight-background;
		color: @color-text-l;
		font-size: @font-size-small;
	}
</style>