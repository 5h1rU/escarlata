const mongoose = require('mongoose');

const { Schema } = mongoose;

const Inventory = new Schema(
  {
    _productId: {
      type: Schema.Types.ObjectId,
      ref: 'Ticket',
      required: true
    },
    quantity: {
      type: Number
    },
    reservations: [
      {
        _cartId: {
          type: Schema.Types.ObjectId,
          ref: 'Cart',
          required: true
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Inventory', InventorySchema);
