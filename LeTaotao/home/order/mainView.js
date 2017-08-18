define(['jquery', 'underscore', 'backbone',
      window.basePath+'/home/order/orderTemp.js'
      ],function ($, _, Backbone, orderView){
        var view = Backbone.View.extend({
            initialize: function() {                
              this.orderView = new orderView({el: "#app"});    
            }
    });
    return view;
});




