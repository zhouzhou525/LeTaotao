define(['jquery', 'underscore', 'backbone',
	'text!'+window.basePath+'/address/address.html',
	'./city.js','./town.js'
	], 
	function($, _, Backbone, addTemp, cityView, townView){
		var view = Backbone.View.extend({
	    	initialize: function(opt){
	    		this.el = opt.el;
	    		this.getProvince = opt.getProvince;
	    		var data={
	    			proData: [{
	    				proName : "北京",
	    				code : "0"
	    			},{
	    				proName : "上海",
	    				code : "1"
	    			},{
	    				proName : "广东",
	    				code : "2"
	    			},{
	    				proName : "湖北",
	    				code : "3"
	    			}
	    			]
	    		};
	    		var html = _.template(addTemp)(data); 
				$(this.el).append(html);
				this.bind();
    		},
    		bind: function(){
    			var self = this;
    			var proName = '';
    			var cityName = '';
    			var townName= '';
    			$(".province").bind("click", function(){
    				proName= $(this).data("province");
    				var code = $(this).data("code");
    				self.hiddenProvince();
    				//加载市区
	    			new cityView({
	    				el: "#province-box",
	    				getCode: code
	    			});
	    			//----------------------------
	    			$(".city").bind("click", function(){
	    				cityName= $(this).data("city");
	    				var cityCode = $(this).data("citycode");
	    				//console.log(cityCode);
	    				if(cityCode===0){
	    					$("#cover").removeClass("cover");
	    					self.showProvince();
	    					self.hiddencity();
	    					self.hiddenBox();
	    					self.getProvince(proName, cityName, '');
	    				}else{
	    					self.hiddencity();
		    				new townView({
		    					el: "#city-box",
		    					getCode: cityCode
		    				});
		    				$(".town").bind("click", function(){
		    					townName = $(this).data("town");
		    					$("#cover").removeClass("cover");
				    			self.showProvince();
				    			self.hiddentown();
				    			self.hiddenBox();
				    			self.getProvince(proName, cityName, townName);
				    		});
				    		$(".backToCity").bind("click", function(){
				    			self.hiddentown();
				    			self.showcity();
				    		});
	    				}
	    			});
	    			self.cityBind();
    			});
    		},
    		cityBind: function(){
    			var self = this;
    			$(".backToPro").bind("click", function(){
	    			self.showProvince();
	    			self.hiddencity();
	    		});
    		},
    		hiddenBox: function(){
    			$(".address-box").hide();
		    	$(".address-box").animate({"right":"-60%"});
    		},
    		showProvince: function(){
    			$("#province-box").show();
	    		$("#province-box").animate({"right":"0"});
    		},
    		hiddenProvince: function(){
    			$("#province-box").hide();
	    		$("#province-box").animate({"right":"-60%"});
    		},
    		showcity: function(){
    			$("#city-box").show();
	    		$("#city-box").animate({"right":"0"});
    		},
    		hiddencity: function(){
    			$("#city-box").hide();
	    		$("#city-box").animate({"right":"-60%"});
    		},
    		hiddentown: function(){
    			$("#town-box").hide();
	    		$("#town-box").animate({"right":"-60%"});
    		}
	    });
		return view;
});
