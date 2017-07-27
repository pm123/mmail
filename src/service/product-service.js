/*
* @Author: Dell
* @Date:   2017-07-25 11:07:55
* @Last Modified by:   Dell
* @Last Modified time: 2017-07-26 20:42:30
*/

'use strict';
var _mm = require('util/mm.js')
var _product = {
	// 获取商品列表信息
    getProductList: function(listParam, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/product/list.do'),
            data	: listParam,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 获取商品详细信息
    getProductDetail: function(productId, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/product/detail.do'),
            data    : {
                productId: productId
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //检查用户各
    checkUsername: function(username, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/check_valid.do'),
            data    : {
                type: 'username',
                str : username
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 检查登录状态
    checkLogin: function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/get_user_info.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //获取用户密码提示问题
    getQuestion: function(username, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/forget_get_question.do'),
            data    : {
                username : username
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //检查问密码提示问题的答案
    checkAnswer: function(userInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/forget_check_answer.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //重置密码
    resetPassword: function(userInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/forget_reset_password.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //获取用户信息
    getUserInfo: function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/get_information.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //更新用户信息
    updateUserInfo: function(userInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/update_information.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //登录状态下更新密码
    updatePassword: function(userInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/reset_password.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //登出
    logout: function(resolve, reject){
    	_mm.request({
    		url     : _mm.getServerUrl('/user/logout.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
    	})
    }
}
module.exports = _product;