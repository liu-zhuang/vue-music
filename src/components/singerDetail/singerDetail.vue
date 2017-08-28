<template>
	<transition	name="slide">
		<div class="singer-detail" ref="singerDetail">
			<music-list
			ref="musiclist"
			v-if="songList.length > 0"
			:title="singer.singerName"
			:bg-img="singer.avator"
			:songs="songList"></music-list>
		</div>
	</transition>
</template>
<script>
	import {mapGetters} from 'vuex';
	import MusicList from 'base/musiclist/musiclist';
	import {getSingerSongList} from 'api/singer';
	import {ERR_OK} from 'api/config';
	export default {
		name: 'singerDetail',
		data () {
			return {
				songList: []
			};
		},
		components: {
			MusicList
		},
		created () {
			// 当在详情页面刷新时，跳转到歌手列表页面
			if (!this.singer.singerId) {
				this.$router.push({path: '/singer'});
			}
		},
		mounted () {
			this.$nextTick(() => {
				getSingerSongList(this.singer.key)
				.then(res => {
					if (res.code === ERR_OK) {
						this.songList = res.data.list;
					}
				});
			});
		},
		computed: {
			// singer () {
			//  return this.$store.getters.singer; 原始的方法 从store.getters中取值 也可以使用语法糖 mapGetters https://vuex.vuejs.org/zh-cn/getters.html
			// }
			// mapGetters https://vuex.vuejs.org/zh-cn/getters.html
			...mapGetters(['singer'])
		}
	};
</script>
<style scoped lang="less">
	@import '~less/variable.less';
	.singer-detail {
		position: fixed;
		top: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		background-color: @color-background;
	}
	.slide-enter-active, .slide-leave-active {
		transition: all 0.3s;
	}	
	.slide-enter, .slide-leave-to {
		transform: translate3d(100%, 0, 0);
	}
</style>