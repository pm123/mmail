/*
* @Author: Dell
* @Date:   2017-08-04 08:40:07
* @Last Modified by:   Dell
* @Last Modified time: 2017-08-04 09:39:30
*/

'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _order = require('service/order-service.js');
var Pagination = require('util/pagination/index.js');
var templateIndex = require('./index.string')

//page 逻辑部分
var page = {
	data: {
		//分页信息参数
		ListParam: {
			pageNum: 1,
			pageSie: 10,
		}
	},
	init: function(){
		this.onLoad();
	},
	onLoad: function(){
		//初始化左侧菜单
		navSide.init({
			name: 'order-list'
		});
		//加载订单列表
		this.loadOrderList();
	},
	//加载订单列表
	loadOrderList: function(){
		var _this = this,
			orderListHtml = '',
			$listCon = $('.order-list-con');
		$listCon.html('<div class="loading"></div>')
		_order.getOrderList(_this.data.ListParam, function(res){
			//res 是一个列表
			//渲染订单列表
			orderListHtml = _mm.renderHtml(templateIndex,res);
			$listCon.html(orderListHtml);
			_this.loadPagination({
				hasPreviousPage : res.hasPreviousPage,
				prePage 		: res.prePage,
				hasNextPage 	: res.hasNextPage,
				nextPage 		: res.nextPage,
				pageNum         : res.pageNum,	
				pages 			: res.pages
			});
		},function(errMsg){
			$listCon.html('<p class="err-tip">加载订单失败，请刷新后重试</p>');
		});
	},
	//加载分页信息
	loadPagination: function(pageInfo){
		var _this = this;
		this.pagination ? '' : this.pagination = new Pagination();
		this.pagination.render($.extend({}, pageInfo, {
			container: $('.pagination'),
			onSelectPage: function(pageNum){
				_this.data.listParam.pageNum = pageNum;
				_this.loadOrderList();
			}
		}));
	}

}
$(function(){
	page.init();
});