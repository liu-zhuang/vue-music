<template>
	<div class="recommend-wrapper">
		<scroll ref="scroll" :data="dissList" :probeType="3" class="scrollContainer">
			<div>
				<div v-if="sliders.length > 0 " class="slider-wrapper">
					<slider>
						<div v-for="item in sliders">
							<a :href="item.linkUrl">
								<img @load="loadImage":src="item.picUrl" alt="">
							</a>
						</div>
					</slider>
				</div>
				<div class="recommend-list">
					<h1 class="list-title">热门歌单推荐</h1>
					<ul class="dissList">
						<li class="diss" v-for="diss in dissList">
							<div class="diss-image">
								<img :src="diss.imgurl"></img>
							</div>
							<div class="diss-text">
								<h2 class="creator" v-html="diss.creator.name"></h2>
								<p class="dissname" v-html="diss.dissname"></p>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</scroll>
	</div>
</template>

<script>
	import { ERR_OK } from 'api/config';
	import { getRecommend, getDissList } from 'api/recommend';
	import Slider from 'base/slider/slider';
	import Scroll from 'base/scroll/scroll';

	export default {
		name: 'Recommend',
		data () {
			return {
				sliders: [],
				dissList: []
			};
		},
		components: {
			Slider,
			Scroll
		},
		created () {
			this._getRecommend();
			this._getDissList();
		},
		methods: {
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
			}
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
