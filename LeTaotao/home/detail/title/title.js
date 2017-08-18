define(['jquery', 'underscore', 'backbone', 
	'text!'+window.basePath+'/home/detail/title/title.html'], 
	function($, _, Backbone, titleTemp){
			var view = Backbone.View.extend({
	    	initialize: function(){
	    		var html = _.template(titleTemp); 
				$(this.el).html(html);
				this.bind();
	    	},
            bind: function(){
                $(".js-detail-top-box1").bind("click",function(){
                    window.history.back();
                });
	            //未登录与登录之后的页面	
		        if(window.localStorage.getItem("loginSuccess")&&window.localStorage.getItem("name")){
					$("#cart-in").bind("click", function(){
		            	window.location.href = "#homeView/cart";
		            	window.localStorage.setItem("redDotIsShow", "0");
		            });
		    	}else{
		    		$("#cart-in").bind("click", function(){
		            	window.location.href = "#loginView";
		            });
		    	}
            }
	    });
		return view;
});
