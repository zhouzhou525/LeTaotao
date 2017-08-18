define(['jquery', 'underscore', 'backbone',
	'text!'+window.basePath+'/home/conBox.html',
	window.basePath+'/home/title/title.js',
	window.basePath+'/home/content/content.js', 'navView'
	], 
	function($, _, Backbone, conBoxTemp, titleTemp, conView, navView){
		var view = Backbone.View.extend({
	    	initialize: function(){
	    		var html = _.template(conBoxTemp); 
				$(this.el).html(html);
				this.titleTemp = new titleTemp({el: "#title"});
				this.conView = new conView({el: "#content"});
				this.navView = new navView({el: "#nav", appName: "homeView"});
				this.bind();
	    	},
            bind: function(){
              var isShow = +window.localStorage.getItem("redDotIsShow");
                if(isShow){
                	$("#redDot").show();
                }else{
                	$("#redDot").hide();
                }
            }
	    });
		return view;
});