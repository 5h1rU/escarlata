const mongoose = require('mongoose');

const { Schema } = mongoose;

TokenSchema = new Schema({
  _userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
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
