<template>
	<div class="search-box">
		<i  class="icon-search search-icon"></i>
		<input v-model="searchKey" type="text" class="search-content" :placeholder="placeholder">
		<i class="icon-dismiss dissmiss-icon" @click="onDissmiss" v-show="searchKey"></i>
	</div>
</template>
<script type="text/javascript">
	import {debounce} from 'common/js/utility';

	export default {
		name: 'SearchBox',
		data () {
			return {
				searchKey: ''
			};
		},
		props: {
			placeholder: {
				type: String,
				default: '搜索歌曲、歌手'
			},
			hotkey: {
				type: String,
				default: ''
			}
		},
		created () {
			// 因为需要使用节流，因此不在watch中监控searchKey的变化
			this.$watch('searchKey', debounce((newVal) => {
				this.$emit('hotkeyChange', newVal);
			}, 1000));
		},
		methods: {
			onDissmiss () {
				this.searchKey = '';
			}
		},
		watch: {
			hotkey (newVal) {
				this.searchKey = newVal;
			}
		}
	};
</script>
<style scoped lang="less">
	@import "~common/less/variable";
	.search-box	{
		display: flex;
		flex-flow: row nowrap;
		background-color: @color-highlight-background;
		align-items: center;
		height: 40px;
		border-radius: 5px;
		.search-icon {
			flex: 0 0 auto;
			font-size: 24px;
			color: @color-background;
			margin: 0 5px;
		}
		.search-content {
			flex: 1 1 auto;
			background-color: @color-highlight-background;
			color: @color-text;
			margin-right: 10px;
			height: 24px;
		}
		.dissmiss-icon {
			flex: 0 0 auto;
			font-size: 16px;
			color: @color-background;
			margin-right: 10px;
		}
	}
</style>