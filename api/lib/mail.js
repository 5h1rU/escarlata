const ConfirmationService = require('../services/confirmation');
const sgMail = require('@sendgrid/mail');
const crypto = require('crypto');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const Mail = {
  confirmation: async (user, host) => {
    const token = await ConfirmationService.create({
      _userId: user.id,
      randomString: crypto.randomBytes(16).toString('hex')
    });

    const mailOptions = {
      from: 'yo@felipejaner.com',
      to: user.email,
      subject: 'Account Verification Token',
      text:
        'Hello,\n\n' +
        'Please verify your account by clicking the link: \nhttp://' +
        'escarlata.now.sh' +
        '/confirmation/' +
        token.token
    };
    return sgMail.send(mailOptions, (err, res) => {
      new Promise((resolve, reject) => {
        if (err) {
          reject(err);
        }

        resolve(res);
      });
    });
  }
};
module.exports = Mail;
