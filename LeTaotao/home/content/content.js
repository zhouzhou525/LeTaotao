define(['jquery', 'underscore', 'backbone', 'mui',
	'text!'+window.basePath+'/home/content/content.html'], 
	function($, _, Backbone, mui, conTemp){
			var view = Backbone.View.extend({
	    	initialize: function(){
	    		var html = _.template(conTemp); 
				$(this.el).html(html);
				this.bind();
				this.countDown();
	    	},
	    	bind: function(){
	    		//获得slider插件对象
				var gallery = mui('.mui-slider');
				gallery.slider({
				  interval:3000//自动轮播周期，若为0则不自动播放，默认为0；
				});
				//获取详情网页的地址
				$(".js-main-list-box").bind("click",function(evt){
                    var page = $(this).data("page");
                  	window.location.href = "#homeView/detail?pageNum=" + page;               
             	});
             	$(".main-buying-box5").bind("click",function(){ 
                  	window.location.href = "#homeView/panicBuy";               
             	});
	    	},
            countDown: function(){
            	var self = this;
            	var year;
            	var month;
            	var date;
            	var hour;
            	var time=[9, 11, 13, 15, 17, 19, 21, 23];
            	setInterval(function(){
            		year= new Date().getFullYear();
	            	month = new Date().getMonth()+1;
	            	date = new Date().getDate();
	            	hour = new Date().getHours();
	            	//循环判断抢购时间
            		for(var i=0, len=time.length; i<len; i++){
	            		if(hour<time[i] && i!=0){
	            			$("#start").text(time[i-1]+"点抢购中");
	            			self.GetRTime(year,month,date,time[i]);
	            			break;	
	            		}else if(hour==time[i] && i!=len-1){
	            			$("#start").text(time[i]+"点抢购中");
	            			self.GetRTime(year,month,date,time[i+1]);
		            		break;
	            		}else{
	            			$("#start").text("明天9点开始");
	            			$("#hour").text("00");
			        		$("#minte").text("00");
			        		$("#second").text("00");
	            		}
            		} 
            	}, 1000);
            },
            GetRTime: function(year,month,date,hour){
            	var self = this;
            	function p(n){
		            return n<10?'0'+n:n;
		        }
            	var EndTime= new Date(year,month,date,hour,0,0);     
        		var NowTime = new Date();  
        		var t =(EndTime.getTime() - NowTime.getTime())/1000;         
        		var h=0;     
        		var m=0;     
        		var s=0;     
        		if(t>=0){       
        			//d=Math.floor(t/1000/60/60/24);    //天数   
        			h=parseInt(t/60/60%24);    //小时 
        			m=parseInt(t/60%60);       //分钟
        			s=parseInt(t%60);     	  //秒数
        		}
        		$("#hour").text(p(h));
        		$("#minte").text(p(m));
        		$("#second").text(p(s));
            }
	    });
		return view;
});
