const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;

const EventSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    venue: {
      type: Schema.Types.ObjectId,
      ref: 'Venue',
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

EventSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Event', EventSchema);
