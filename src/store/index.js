// vuex的入口文件
// 实例化vuex
import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import * as getters from './getters';
import mutations from './mutations';
import * as actions from './action';
import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions,
	strict: debug,
	plugins: debug ? [createLogger()] : []
});