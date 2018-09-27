const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema

const foodSchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true
    },
    category: {
        type: String,
        trim: true,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      _user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      updated: {
        type: Date,
        default: Date.now
      },
});
foodSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Food', foodSchema)
