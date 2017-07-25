<template>
	<div v-if="groupArray.length > 0" class="singer-wrapper">
		<listview :data="groupArray" @singerClick="onSingerClick"></listview>
		<router-view></router-view>
	</div>
</template>

<script>
	import {getSingerList} from 'api/singer';
	import {ERR_OK} from 'api/config';
	import Singer from 'common/js/singer';
	import Listview from 'base/listview/listview';
	import {mapMutations} from 'vuex';
	const HOT_KEY = 'Hot';
	const HOT_KEYWORD = '热门';
	const HOT_COUNT = 10;
	export default {
		name: 'Singer',
		components: {
			Listview
		},
		data () {
			return {
				singerList: [],
				groupList: {},
				groupArray: []
			};
		},
		mounted () {
			console.log(this.$route.path, this.$route.params, this.$route.query, this.$route.matched);
			this.$nextTick(() => {
				this._getSingerList();
			});
		},
		methods: {
			onSingerClick (singer) {
				this.$router.push({path: `/singer/${singer.singerId}`});
				// this.$store.commit('set_singer', singer); 常规使用，也可以使用语法糖来实现https://vuex.vuejs.org/zh-cn/mutations.html
				this.setSinger(singer);
			},
			/**
			 * _getSingerList 根据API获取歌手信息
			 * @return {Array} 歌手数组
			 */
			 _getSingerList () {
			 	let self = this;
			 	getSingerList()
			 	.then(res => {
			 		if (res.code === ERR_OK) {
			 			self.singerList = res.data.list;
			 			self._resortSingerList(self.singerList);
			 		}
			 	})
			 	.catch(err => {
			 		console.log(err);
			 	});
			 },
			 _resortSingerList (list) {
			 	if (list && list.length > 0) {
			 		// 热门歌手分类
			 		this.groupList[HOT_KEY] = {};
			 		this.groupList[HOT_KEY].title = HOT_KEYWORD;
			 		this.groupList[HOT_KEY].data = [];
			 		// 取前十条作为热门歌手
			 		for (let [index, item] of list.entries()) {
			 			if (index < HOT_COUNT) {
			 				this.groupList[HOT_KEY].data.push(new Singer(item.Fsinger_mid, item.Fsinger_name));
			 			}
			 			// 如果有则追加,没有则新建一个key
			 			if (this.groupList[item.Findex]) {
			 				this.groupList[item.Findex].data.push(new Singer(item.Fsinger_mid, item.Fsinger_name));
			 			} else {
			 				this.groupList[item.Findex] = {};
			 				this.groupList[item.Findex].title = item.Findex;
			 				this.groupList[item.Findex].data = [new Singer(item.Fsinger_mid, item.Fsinger_name)];
			 			}
			 		}
			 		// 遍历 groupList 重新排序
			 		// ^[A-Z]$ 以字母开头或结尾
			 		let hotArray = [];
			 		let letterArray = [];
			 		for (let [index, val] of Object.entries(this.groupList)) {
			 			if (index === HOT_KEY) {
			 				hotArray.push(val);
			 			}
			 			let letterReg = new RegExp('^[A-Z]$');
			 			if (letterReg.test(val.title) && val.title !== 'O') {
			 				letterArray.push(val);
			 			}
			 		}
			 		letterArray.sort((a, b) => {
			 			return a.title.charCodeAt(0) - b.title.charCodeAt(0);
			 		});
			 		this.groupArray = hotArray.concat(letterArray);
			 	}
			 },
			 // ...属于es6中的对象展开运算符：http://es6.ruanyifeng.com/#docs/object#对象的扩展运算符
			 // mapMutations 属于vuex语法糖 不需要写this.$store.commit(),映射为this.methods https://vuex.vuejs.org/zh-cn/mutations.html
			 ...mapMutations({
			 	setSinger: 'set_singer'
			 })
			 }
			};
		</script>
		<style scoped lang="less">
			.singer-wrapper {
				position: fixed;
				top: 88px;
				bottom: 10px;
				width: 100%;
				overflow: hidden;
			}
		</style>
