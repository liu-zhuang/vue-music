// mutations
// 理解为method的定义
import * as mutationTypes from './mutation-types';

export default {
	[mutationTypes.SET_SINGER] (state, singer) {
		state.singer = singer;
	}
};
