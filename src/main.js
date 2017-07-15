import Vue from 'vue';
import App from './App';
import router from './router';
import 'less/index.less'; // 引入样式文件

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	render: h => h(App)
});

