const express = require('express');
const UserModel = require('../models/user');
const JWT = require('../lib/auth');
const asyncUtil = require('../lib/async');
const { errorBuilder } = require('../lib/errors');

const Auth = {
  login: asyncUtil(async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
      throw errorBuilder({
        name: 'UnauthorizedError',
        message: 'Invalid Credentials'
      });
    }

    const user = await UserModel.findOne({ email: req.body.email });
    await user.isValidPassword(req.body.password);
    if (!user.isActive) {
      throw errorBuilder({
        name: 'UnauthorizedError',
        message: 'Your account has not been verified'
      });
    }
    res.json({ success: true, token: JWT.create({ data: user.id }) });
  })
};

module.exports = Auth;
