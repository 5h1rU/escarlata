const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    total: {
      type: Number
    },
    status: {
      type: String,
      enum: ['PENDING', 'CANCELLED', 'COMPLETED']
    },
    payment: {
      type: Object
    },
    products: [
      {
        cart: {
          type: Schema.Types.ObjectId,
          ref: 'Cart',
          unique: true
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
