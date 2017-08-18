define(['jquery', 'underscore', 'backbone', 'mui',
	'text!'+window.basePath+'/home/order/orderTemp.html',
      window.basePath+'/address/address.js'
      ], 
	function($, _, Backbone, mui, orderTemp, addView){
		var view = Backbone.View.extend({
      	    	initialize: function(){
                        var self = this;
      	    		var html = _.template(orderTemp); 
      			$(this.el).html(html);
                        new addView({
                              el: "#app",
                              getProvince: function(proName, cityName, townName){
                                    self.getPro(proName, cityName, townName);
                              }
                        });
      			this.bind();
                        this.showAddress();
      	    	},
                  bind: function(){  
                  	$(".js-shangxia").bind("click",function(){
                  		$(this).toggleClass("active");
                  		$(".js-show-box").toggleClass("active");
                          $(".order-detail-content-bottom-changeBox-bottom").toggleClass("active");
                  	});
                  	$(".js-img-box-order").bind("click",function(){
                  		$(".js-order-chcekbox").toggleClass("active");
                  		$(".js-order-lastBox").toggleClass("active");
                  	});
                        $(".iconfont-order-back").bind("click", function(){
                              window.history.back();
                        });
                  },
                  getPro: function(proName, cityName, townName){
                        if(!proName && !cityName) return;
                        if(!proName) return;
                        if(proName && !cityName){
                              $("#province").text(proName);
                        }else{
                              $("#province").text(proName);
                              $("#city").text(cityName);
                              $("#town").text(townName);
                        }
                  },
                  showAddress: function(){
                        $(".iconfont-order-going").bind("click", function(){
                              $("#cover").addClass("cover");
                              $(".address-box").show();
                              $(".address-box").animate({"right":"0"});
                        });
                        $(".backTocon").bind("click", function(){
                              $("#cover").removeClass("cover");
                              $(".address-box").animate({"right":"-60%"});
                              $(".address-box").hide();  
                        });
                        $("#cover").bind("click", function(){
                              $(this).removeClass("cover");
                              $(".address-box").animate({"right":"-60%"});
                              $(".address-box").hide();
                        });
                  }
	    });
		return view;
});
