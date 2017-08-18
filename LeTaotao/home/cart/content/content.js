define(['jquery', 'underscore', 'backbone',
	'text!'+window.basePath+'/home/cart/content/content.html'], 
	function($, _, Backbone, goodsTemp){
		var view = Backbone.View.extend({
	    	initialize: function(){
	          	this.bind();
		    },
	        bind: function(){
	        	var self = this;
	            $("#cartContentBuyAdd").bind("click", function(){
	            	window.location.href = "#homeview";
	            });
	            if(window.localStorage.getItem("loginSuccess")&&window.localStorage.getItem("name")){
		            var request = indexedDB.open("myDB");
	                request.onsuccess = function(e){
	                    var db = e.target.result;
	                    var transaction=db.transaction('users','readonly'); 
	                    var store=transaction.objectStore('users');
	                    var name = window.localStorage.getItem("name");
	                    var keyRange = IDBKeyRange.only(name);
	                    store.openCursor(keyRange).onsuccess = function(e){
	                  		var cursor = e.target.result;
	                  		//读取数据,并复制数据
	                  		var date = {
	                  			dateIn: {}
	                  		};
	                  		if(!cursor.value.cart.length){
	                  			var html = _.template(goodsTemp); 
			  					$(self.el).html(html(date));
			  					$(".cart-goods-box").hide();
			  					$(".cart-content-buy").show();
								
	                  		}else {
		                  		var cart = JSON.stringify(cursor.value.cart);
		                  		console.log(cart);
		                  		date.dateIn = JSON.parse(cart);
		                  		self.initView(date);
	                  		}
	                    };
	                };
	            }
	        },
	        initView: function(date){
	        	var html = _.template(goodsTemp); 
  				$(this.el).html(html(date));
  				$(".cart-content-buy").hide();
				$(".cart-goods-box").show();
				this.cartNun();
	        },
	        cartNun: function(){
	        	//控制数量颜色
	        	var $reduice = $(".cart-goods-con-size-reduice");
	        	for(var i=0; i<$reduice.length; i++){
	        		var text = $reduice[i].nextSibling;
	        		var num = text.innerHTML;
	        		if(num>1){
	        			$reduice[i].style.color = "#f54c16";
	        		}else{
	        			$reduice[i].style.color = "#C3BFBF";
	        		}
	        	}
	        	//单个总价
	        	var $price = $(".cart-goods-con-title-price");
	        	for(var i=0; i<$price.length; i++){
	        		var text = $(".cart-goods-con-size-price");
	        		$price[i].innerHTML ="￥" +$price[i].innerHTML.split("￥")[1] * +text[i].innerHTML;
	        	}
	        	//控制购物车数量的加减
			    $(".cart-goods-con-size-reduice").bind("click",function(){
			    	var num = $(this).next().text();
			    	console.log(num);
			    	num = parseInt(num);
			    	console.log(num);
			        if(num<=2){
			        	$(this).next().text("1");
			        	$(this).css("color", "#C3BFBF");
			        }else{
			        	num = parseInt(num) - 1;
			        	$(this).next().text(num);
			        	$(this).css("color", "#f54c16");
			        }
			    });
			    $(".cart-goods-con-size-add").bind("click",function(){
			        var num = $(this).prev().text();
			        console.log(num);
			        num = parseInt(num) + 1;
			        $(this).prev().text(num);
			        if(num>1){
			        	$(this).prev().prev().css("color", "#f54c16");
			        }
			    }); 
	        }
	    });
		return view;
});
