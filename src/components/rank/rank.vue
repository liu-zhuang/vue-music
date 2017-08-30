<template>
	<div>
		<div v-if="rankArray.length > 0" class="rank-wrapper" ref="rankWrapper">
			<listview :data="rankArray" @singerClick="onRankClick" ref="scroll">
			</listview>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
	import {getRankList} from 'api/rank';
	import {ERR_OK} from 'api/config';
	import listview from 'base/listview/listview';
	export default {
		name: 'Rank',
		components: {
			listview
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
			onRankClick () {},
			_getRankList () {
				getRankList()
				.then(res => {
					if (res.code === ERR_OK) {
						this.rankArray = res.data.topList;
					}
				})
				.catch();
			}
		}
	};
</script>

<style scoped lang="less">
	.rank-wrapper {
		position: fixed;
		top: 88px;
		bottom: 10px;
		width: 100%;
		overflow: hidden;
	}
</style>
