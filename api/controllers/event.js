const EventService = require('../services/event');
const asyncUtil = require('../lib/async');
const { errorBuilder } = require('../lib/errors');

const Event = {
  create: asyncUtil(async (req, res, next) => {
    const event = await EventService.create(req.body);
    if (!event) {
      throw errorBuilder({
        name: 'ValidationError',
        message: 'Problem creating the event'
      });
    }
    res.status(201).json({ success: true, event });
  }),
  read: asyncUtil(async (req, res, next) => {
    const event = await EventService.read({});
    if (!event) {
      throw errorBuilder({
        name: 'NotFoundError',
        message: 'Event not found'
      });
    }
    res.status(200).json({ success: true, event });
  }),
  readAll: asyncUtil(async (req, res, next) => {
    const events = await EventService.readAll({ page: 1, limit: 10 });
    res.status(200).json({ success: true, events });
  }),
  update: asyncUtil(async (req, res, next) => {
    const payload = req.body;
    const event = await EventService.update(req.params.id, payload);
    if (!event) {
      throw errorBuilder({
        name: 'NotFoundError',
        message: 'Event not found'
      });
    }
    res.status(200).json({ success: true, event });
  }),
  delete: asyncUtil(async (req, res, next) => {
    const event = await EventService.delete(req.params.id);
    console.log(event);
    if (!event) {
      throw errorBuilder({
        name: 'NotFoundError',
        message: 'Event not found'
      });
    }
    res.status(204).json();
  })
};

module.exports = Event;
