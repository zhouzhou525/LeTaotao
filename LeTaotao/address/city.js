define(['jquery', 'underscore', 'backbone',
	'text!'+window.basePath+'/address/city.html'
	], 
	function($, _, Backbone, addTemp){
		var view = Backbone.View.extend({
	    	initialize: function(opt){
	    		this.el = opt.el;
	    		this.getCode = opt.getCode;
	    		var data={
	    			cityData: {
		    			"0": {
		    				"citycell": {
		    					"cityName": [{
				    				"name": "东城区",
				    				"citycode": "0"
			    				},
			    				{
			    					"name": "西城区",
			    					"citycode": "0"
			    				}]
			    			}
			    		},
		    			"1": {
		    				"citycell": {
		    					"cityName": [{
				    				"name": "黄浦区",
				    				"citycode": "0"
			    				},
			    				{
			    					"name": "徐汇区",
			    					"citycode": "0"
			    				}]
			    			}
			    		},
		    			"2": {
		    				"citycell": {
		    					"cityName": [{
				    				"name": "深圳",
				    				"citycode": "1"
			    				},
			    				{
			    					"name": "广州",
			    					"citycode": "2"
			    				}]
			    			}
			    		},
		    			"3": {
		    				"citycell": {
		    					"cityName": [{
				    				"name": "武汉市",
				    				"citycode": "3"
			    				},
			    				{
			    					"name": "黄石市",
			    					"citycode": "4"
			    				}]
			    			}
			    		}
		    		}
	    		};
	    		var html = _.template(addTemp)(data.cityData[this.getCode]); 
				$(this.el).after(html);
    		}
	    });
		return view;
});
