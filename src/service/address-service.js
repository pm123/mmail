/*
* @Author: Dell
* @Date:   2017-08-03 13:43:14
* @Last Modified by:   Dell
* @Last Modified time: 2017-08-03 23:03:41
*/

'use strict';
var _mm = require('util/mm.js')
var _address = {
	// 获取地址列表
    getAddressList: function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/list.do'),
            data	:{
            	pageSize: 50
            },
            success : resolve,
            error   : reject
        });
    },
    // 保存新地址
    save: function(addressInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/add.do'),
            data    : addressInfo,
            success : resolve,
            error   : reject
        });
    },
    // 更新新地址
    update: function(addressInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/update.do'),
            data    : addressInfo,
            success : resolve,
            error   : reject
        });
    },
    // 删除收件人地址
    deleteAddress: function(shippingId, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/del.do'),
            data    : {
                shippingId: shippingId
            },
            success : resolve,
            error   : reject
        });
    },
    //获取单条收件人地址信息
    getAddress: function(shippingId, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/select.do'),
            data    : {
                shippingId: shippingId
            },
            success : resolve,
            error   : reject
        });
    }
   
}
module.exports = _address;