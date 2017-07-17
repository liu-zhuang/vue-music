import fetchJsonp from 'common/js/fetch-jsonp';
import {queryParameters, options} from 'api/config';
export function getRecommend () {
	// https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?'
	// https://c.y.qq.com/splcloud/fcgi-bin/p.fcg?g_tk=902235244&format=jsonp&jsonpCallback=jsonp1
	const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?';
	const data = Object.assign({}, queryParameters, {
		platform: 'h5'
	});
	return fetchJsonp(url, data, options);
}