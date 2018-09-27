const mongoose = require('mongoose')
const Schema = mongoose.Schema

const foodSchema = new Schema({
    name: {
      type: String,
      required: true
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
      }
});

module.exports = mongoose.model('Food', foodSchema)
