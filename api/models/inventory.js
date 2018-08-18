const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;

const InventorySchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number
    },
    reservations: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true
        },
        quantity: {
          type: Number
        }
      }
    ]
  },
  { timestamps: true }
);

InventorySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Inventory', InventorySchema);
