define(['jquery','backbone',
      window.basePath+'/home/panicBuy/rushBuyTemp.js'
      ],function ($, Backbone, rushBuyView){
        var view = Backbone.View.extend({
            initialize: function() {                
                  this.rushBuyView = new rushBuyView({el: "#app"});   
            }
    });
    return view;
});




