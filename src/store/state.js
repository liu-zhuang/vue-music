// 保存的状态
// 这里记录vuex中要记录那些状态
import {playMode} from 'common/js/config';

export default {
	singer: {},
	playing: false,
	fullScreen: false,
	playList: [],
	sequencePlayList: [],
	currentIndex: -1,
	playMode: playMode.sequence,
	diss: {},
	rank: {}
};