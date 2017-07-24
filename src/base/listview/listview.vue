<template>
	<!-- <div class="listview"> -->
	<scroll ref="scroll" :probeType="3" :data="data" class="scroll-wrapper">
		<div>
			<div v-for="group in data" class="group" ref="group">
				<h3 class="group-title">{{group.title}}</h3>
				<div v-for="singer in group.data" class="group-content">
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
		},
		data () {
			return {
				currentIndex: 0
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
		transform: translateY(-50%);
		background-color: white;
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		background: @color-background-d;
		font-family: Helvetica;
		.item {
			margin: 2px 0;
			font-size: 8px;
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
	
</style>