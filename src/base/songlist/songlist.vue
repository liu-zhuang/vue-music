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
		width: 100%;
		.song-container	{
			width: 100%;
			.song {
				display: flex;
				flex-flow: row nowrap;
				width: 100%;
				margin: 2px 0;
				.content {
					display: flex;
					flex-flow: column nowrap;
					box-sizing: border-box;
					height: 64px;	
					justify-content: center;
					font-size: @font-size-medium-x;
					padding-left: 20px;
					.song-name {
						color: @color-text;
					}
					.song-desc {
						margin-top: 10px;
						color: @color-text-d;
					}	
				}
			}
		}
	}
</style>