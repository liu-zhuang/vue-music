import Vue from 'vue';
import App from './App';
import router from './router';
import 'babel-polyfill';
import VueLazyload from 'vue-lazyload';
import fastclick from 'fastclick';
import store from './store/index';
// 样式
import 'less/index.less'; // 引入样式文件

Vue.config.productionTip = false;
fastclick.attach(document.body);

Vue.use(VueLazyload, {
	loading: require('./common/image/default.png')
});

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
});

