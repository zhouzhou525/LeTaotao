define(['jquery', 'underscore', 'backbone',
      'text!'+window.basePath+'/home/detail/detail.html',
      window.basePath+'/home/detail/title/title.js',
      window.basePath+'/home/detail/content/goodsTemp.js',
      window.basePath+'/home/detail/nav/nav.js'
      ],function ($, _, Backbone, detailTemp, titleView, goodsView, navView){
        var view = Backbone.View.extend({
            initialize: function() {
                  var html = _.template(detailTemp)();
                  $(this.el).html(html);
                  this.titleView = new titleView({el: "#title"});        
                  this.goodsView = new goodsView({el: "#content"});
                  this.navView = new navView({el: "#nav"});
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