const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;

const VenueSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    loc: {
      type: [Number],
      index: {
        type: '2dsphere',
        sparse: true
      }
    },
    capacity: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

VenueSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Venue', VenueSchema);
