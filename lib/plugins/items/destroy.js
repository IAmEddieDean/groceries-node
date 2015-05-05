'use strict';

var Item = require('../../models/item');
var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'DELETE',
    path: '/items/{itemId}',
    config: {
      description: 'delete an item',
      validate: {
        payload: {
          itemId: Joi.string().length(24)
        }
      },
      handler: function(request, reply){
        console.log(request.params);
        Item.findOne({_id: request.params.itemId, userId: request.auth.credentials._id}, function(err, item){
          if(!item){return reply().code(451);}
          item.remove(function(){
            return reply(item);
          });
        });
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'items.destroy'
};
