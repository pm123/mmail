/*
* @Author: Dell
* @Date:   2017-07-22 14:59:55
* @Last Modified by:   Dell
* @Last Modified time: 2017-07-22 15:45:25
*/

'use strict';

require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
	var type = _mm.getUrlparam('type') || 'default' ,
		$element = $('.' + type + '-success');

	//显示对应的提示元素
	$element.show();
	
})