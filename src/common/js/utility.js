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
