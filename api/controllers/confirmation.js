const UserService = require('../services/user');
const ConfirmationService = require('../services/confirmation');
const Mail = require('../lib/mail');
const asyncUtil = require('../lib/async');
const { errorBuilder } = require('../lib/errors');

const Confirmation = {
  confirm: asyncUtil(async (req, res, next) => {
    const token = await ConfirmationService.read({ token: req.params.token });
    if (!token) {
      throw errorBuilder({
        name: 'ValidationError',
        message: 'Token expired or invalid'
      });
    }
    const user = await UserService.read({ _id: token._userId });
    if (user.isActive) {
      throw errorBuilder({
        name: 'ValidationError',
        message: 'Account already verified'
      });
    }
    const userVerified = Object.assign(user, { isActive: true });
    await UserService.update(userVerified.id, userVerified);
    res
      .status(200)
      .json({ success: 'The account has been verified. Please log in.' });
  }),
  resend: asyncUtil(async (req, res, next) => {
    const user = await UserService.read({ email: req.body.email });
    const cm = await Mail.confirmation(user, req.headers.host);
    res.status(200).send(cm);
  })
};

module.exports = Confirmation;
