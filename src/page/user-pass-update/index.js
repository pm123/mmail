/*
* @Author: Dell
* @Date:   2017-07-23 20:04:54
* @Last Modified by:   Dell
* @Last Modified time: 2017-07-23 20:31:23
*/

'use strict';

require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
//var templateIndex = require('./index.string')

//page 逻辑部分
var page = {
	init: function(){
		this.onLoad();
		this.bindEvent();
	},
	bindEvent: function() {
		var _this = this;
		//点击提交按钮后的动作
		$(document).on('click','.btn-submit', function(){
			var userInfo = {
				password: $.trim($('#password').val()),
				passwordNew: $.trim($('#password-new').val()),
				passwordConfirm: $.trim($('#password-confirm').val()),
			};
			var validateResult = _this.validateResult(userInfo);
			if(validateResult.status){
				//更改用户密码
				_user.updatePassword({
					passwordOld: userInfo.password,
					passwordNew: userInfo.passwordNew
				}, function(res, msg){
					_mm.successTips(msg);
				}, function(errMsg){
					_mm.errorTips(errMsg);
				});
			}else{
				_mm.errorTips(validateResult.msg);
			}
		})
	},
	onLoad: function(){
		//初始化左侧菜单
		navSide.init({
			name: 'user-pass-update'
		});
	},
	validateResult: function(formData){
		var result = {
			status: false,
			msg: ''
		};
		if(!_mm.validate(formData.password, 'require')){
			result.msg = '原密码不能为空';
			return result;
		}
		if(!formData.passwordNew || formData.passwordNew.length < 6){
			result.msg = '新密码长度不能小于6位';
			return result;
		}
		if(formData.passwordNew !== formData.passwordConfirm){
			result.msg = '两次输入的密码长度不一致';
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