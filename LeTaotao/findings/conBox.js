define(['jquery', 'underscore', 'backbone',
	'text!'+window.basePath+'/findings/conBox.html',
	window.basePath+'/findings/content/content.js', 'navView'
	], 
	function($, _, Backbone, conBoxTemp, conView, navView){
		var view = Backbone.View.extend({
	    	initialize: function(){
	    		var html = _.template(conBoxTemp); 
				$(this.el).html(html);
				this.conView = new conView({el: "#content"});
				this.navView = new navView({el: "#nav", appName: "findView"});
	    	}
	    });
		return view;
});