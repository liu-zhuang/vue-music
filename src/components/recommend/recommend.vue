<template>
	<div>
		<div class="recommend-wrapper" ref="recommendWrapper">
			<scroll ref="scroll" :data="dissList" :probeType="3" class="scrollContainer">
				<div>
					<div v-if="sliders.length > 0 " class="slider-wrapper">
						<slider>
							<div v-for="item in sliders">
								<a :href="item.linkUrl">
									<img @load="loadImage":src="item.picUrl" alt="" @click="clickPic">
								</a>
							</div>
						</slider>
					</div>
					<div class="recommend-list">
						<h1 class="list-title">热门歌单推荐</h1>
						<ul class="dissList">
							<li class="diss" v-for="diss in dissList" @click="onClickDiss(diss)">
								<div class="diss-image">
									<img v-lazy="diss.imgurl"></img>
								</div>
								<div class="diss-text">
									<p class="creator" v-html="diss.dissname"></p>
									<h2 class="dissname" v-html="diss.creator.name"></h2>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<loading v-if="!dissList.length" ltext="loading..."></loading>
			</scroll>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
	import { ERR_OK } from 'api/config';
	import {mapMutations} from 'vuex';
	import {getRecommend, getDissList} from 'api/recommend';
	import Slider from 'base/slider/slider';
	import Scroll from 'base/scroll/scroll';
	import Loading from 'base/loading/loading';
	import {playlistMixin} from 'common/js/mixin';

	export default {
		mixins: [playlistMixin],
		name: 'Recommend',
		data () {
			return {
				sliders: [],
				dissList: []
			};
		},
		components: {
			Slider,
			Scroll,
			Loading
		},
		created () {
			this._getRecommend();
			this._getDissList();
		},
		methods: {
			playListHandler (palyList) {
				if (palyList.length > 0) {
					this.$refs.recommendWrapper.style.bottom = '60px';
				} else {
					this.$refs.recommendWrapper.style.bottom = '';
				}
				this.$refs.scroll.refresh();
			},
			onClickDiss (diss) {
				console.log(diss);
				// this.$router.push({path: `/recommend/dissDetail/${diss.dissid}`});
				this.$router.push({path: `/recommend/${diss.dissid}`});
				this.setDiss(diss);
			},
			_getRecommend () {
				getRecommend()
				.then(res => {
					if (res.code === ERR_OK) {
						this.sliders = res.data.slider;
					}
				})
				.catch(err => {
					console.log(err);
				});
			},
			_getDissList () {
				getDissList()
				.then(res => {
					if (res.code === ERR_OK) {
						this.dissList = res.data.list;
					}
				})
				.catch(err => {
					console.log(err);
				});
			},
			loadImage () {
				if (!this.checkloaded) {
					this.checkloaded = true;
					this.$refs.scroll.refresh();
				}
			},
			clickPic () {
				console.log('click pic');
			},
			...mapMutations({
				setDiss: 'set_diss'
			})
		}
	};
</script>

<style scoped lang="less">
	@import '~less/variable.less';
	
	.recommend-wrapper {
		position: absolute;
		top: 88px;
		bottom: 0px;
		width: 100%;
		overflow: hidden;
		.scrollContainer {
			height: 100%;
			.list-title {
				height: 65px;
				line-height: 65px;
				text-align: center;
				font-size: @font-size-medium;
				color: @color-theme;
			}

			.dissList {
				width: 100%;
				margin: 0 2px;
				overflow:hidden;
				display: flex;
				flex-flow: column nowrap;
			}
			.diss {
				width: 100%;
				height: 80px;
				display: flex;
				flex-flow: row nowrap;
				margin: 2px 0;
				&:first-child,&:last-child {
					margin: 0;
				}
				.diss-image {
					flex: 0 0 80px;
					img {
						height: 80px;
					}
				}
				.diss-text {
					flex: 1 1 auto;
					overflow: hidden;
					display: flex;
					flex-flow: column nowrap;
					justify-content: center;
					align-content: center;
					font-size: @font-size-medium;
					box-sizing: border-box;
					padding: 0 10px;
					.creator {
						color: @color-text;
						margin-bottom: 10px;
					}
					.dissname {
						color: @color-text-d;
					}
				}
			}
		}
	}
</style>
