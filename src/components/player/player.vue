<template>
	<div class="player" v-show="playing">
		播放器
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