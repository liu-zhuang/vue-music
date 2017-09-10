<template>
	<div class="search-wrapper">
		<div class="searchbox-wrapper">
			<search-box :hotkey="hotkey" @hotkeyChange="onHotkeyChange"></search-box>
		</div>
		<div class="hot-wrapper" v-show="!hotkey">
			<div class="hot-title">
				热门搜索
			</div>
			<ul class="hotword-wrapper">
				<li v-for="word in hotwordArray" @click="onHotClick(word)" class="hotword">{{word}}</li>
			</ul>
		</div>
		<div class="suggest-wrapper" v-if="hotkey">
			<suggest :keyword="hotkey" :show-singer="true"></suggest>
		</div>
	</div>
</template>

<script>
	import SearchBox from 'com/searchBox/searchBox';
	import Suggest from 'base/suggest/suggest';
	import {getHotKey} from 'api/search';
	export default {
		name: 'Search',
		components: {
			SearchBox,
			Suggest
		},
		data () {
			return {
				hotkey: '',
				hotwordArray: []
			};
		},
		created () {
			this._getHotWord();
		},
		methods: {
			onHotClick (hot) {
				console.log(hot);
				this.hotkey = hot;
			},
			onHotkeyChange (val) {
				this.hotkey = val;
			},
			_getHotWord () {
				getHotKey()
				.then(res => {
					res.data.hotkey.forEach(item => {
						if (this.hotwordArray.length < 10) {
							this.hotwordArray.push(item.k);
						} else {
							return false;
						}
					});
				});
			}
		},
		watch: {
		}
	};
</script>

<style lang="less">
	@import '~common/less/variable';
	.search-wrapper	{
		height: 100%;
		.searchbox-wrapper {
			margin: 20px;
			box-sizing: border-box;
		}
		.hot-wrapper {
			margin: 0 20px;
			.hot-title {
				font-size: 14px;
				color: @color-text-l;
			}
			.hotword-wrapper {
				.hotword {
					display: inline-block;
					border-radius: 5px;
					font-size: 14px;
					background-color: @color-highlight-background;
					color: @color-text-d;
					padding: 5px;
					margin: 5px 10px;
				}
			}
		}
		.suggest-wrapper {
			position: fixed;
			top: 168px;
			bottom: 10px;
			width: 100%;
			padding: 0 20px;
			box-sizing: border-box;
		}
	}
</style>
