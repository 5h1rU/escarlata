const express = require('express');
const UserModel = require('../models/user');
const JWT = require('../lib/auth');
const asyncUtil = require('../lib/async');

const Auth = {
  login: asyncUtil(async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
      res.status(400).send({ error: 'Invalid credentials' });
    }
    const user = await UserModel.findOne({ email: req.body.email });
    await user.isValidPassword(req.body.password);
    res.json({ success: true, token: JWT.create({ data: user.id }) });
  })
};

module.exports = Auth;
