/*
* @Author: Dell
* @Date:   2017-07-23 17:43:11
* @Last Modified by:   Dell
* @Last Modified time: 2017-07-23 18:44:18
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
	data: {
		username: '',
		question: '',
		answer: '',
		token: ''
	},
	init: function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function(){
		this.loadSetpUsername();
	},
	bindEvent: function() {
		var _this = this;
		//输入用户名中的按钮的点击
		$('#submit-username').click(function(){
			var username = $.trim($('#username').val());
			//用户名存在
			if(username){
				_user.getQuestion(username, function(res){
					_this.data.username = username;
					_this.data.question = res;
					_this.loadSetpQuestion();
				}, function(errMsg){
					formError.show(errMsg);
				});
			}
			//用户名不存在
			else{
				formError.show('请输入用户名');
			}
		});
		//输入密码提示问题答案中的按钮的点击
		$('#submit-question').click(function(){
			var answer = $.trim($('#answer').val());
			if(answer){
			//检查密码问题提示问题的答案
				_user.checkAnswer({
					username: _this.data.username,
					question: _this.data.question,
					answer: answer
				}, function(res){
					_this.data.answer = answer;
					_this.data.token = res;
					_this.loadSetpPassword();
				}, function(errMsg){
					formError.show(errMsg);
				});
			}
			//问题不存在
			else{
				formError.show('请输入答案');
			}
		});
		//输入新密码后的按钮的点击
		$('#submit-password').click(function(){
			var password = $.trim($('#password').val());
			if(password && password.length>= 6){
				_user.resetPassword({
					username: _this.data.username,
					passwordNew: password,
					forgetToken: _this.data.token
				}, function(res){
					window.location.href = './result.html?type=pass-reset';
				}, function(errMsg){
					formError.show(errMsg);
				});
			}
			//密码为空
			else{
				formError.show('请输入不少于6位的新密码');
			}
		});
	},
	//加载输入用户名的一步
	loadSetpUsername: function(){
		$('#step-username').show();
	},
	//加载输入密码提示问题答案的一步
	loadSetpQuestion: function(){
		//清除错误提示
		formError.hide();
		//做容器的切换
		$('#step-username').hide()
						   .sliblings('#step-question')
						   .show()
						   .find('.question')
						   .text(this.data.question);
	},
	//加载输入新 password 的一步
	loadSetpPassword: function(){
		//清除错误提示
		formError.hide();
		//做容器的切换
		$('#step-question').hide()
						   .sliblings('#step-password')
						   .show();
	}
}
$(function(){
	page.init();
});