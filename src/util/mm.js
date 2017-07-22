/*
* @Author: Dell
* @Date:   2017-07-19 14:39:31
* @Last Modified by:   Dell
* @Last Modified time: 2017-07-22 15:48:30
*/

'use strict';

var Hogan = require('hogan');

var conf = {
	serverHost: ''
};

var _mm = {
	//网络请求
	request: function(params) {
		var _this = this;
		$.ajax({
			type	: params.method   || 'get',
			url		: params.url      || '',
			dataType: params.type     || 'json',
			data 	: params.data     || '',
			success : function(res) {
				//请求成功
				if(res.status === 0) {
					typeof params.success === 'function' && params.success(res.data, res.msg);
				}
				//没有登录状态，需要强制登录
				else if(res.status === 10) {
					_this.doLogin();
				}
				//请求数据错误,比如参数错误 
				else if(res.status === 1) {
					typeof params.error === 'function' && params.error(res.msg);
				}
			},
			error 	: function(err) {
				typeof params.error === 'function' && params.error(err.statusText);
				
			}
		});
	},
	//获取服务器地址
	getServerUrl: function(path){
		return conf.serverHost + path;
	},
	//获取URL参数
	getUrlparam: function(name) {
		//keyword=xxx&page=1
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		var result = window.location.search.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]) : null;

	},
	//渲染html模板
	renderHtml: function(htmlTemplate, data) {
		var template = Hogan.compile(htmlTemplate),
			result = template.render(data);

		return result;
	},
	//成功提示
	successTips: function(msg){
		alert(msg || '操作成功');
	},
	//成功提示
	errorTips: function(msg){
		alert(msg || '操作失败');
	},
	//字段的验证，支持是否为空，手机，邮箱的判断
	validate: function(value, type){
		var value = $.trim(value);
		//非空验证
		if('require' === type){
			return !! value;
		}
		//手机号验证
		if('phone' === type){
			return /^1\d{10}$/.test(value);
		}
		//邮箱验证
		if('email' === type){
			return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
		}
	},
	//统一登录处理
	doLogin: function() {
		window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
	},
	goHome: function(){
		window.location.href = './index.html';
	}
};

module.exports = _mm;