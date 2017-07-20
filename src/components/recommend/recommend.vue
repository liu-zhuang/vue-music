<template>
	<div>
		<div v-if="sliders.length > 0 " class="slider-wrapper">
			<slider>
				<div v-for="item in sliders">
					<a :href="item.linkUrl">
						<img :src="item.picUrl" alt="">
					</a>
				</div>
			</slider>
		</div>
		<div class="dissList">
			<span v-for="item in dissList">
				{{item.dissname}}
			</span>
		</div>
	</div>
</template>

<script>
	import { ERR_OK } from 'api/config';
	import { getRecommend, getDissList } from 'api/recommend';
	import Slider from 'base/slider/slider';

	export default {
		name: 'Recommend',
		data () {
			return {
				sliders: [],
				dissList: []
			};
		},
		components: {
			Slider
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
			}
		}
	};
</script>

<style lang="less">
	.slider-wrapper {
		margin: 5px 0 ;
	}
</style>
