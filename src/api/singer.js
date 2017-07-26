import fetchJsonp from 'common/js/fetch-jsonp';
import {queryParameters, options} from './config.js';

export function getSingerList () {
	const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg?';
	const data = Object.assign({}, queryParameters, {
		channel: 'singer',
		page: 'list',
		key: 'all_all_all',
		pagesize: 100,
		pagenum: 1,
		loginUin: 70458055,
		hostUin: 0,
		format: 'jsonp',
		inCharset: 'utf8',
		outCharset: 'utf-8',
		notice: 0,
		platform: 'yqq',
		needNewCode: 0
	});
	const opt = Object.assign({}, options, {
		jsonpCallbackFunction: 'GetSingerListCallbackjsonp'
	});
	return fetchJsonp(url, data, opt);
}

export function getSingerSongList (singerId) {
	const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg';
	const data = Object.assign({}, queryParameters, {
		order: 'listen',
		begin: 0,
		num: 100,
		singerid: singerId,
		uin: 70458055,
		format: 'jsonp',
		inCharset: 'utf-8',
		outCharset: 'utf-8',
		notice: 0,
		platform: 'h5page',
		needNewCode: 1,
		from: 'h5'
	});
	return fetchJsonp(url, data, options);
}