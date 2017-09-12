<template>
	<scroll ref="scroll" :data="songList"  :probeType="3" class="scroll-wrapper" :pullup="pullup" @scrollToEnd="onScrollToEnd">
		<div class="sugger-wrapper">
			<ul class="singerList" v-if="singerList.length > 0 && singerList[0].singerId">
				<li @click="onSingerClick(singer)" class="singer-wrapper" v-for="singer in singerList">
					<img class="singer-img" :src="singer.avator">
					<div class="singer-txt">
						<p class="singer-name" v-html="singer.singerName"></p>
					</div>
				</li>
			</ul>
			<ul class="songList">
				<li @click="onSongClick(suggest)" class="song-wrapper" v-for="suggest in songList">
					<i class="icon-music music-icon"></i>
					<div class="song-text">
						<div class="name" v-html="suggest.songname"></div>
						<div class="singer" v-html="suggest.singer"></div>
					</div>
				</li>
			</ul>

			<div v-show="showPullTips" class="bottomline-wrapper" ref="pull">
				<span class="left-line"></span>
				<span class="txt">上拉加载更多</span>
				<span class="right-line"></span>
			</div>
			<div v-show="atEnd" class="bottomline-wrapper" ref="bottomline">
				<span class="left-line"></span>
				<span class="txt">我是有底线的</span>
				<span class="right-line"></span>
			</div>
		</div>
		<loading v-if="loading" ltext="拼命加载中..."></loading>
	</scroll>
</template>
<script>
	import {search} from 'api/search';
	import Loading from 'base/loading/loading';
	import {CreateSong} from 'common/js/song';
	import Singer from 'common/js/singer';
	import {mapMutations, mapActions} from 'vuex';
	import Scroll from 'base/scroll/scroll';

	const PAGE_SIZE = 20;

	export default {
		name: 'suggest',
		components: {
			Scroll,
			Loading
		},
		props: {
			keyword: {
				type: String,
				default: ''
			},
			showSinger: {
				type: Boolean,
				default: false
			}
		},
		data () {
			return {
				pullup: true,
				loading: false,
				singerList: [],
				songList: [],
				currentPage: 1,
				totalResult: 0,
				atEnd: false
			};
		},
		methods: {
			onSingerClick (singer) {
				this.$router.push({path: `/singer/${singer.singerId}`});
				this.setSinger(singer);
			},
			onSongClick (song) {
				this.addSong2List(song);
			},
			onScrollToEnd () {
				if (this.currentPage * PAGE_SIZE >= this.totalResult) {
					this.atEnd = true;
					return;
				}
				this.loading = true;
				this.currentPage += 1;
				search(this.keyword, this.currentPage, PAGE_SIZE, this.showSinger)
				.then(res => {
					res.data.song.list.forEach(song => {
						let musicData = CreateSong({
							albumid: song.albumid,
							albummid: song.albummid,
							albumname: song.albumname,
							singer: song.singer,
							interval: song.interval,
							songid: song.songid,
							songmid: song.songmid,
							songname: song.songname
						});
						this.songList.push(musicData);
					});
				});
				setTimeout(() => {
					this.loading = false;
				}, 1000);
			},
			...mapMutations({
				setSinger: 'set_singer'
			}),
			...mapActions({
				addSong2List: 'insertSong'
			})
		},
		computed: {
			showPullTips () {
				if (this.songList.length >= PAGE_SIZE) {
					if (!this.atEnd) {
						return true;
					} else {
						return false;
					}
				} else {
					return false;
				}
			}
		},
		watch: {
			keyword (val) {
				this.currentPage = 1;
				this.atEnd = false;
				this.songList = [];
				this.singerList = [];
				if (!val) {
					return;
				}
				search(this.keyword, this.currentPage, PAGE_SIZE, this.showSinger)
				.then(res => {
					if (res && res.data) {
						if (res.data.song && res.data.song.list) {
							this.totalResult = res.data.song.totalnum;
							res.data.song.list.forEach(song => {
								let musicData = CreateSong({
									albumid: song.albumid,
									albummid: song.albummid,
									albumname: song.albumname,
									singer: song.singer,
									interval: song.interval,
									songid: song.songid,
									songmid: song.songmid,
									songname: song.songname
								});
								this.songList.push(musicData);
							});
						}
						if (res.data.zhida) {
							let temp = res.data.zhida;
							let singer = new Singer(temp.singermid, temp.singername, temp.singerid);
							this.singerList.push(singer);
						}
					}
				});
			}
		}
	};
</script>
<style scoped lang="less">
	@import "~common/less/variable";
	.scroll-wrapper {
		height: 100%;
		overflow: hidden;
		.sugger-wrapper {
			.singerList {
				.singer-wrapper {
					width: 100%;
					// border-bottom: 1px solid @color-text-d;
					color: @color-text-d;
					display: flex;
					flex-flow: row nowrap;
					align-items: center;
					padding: 5px;
					.singer-img {
						width: 40px;
						height: 40px;
						border-radius: 50%;
						margin-right: 10px;
					}
					.singer-txt {
						font-size: 14px;
					}
				}
			}
			.songList {
				.song-wrapper {
					width: 100%;
					color: @color-text-d;
					display: flex;
					flex-flow: row nowrap;
					align-items: center;
					padding: 5px;
					.music-icon{
						width: 32px;
						height: 32px;
						font-size: 24px;
						margin-right: 10px;
					}
					.song-text {
						display: flex;
						flex-flow: column;
						.name {
							font-size: 16px;
							margin-bottom: 5px;
						}
						.singer	{
							font-size: 12px;
						}
					}
				}
			}
			.bottomline-wrapper {
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
				margin-top: 10px;
				.left-line {
					flex: 1 1 auto;
					height: 1px;
					background-color: @color-text-d;
					margin: 0 10px 0 25px;;
				}
				.txt {
					flex: 0 0 auto;
					font-size: 12px;
					color: @color-text-d;
					text-align:center;
				}
				.right-line {
					flex: 1 1 auto;
					height: 1px;
					background-color: @color-text-d;
					margin: 0 25px 0 10px;
				}
			}

		}

	}
</style>