/*
* @Author: Dell
* @Date:   2017-07-26 16:30:43
* @Last Modified by:   Dell
* @Last Modified time: 2017-07-26 19:09:31
*/

'use strict';
require('./index.css');
var templatePagination = require('./index.string');
var _mm = require('util/mm.js');

var Pagination = function(){
	var _this = this;
	this.defaultOption = {
		container: null,
		pageNum: 1,
		pageRange: 3,
		onSelectPage: null
	};
	//事件的处理 事件代理方式
	$(document).on('click', '.pg-item', function(){
		var $this = $(this);
		//对于 active, disable 的按钮点击不做处理
		if($this.hasClass('active') || $this.hasClass('disabled')){
			return;
		}
		//
		typeof _this.option.onSelectPage === 'function' ? 
			_this.option.onSelectPage($(this).data('value')) : null;
	})
};
//渲染分页组件
Pagination.prototype.render = function(userOption){
	//合并选顶
	this.option = $.extend({}, this.defaultOption, userOption);
	//判断容器是否为合法的 jquery 对象
	if(!(this.option.container instanceof jQuery)) {
		return;
	}
	//判断是否只有一页
	if(this.option.pages <= 1) {
		return ;
	}
	//渲染分页
	this.option.container.html(this.getPaginationHtml());
};
//获取分页的html, |上一页| 2 3 4 =5= 6 7 8|下一页|  5/9
Pagination.prototype.getPaginationHtml = function(){
	var html = '',
		option = this.option,
		pageArray = [],
		start = option.pageNum - option.pageRange > 0 ?
			    option.pageNum - option.pageRange : 1,
		end = option.pageNum + option.pageRange < option.pages ?
			    option.pageNum + option.pageRange : option.pages;
	//上一页按钮的数据
	pageArray.push({
		name: '上一页',
		value: option.prePage,
		disabled: !option.hasPreviousPage
	});
	//数字按钮的处理
	for(var i = start; i <= end; i++){
		pageArray.push({
			name: i,
			value: i,
			active: (i === option.pageNum)
		});
	}
	//下一页按钮的数据
	pageArray.push({
		name: '下一页',
		value: option.nextPage,
		disabled: !option.hasNextPage
	});
	html = _mm.renderHtml(templatePagination, {
		pageArray: pageArray,
		pageNum: option.pageNum,
		pages: option.pages
	})
	return html;
};
module.exports = Pagination;