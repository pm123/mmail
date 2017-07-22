/*
* @Author: Dell
* @Date:   2017-07-22 09:56:37
* @Last Modified by:   Dell
* @Last Modified time: 2017-07-22 15:36:29
*/

'use strict';

var _mm = require('util/mm.js')
var _user = {
	// 检查登录状态
    checkLogin : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/get_user_info.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _user;