/*
* @Author: Dell
* @Date:   2017-07-22 14:59:55
* @Last Modified by:   Dell
* @Last Modified time: 2017-08-04 13:59:03
*/

'use strict';

require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
	var type = _mm.getUrlparam('type') || 'default' ,
		$element = $('.' + type + '-success');
	if(type === 'payment'){
		var orderNumber = _mm.getUrlparam('orderNumber'),
			$orderNumber = $element.find('.order-number');
		$orderNumber.attr('href',$orderNumber.attr('href') + orderNumber);
	}
	//显示对应的提示元素
	$element.show();
	
})