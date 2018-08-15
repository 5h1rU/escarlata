const UserService = require('../services/user');
const asyncUtil = require('../lib/async');
const Mail = require('../lib/mail');

const Account = {
  create: asyncUtil(async (req, res, next) => {
    const user = await UserService.create(req.body);
    await Mail.confirmation(user, req.header.host);
    res.status(201).json({ success: true });
  }),
  read: asyncUtil(async (req, res, next) => {
    const user = await UserService.read({ _id: req.user.id });
    res.status(200).json({ success: true, user });
  }),
  update: asyncUtil(async (req, res, next) => {
    const payload = {};
    if (req.body.firstName) {
      payload.firstName = req.body.firstName;
    }
    if (req.body.lastName) {
      payload.lastName = req.body.lastName;
    }
    const user = await UserService.update(req.user.id, payload);
    res.status(200).json({ success: true, user });
  }),
  delete: asyncUtil(async (req, res, next) => {
    await UserService.delete(req.user.id);
    res.status(204).json({ success: true });
  })
};

module.exports = Account;
