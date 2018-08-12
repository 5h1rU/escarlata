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
    await UserService.update(user.id, { isActive: true });
    // TODO: Return redirect URI schema for ios/android/web
    res
      .status(200)
      .json({ success: 'The account has been verified. Please log in.' });
  }),
  resend: asyncUtil(async (req, res, next) => {
    const user = await UserService.read({ email: req.body.email });
    await Mail.confirmation(user, req.headers.host);
    res.status(200).json({ success: true });
  })
};

module.exports = Confirmation;
