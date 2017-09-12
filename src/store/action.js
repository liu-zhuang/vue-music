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

export const insertSong = function ({commit, state}, song) {
	// 当前音乐列表
	let playList = state.playList.slice(0);
	// 当前顺序音乐列表
	let sequencePlayList = state.sequencePlayList.slice(0);
	// 当前序列号
	let currentIndex = state.currentIndex;
	// 当前歌曲
	let currentSong = playList[currentIndex];

	// 待插入的歌曲在播放列表中的位置(可能)
	let findex = findIndex(song, playList);

	// 在当前位置之后加入待插入的歌曲
	playList.splice(++currentIndex, 0, song);

	if (findex > -1) {
		// 如果待插入的歌已存在，则删除老的
		if (findex < currentIndex) {
			// 位于当前位置之前，则删除并将currentIndex-1
			playList.splice(findex, 1);
			currentIndex--;
		} else {
			// 位于当前位置之后，则移除，注意由于插入了一个新的，因此index需要+1
			playList.splice(findex + 1, 1);
		}
	}

	// 有序列表也是一样的操作
	let currentSIndex = findIndex(currentSong, sequencePlayList) + 1;

	let fsIndex = findIndex(song, sequencePlayList);

	sequencePlayList.splice(currentSIndex, 0, song);

	if (fsIndex > -1) {
		if (currentSIndex > fsIndex) {
			sequencePlayList.splice(fsIndex, 1);
		} else {
			sequencePlayList.splice(fsIndex + 1, 1);
		}
	}

	commit(mutationTypes.SET_PLAYLIST, playList);
	commit(mutationTypes.SET_SEQUENCEPLAYLIST, sequencePlayList);
	commit(mutationTypes.SET_CURRENTINDEX, currentIndex);
	commit(mutationTypes.SET_FULLSCREEN, true);
	commit(mutationTypes.SET_PLAYING, true);
};