define(['jquery', 'underscore', 'backbone',
	'text!'+window.basePath+'/findings/content/content.html'], //引入html文件
	function($, _, Backbone, conTemp){
		var view = Backbone.View.extend({
      	    	initialize: function(){
      	    		var html = _.template(conTemp); //加载模板
      				$(this.el).html(html);
      				this.bind();
      	    	},
                  bind: function(){
                        //获得slider插件对象
                        var gallery = mui('.mui-slider');
                              gallery.slider({
                              interval:3000//自动轮播周期，若为0则不自动播放，默认为0；
                        });
                        $(".js-icon-love").bind("click",function(){
                        	$(this).toggleClass("icon-xihuan");
                        	$(this).toggleClass("icon-xihuanfill");
                        	$(".discover-show-box").css("display","block");
                        	$(".discover-show-box").addClass("active");
                        });
                        $("#discoverBack").bind("click", function(){
                              window.history.back();
                        });
                  } 
	     });
	     return view;
});
