<template>
	<div class="musiclist-wrapper">
		<div class="back">
			<i class="icon-back" @click="onBackClick"></i>
		</div>
		<div class="title">
			<h3 v-html="title"></h3>
		</div>
		<!-- 动态设定背景图，使用width:100,height:0,padding-top:70%的方法让图片纵宽比10:7
		同时需要设置background-size:cover -->
		<div class="pic" :style="picStyle" ref="img">
			<!-- 为背景图增加滤镜效果 -->
			<div class="filter"></div>
		</div>
		<div class="layer" ref="layer">
		</div>
		<scroll class="scroll" ref="scroll" 
		:listen-scroll="true"
		:data="songList"
		:probe-type="3"
		@scroll="onScroll">
		<div>
			<song-list v-if="songList.length > 0" :songList="songList"></song-list>
		</div>
	</scroll>
</div>
</template>
<script type="text/javascript">
	import {mapGetters} from 'vuex';
	import Scroll from 'base/scroll/scroll';
	import SongList from 'base/songlist/songlist';
	import {CreateSong} from 'common/js/song';
	const IMG_HEADER_HEIGHT = 40;
	export default {
		name: 'music-list',
		components: {
			Scroll,
			SongList
		},
		data () {
			return {
				imgHeight: 0,
				posY: 0,
				songList: []
			};
		},
		props: {
			title: {
				type: String,
				default: ''
			},
			bgImg: {
				type: String,
				default: ''
			},
			songs: {
				type: Array,
				default: null
			},
			singerId: {
				type: String,
				default: ''
			}
		},
		mounted () {
			this.$nextTick(() => {
				this.songs.forEach(song => {
					let {musicData} = song;
					this.songList.push(CreateSong(musicData));
				});
				// 计算顶部背景图的高度，即为下面歌曲列表top的高度
				this.imgHeight = this.$refs.img.clientHeight;
				let scroll = this.$refs.scroll.$el; // 因为scroll是Vue Component,因此其html元素为.$el
				scroll.style.top = this.imgHeight + 'px';
				this.$refs.layer.style.top = this.imgHeight + 'px';
			});
		},
		methods: {
			onBackClick () {
				this.$router.back();
			},
			onScroll (pos) {
				this.posY = pos.y;
			}
		},
		computed: {
			picStyle () {
				return `background-image:url(${this.bgImg})`;
			},
			...mapGetters(['singer'])
		},
		watch: {
			posY (newPos) {
				console.log(newPos);
				if (newPos > 0) {
					// newPos
					const percent = Math.abs(newPos / this.imgHeight);
					const scale = 1 + percent;
					console.log(percent);
					this.$refs.img.style['transform'] = `scale(${scale})`;
					this.$refs.img.style.zIndex = 40;
				} else if (-newPos < (this.imgHeight - IMG_HEADER_HEIGHT)) {
					this.$refs.layer.style.transform = `translateY(${newPos}px)`;
					this.$refs.img.style.paddingTop = (this.imgHeight - Math.abs(newPos)) + 'px';
				} else {
					this.$refs.img.style.zIndex = 35;
				}
			}
		}
	};
</script>
<style scoped lang="less">
	@import '~less/variable.less';
	.musiclist-wrapper {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		.icon-back {
			position: absolute;
			top: 10px;
			left: 10px;
			z-index: 40;
		}
		.title {
			height: 40px;
			line-height: 40px;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			font-size: @font-size-large;
			color: @color-text;
			z-index: 40;
		}
		.pic {
			position: relative;
			width: 100%;
			height: 0;
			padding-top:70%;
			background-size: cover;
			z-index: 20;
			.filter {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: rgba(7, 17, 27, 0.4);
			}
		}
		.layer {
			width: 100%;
			height: 100%;
			position: fixed;
			bottom: 0;
			z-index: 25;
			// background-color: #fff;
			background-color: @color-background;
		}
		.scroll {
			width: 100%;
			height: 100%;
			position: fixed;
			bottom: 0;
			z-index: 30;
		}
	}
</style>