const mongoose = require('mongoose');

const { Schema } = mongoose;

const Order = new Schema(
  {
    _userId: {
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
        type: Schema.Types.ObjectId,
        ref: 'Cart',
        required: true
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
