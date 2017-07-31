// mutations
// 理解为method的定义
import * as mutationTypes from './mutation-types';

export default {
	[mutationTypes.SET_SINGER] (state, singer) {
		state.singer = singer;
	},
	[mutationTypes.SET_PLAYING] (state, playingState) {
		state.playing = playingState;
	},
	[mutationTypes.SET_FULLSCREEN] (state, isFullScreen) {
		state.fullScreen = isFullScreen;
	},
	[mutationTypes.SET_PLAYLIST] (state, playList) {
		state.playList = playList;
	},
	[mutationTypes.SET_SEQUENCEPLAYLIST] (state, sequencePlayList) {
		state.sequencePlayList = sequencePlayList;
	},
	[mutationTypes.SET_CURRENTINDEX] (state, currentIndex) {
		state.currentIndex = currentIndex;
	}
};
