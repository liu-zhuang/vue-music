import fetchJsonp from 'common/js/fetch-jsonp';
import {queryParameters, options} from 'api/config';
import axios from 'axios';
export function getRecommend () {
	// https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?'
	// https://c.y.qq.com/splcloud/fcgi-bin/p.fcg?g_tk=902235244&format=jsonp&jsonpCallback=jsonp1
	const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?';
	const data = Object.assign({}, queryParameters, {
		platform: 'h5',
		format: 'jsonp'
	});
	return fetchJsonp(url, data, options);
}

export function getDissList () {
	const url = '/api/getDissList';
	const data = Object.assign({}, queryParameters, {
		rnd: Math.random(),
		loginUin: 70458055,
		hostUin: 0,
		format: 'json',
		inCharset: 'utf8',
		outCharset: 'utf-8',
		notice: 0,
		platform: 'yqq',
		needNewCode: 0,
		categoryId: 10000000,
		sortId: 5,
		sin: 0,
		ein: 29
	});
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