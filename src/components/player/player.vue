<template>
	<div>
		<div class="player" v-show="playList.length > 0 && fullScreen">
			<div class="normal-player" v-show="fullScreen">
				<div class="background" ref="divBg"></div>
				<div class="top">
					<div class="icon-down">
						<i class="icon-back" @click="iconBackClick"></i>
					</div>
					<div class="song-name">{{currentSong.songname}}</div>
					<div class="singer-name">{{currentSong.singer}}</div>
				</div>
				<div class="middle">
					<div class="cd-wrapper" :class="playing ? 'play' : 'pause'">
						<img class="img-cd" :src="currentSong.img"></img>
					</div>
				</div>
				<div class="bottom">
					<div class="dot-wrapper"></div>
					<div class="progress-wrapper"></div>
					<div class="operator-wrapper">
						<div class="icon mode">
							<i :class="iconMode"></i>
						</div>
						<div class="icon prev">
							<i class="icon-prev"></i>
						</div>
						<div class="icon btn-play" @click="playClick">
							<i :class="iconPlay"></i>
						</div>
						<div class="icon next">
							<i class="icon-next"></i>
						</div>
						<div class="icon favorite">
							<i :class="iconFavorite"></i>
						</div>
					</div>
				</div>
			</div>
			<audio ref="audio" :src="currentSong.url" autoplay="true"></audio>
		</div>
		<div class="mini-player" v-show="playList.length > 0 && !fullScreen">
			<div class="mini-icon-wrapper" @click.stop.prevent="miniplayerWrapperClick">
				<img :src="currentSong.img" :class="playing ? 'play' : 'pause'">
			</div>
			<div class="mini-text-wrapper">
				<p class="songname">{{currentSong.songname}}</p>
				<p class="singername">{{currentSong.singer}}</p>
			</div>
			<div class="mini-playCtl-wrapper" @click.stop.prevent="playClick">
				<i :class="iconPlay"></i>
			</div>
			<div class="mini-playlist-wrapper">
				<i class="icon-playlist"></i>
			</div>
		</div>
	</div>
</template>
<script>
	import {mapGetters, mapMutations} from 'vuex';

	export default {
		data () {
			return {
				iconMode: 'icon-loop',
				iconFavorite: 'icon-not-favorite',
				iconPlay: 'icon-pause'
			};
		},
		mounted () {
			this.$nextTick(() => {
			});
		},
		methods: {
			iconBackClick () {
				console.log('click');
				this.setFullScreen(false);
			},
			miniplayerWrapperClick () {
				this.setFullScreen(true);
			},
			playClick () {
				this.setPlaying(!this.playing);
				if (this.playing) {
					this.$refs.audio.play();
				} else {
					this.$refs.audio.pause();
				}
			},
			...mapMutations({
				setFullScreen: 'set_fullscreen',
				setPlaying: 'set_playing'
			})
		},
		computed: {
			// iconPlay () {
			// 	if (this.palying) {
			// 		return 'icon-pause';
			// 	} else {
			// 		return 'icon-play';
			// 	}
			// },
			...mapGetters(['playing', 'currentSong', 'fullScreen', 'playList'])
		},
		watch: {
			currentSong (val) {
				this.$refs.divBg.style.backgroundImage = `url(${val.img})`;
			},
			playing (val) {
				if (val) {
					this.iconPlay = 'icon-pause';
				} else {
					this.iconPlay = 'icon-play';
				}
			}
		}
	};
</script>
<style scoped lang="less">
	@import '~common/less/variable.less';
	.player {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
		background-color: @color-background;
		z-index: 100;
		overflow: hidden;
		.normal-player {
			width: 100%;
			height:100%;
			position:relative;
			.background {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background-repeat: no-repeat;
				background-size: cover;
				background-position: center;
				filter:blur(10px);
				z-index: -1;
			}
			.top {
				padding: 10px 0 0 10px;
				text-align: center;
				.icon-down {
					.icon-back {
						position: absolute;
						top: 10px;
						left: 10px;
						transform: rotate(-90deg);
					}
				}
				.song-name {
					display: inline-block;
					font-size: @font-size-large;
					color: @color-text;
					line-height: 40px;
				}
				.singer-name {
					font-size: @font-size-medium;
					color: @color-text;
					line-height: 20px;
				}
			}
			.middle {
				position: absolute;
				top: 80px;
				bottom: 170px;
				left: 10%;
				width: 80%;
				box-sizing: border-box;
				.cd-wrapper {
					width: 100%;
					text-align: center;
					display: block;
					.img-cd {
						width: 100%;
						height: 100%;
						box-sizing: border-box;
						border: 10px solid rgba(255, 255, 255, 0.1);
						border-radius: 50%;
					}
					&.play {
						animation: rotate 20s linear infinite;
					}
					&.pause {
						animation-play-state: paused
					}
				}
			}
			.bottom {
				position: absolute;
				bottom: 50px;
				width: 100%;
				
				.operator-wrapper {
					display: flex;
					flex-flow: row nowrap;
					justify-content: center;
					align-items:center;
					padding: 20px;
					.icon {
						flex: 1 1 auto;
						color: @color-theme;
						font-size: 30px;
						text-align: center;
					}
					.btn-play {
						font-size: 40px;
					}
				}
			}
		}
		
	}
	.mini-player {
		position: fixed;
		bottom: 0px;
		width: 100%;
		height: 60px;
		z-index: 100;
		background-color: @color-highlight-background;
		display: flex;
		flex-flow: row nowrap;
		.mini-icon-wrapper {
			flex: 60px 0 0 ;
			padding-left: 10px;
			display: flex;
			align-items: center;
			img {
				width: 50px;
				height: 50px;
				border-radius: 50%;
			}
			.play {
				animation: rotate 20s linear infinite;
			}
			.pause {
				animation-play-state: paused
			}
		}
		.mini-text-wrapper {
			flex: auto 1 1;
			display: flex;
			flex-flow: column nowrap;
			justify-content: center;
			.songname {
				font-size: @font-size-medium;
				color: @color-text;
				margin-bottom: 5px;
			}
			.singername {
				font-size: @font-size-small;
				color: @color-text-d;
			}
		}
		.mini-playCtl-wrapper {
			line-height: 60px;
			font-size: 30px;
			color: @color-theme-d;
			margin-right: 20px;
		}
		.mini-playlist-wrapper {
			font-size: 30px;
			line-height: 60px;
			color: @color-theme-d;
			margin-right: 10px;
		}
	}
	@keyframes rotate {
		.rotate-frames;
	}
	.rotate-frames (){
		from {transform: rotate(0);}
		to {transform: rotate(360deg);}
	}
</style>