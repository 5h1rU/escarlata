const UserService = require('../services/user');
const JWT = require('../lib/auth');
const asyncUtil = require('../lib/async');
const { errorBuilder } = require('../lib/errors');

const Account = {
  create: asyncUtil(async (req, res, next) => {
    const user = await UserService.create(req.body);
    res.status(201).json({ success: true, token: JWT.create({ data: user }) });
  }),
  read: asyncUtil(async (req, res, next) => {
    const user = await UserService.read(req.user.id);
    res.status(200).json({ success: user });
  }),
  update: asyncUtil(async (req, res, next) => {
    let payload = {};
    if (req.body.firstName) {
      payload.firstName = req.body.firstName;
    }
    if (req.body.lastName) {
      payload.lastName = req.body.lastName;
    }
    const user = await UserService.update(req.user.id, payload);
    res.status(200).json({ success: user });
  }),
  delete: asyncUtil(async (req, res, next) => {
    await UserService.delete(req.user.id);
    res.status(204);
  })
};

module.exports = Account;
