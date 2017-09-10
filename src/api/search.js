import fetchJsonp from 'common/js/fetch-jsonp';
import {queryParameters, options} from './config.js';

export function getHotKey () {
	const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?';
	const data = Object.assign({}, queryParameters, {
		uin: 70458055,
		format: 'jsonp',
		inCharset: 'utf-8',
		outCharset: 'utf-8',
		notice: 0,
		platform: 'h5',
		needNewCode: 1
	});
	const opt = Object.assign({}, options);
	return fetchJsonp(url, data, opt);
}

export function search (keyword, pageIndex, pageSize, searchSinger) {
	if (!keyword) {
		return;
	}
	const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?';
	const data = Object.assign({}, queryParameters, {
		w: keyword,
		perpage: pageSize,
		n: pageSize,
		p: pageIndex,
		catZhida: searchSinger ? 1 : 0,
		zhidaqu: 1,
		uin: 70458055,
		format: 'jsonp',
		inCharset: 'utf-8',
		outCharset: 'utf-8',
		notice: 0,
		platform: 'h5',
		needNewCode: 1,
		t: 0,
		flag: 1,
		ie: 'utf-8',
		sem: 1,
		aggr: 0,
		remoteplace: 'txt.mqq.all'
	});
	const opt = Object.assign({}, options);
	return fetchJsonp(url, data, opt);
}