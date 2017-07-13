import Vue from 'vue';
import App from './App';
import router from './router';

import 'src/common/less/index.less'; // build/webpack.base.conf.js 中的src别名

Vue.config.productionTip = false;



/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	render: h => h(App)
});

