'use strict';

var Item = require('../../models/item');
var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'POST',
    path: '/items',
    config: {
      description: 'create an item',
      validate: {
        payload: {
          title: Joi.string().required(),
          quantity: Joi.number().required(),
          location: Joi.string(),
          priority: Joi.string(),
          photo: Joi.binary().encoding('base64'),
        }
      },
      handler: function(request, reply){
      var item = new Item(request.payload);
      item.userId = request.auth.credentials._id;
      item.save(function(){
        return reply(item);
      });
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'items.create'
};
