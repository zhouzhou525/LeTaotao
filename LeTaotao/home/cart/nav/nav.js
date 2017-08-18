define(['jquery', 'underscore', 'backbone', 
	'text!'+window.basePath+'/home/cart/nav/nav.html'], 
	function($, _, Backbone, navTemp){
			var view = Backbone.View.extend({
	    	initialize: function(){
	    		var html = _.template(navTemp); 
				$(this.el).html(html);			
				this.bind();
	    	},
	    	bind: function(){
	    		$(".cart-foot-delete").bind("click", function(){
	    			window.location.href = "#homeView/order";
	    		});
	    		$("#cartFootSelect").unbind();
	        	$("#cartFootSelect").bind("click", function(){
	    			if($(this).hasClass("icon-yuanxingweixuanzhong")){
	    				$(".cart-foot-delete").css("background-color", "#EA3131");
				    	$(this).removeClass("icon-yuanxingweixuanzhong").addClass("icon-yuanxingxuanzhong");
						$(".iconyuanxing").removeClass("icon-yuanxingweixuanzhong").addClass("icon-yuanxingxuanzhong");
						$(".iconyuanxing1").removeClass("icon-yuanxingweixuanzhong").addClass("icon-yuanxingxuanzhong");
						var price = 0;
						var $cartPrice  = $(".cart-goods-con-title-price");
						for(var i=0; i<$cartPrice.length;i++){
							console.log($cartPrice[i].innerText.split("￥")[1]);
							price = price + +$cartPrice[i].innerText.split("￥")[1];
						}
						$("#price-sum").text("¥"+price);
						$(".cart-foot-delete-text").text("去结算("+$cartPrice.length+")");
				    }else{
						$(".cart-foot-delete").css("background-color", "#ccc");
				    	$(this).removeClass("icon-yuanxingxuanzhong").addClass("icon-yuanxingweixuanzhong");
						$(".iconyuanxing").removeClass("icon-yuanxingxuanzhong").addClass("icon-yuanxingweixuanzhong");
						$(".iconyuanxing1").removeClass("icon-yuanxingxuanzhong").addClass("icon-yuanxingweixuanzhong");
						$("#price-sum").text("¥0.00");
						$(".cart-foot-delete-text").text("去结算(0)");
				    }
	    		});
	    	}
	    });
		return view;
});
