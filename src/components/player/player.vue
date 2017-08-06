<template>
	<div class="player" v-show="playing">
		<div class="normal-player">
			<div class="background"></div>
			<div class="top">
				<div class="icon-down">
					<i class="icon-back"></i>
				</div>
				<div class="song-name"></div>
				<div class="singer-name"></div>
			</div>
			<div class="middle">
				<div class="cd-pic"></div>
			</div>
			<div class="bottom">
				<div class="operator"></div>
			</div>
		</div>
		<div class="mini-player"></div>
	</div>
</template>
<script>
	import {mapGetters} from 'vuex';

	export default {
		computed: {
			...mapGetters(['playing'])
		}
	};
</script>
<style scoped lang="less">
	@import '~common/less/variable.less';
	.player {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: @color-background;
		z-index: 100;
	}
</style>