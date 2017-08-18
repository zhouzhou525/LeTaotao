define(['jquery', 'underscore', 'backbone', 'mui',
	'text!'+window.basePath+'/home/panicBuy/rushBuyTemp.html'], 
	function($, _, Backbone, mui, rushBuyTemp){
			var view = Backbone.View.extend({
	    	initialize: function(){
	    		var html = _.template(rushBuyTemp); 
				$(this.el).html(html);
				this.bind();
	    	},
            bind: function(){
                $(".iconfont-rushA").bind("click",function(){
                	window.history.back();
                })
            } 
	    });
		return view;
});
