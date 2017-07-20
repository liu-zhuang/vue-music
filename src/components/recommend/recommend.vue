<template>
	<div v-if="sliders.length > 0 " class="slider-wrapper">
		<slider>
			<div v-for="item in sliders">
				<a href="#">
					<img :src="item.picUrl" alt="">
				</a>
			</div>
		</slider>
	</div>
</template>

<script>
	import {ERR_OK} from 'api/config';
	import {getRecommend} from 'api/recommend';
	import Slider from 'base/slider/slider';

	export default {
		name: 'Recommend',
		data () {
			return {
				sliders: []
			};
		},
		components: {
			Slider
		},
		created () {
			this._getRecommend();
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
			}
		}
	};
</script>

<style lang="less">
	.slider-wrapper {
		margin: 5px 0 ;
	}
</style>
