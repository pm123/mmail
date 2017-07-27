/*
* @Author: pm
* @Date:   2017-07-18 15:16:36
* @Last Modified by:   Dell
* @Last Modified time: 2017-07-26 14:28:23
*/

'use strict';

require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service');

//表单里的错误提示
var formError = {
	show: function(errMsg){
		$('.error-item').show().find('.err-msg').text(errMsg);
	},
	hide: function(){
		$('error-item').hide().find('.err-msg').text();
	}

}
//page 逻辑部分
var page = {
	init: function(){
		this.bindEvent();
	},
	bindEvent: function() {
		var _this = this;
		//登录按钮的点击
		$('#submit').click(function(){
			_this.submit();
		});
		//如果按下回车也进行提交
		$('.user-content').keyup(function(e){
			//keyCode = 13 表示回车键
			if(e.keyCode === 13){
				_this.submit();
			}
		});
	},
	//提交表单
	submit: function(){
		var formData = {
			username: $.trim($('#username').val()),
			password: $.trim($('#password').val())
		};
		//表单验证结果
		var validateResult = this.formValidate(formData);
		console.log(formData, validateResult);
		//验证成功
		if(validateResult.status){
			//提交
			_user.login(formData, function(res){
				window.location.href = _mm.getUrlparam('redirect') || './index.html';
				console.log(window.location.href);
			}, function(errMsg){
				formError.show(errMsg);
			});
		}
		//验证失败
		else{
			//错误提示
			formError.show(validateResult.msg);
		}
	},
	//表单字段的验证
	formValidate: function(formData){
		var result = {
			status: false,
			msg: ''
		};
		if(!_mm.validate(formData.username, 'require')){
			result.msg = '用户名不能为空';
			return result;
		}
		if(!_mm.validate(formData.password, 'require')){
			result.msg = '密码不能为空';
			return result;
		}
		//通过验证，返回正确的提示
		result.status = true;
		result.msg = '验证通过';
		return result;
	}
}
$(function(){
	page.init();
});