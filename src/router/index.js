import Vue from 'vue';
import Router from 'vue-router';
import Recommend from 'com/recommend/recommend';
import Rank from 'com/rank/rank';
import Search from 'com/search/search';
import Singer from 'com/singer/singer';
import SingerDetail from 'com/singerDetail/singerDetail';
import DissDetail from 'com/dissDetail/dissDetail';

Vue.use(Router);

export default new Router({
	routes: [
	{
		path: '/',
		redirect: '/recommend' // 默认选中  注意这里是redirect 值是路径 同时注意区分大小写，路由是否选中是根据url路径来判断的
	},
	{
		path: '/rank',
		component: Rank
	},
	{
		path: '/recommend',
		component: Recommend,
		children: [{
			path: 'dissDetail/:id',
			component: DissDetail
		}]
	},
	{
		path: '/search',
		component: Search
	},
	{
		path: '/singer',
		component: Singer,
		children: [{
			path: ':id',
			component: SingerDetail // https://router.vuejs.org/zh-cn/essentials/nested-routes.html
		}]
	}
	]
});

