<template>
	<div class="songlist-wrapper">
		<ul class="song-container">
			<li class="song" v-for="(song,index) in songList">
				<div class="content" @click="onSongClick(index)">
					<div class="rank" v-show="rank">
						<span :class="getRankCls(index)" v-text="getRankTxt(index)"></span>
					</div>
					<div class="txt">
						<h3 class="song-name">{{song.songname}}</h3>
						<p class="song-desc">{{getDesc(song)}}</p>
					</div>
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
			},
			rank: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			getDesc (song) {
				return `${song.singer}·${song.albumname}`;
        },
			onSongClick (index) {
				this.$emit('songClick', index, this.songList);
			},
			getRankCls (index) {
				if (index <= 2) {
					return `icon icon${index}`;
				} else {
					return 'text';
				}
			},
			getRankTxt (index) {
				if (index > 2) {
					return index + 1;
				}
			}
		}
	};
</script>
<style scoped lang="less">
	@import "~less/variable.less";
	@import  "~less/mixin.less";

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
					flex-flow: row nowrap;
					box-sizing: border-box;
					height: 64px;	
					align-items: center;
					font-size: @font-size-medium-x;
					padding-left: 20px;
					width: 100%;
					.rank {
						flex: 0 0 40px;
						.icon {
							display: inline-block;
							width: 25px;
							height: 24px;
							background-size: 25px 24px;
						}
						& .icon0 {
							.bg-image('first')	
						}
						& .icon1 {
							.bg-image('second')	
						}
						& .icon2 {
							.bg-image('third')	
						}
					}
					.txt {
						display: flex;
						flex-flow: column nowrap;
						flex: 1 1 auto;
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
	}
</style>