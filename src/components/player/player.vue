<template>
	<div>
		<div ref="player" class="player" v-show="playList.length > 0 && fullScreen">
			<transition name="normal" @enter="onEnter" @after-enter="onAfterEnter"
			@before-leave="onLeave" @after-leave="onAfterLeave">
			<div class="normal-player" v-show="fullScreen">
				<div class="background" ref="divBg"></div>
				<div class="top">
					<div class="icon-down">
						<i class="icon-back" @click="iconBackClick"></i>
					</div>
					<div class="song-name" v-html="currentSong.songname"></div>
					<div class="singer-name" v-html="currentSong.singer"></div>
				</div>
				<div class="middleContent">
					<div class="middle-l">
						<div class="middle" ref="cdWrapper">
							<div class="cd-wrapper" :class="playing ? 'play' : 'play pause'">
								<img class="img-cd" :src="currentSong.img"></img>
							</div>
						</div>
						<div class="playing-lyric-wrapper">
							<div class="playing-lyric"></div>
						</div>
					</div>
					<scroll ref="lyricScroll" class="middle-r" v-if="currentLyric && currentLyric.lines" :data="currentLyric.lines">
						<div class="lyric-wrapper">
							<div v-if="currentLyric">
								<p ref="lyricLines" class="text" :class="currentLineNum === index ? 'current' : ''" v-for="(lyric, index) in currentLyric.lines">
									{{lyric.txt}}
								</p>
							</div>
						</div>
					</scroll>
				</div>
				<div class="bottom">
					<div class="dot-wrapper"></div>
					<div class="progress-wrapper">
						<div class="timer-left">
							{{currentSongTime}}
						</div>
						<progress-bar :percent="percent" @percentChange="percentChange">
						</progress-bar>
						<div class="timer-right">
							{{currentSongDuration}}
						</div>
					</div>
					<div class="operator-wrapper">
						<div class="icon mode" @click="switchPlaymode">
							<i :class="iconMode"></i>
						</div>
						<div class="icon prev" @click="prevClick">
							<i class="icon-prev"></i>
						</div>
						<div class="icon btn-play" @click="playClick">
							<i :class="iconPlay"></i>
						</div>
						<div class="icon next" @click="nextClick">
							<i class="icon-next"></i>
						</div>
						<div class="icon favorite">
							<i :class="iconFavorite"></i>
						</div>
					</div>
				</div>
			</div>
		</transition>
		<audio ref="audio" @play="onAudioReady"  @error="onAudioError" :src="currentSong.url" @timeupdate="timeUpdate" @ended="onEnd"></audio>
	</div>
	<transition name="mini">  
		<div class="mini-player" v-show="playList.length > 0 && !fullScreen">
			<div ref="miniCdWrapper" class="mini-icon-wrapper" @click.stop.prevent="miniplayerWrapperClick">
				<img :src="currentSong.img" :class="playing ? 'play' : 'play pause'">
			</div>
			<div class="mini-text-wrapper">
				<p class="songname" v-html="currentSong.songname"></p>
				<p class="singername" v-html="currentSong.singer"></p>
			</div>
			<div class="mini-playCtl-wrapper" @click.stop.prevent="playClick">
				<i :class="iconPlay"></i>
			</div>
			<div class="mini-playlist-wrapper">
				<i class="icon-playlist"></i>
			</div>
		</div>
	</transition>
</div>
</template>
<script>
	import {mapGetters, mapMutations} from 'vuex';
	import animations from 'create-keyframe-animation';
	import Scroll from 'base/scroll/scroll';
	// https://github.com/HenrikJoreteg/create-keyframe-animation
	import {prefixStyle} from 'common/js/dom';
	import {playMode} from 'common/js/config';
	import {shuffle} from 'common/js/utility';
	import LyricParser from 'lyric-parser';
	import progressBar from 'com/progressBar/progressBar';
	let transform = prefixStyle('transform');
	export default {
		data () {
			return {
				iconFavorite: 'icon-not-favorite',
				iconPlay: 'icon-pause',
				currentTime: 0,
				percent: 0,
				audioReady: false,
				currentLyric: '',
				currentLineNum: 0
			};
		},
		components: {
			progressBar,
			Scroll
		},
		mounted () {
			this.$nextTick(() => {
			});
		},
		methods: {
			iconBackClick () {
				this.$refs.cdWrapper.style.transition = 'all 1s';
				const {x, y, scale} = this._calcPosition();
				this.$refs.cdWrapper.style[transform] = `translate3d(-${x}px,${y}px,0) scale(${scale})`;
				setTimeout(() => {
					this.setFullScreen(false);
				}, 1000);
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
			prevClick () {
				if (this.currentIndex > 0) {
					this.setCurrentindex(this.currentIndex - 1);
				} else {
					this.setCurrentindex(this.playList.length - 1);
				}
				if (!this.playing) {
					this.setPlaying(true);
				} else {
					setTimeout(() => {
						if (this.$refs.audio.readyState === 4) {
							this.$refs.audio.play();
						}
					}, 2000);
				}
			},
			nextClick () {
				if (this.currentIndex === this.playList.length - 1) {
					this.setCurrentindex(0);
				} else {
					this.setCurrentindex(this.currentIndex + 1);
				}
				if (!this.playing) {
					this.setPlaying(true);
				} else {
					setTimeout(() => {
						if (this.$refs.audio.readyState === 4) {
							this.$refs.audio.play();
						}
					}, 2000);
				}
			},
			onEnter (el, done) {
				// 计算cd wrapper 的初始位置，缩放比例
				let {x, y, scale} = this._calcPosition();
				// 动画的js钩子函数
				let animation = {
					0: {
						transform: `translate3d(-${x}px,${y}px,0) scale(${scale})`
					},
					60: {
						transform: `translate3d(0,0,0) scale(1.1)`
					},
					100: {
						transform: `translate3d(0,0,0) scale(1)`
					}
				};
				animations.registerAnimation({
					name: 'cdmove',
					animation,
					presets: {
						duration: 2000,
						easing: 'linear',
						delay: 100
					}
				});
				animations.runAnimation(this.$refs.cdWrapper, 'cdmove', () => {
					done();
				});
			},
			onAfterEnter () {
				// 进入完成后移除该动画
				animations.unregisterAnimation('cdmove');
				this.$refs.cdWrapper.style.animation = '';
			},
			onLeave (el, done) {
			},
			onAfterLeave () {
				this.$refs.cdWrapper.style.transition = '';
				this.$refs.cdWrapper.style[transform] = '';
			},
			timeUpdate (e) {
				this.currentTime = e.target.currentTime;
				this.percent = this.currentTime / this.currentSong.duration;
			},
			onAudioReady (e) {
				this.audioReady = true;
			},
			onAudioError (e) {
				this.audioReady = true;
			},
			onEnd (e) {
				console.log('end');
				if (this.playMode === playMode.loop) {
					console.log('loop');
					this.$refs.audio.currentTime = 0;
					this.$refs.audio.play();
				} else {
					this.nextClick();
				}
			},
			percentChange (percent) {
				const currentTime = this.currentSong.duration * percent;
				this.$refs.audio.currentTime = currentTime;
				if (!this.palying) {
					this.setPlaying(true);
					if (!this.audioReady) {
						return;
					}
					this.$refs.audio.play();
				}
			},
			switchPlaymode () {
				this.setPlayMode((this.playMode + 1) % 3);
				let current = this.currentSong;
				if (this.playMode === playMode.random) {
					// 随机时，打乱playlist
					this.setPlayList(shuffle(this.playList));
				} else {
					// 非随机时，playlist = sequenceList
					this.setPlayList(this.sequencePlayList);
				}
				let newIndex = this.playList.findIndex(item => {
					return item.songid === current.songid;
				});
				this.setCurrentindex(newIndex);
			},
			...mapMutations({
				setFullScreen: 'set_fullscreen',
				setPlaying: 'set_playing',
				setCurrentindex: 'set_currentindex',
				setPlayMode: 'set_playmode',
				setPlayList: 'set_playlist'
			}),
			_calcPosition () {
				let miniCdWrapperPaddingLeft = 10; // mini播放器中cdwrapper的padding-left
				let miniCdWrapperWidth = 50; // cd wrapper 的宽度
				let screenWidth = window.innerWidth; // 屏幕的宽度
				let x = (screenWidth / 2) - miniCdWrapperPaddingLeft - (miniCdWrapperWidth / 2);
				let miniCdWrapperHeight = 60; // cd wrapper 的高度
				let screenHeight = window.innerHeight; // 屏幕的高度
				let topHeight = 80;
				let y = screenHeight - (miniCdWrapperHeight / 2) - topHeight - (screenWidth / 2);
				let scale = miniCdWrapperWidth / (screenWidth * 0.8);
				return {x, y, scale};
			},
			_calc (val) {
				var min = Math.floor(val / 60).toString().padStart(2, 0);
				var second = Math.floor(val % 60).toString().padStart(2, 0);
				return `${min}:${second}`;
			}
		},
		computed: {
			currentSongDuration () {
				return this._calc(this.currentSong.duration);
			},
			currentSongTime () {
				return this._calc(this.currentTime);
			},
			iconMode () {
				return this.playMode === 0 ? 'icon-sequence' : this.playMode === 1 ? 'icon-loop' : 'icon-random';
			},
			...mapGetters(['playing', 'currentSong', 'fullScreen', 'playList', 'currentIndex', 'playMode', 'sequencePlayList'])
		},
		watch: {
			currentSong (val, old) {
				if (old.songid === val.songid) {
					return;
				}
				val.getLyric()
				.then(res => {
					this.currentLyric = new LyricParser(res, ({lineNum, txt}) => {
						console.log(lineNum, txt);
						this.currentLineNum = lineNum;
						if (lineNum > 5) {
							const lineEl = this.$refs.lyricLines[lineNum - 5];
							this.$refs.lyricScroll.scrollToElement(lineEl, 1000);
						} else {
							this.$refs.lyricScroll.scrollTo(0, 0, 1000);
						}
					});
					if (this.playing) {
						this.currentLyric.play();
					}
				});
				this.$refs.divBg.style.backgroundImage = `url(${val.img})`;
				this.$nextTick(() => {
					if (this.audioReady && this.playing) {
						this.$refs.audio.play();
					}
				});
			},
			playing (val) {
				if (val) {
					this.iconPlay = 'icon-pause';
					setTimeout(() => {
						if (this.$refs.audio.readyState === 4) {
							this.$refs.audio.play();
						}
					}, 1000);
				} else {
					this.iconPlay = 'icon-play';
					this.$refs.audio.pause();
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
				opacity: 0.6;
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
			.middleContent {
				position: fixed;
				top: 80px;
				bottom: 170px;
				width: 100%;
				box-sizing: border-box;
				display: flex;
				flex-flow: row nowrap;
				.middle-l {
					height: 100%;
					flex: 0 0 100%;
					.middle {
						.cd-wrapper {
							width: 80%;
							text-align: center;
							display: block;
							position: relative;
							left: 10%;
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
				.middle-r {
					height: 100%;
					flex: 0 0 100%;
					width: 80%;
					overflow: hidden;
					text-align: center;
					.text {
						line-height: 32px;
						color: @color-text-l;
						font-size: @font-size-medium;
					}
					& .current {
						color: @color-text;
					}					
				}
			}

			.bottom {
				position: absolute;
				bottom: 30px;
				width: 100%;
				.progress-wrapper {
					width: 100%;
					height: 30px;
					box-sizing: border-box;
					display: flex;
					flex-flow: row nowrap;
					justify-content: center;
					align-items: center;
					padding: 0 20px 0 20px;
					.timer-left {
						flex: 0 0 35px;
						color: @color-text;
						font-size: @font-size-small;
					}
					.timer-right {
						flex: 0 0 35px;
						color: @color-text;						
						font-size: @font-size-small;
						padding-left: 5px;
					}
					.progressBar-wrapper {
						flex: 1 1 auto;
					}
				}
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
	.normal-enter-active, .normal-leave-active {
		transition: all 0.4s;
		.top, .bottom {
			transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
		}
	}
	.normal-enter, .normal-leave-to {
		opacity: 0;
		.top {
			transform: translate3d(0, -100px, 0);
		}
		.bottom {
			transform: translate3d(0, 100px, 0);
		}
	}

	.mini-enter-active, .mini-leave-active {
		transition: all 0.4s;
	}
	.mini-enter, .mini-leave-to {
		opacity: 0;
	}
	@keyframes rotate {
		.rotate-frames;
	}
	.rotate-frames () {
		from {transform: rotate(0);}
		to {transform: rotate(360deg);}
	}
</style>