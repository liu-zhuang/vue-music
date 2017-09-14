<template>
	<transition	name="slide">
		<div class="rank-detail" ref="rankDetail">
			<music-list
			v-if="songList.length > 0"
			ref="musiclist"
			:title="title"
			:bg-img="bgImg"
			:rank = "isRank"
			:songs="songList"></music-list>
		</div>
	</transition>
</template>
<script>
	import {mapGetters} from 'vuex';
	import MusicList from 'base/musiclist/musiclist';
	import {getRankDetail} from 'api/rank';
	// import {ERR_OK} from 'api/config';
	export default {
		data () {
			return {
				title: '',
				bgImg: '',
				isRank: true,
				songList: []
			};
		},
		components: {
			MusicList
		},
		created () {
			if (!this.rank.id) {
				this.$router.push({path: '/rank'});
				return;
			}
			this.title = this.rank.topTitle;
			this._getRankDetail(this.rank.id);
		},
		methods: {
			_getRankDetail (id) {
				getRankDetail(id)
				.then(res => {
					this.bgImg = res.topinfo.pic_album;
					console.log(res);
					res.songlist.forEach(song => {
						this.songList.push({
							musicData: {
								albumid: song.data.albumid,
								albummid: song.data.albummid,
								albumname: song.data.albumname,
								singer: song.data.singer,
								interval: song.data.interval,
								songid: song.data.songid,
								songmid: song.data.songmid,
								songname: song.data.songname
							}
						});
					});
				});
			}
		},
		computed: {
			...mapGetters(['rank'])
		}
	};
</script>
<style scoped lang="less">
	@import '~common/less/variable';
	.rank-detail {
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