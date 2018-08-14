const mongoose = require('mongoose');

const { Schema } = mongoose;

const Cart = new Schema(
  {
    _userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Ticket',
        quantity: {
          type: Number,
          required: true
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', CartSchema);