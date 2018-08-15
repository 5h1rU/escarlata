const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    price: {
      type: Number
    },
    category: {
      type: String,
      default: 'ticket'
    },
    name: {
      type: String
    },
    properties: {
      type: Object
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
