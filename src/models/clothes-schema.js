'use strict';

const mongoose = require('mongoose');

const clothesSchema = mongoose.Schema({
  name: { type: String, required: true }, // required property for an item
  calories: { type: Number, required: true },
  type: { type: String, uppercase: true, enum: ['FRUIT', 'VEG', 'MEAT']}
});

const clothesModel = mongoose.model('clothes', clothesSchema);

module.exports = clothesModel;