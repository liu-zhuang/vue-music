<template>
	<div class="rank-wrapper" ref="rankWrapper">
		<scroll class="scroll-wrapper" v-if="rankArray.length > 0" ref="scroll" :data="rankArray">
			<ul class="ranklist">
				<li class="rank"  v-for="rank in rankArray" @click="onRankClick(rank)">
					<img class="pic" :src="rank.picUrl" alt="">
					<ul class="songlist">
						<li class="song" v-for="(song,index) in rank.songList">
							<span>{{index + 1}}</span>
							<span>{{song.songname}}-{{song.singername}}</span>
						</li>
					</ul>
				</li>
			</ul>
			<div class="loading-container" v-show="!rankArray.length">
				<loading></loading>
			</div>
		</scroll>
		<router-view></router-view>
	</div>
</template>

<script>
	import {mapMutations} from 'vuex';
	import {getRankList} from 'api/rank';
	import {ERR_OK} from 'api/config';
	import listview from 'base/listview/listview';
	import Scroll from 'base/scroll/scroll';
	import Loading from 'base/loading/loading';
	import {playlistMixin} from 'common/js/mixin';
	export default {
		mixins: [playlistMixin],
		name: 'Rank',
		components: {
			listview,
			Scroll,
			Loading
		},
		data () {
			return {
				rankArray: []
			};
		},
		created () {
			this._getRankList();
		},
		methods: {
			playListHandler (palyList) {
				if (palyList.length > 0) {
					this.$refs.rankWrapper.style.bottom = '60px';
				} else {
					this.$refs.rankWrapper.style.bottom = '';
				}
				if (this.$refs.scroll) {
				this.$refs.scroll.refresh();
				}
			},
			onRankClick (rank) {
				console.log(rank);
				this.setRank(rank);
				this.$router.push({path: `/rank/${rank.id}`});
			},
			_getRankList () {
				getRankList()
				.then(res => {
					if (res.code === ERR_OK) {
						console.log(res.data.topList);
						this.rankArray = res.data.topList;
					}
				})
				.catch();
			},
			...mapMutations({
				setRank: 'set_rank'
			})
		}
	};
</script>

<style scoped lang="less">
	@import '~common/less/variable';
	.rank-wrapper {
		position: fixed;
		top: 88px;
		bottom: 0px;
		width: 100%;
		overflow: hidden;
		.scroll-wrapper {
			height: 100%;
			overflow: hidden;
			.ranklist {
				display: flex;
				flex-flow: column nowrap;
				.rank {
					display: flex;
					flex-flow: row nowrap;
					height: 100px;
					margin: 20px 20px 0 20px;
					justify-content: center;
					align-items: center;
					background-color: @color-highlight-background;
					.pic {
						height: 100px;
					}
					.songlist {
						flex: 1 1 auto;
						color: @color-text-d;
						font-size: 12px;
						// height: 100px;
						// box-sizing: border-box;
						.song {
							padding: 10px 0 0 20px;
						}
					}
				}
			}
			.loading-container {
				position: absolute;
				width: 100%;
				top: 50%;
				transform: translateY(-50%);
			}
		}
	}
</style>
