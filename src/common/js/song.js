import {getLyric} from 'api/lyric';
import {Base64} from 'js-base64';

export class Song {
	constructor (albumid, albummid, albumname, singer, duration, songid, songmid, songname, img, url) {
		this.albumid = albumid;
		this.albummid = albummid;
		this.albumname = albumname;
		this.singer = singer;
		this.duration = duration;
		this.songid = songid;
		this.songmid = songmid;
		this.songname = songname;
		this.img = img;
		this.url = url;
		this.lyric = '';
	}
	getLyric () {
		return new Promise((resolve, reject) => {
			getLyric(this.songmid)
			.then(res => {
				let jsonOrign = res.substring(res.indexOf('(') + 1, res.indexOf(')'));
				const temp = JSON.parse(jsonOrign);
				const lyric = Base64.decode(temp.lyric);
				resolve(lyric);
			})
			.catch(err => {
				reject(err);
			});
		});
	}
};


export function CreateSong (musicData) {
	const image = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`;
	const url = `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`;
	return new Song(musicData.albumid, musicData.albummid, musicData.albumname, getSingerName(musicData.singer), musicData.interval, musicData.songid, musicData.songmid, musicData.songname, image, url);
};


let getSingerName = function (singer) {
	if (!singer || singer.length === 0) {
		return '';
	} else {
		let temp = singer.map(item => { return item.name; });
		return temp.join(' ');
	}
};