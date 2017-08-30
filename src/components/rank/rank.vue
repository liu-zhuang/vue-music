<template>
	<div class="rank-wrapper">
		<scroll class="rankList" v-if="rankArray.length > 0" ref="scroll" :data="rankArray">
			<ul>
				<li  v-for="rank in rankArray">
					<img :src="rank.picUrl" alt="">
					{{rank.topTitle}}
				</li>
			</ul>
		</scroll>
		<router-view></router-view>
	</div>
</template>

<script>
	import {getRankList} from 'api/rank';
	import {ERR_OK} from 'api/config';
	import listview from 'base/listview/listview';
	import Scroll from 'base/scroll/scroll';
	export default {
		name: 'Rank',
		components: {
			listview,
			Scroll
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
						console.log(res.data.topList);
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
		bottom: 0px;
		width: 100%;
		overflow: hidden;
		.rankList {
			height: 100%;
			overflow: hidden;
		}
	}
</style>
