define(['jquery', 'underscore', 'backbone',
	'text!'+window.basePath+'/address/town.html'
	], 
	function($, _, Backbone, addTemp){
		var view = Backbone.View.extend({
	    	initialize: function(opt){
	    		this.el = opt.el;
	    		this.getCode = opt.getCode;
	    		var data={
	    			townData: {
		    			"1": {
		    				"towncell": {
		    					"townName": ["罗湖区","福田区"]
			    			}
			    		},
		    			"2": {
		    				"towncell": {
		    					"townName": ["荔湾区","越秀区"]
			    			}
			    		},
		    			"3": {
		    				"towncell": {
		    					"townName": ["江岸区","江汉区"]
			    			}
			    		},
		    			"4": {
		    				"towncell": {
		    					"townName": ["下陆区","铁山区"]
			    			}
			    		}
	    			}
	    		};
	    		var html = _.template(addTemp)(data.townData[this.getCode]); 
				$(this.el).after(html);
    		}
	    });
		return view;
});
