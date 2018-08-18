const EventModel = require('../models/event');

const EventService = {
  create: ({ venue }) => {
    const event = new EventModel({
      venue
    });

    return event.save();
  },
  read: data => EventModel.findOne(data),
  readAll: data => EventModel.paginate({}, data),
  update: (id, payload) => {
    return EventModel.findByIdAndUpdate(id, payload, { new: true });
  },
  delete: id => EventModel.findByIdAndDelete(id)
};

module.exports = EventService;
