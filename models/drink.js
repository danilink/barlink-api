const mongoose = require('mongoose')
const Schema = mongoose.Schema

const drinkSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    category: {
        type: String,
        trim: true,
        required: true
      },
      description: {
        type: String
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

module.exports = mongoose.model('Drink', drinkSchema)
