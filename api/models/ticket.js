const mongoose = require('mongoose');

const { Schema } = mongoose;

const Ticket = new Schema(
  {
    price: {
      type: Number
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

module.exports = mongoose.model('Ticket', TicketSchema);
