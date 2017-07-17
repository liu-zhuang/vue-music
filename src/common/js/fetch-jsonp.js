import OrginFetchJsonP from 'fetch-jsonp'; // https://github.com/camsong/fetch-jsonp

export default function fetchJsonp (url, data, option) {
	let newUrl = getUrl(url, data);
	return new Promise((resolve, reject) => {
		OrginFetchJsonP(newUrl, option || {})
		.then(response => {
			return response.json();
		})
		.then(json => {
			resolve(json);
		})
		.catch(err => {
			reject(err);
		});
	});
};

let getUrl = function (url, data) {
	let parms = '';
	Object.keys(data).forEach(val => {
		parms += `${val}=${data[val]}`;
	});
	if (!url.endsWith('?')) {
		url = url + '?';
	}

	if (parms !== '' && parms.startsWith('&')) {
		parms = parms.substring(1, parms.length - 1);
	}
	console.log(url + parms);
	return url + parms;
};