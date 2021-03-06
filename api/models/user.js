const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const encrypt = require('../lib/encrypt');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: 'First name is required',
      trim: true
    },
    lastName: {
      type: String,
      required: 'Last name is required',
      trim: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: 'Email address is required',
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address'
      ]
    },
    password: {
      type: String,
      required: 'Password is required'
      // select: false
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user'
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password') || this.password === undefined) {
    return next();
  }

  this.password = await encrypt.hash(this.password);
  return next();
});

UserSchema.methods.isValidPassword = async function(password) {
  return await encrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
