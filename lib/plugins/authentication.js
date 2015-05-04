'use strict';

var User = require('../models/user');

exports.register = function(server, options, next){
  var authenticate = {
    key: process.env.FIREBASE_SECRET,
    
    validateFunc: function(jwt, cb){
      var now = Date.now();
      var old = jwt.iat*1000;
      var future = old + (process.env.FIREBASE_EXPIRE * 60 * 60 * 1000);
      if(now > old && now < future){
        User.findOne({firebaseId: jwt.d.uid}, function(err, user){
          cb(null, true, {firebaseId: jwt.d.uid, _id: user ? user._id : null});
      
        });
      
      }else{
        cb();
      }
    }
  };
  server.expose({authenticate: authenticate});
  return next();
};

exports.register.attributes = {
  name:'authentication'
};
