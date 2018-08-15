const express = require('express');
const UserService = require('../services/user');
const JWT = require('../lib/auth');
const asyncUtil = require('../lib/async');
const { errorBuilder } = require('../lib/errors');

const Auth = {
  login: asyncUtil(async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
      throw errorBuilder({
        name: 'UnauthorizedError',
        message: 'Missing parameters'
      });
    }

    const user = await UserService.read({ email: req.body.email });
    if (!user) {
      throw errorBuilder({
        name: 'UnauthorizedError',
        message: 'Invalid Credentials'
      });
    }
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
