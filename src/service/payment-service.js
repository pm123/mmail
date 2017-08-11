/*
* @Author: Dell
* @Date:   2017-08-04 13:40:28
* @Last Modified by:   Dell
* @Last Modified time: 2017-08-04 13:51:43
*/

'use strict';
var _mm = require('util/mm.js')
var _payment = {
	// 获取商品列表信息
    getPaymentInfo: function(orderNumber, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/pay.do'),
            data	:{
            	orderNo: orderNumber
            },
            success : resolve,
            error   : reject
        });
    },
    //获取订单状态
    getPaymentStatus: function(orderNumber, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/query_order_pay_status.do'),
            data    :{
                orderNo: orderNumber
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _payment;