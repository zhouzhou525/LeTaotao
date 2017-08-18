define(['jquery', 'underscore', 'backbone',
	'text!'+window.basePath+'/home/title/title.html'], 
	function($, _, Backbone, titleTemp){
		var view = Backbone.View.extend({
	    	initialize: function(){
	    		var html = _.template(titleTemp); 
				$(this.el).html(html);
				this.bind();
	    	},
	    	bind: function(){
	            //未登录与登录之后的页面	
		        if(window.localStorage.getItem("loginSuccess")&&window.localStorage.getItem("name")){
					$("#main-top-cart").bind("click", function(){
		            	window.location.href = "#homeView/cart";
		            	window.localStorage.setItem("redDotIsShow", "0");
		            });
		    	}else{
		    		$("#main-top-cart").bind("click", function(){
		            	window.location.href = "#loginView";
		            });
		    	}
	    	}
	    });
		return view;
});
