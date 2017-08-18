define(['jquery', 'underscore', 'backbone', 'mui',
	'text!'+window.basePath+'/home/detail/content/goodsTemp.html'], 
	function($, _, Backbone, mui, goodsTemp){
			var view = Backbone.View.extend({
	    	initialize: function(){
	    		var html = _.template(goodsTemp); 
  				$(this.el).html(html);
  				this.bind();
          this.slideIMg();
	    	},
        bind: function(){
          var self = this;
          	//获得slider插件对象
    			var gallery = mui('.mui-slider');
    			gallery.slider({
    			  interval:3000//自动轮播周期，若为0则不自动播放，默认为0
    			});
    			$(".js-house-chlid-zi").bind("click",function(){
            	$(".js-house-chlid-zi").removeClass("active");
            	$(this).addClass("active");
              var page = $(this).data("page");
              self.changePage(page);
          }); 
        },
        changePage: function(page){
          var type=-1;
          var width= +$("#slideImg").width()/2;
          $("#slideImg").stop().animate({"left": type*width*page+"px"},500);
          $(".js-house-chlid-zi").removeClass("active");
          if(page==0){
            $("#activeAttach1").addClass("active");
          }else {
            $("#activeAttach2").addClass("active");
          }
        },
        slideIMg: function(){
          var originX, originY;
          var moveX, moveY;
          var endX, endY;
          var space;
          var page = 0;
          var self = this;
          var canMove = false;
          var width = +$("#slideImg").width()/2;
          $("#slideImg").bind("touchstart", function(e){
            originX=e.originalEvent.targetTouches[0].pageX + page*width;
            originY=e.originalEvent.targetTouches[0].pageY;
            e.stopPropagation();
          });
          $("#slideImg").bind("touchmove", function(e){
            endX= e.originalEvent.targetTouches[0].pageX;
            endY= e.originalEvent.targetTouches[0].pageY;
            moveX= endX - originX;
            moveY= endY - originY;
            space = moveX + page*width;
            if(Math.abs(space)>Math.abs(moveY)){
              canMove=true;
            }
            if(canMove){
              moveX = moveX>30? 30 : moveX<-(width+30)? -(width+30) : moveX;
              $("#slideImg").stop().animate({"left": moveX+"px"}, 5);
            }
          });
          $("#slideImg").bind("touchend", function(e){
            if(canMove){
              if(space<0){
                page=1;
                self.changePage(page);
              }else{
                page = 0;
                self.changePage(page);
              }
            }
          });
        }
	    });
		return view;
});
