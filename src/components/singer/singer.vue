<template>
	<h1>歌手</h1>
</template>

<script>
	import {getSingerList} from 'api/singer';
	import {ERR_OK} from 'api/config';
	export default {
		name: 'Singer',
		data () {
			return {
				singerList: []
			};
		},
		mounted () {
			this.$nextTick(() => {
				this._getSingerList();
			});
		},
		methods: {
			_getSingerList () {
				getSingerList()
				.then(res => {
					if (res.code === ERR_OK) {
						this.singerList = res.data;
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
