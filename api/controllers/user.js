const UserService = require('../services/user');
const JWT = require('../lib/auth');
const asyncUtil = require('../lib/async');

const User = {
  create: asyncUtil(async (req, res, next) => {
    const user = await UserService.create(req.body);
    res.status(201).json({ success: true, token: JWT.create({ data: user }) });
  }),
  read: asyncUtil(async (req, res, next) => {
    const user = await UserService.read(req.params.id);
    if (!user) {
      res.status(404).json({ error: 'user not found' });
    }
    res.status(200).json({ success: user });
  }),
  update: asyncUtil(async (req, res, next) => {
    const user = await UserService.update(req.params.id);
    res.status(204).json({ success: user });
  }),
  delete: asyncUtil(async (req, res, next) => {
    await UserService.delete(req.params.id);
    res.status(204);
  })
};

module.exports = User;
