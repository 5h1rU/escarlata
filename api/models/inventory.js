const mongoose = require('mongoose');

const { Schema } = mongoose;

const InventorySchema = new Schema(
  {
    _productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
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
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Inventory', InventorySchema);
