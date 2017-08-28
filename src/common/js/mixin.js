import {mapGetters} from 'vuex';

export const playlistMixin = {
	mounted () {
		this.playListHandler(this.playList);
	},
	// keep-alive 激活时对hock
	activated () {
		this.playListHandler(this.playList);
	},
	computed: {
		...mapGetters(['playList'])
	},
	watch: {
		playList (newVal) {
			this.playListHandler(newVal);
		}
	},
	methods: {
		playListHandler () {
			throw new Error('component must implement handlePlaylist method');
		}
	}
};