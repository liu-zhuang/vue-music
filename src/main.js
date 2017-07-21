import Vue from 'vue';
import App from './App';
import router from './router';

import VueLazyload from 'vue-lazyload';
import fastclick from 'fastclick';
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
	render: h => h(App)
});

