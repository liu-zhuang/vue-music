<template>
	<div class="singer-detail">
		<span>singer detail11111111111111111111111111111111111111</span>
	</div>
</template>
<script>
	export default {
		name: 'singerDetail',
		created () {
			console.log(this.$route.path, this.$route.params, this.$route.query, this.$route.matched);
		}
	};
</script>
<style scoped lang="less">
	.singer-detail {
		position: fixed;
		top: 88px;
		bottom: 10px;
		width: 100%;
		height: 100%;
		overflow: hidden;
		z-index: 100;
		background-color: #FFF;
	}
</style>