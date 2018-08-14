const mongoose = require('mongoose');

const { Schema } = mongoose;

const Order = new Schema(
  {
    total: {
      type: Number
    },
    payment: {
      type: Object
    },
    shipping: {
      type: Object
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Ticket',
        required: true
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
