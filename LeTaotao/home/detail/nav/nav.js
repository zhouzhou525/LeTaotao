define(['jquery', 'underscore', 'backbone', 
	'text!'+window.basePath+'/home/detail/nav/nav.html'
	],
	function($, _, Backbone, navTemp){
			var view = Backbone.View.extend({
	    	initialize: function(){
	    		var html = _.template(navTemp); 
				$(this.el).html(html);
				this.bind();
				this.cartShow();
	    	},
	        bind: function(){
	        	var self = this;
	            $(".goods-foot-five-boxa3").bind("click",function(){ 
	              var foot = $("#goods-foot-imgac");
	              var foottxt = $("#js-goods-foot-txt-boxyi");
	              var foottxt2 = $(".goods-foot-txt-boxshou");
	              $(foot).attr('src',$(foot).attr('src')=='images/icon/009ac.png'?'images/icon/009.png':'images/icon/009ac.png');
	              $(foottxt).toggleClass("active");
	              $(foottxt2).toggleClass("active");     
	            });
	            //立即购买
	            $(".foot-five-boxb2").bind("click",function(){ 
	              window.location.href = "#homeView/order";
	            });
	            //弹出加入购物车
	            $("#cartIn").bind("click", function(){
	            	$("#nav-hide").hide();
	            	$("#js-shoping-choses").show();
	            });
	            //隐藏加入购物车
	            $("#bg-opacity").bind("click", function(){
	            	$("#nav-hide").show();
	            	$("#js-shoping-choses").hide();
	            });
	            //未登录与登录之后的页面	
		        if(window.localStorage.getItem("loginSuccess")&&window.localStorage.getItem("name")){
					var request = indexedDB.open("myDB");
	                request.onsuccess = function(e){
		                var db = e.target.result;
		                var transaction=db.transaction('users','readwrite'); 
		                var store=transaction.objectStore('users');
		                var name = window.localStorage.getItem("name");
	                    var keyRange = IDBKeyRange.only(name);
	                    store.openCursor(keyRange).onsuccess = function(e){ 
		                  	var cursor = e.target.result;
		                  	if(cursor.value.name == name){
		                  		//购物车的飞入动画
				            	$("#shoping-choses-bottombtn").bind("click", function(){
					            	$("#nav-hide").show();
					            	$("#js-shoping-choses").hide();
					            	$("#cartIn-animation").show();
					            	var cartInAnimation = setTimeout(function(){
							            $("#cartIn-animation").hide();    
							        },1500);
							        //购物车小圆点
							        var set = setTimeout(function(){
							            $("#redDot").show();
							            window.localStorage.setItem("redDotIsShow", "1");
							        },1500);
							        //保存购物车信息
							        var shopName = $(".house-box-txt1").text();
							        var goodsName = $(".shoping-choses-detail-textup").text();
							        var imgSrc = $(".shoping-choses-detail-img img")[0].src;
							        var price = $(".shoping-choses-detail-textdown span").text();
							        //需保存在数组中
							        var size = $(".btn-size.active").text();
							        var num = $("#shoping-buy-num").val();
							        //console.log(typeof num);
							        var color = $(".shoping-color-content-box.active").text();
							        //判断购物车是否为空,写入数据
							        var differ = false;
							        var shopDiffer = false;
							        //重新打开数据库
							        var request = indexedDB.open("myDB");
					                request.onsuccess = function(e){
						                var db = e.target.result;
								        var transaction=db.transaction('users','readwrite'); 
			                			var store=transaction.objectStore('users');
			                			var name = window.localStorage.getItem("name");
	                    				var req = store.get(name);
			                			req.onsuccess = function(e){
			                				var result = e.target.result;
			                				console.log(result);
									        if(!result.cart.length){
									        	var object = {};
									        	object.shopName = shopName;
									        	object.goods = [];
									        	var obj = {};
									        	obj.goodsName = goodsName;
									        	obj.imgSrc = imgSrc;
									        	obj.price = price;
									        	obj.size = size;
									        	obj.color = color;
									        	obj.num = num;
									        	object.goods.push(obj);
									        	var cart = []; 
									        	cart.push(object); 
									        	result.cart = cart;
									        	store.put(result);
									        }else{
									        	for(var i=0; i<result.cart.length; i++){
									        		//console.log(result.cart[i]);
									        		if(result.cart[i].shopName == shopName){
									        			shopDiffer = false;
									        			for(var j=0;j<result.cart[i].goods.length;j++){
									        				//console.log(result.cart[i].goods[j]);
									        				if(result.cart[i].goods[j].goodsName == goodsName){
									        					differ = false;
										        					if(result.cart[i].goods[j].color == color){
										        						differ = false;
										        						if(result.cart[i].goods[j].size == size){
										        							differ = false;
										        							console.log(result.cart[i].goods[j].num);
										        							var number = result.cart[i].goods[j].num;
										        							console.log(typeof number);
										        							number = parseInt(number) + parseInt(num);
										        							result.cart[i].goods[j].num = number;
										        							store.put(result);
										        						}else{
										        							differ = true;
										        						}
										        					}else{
										        						differ = true;
										        					}	
										        			}else{
										        				differ = true;
										        			}
									        			}
									        			console.log(differ);
									        			if(differ){
												        	var obj = {};
												        	obj.goodsName = goodsName;
												        	obj.imgSrc = imgSrc;
												        	obj.price = price;
												        	obj.size = size;
												        	obj.color = color;
												        	obj.num = num;
											        		result.cart[i].goods.push(obj);
												        	console.log(result);
												        	store.put(result);
										        		}	
									        		}else{
									        			shopDiffer = true;
									        		}
									        	}
									        	if(shopDiffer){
									        		var object = {};
										        	object.shopName = shopName;
										        	object.goods = [];
										        	var obj = {};
										        	obj.goodsName = goodsName;
										        	obj.imgSrc = imgSrc;
										        	obj.price = price;
										        	obj.size = size;
										        	obj.color = color;
										        	obj.num = num;
										        	object.goods.push(obj);
										        	var cart = [];
										        	cart.push(object);
									        		result.cart.push(cart);
										        	console.log(result);
										        	store.put(result);
									        	}
									        }
									    };
									};
							    });
							}
		                };
		    		};
		    	}else{
		    		$("#shoping-choses-bottombtn").bind("click", function(){
		            	window.location.href = "#loginView";
		            });
		    	}
	        },
	        cartShow: function(){
	        	$(".btn-size").bind("click",function(){
			        $(this).addClass("active").siblings().removeClass("active");
			    });
			    $(".shoping-color-content-box").bind("click",function(){  
			        $(".shoping-color-content-box").removeClass("active");
			        $(this).addClass("active");
			    });
				//控制购物车数量的加减
			    var num ="" ;
			   	$(".shoping-buy-reduice").css("color", "#C3BFBF");
			    $(".shoping-buy-add").bind("click",function(){
			        num = $("#shoping-buy-num").val();
			        num++;
			        $("#shoping-buy-num").val(num);
			        if(num>1){
			        	$(".shoping-buy-reduice").css("color", "#f54c16");
			        }
			    });
			    $(".shoping-buy-reduice").bind("click",function(){
			        if(num<=2){
			        	$("#shoping-buy-num").val("1");
			        	$(this).css("color", "#C3BFBF");
			        }else{
			        	num--;
			        	$("#shoping-buy-num").val(num);
			        	$(this).css("color", "#f54c16");
			        }
			    });
	        }
	    });
		return view;
});
