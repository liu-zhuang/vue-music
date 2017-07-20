/**
 * api url的query parameter
 * 固定的几个值
 */
 export const queryParameters = {
 	g_tk: 902235244
 };

/**
 * jsonp 的options
 * jsonpCallback: 指定callback变量名
 * https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=902235244format=jsonpplatform=h5
 * &jsonpCallback=jsonp_1500218975996_14202 比如这里
 * 默认callback函数是jsonp加_再加一段随机数，如果想指定名称可以使用:jsonpCallbackFunction来设置
 */
 export const options = {
 	jsonpCallback: 'jsonpCallback'
 };

/**
 * api 返回正确时的Code
 */
 export const ERR_OK = 0;
