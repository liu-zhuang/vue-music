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
	}
}

export function CreateSong (musicData) {
	const image = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`;
	const url = `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`;
	return new Song(musicData.albumid, musicData.albummid, musicData.albumname, getSingerName(musicData.singer), musicData.interval, musicData.songid, musicData.songmid, musicData.songname, image, url);
}

let getSingerName = function (singer) {
	if (!singer || singer.length === 0) {
		return '';
	} else {
		let temp = singer.map(item => { return item.name; });
		return temp.join(' ');
	}
};