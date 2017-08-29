<template>
	<transition	name="slide">
		<div class="singer-detail" ref="singerDetail">
			<!-- <music-list
			ref="musiclist"
			v-if="songList.length > 0"
			:title="singer.singerName"
			:bg-img="singer.avator"
			:songs="songList"></music-list> -->
		</div>
	</transition>
</template>
<script>
	import {mapGetters} from 'vuex';
	import MusicList from 'base/musiclist/musiclist';
	// import {ERR_OK} from 'api/config';

	export default {
		name: 'diss-detail',
		components: {
			MusicList
		},
		data () {
			return {
			};
		},
		created () {
			// 当在详情页面刷新时，跳转到歌手列表页面
			if (!this.diss.dissid) {
				this.$router.push({path: '/recommend'});
			}
		},
		mounted () {
		},
		computed: {
			...mapGetters(['diss'])
		}
	};
</script>
<style scoped lang="less">
	@import '~common/less/variable';
	.dissDetail-wrapper {
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
			.play-wrapper {
				position: absolute;
				bottom: 20px;
				left: 50%;
				transform: translateX(-50%);
				width: 200px;
				height: 30px;
				border: solid 1px @color-theme;
				border-radius: 15px;
				z-index: 20;
				display: flex;
				flex-flow: row nowrap;
				justify-content: center;
				align-items: center;
				.icon-play {
					margin-right: 6px;
					font-size: @font-size-medium-x;
				}
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
			position: fixed;
			bottom: 0;
			z-index: 30;
		}
	}
</style>