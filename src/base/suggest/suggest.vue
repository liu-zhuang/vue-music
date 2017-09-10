<template>
	<scroll ref="scroll" :data="songList"  :probeType="3" class="scroll-wrapper">
		<div class="sugger-wrapper">
			<ul class="singerList" v-if="singerList.length > 0 && singerList[0].singerId">
				<li class="singer-wrapper" v-for="singer in singerList">
					<img class="singer-img" :src="singer.avator">
					<div class="singer-txt">
						<p class="singer-name" v-html="singer.singerName"></p>
					</div>
				</li>
			</ul>
			<ul class="songList">
				<li class="song-wrapper" v-for="suggest in songList">
					<i class="icon-music music-icon"></i>
					<div class="song-text">
						<div class="name" v-html="suggest.songname"></div>
						<div class="singer" v-html="suggest.singer"></div>
					</div>
				</li>
			</ul>
		</div>
	</scroll>
</template>
<script>
	import {search} from 'api/search';
	import {CreateSong} from 'common/js/song';
	import Singer from 'common/js/singer';
	import Scroll from 'base/scroll/scroll';
	export default {
		name: 'suggest',
		components: {
			Scroll
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
				singerList: [],
				songList: []
			};
		},
		watch: {
			keyword (val) {
				this.songList = [];
				this.singerList = [];
				if (!val) {
					return;
				}
				search(this.keyword, 1, 20, this.showSinger)
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
					if (res.data.zhida) {
						let temp = res.data.zhida;
						let singer = new Singer(temp.singermid, temp.singername, temp.singerid);
						this.singerList.push(singer);
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
	}
}

</style>