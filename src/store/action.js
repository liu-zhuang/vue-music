import * as mutationTypes from './mutation-types';
import {shuffle} from 'common/js/utility';
import {playMode} from 'common/js/config';

let findIndex = function (song, list) {
	return list.findIndex(item => {
		return item.songid === song.songid;
	});
};


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
	// 歌曲索引设为0
	commit(mutationTypes.SET_CURRENTINDEX, 0);
	// 歌曲列表设置为传入的歌曲列表
	commit(mutationTypes.SET_PLAYLIST, shuffle(playList));
	// 原始歌曲列表为传入的歌曲列表
	commit(mutationTypes.SET_SEQUENCEPLAYLIST, playList);
	// 设置播放模式为随机
	commit(mutationTypes.SET_PLAYMODE, playMode.random);
};

/**
 * [play description]
 * @param  {[type]} options.commit   {commit}为结构赋值，该对象为context,除了commi外还有state和getters
 * @param  {[type]} options.index    [description]
 * @param  {[type]} options.playList [description]
 * @return {[type]}                  [description]
 */
 export const play = function ({commit, state}, {index, playList}) {
	// 播放状态设为true
	commit(mutationTypes.SET_PLAYING, true);
	// 是否全屏设为true
	commit(mutationTypes.SET_FULLSCREEN, true);
	// 原始歌曲列表为传入的歌曲列表
	commit(mutationTypes.SET_SEQUENCEPLAYLIST, playList);
	// 歌曲列表设置为传入的歌曲列表
	if (state.playMode === playMode.random) {
		let newList = shuffle(playList);
		commit(mutationTypes.SET_PLAYLIST, newList);
		commit(mutationTypes.SET_CURRENTINDEX, findIndex(playList[index], newList));
	} else {
		commit(mutationTypes.SET_PLAYLIST, playList);
		// 歌曲索引
		commit(mutationTypes.SET_CURRENTINDEX, index);
	}
};