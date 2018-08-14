const mongoose = require('mongoose');

const { Schema } = mongoose;

const TokenSchema = new Schema({
  _userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 30
  }
});

module.exports = mongoose.model('Token', TokenSchema);
