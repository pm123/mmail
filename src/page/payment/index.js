/*
* @Author: Dell
* @Date:   2017-08-04 13:04:00
* @Last Modified by:   Dell
* @Last Modified time: 2017-08-04 13:51:57
*/

'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _mm = require('util/mm.js');
var _payment = require('service/payment-service.js');
var templateIndex = require('./index.string')

//page 逻辑部分
var page = {
	data: {
		orderNumber: _mm.getUrlparam('orderNumber')
	},
	init: function(){
		this.onLoad();
	},
	onLoad: function(){
		//加载订单详情
		this.loadPaymentInfo();
	},
	//加载订单详情
	loadPaymentInfo: function(){
		var _this = this,
			paymentHtml = '',
			$pageWrap = $('.page-wrap');
		$pageWrap.html('<div class="loading"></div>');
		_payment.getPaymentInfo(_this.data.orderNumber, function(res){
			//渲染订单
			paymentHtml = _mm.renderHtml(templateIndex,res);
			$pageWrap.html(paymentHtml);
			_this.listenOrderStatus();
		},function(errMsg){
			$pageWrap.html('<p class="err-tip">'+ errMsg +'</p>');
		});
	},
	//监听订单状态
	listenOrderStatus: function(){
		var _this = this;
		this.paymetTimer = window.setInterval(function(){
			_payment.getPaymentStatus(_this.data.orderNumber, function(res){
				if(res == true){
					window.location.href = 
						'./result.html?type=payment&orderNumber=' + 
						_this.data.orderNumber;
				}
			})
		}, 5000)
	}

}
$(function(){
	page.init();
});