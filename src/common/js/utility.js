var getRandomInt = function (min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

export function shuffle (list) {
	let _list = list.slice(0);
	for (let i = 0; i < _list.length; i++) {
		let randomIndex = getRandomInt(0, i);
		let temp = _list[randomIndex];
		_list[randomIndex] = _list[i];
		_list[i] = temp;
	}
	return _list;
};

export function debounce (func, delay) {
	// 简单实现节流  可以参考underscore的源码实现
	// 参考文档：http://www.cnblogs.com/fsjohnhuang/p/4147810.html
	let timer;
	return function (...args) {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			func.apply(this, args);
		}, delay);
	};
}