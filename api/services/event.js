const EventModel = require('../models/event');

const EventService = {
  create: ({ venue, name, capacity, date, description }) => {
    const event = new EventModel({
      venue,
      name,
      capacity,
      date,
      description
    });

    return event.save();
  },
  read: data => EventModel.findOne(data).populate('venue'),
  readAll: data => {
    const payload = Object.assign({}, data, { populate: 'venue' });
    return EventModel.paginate({}, payload);
  },
  update: (id, payload) => {
    return EventModel.findByIdAndUpdate(id, payload, { new: true });
  },
  delete: id => EventModel.findByIdAndDelete(id)
};

module.exports = EventService;
