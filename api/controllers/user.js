const UserService = require('../services/user');
const JWT = require('../lib/auth');
const asyncUtil = require('../lib/async');
const { errorBuilder } = require('../lib/errors');

const User = {
  create: asyncUtil(async (req, res, next) => {
    const user = await UserService.create(req.body);
    res.status(201).json({ success: true, token: JWT.create({ data: user }) });
  }),
  read: asyncUtil(async (req, res, next) => {
    const user = await UserService.read(req.params.id);
    if (!user) {
      throw errorBuilder({ name: 'NotFoundError', message: 'User not found' });
    }
    res.status(200).json({ success: user });
  }),
  update: asyncUtil(async (req, res, next) => {
    /**
     * TODO: this piece of code is used in other part of the app
     * ../middlewares/auth.js
     * I need change and avoid DRY, abstract in a new method and
     * inovoke here and there.
     */
    const token = req.headers.authorization.split(' ')[1];
    const id = await JWT.verify(token);

    if (id !== req.params.id) {
      throw errorBuilder({
        name: 'UnauthorizedError',
        message: 'Out of scope'
      });
    }
    let payload = {};
    if (req.body.firstName) {
      payload.firstName = req.body.firstName;
    }
    if (req.body.lastName) {
      payload.lastName = req.body.lastName;
    }
    const user = await UserService.update(req.params.id, payload);
    res.status(200).json({ success: user });
  }),
  delete: asyncUtil(async (req, res, next) => {
    await UserService.delete(req.params.id);
    res.status(204);
  })
};

module.exports = User;
