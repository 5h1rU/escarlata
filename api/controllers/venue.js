const VenueService = require('../services/venue');
const asyncUtil = require('../lib/async');
const { errorBuilder } = require('../lib/errors');

const Venue = {
  create: asyncUtil(async (req, res, next) => {
    const venue = await VenueService.create(req.body);
    if (!venue) {
      throw errorBuilder({
        name: 'ValidationError',
        message: 'Problem creating the venue'
      });
    }
    res.status(201).json({ success: true, venue });
  }),
  read: asyncUtil(async (req, res, next) => {
    const venue = await VenueService.read({});
    if (!venue) {
      throw errorBuilder({
        name: 'NotFoundError',
        message: 'venue not found'
      });
    }
    res.status(200).json({ success: true, venue });
  }),
  readAll: asyncUtil(async (req, res, next) => {
    // TODO: use parameters for handle page and limit
    const venues = await VenueService.readAll({ page: 1, limit: 10 });
    res.status(200).json({ success: true, venues });
  }),
  update: asyncUtil(async (req, res, next) => {
    const payload = req.body;
    const venue = await VenueService.update(req.params.id, payload);
    if (!venue) {
      throw errorBuilder({
        name: 'NotFoundError',
        message: 'venue not found'
      });
    }
    res.status(200).json({ success: true, venue });
  }),
  delete: asyncUtil(async (req, res, next) => {
    const venue = await VenueService.delete(req.params.id);
    if (!venue) {
      throw errorBuilder({
        name: 'NotFoundError',
        message: 'venue not found'
      });
    }
    res.status(204).json();
  })
};

module.exports = Venue;
