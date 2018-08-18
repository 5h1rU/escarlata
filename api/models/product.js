const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

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
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true
    },
    properties: {
      type: Object
    }
  },
  { timestamps: true }
);

ProductSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', ProductSchema);
