<template>
	<h1>推荐</h1>
</template>

<script>
	import {ERR_OK} from 'api/config';
	import {getRecommend} from 'api/recommend';
	export default {
		name: 'Recommend',
		created () {
			this._getRecommend();
		},
		methods: {
			_getRecommend () {
				getRecommend()
				.then(res => {
					if (res.code === ERR_OK) {
						console.log(res.data);
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
</style>
