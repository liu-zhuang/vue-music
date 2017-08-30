<template>
	<transition	name="slide">
		<div class="diss-detail" ref="singerDetail">
			<music-list
			ref="musiclist"
			:title="title"
			:bg-img="bgImg"
			:songs="songList"></music-list>
		</div>
	</transition>
</template>
<script>
	import {mapGetters} from 'vuex';
	import MusicList from 'base/musiclist/musiclist';
	import {getDissInfo} from 'api/recommend';
	import {ERR_OK} from 'api/config';

	export default {
		name: 'diss-detail',
		components: {
			MusicList
		},
		data () {
			return {
				songList: []
			};
		},
		created () {
			// 当在详情页面刷新时，跳转到歌手列表页面
			if (!this.diss.dissid) {
				this.$router.push({path: '/recommend'});
			}
			this._getDiss(this.diss.dissid);
		},
		mounted () {
		},
		computed: {
			title () {
				return this.diss.dissname;
			},
			bgImg () {
				return this.diss.imgurl;
			},
			...mapGetters(['diss'])
		},
		methods: {
			_getDiss (dissId) {
				getDissInfo(dissId)
				.then(res => {
					if (res.code === ERR_OK) {
						console.log(res);
						this.songList = res.cdlist[0].songlist;
					}
				});
			}
		}
	};
</script>
<style scoped lang="less">
	@import '~common/less/variable';
	.diss-detail {
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