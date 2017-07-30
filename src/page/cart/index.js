/*
* @Author: Dell
* @Date:   2017-07-27 15:10:25
* @Last Modified by:   Dell
* @Last Modified time: 2017-07-30 10:51:12
*/

'use strict';
require('./index.css');
require('page/common/header/index.js');
var nav = require('page/common/nav/index.js');
var _mm = require('util/mm.js');
var _cart = require('service/cart-service.js');
var templateIndex = require('./index.string');

var page = {
	data: {

	},
	init: function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function(){
		this.loadCart();
	},
	bindEvent: function(){
		var _this = this;
		// 商品的选择 / 取消选择
        $(document).on('click', '.cart-select', function(){
            var $this = $(this);
            var productId = $this.parents('.cart-table').data('product-id');
            //切换选中状态
            if($this.is(':checked')){
            	//选中
            	_cart.selectProduct(productId,function(res){
					_this.renderCart(res);
				}, function(errMsg){
					_this.showCartError();
				});
		    }else{
		    	_cart.unselectProduct(productId,function(res){
					_this.renderCart(res);
				}, function(errMsg){
					_this.showCartError();
				});
		    }
		});
        // 商品的全选 / 取消全选
        $(document).on('click', '.cart-select-all', function(){
            var $this = $(this);
            //切换选中状态
            if($this.is(':checked')){
            	//全选中
            	_cart.selectAllProduct(function(res){
					_this.renderCart(res);
				}, function(errMsg){
					_this.showCartError();
				});
		    }else{
		    	_cart.unselectAllProduct(function(res){
					_this.renderCart(res);
				}, function(errMsg){
					_this.showCartError();
				});
		    }
		});
		// 购物车数量的 +/—
        $(document).on('click', '.count-btn', function(){
            var $this 		= $(this),
            	type		= $this.hasClass('plus')? 'plus' : 'minus',
            	$pCount		= $this.siblings('.count-input'),
            	currCount 	= parseInt($pCount.val()),
            	productId 	= $this.parents('.cart-table').data('product-id'),
            	maxCount	= parseInt($pCount.data('max')),
            	minCount	= 1,
            	newCount	= 0; 

            if(type === 'plus'){
                if(currCount >= maxCount){
                    _mm.errorTips('该商品数量已达到上限');
                    return;
                }
                newCount = currCount + 1;
            }else if(type === 'minus'){
                if(currCount <= minCount){
                    return;
                }
                newCount = currCount - 1;
            }
            _cart.updateProduct({
                productId : productId,
                count : newCount
            }, function(res){
                _this.renderCart(res);
                nav.loadCartCount();
            }, function(errMsg){
                _this.showCartError();
            });
		});
		// 删除单个商品
        $(document).on('click', '.cart-delete', function(){
            if(window.confirm('确定要删除商品吗？')){
            	var productId = $(this).parents('.cart-table')
                    .data('product-id');
                _this.deleteCartProduct(productId);
            }
            
		});
		// 删除选中的商品
        $(document).on('click', '.delete-selected', function(){
            if(window.confirm('确认要删除选中的商品？')){
                var arrProductIds = [],
                    $selectedItem = $('.cart-select:checked');
                // 循环查找选中的productIds
                for(var i = 0, iLength = $selectedItem.length; i < iLength; i ++){
                    arrProductIds
                        .push($($selectedItem[i]).parents('.cart-table').data('product-id'));
                }
                if(arrProductIds.length){
                    _this.deleteCartProduct(arrProductIds.join(','));
                }
                else{
                    _mm.errorTips('您还没有选中要删除的商品');
                }  
            }
		});
		// 提交购物车
        $(document).on('click', '.btn-submit', function(){
            // 总价大于0，进行提交
            if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0){
                window.location.href = './confirm.html';
            }else{
                _mm.errorTips('请选择商品后再提交');
            }
        });
	},
	//加载购物车信息
	loadCart: function(){
		var _this = this;
		//获取购物车列表
		_cart.getCartList(function(res){
			_this.renderCart(res);
		}, function(errMsg){
			_this.showCartError();
		});
	},
	//渲染购物车
	renderCart: function(data){
		this.filter(data);
		//缓存购物车信息
		this.data.cartInfo = data;
		//生成 html
		var cartHtml = _mm.renderHtml(templateIndex, data);
		$('.page-wrap').html(cartHtml);
	},
	//数据匹配
	filter: function(data){
		data.notEmpty = !!data.cartProductVoList.length;
		console.log(data);
	},
	//显示错误信息
	showCartError: function(data){
		$('.page-wrap').html('<p class="err-tip">哪里不对了，刷新一下试试吧</p>');
	},
	//删除商品,支持批量删除
	deleteCartProduct: function(productIds){
		var _this = this;
		_cart.deleteProduct(productIds, function(res){
			_this.renderCart(res);
		}, function(errMsg){
			_this.showCartError();
		})
	}
};
$(function(){
	page.init();
})