// getter属性
// 理解从state中取值

export const singer = state => state.singer;
export const playing = state => state.playing;
export const fullScreen = state => state.fullScreen;
export const playList = state => state.playList;
export const sequencePlayList = state => state.sequencePlayList;
export const currentIndex = state => state.currentIndex;
export const currentSong = (state) => { return state.playList[state.currentIndex] || {}; };
export const playMode = state => state.playMode;