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
		<scroll :data="songList" class="scroll" ref="scroll">
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
	export default {
		name: 'music-list',
		components: {
			Scroll,
			SongList
		},
		data () {
			return {
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
			});
		},
		methods: {
			onBackClick () {
				this.$router.back();
			}
		},
		computed: {
			picStyle () {
				return `background-image:url(${this.bgImg})`;
			},
			...mapGetters(['singer'])
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
			z-index: 30;
		}
		.title {
			height: 40px;
			line-height: 40px;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			font-size: @font-size-large;
			color: @color-text;
			z-index: 30;
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
		.scroll {
			position: fixed;
			top: 289px;
			bottom: 0;
		}
	}
</style>