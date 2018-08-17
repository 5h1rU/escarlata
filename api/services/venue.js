const VenueModel = require('../models/venue');

const VenueService = {
  create: ({ name, loc, capacity }) => {
    const venue = new VenueModel({
      name,
      loc,
      capacity
    });

    return venue.save();
  },
  read: data => VenueModel.findOne(data),
  readAll: data => VenueModel.paginate({}, data),
  update: (id, payload) => {
    return VenueModel.findByIdAndUpdate(id, payload, { new: true });
  },
  delete: id => VenueModel.findByIdAndDelete(id)
};

module.exports = VenueService;
