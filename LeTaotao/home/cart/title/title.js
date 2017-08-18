define(['jquery', 'underscore', 'backbone', 
	'text!'+window.basePath+'/home/cart/title/title.html'], 
	function($, _, Backbone, titleTemp){
			var view = Backbone.View.extend({
	    	initialize: function(){
	    		var html = _.template(titleTemp); 
				$(this.el).html(html);
				this.bind();
	    	},
            bind: function(){
                $("#arrow").bind("click", function(){
                	window.history.back();
                });
                $(".cart-edit").bind("click", function(){
                    if($(".cart-edit").text() == "编辑"){
                    	$(".cart-edit").text("完成");
                    	$("#price-sum").text("");
                    	$(".cart-foot-delete-text").text("删除(0)");
                    	$("#cartFootSelect").unbind();
                    	$("#cartFootSelect").bind("click", function(){
			    			if($(this).hasClass("icon-yuanxingweixuanzhong")){
			    				$(".cart-foot-delete").css("background-color", "#EA3131");
						    	$(this).removeClass("icon-yuanxingweixuanzhong").addClass("icon-yuanxingxuanzhong");
								$(".iconyuanxing").removeClass("icon-yuanxingweixuanzhong").addClass("icon-yuanxingxuanzhong");
								$(".iconyuanxing1").removeClass("icon-yuanxingweixuanzhong").addClass("icon-yuanxingxuanzhong");
								var $cartPrice  = $(".cart-goods-con-title-price");
								$(".cart-foot-delete-text").text("删除("+$cartPrice.length+")");
								$(".cart-foot-delete").unbind();
								$(".cart-foot-delete").bind("click", function(){
					    			if(window.localStorage.getItem("loginSuccess")&&window.localStorage.getItem("name")){
							            var request = indexedDB.open("myDB");
						                request.onsuccess = function(e){
						                    var db = e.target.result;
						                    var transaction=db.transaction('users','readwrite'); 
						                    var store=transaction.objectStore('users');
						                    var name = window.localStorage.getItem("name");
						                    var req = store.get(name);
						                    req.onsuccess = function(e){
			                					var result = e.target.result;
						                  		result.cart = [];
									        	store.put(result);
									        	window.location.reload();
						                    };
						                };
						            }
					    		});
						    }else{
								$(".cart-foot-delete").css("background-color", "#ccc");
						    	$(this).removeClass("icon-yuanxingxuanzhong").addClass("icon-yuanxingweixuanzhong");
								$(".iconyuanxing").removeClass("icon-yuanxingxuanzhong").addClass("icon-yuanxingweixuanzhong");
								$(".iconyuanxing1").removeClass("icon-yuanxingxuanzhong").addClass("icon-yuanxingweixuanzhong");
								$(".cart-foot-delete-text").text("删除(0)");
						    }
			    		});
                    }else if($(".cart-edit").text() == "完成"){
                    	$(".cart-edit").text("编辑");
                    	$("#price-sum").text("¥0.00");
                    	$(".cart-foot-delete-text").text("去结算(0)");
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
            }
	    });
		return view;
});
