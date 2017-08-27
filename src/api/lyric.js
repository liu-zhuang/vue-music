import axios from 'axios';

export function getLyric (songId) {
	const url = '/api/getLyric';
	const data = {
		pcachetime: +new Date(),
		songmid: songId,
		g_tk: 5381,
		loginUin: 0,
		hostUin: 0,
		format: 'json',
		inCharset: 'utf8',
		outCharset: 'utf-8',
		notice: 0,
		platform: 'yqq',
		needNewCode: 0
	};
	return new Promise((resolve, reject) => {
		axios.get(url, {
			params: data
		})
		.then(res => {
			resolve(res.data);
		})
		.catch(err => {
			reject(err);
		});
	});
}