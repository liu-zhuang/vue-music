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
		<div class="pic" :style="picStyle">
			<!-- 为背景图增加滤镜效果 -->
			<div class="filter"></div>
		</div>
		<scroll>
			<div>
				<song-list></song-list>
			</div>
		</scroll>
	</div>
</template>
<script type="text/javascript">
	import {mapGetters} from 'vuex';
	import Scroll from 'base/scroll/scroll';
	import {getSingerSongList} from 'api/singer';
	import {ERR_OK} from 'api/config';
	import SongList from 'base/songlist/songlist';
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
				getSingerSongList(this.singer.key)
				.then(res => {
					if (res.code === ERR_OK) {
						this.songList = res.data.list;
					}
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
	}
</style>