/**
 * 为一个dom元素增加cssClass （如果已经有该cssClass则直接返回，如果没有则增加）
 * @param {[type]} el        Dom 元素
 * @param {[type]} className cssClass 名称
 */
 export function addCssClass (el, className) {
 	if (hasCssClass(el, className)) {
 		return;
 	}
 	let orginClass = el.className.split(' ');
 	orginClass.push(className);
 	el.className = orginClass.join(' ');
 };

/**
 * check dom元素是否有某个cssClass
 * @param  {[type]}  el        Dom元素
 * @param  {[type]}  className cssClass 名称
 * @return {Boolean}           true: 已存在 false: 不存在
 */
 export function hasCssClass (el, className) {
	// 正则匹配 空格或者className 开头 空格或者 className结尾
	let reg = new RegExp('(^|\\s+)' + className + '(\\s+|$)');
	return reg.test(el.className);
}

export function getData (el, name, val) {
	const prefix = 'data-';
	name = prefix + name;
	if (val) {
		el.setAttribute(name, val);
	} else {
		return el.getAttribute(name);
	}
}

// 用来判断当前浏览器支持样式容器
let elementStyle = document.createElement('div').style;

let vendor = () => {
	let transformNames = {
		webkit: 'webkitTransform',
		Moz: 'MozTransform',
		O: 'OTransform',
		ms: 'msTransform',
		standard: 'transform'
	};

	for (let key in transformNames) {
		if (elementStyle[transformNames[key]] !== undefined) {
			return key;
		}
	}

	return false;
};

export function prefixStyle (style) {
	let prefix = vendor();

	if (!prefix) {
		return false;
	}

	if (prefix === 'standard') {
		return style;
	} else {
		return prefix + style.charAt(0).toUpperCase() + style.substr(1);
	}
}