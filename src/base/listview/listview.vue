<template>
	<scroll ref="scroll" :probeType="3" :data="data" class="scroll-wrapper">
		<div>
			<div v-for="group in data" class="group">
				<h3 class="group-title">{{group.title}}</h3>
				<div v-for="singer in group.data" class="group-content">
					<img v-lazy="singer.avator" class="avator">
					<span class="name">{{singer.singerName}}</span>
				</div>
			</div>
		</div>
	</scroll>
</template>
<script>
	import Scroll from 'base/scroll/scroll';
	export default {
		name: 'listview',
		components: {
			Scroll
		},
		props: {
			data: {
				type: Array,
				default: []
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
</style>