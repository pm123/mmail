/*
* @Author: Dell
* @Date:   2017-07-22 09:04:18
* @Last Modified by:   Dell
* @Last Modified time: 2017-07-25 11:13:25
*/

'use strict';

require('./index.css');
var _mm = require('util/mm.js');

//通用页面头部
var header = {
	init: function() {
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function(){
		var keyword = _mm.getUrlparam('keyword');
		//keyword 存在，回填输入框
		if(keyword){
			$('#search-input').val(keyword);
		}
	},
	bindEvent: function() {
		var _this = this;
		//点击搜索按钮以后，做搜索提交
		$('#search-btn').click(function(){
			_this.searchSubmit();
		});
		//输入回车后，做搜索提交
		$('#search-input').keyup(function(e){
			//13是回车键的 keyCode
			if(e.keyCode === 13){
				_this.searchSubmit();
			}
		})
	},
	//搜索的提交
	searchSubmit: function(){
		var keyword = $.trim($('#search-input').val());
		//如果提交的时候有keyword，正常跳转到list页
		if(keyword){
			window.location.href = './list.html?keyword=' + keyword;
		}
		//如查 keyword 为空, 直接返回首页
		else{
			_mm.goHome();
		}
	}
};
header.init();