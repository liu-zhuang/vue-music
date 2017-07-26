<template>
	<div class="songlist-wrapper">
		<ul class="song-container">
			<li class="song" v-for="song in songList">
				<div class="content">
					<h3 class="song-name">{{song.songname}}</h3>
					<p class="song-desc">{{getDesc(song)}}</p>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
	export default {
		name: 'song-list',
		props: {
			songList: {
				type: Array,
				default: null
			}
		},
		methods: {
			getDesc (song) {
				return `${song.singer}·${song.albumname}`;
			}
		}
	};
</script>
<style scoped lang="less">
	@import "~less/variable.less";

	.songlist-wrapper {		
		display: flex;
		.song-container	{
			.song {
				display: flex;
				flex-flow: row nowrap;
				width: 100%;
				margin: 2px 0;
				.content {
					display: flex;
					flex-flow: column nowrap;
					.song-name {
						color: @color-text;
					}
					.song-desc {
						margin: 2px 0;
						color: @color-text-d;
					}	
				}
			}
		}
	}
</style>