const UserModel = require('../models/user');

const UserService = {
  create: ({ email, firstName, lastName, password }) => {
    const user = new UserModel({
      email,
      firstName,
      lastName,
      password
    });

    return user.save();
  },
  read: data => UserModel.findOne(data),
  update: (id, payload) => {
    return UserModel.findByIdAndUpdate(id, payload, { new: true });
  },
  delete: id => UserModel.findByIdAndDelete(id)
};

module.exports = UserService;
