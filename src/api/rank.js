import {queryParameters, options} from 'api/config';
import OrginFetchJsonP from 'common/js/fetch-jsonp';

export function getRankList () {
	const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg';
	const data = Object.assign({}, queryParameters, {
		uin: 0,
		format: 'jsonp',
		inCharset: 'utf-8',
		outCharset: 'utf-8',
		notice: '0',
		platform: 'h5',
		needNewCode: 1
	});
	return OrginFetchJsonP(url, data, options);
}
export function getRankDetail (topId) {
	const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg';
	const data = Object.assign({}, queryParameters, {
		uin: 0,
		format: 'jsonp',
		inCharset: 'utf-8',
		outCharset: 'utf-8',
		notice: '0',
		platform: 'h5',
		needNewCode: 1,
		topid: topId,
		tpl: 3,
		page: 'detail',
		type: 'top'
	});
	return OrginFetchJsonP(url, data, options);
}