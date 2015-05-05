'use strict';

var Item = require('../../models/item');
var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'PUT',
    path: '/items/{itemKey}/edit',
    config: {
      description: 'update an item',
      validate: {
        payload: {
          title: Joi.string().required(),
          quantity: Joi.number().required(),
          location: Joi.string(),
          priority: Joi.string(),
          image: Joi.string(),
          isHave: Joi.boolean()
        }
      },
      handler: function(request, reply){
        Item.findByIdAndUpdate({_id: request.params.itemKey, userId: request.auth.credentials._id}, request.payload, function(err, item){
          if(!item){return reply().code(451);}
          console.log(item.isHave);
          item.save(function(){
            return reply(item);
          });
        });
        return reply;
        }
      }
    });
  return next();
};

exports.register.attributes = {
  name: 'items.update'
};
