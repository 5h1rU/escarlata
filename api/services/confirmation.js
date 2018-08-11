const TokenModel = require('../models/token');

const ConfirmationService = {
  create: ({ _userId, randomString }) => {
    const token = new TokenModel({
      _userId,
      token: randomString
    });

    return token.save();
  },
  read: token => TokenModel.findOne(token),
  update: (id, payload) => {
    return TokenModel.findByIdAndUpdate(id, payload, { new: true });
  }
};

module.exports = ConfirmationService;
