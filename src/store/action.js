import * as mutationTypes from './mutation-types';

/**
 * [随机播放action]
 * @param  {[type]} options.commit   [context.commit]
 * @param  {[type]} options.playList [playlist]
 * https://vuex.vuejs.org/zh-cn/actions.html?q=
 */
export const randomPlay = function ({commit}, {playList}) {
	// 播放状态设为true
	commit(mutationTypes.SET_PLAYING, true);
	// 是否全屏设为true
	commit(mutationTypes.SET_FULLSCREEN, true);
	// 歌曲索引设为1
	commit(mutationTypes.SET_CURRENTINDEX, 0);
	// 歌曲列表设置为传入的歌曲列表
	commit(mutationTypes.SET_PLAYLIST, playList);
};

/**
 * [play description]
 * @param  {[type]} options.commit   {commit}为结构赋值，该对象为context,除了commi外还有state和getters
 * @param  {[type]} options.index    [description]
 * @param  {[type]} options.playList [description]
 * @return {[type]}                  [description]
 */
export const play = function ({commit}, {index, playList}) {
	// 播放状态设为true
	commit(mutationTypes.SET_PLAYING, true);
	// 是否全屏设为true
	commit(mutationTypes.SET_FULLSCREEN, true);
	// 歌曲索引设为1
	commit(mutationTypes.SET_CURRENTINDEX, index);
	// 歌曲列表设置为传入的歌曲列表
	commit(mutationTypes.SET_PLAYLIST, playList);
};