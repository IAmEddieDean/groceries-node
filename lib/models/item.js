'use strict';

var Mongoose = require('mongoose');

var itemSchema = Mongoose.Schema({
  title: {type: String, required: true},
  quantity: {type: Number, required: true},
  location: {type: String},
  priority: {type: String},
  photo: {type: String},
  createdAt: {type: Date, default: Date.now},
  isHave: {type: Boolean, default: false},
  userId : {type: Mongoose.Schema.ObjectId, ref: 'User', required: true},
});

var Item = Mongoose.model('Item', itemSchema);
module.exports = Item;
