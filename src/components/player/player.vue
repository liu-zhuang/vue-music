<template>
	<div class="player" v-show="playing">
		<div class="normal-player">
			<div class="background" ref="divBg"></div>
			<div class="top">
				<div class="icon-down">
					<i class="icon-back"></i>
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
				<div class="operator"></div>
			</div>
		</div>
		<div class="mini-player"></div>
		<audio :src="currentSong.url" autoplay="true"></audio>
	</div>
</template>
<script>
	import {mapGetters} from 'vuex';

	export default {
		mounted () {
			this.$nextTick(() => {
			});
		},
		computed: {
			...mapGetters(['playing', 'currentSong'])
		},
		watch: {
			currentSong (val) {
				this.$refs.divBg.style.backgroundImage = `url(${val.img})`;
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
		background-color: @color-background;
		z-index: 100;
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