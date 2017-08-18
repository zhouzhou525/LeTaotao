define(['jquery', 'underscore', 'backbone',
      'text!'+window.basePath+'/home/cart/cart.html',
      window.basePath+'/home/cart/title/title.js',
      window.basePath+'/home/cart/content/content.js',
      window.basePath+'/home/cart/nav/nav.js'
      ],
      function ($, _, Backbone, cartTemp, titleView, conView, navView){
        var view = Backbone.View.extend({
            initialize: function() {
                  var html = _.template(cartTemp)();
                  $(this.el).html(html);
                  this.titleView = new titleView({el: "#title"}); 
                  this.navView = new navView({el: "#nav"});       
                  this.conView = new conView({el: "#content"});
            }     
    });
    return view;
});