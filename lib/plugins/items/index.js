'use strict';

var Item = require('../../models/item');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/items',
    config: {
      description: 'get all items for logged-in user'
      },
      handler: function(request, reply){
        Item.find({userId: request.auth.credentials._id}, function(err, items){
          return reply({items: items});
        });
      console.log('test');
      // var item = new Item(request.payload);
      // item.userId = request.auth.credentials._id;
      // item.save(function(){
      //   return reply(item);
      // });
      }
  });
  return next();
};

exports.register.attributes = {
  name: 'items.list'
};
