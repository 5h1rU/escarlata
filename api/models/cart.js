const mongoose = require('mongoose');

const { Schema } = mongoose;

const Cart = new Schema(
  {
    _userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    state: {
      type: String
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Ticket'
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', CartSchema);
