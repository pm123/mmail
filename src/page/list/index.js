/*
* @Author: Dell
* @Date:   2017-07-25 11:02:38
* @Last Modified by:   Dell
* @Last Modified time: 2017-07-26 19:12:41
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm = require('util/mm.js');
var _product = require('service/product-service.js');
var Pagination = require('util/pagination/index.js');
var templateIndex = require('./index.string');

var page = {
	data: {
		listParam: {
			//这两个值是从参数传递过来的
			keyword: _mm.getUrlparam('keyword') || '',
			categoryId: _mm.getUrlparam('categoryId') || '',
			//通过排序按钮改变
			orderBy: _mm.getUrlparam('orderBy') || 'default',
			//通过页面下面的分页按钮改变
			pageNum: _mm.getUrlparam('pageNum') || 1,
			//默认20
			pageSize: _mm.getUrlparam('pageSize') || 20
		}
	},
	init: function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function(){
		this.loadList();
	},
	bindEvent: function(){
		var _this = this;
		//排序的点击事件
		$('.sort-item').click(function(){
			_this.data.listParam.pageNum = 1;
			var $this = $(this);
			
			//点击默认排序
			if($this.data('type') === 'default'){
				//如果已经是 active 样式
				if($this.hasClass('active')){
					return;
				}
				//其他
				else{
					$this.addClass('active')
						.siblings('.sort-item')
						.removeClass('active asc desc');
					_this.data.listParam.orderBy = 'default';
				}
			}
			//点击价格排序
			else if($this.data('type') === 'price'){
				//active 类的处理
				$this.addClass('active')
					.siblings('.sort-item')
					.removeClass('active asc desc');
				//升序，降序的处理
				if(!$this.hasClass('asc')){
					$this.addClass('asc').removeClass('desc');
					_this.data.listParam.orderBy = 'price_asc';
				}else{
					$this.addClass('desc').removeClass('asc');
					_this.data.listParam.orderBy = 'price_desc';
				}

			}
			//重新加载 list
			_this.loadList();
		})
	},
	//加载 list 数据
	loadList: function(){
		var _this = this,
			listHtml = '',
			listParam = this.data.listParam;
		//删除参数中不必要的字段
		listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId);
		
		//请求接口
		var $pListCon = $('.p-list-con');
		$pListCon.html('<div class="loading"></div>');
		_product.getProductList(listParam, function(res){
			listHtml = _mm.renderHtml(templateIndex, {
				list: res.list
			});
			$pListCon.html(listHtml);
			_this.loadPagination({
				hasPreviousPage : res.hasPreviousPage,
				prePage 		: res.prePage,
				hasNextPage 	: res.hasNextPage,
				nextPage 		: res.nextPage,
				pageNum         : res.pageNum,	
				pages 			: res.pages
			});
		}, function(errMsg){
			_mm.errorTips(errMsg);
		})
	},
	//加载分页信息
	loadPagination: function(pageInfo){
		var _this = this;
		this.pagination ? '' : this.pagination = new Pagination();
		this.pagination.render($.extend({}, pageInfo, {
			container: $('.pagination'),
			onSelectPage: function(pageNum){
				_this.data.listParam.pageNum = pageNum;
				_this.loadList();
			}
		}));
	}

};
$(function(){
	page.init();
})