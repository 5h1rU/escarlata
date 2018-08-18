const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;

const EventSchema = new Schema(
  {
    venue: {
      type: Schema.Types.ObjectId,
      ref: 'Venue',
      required: true
    }
  },
  { timestamps: true }
);

EventSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Event', EventSchema);
