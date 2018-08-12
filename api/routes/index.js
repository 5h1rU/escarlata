const auth = require('../controllers/auth');
const account = require('../controllers/account');
const confirmation = require('../controllers/confirmation');
const verifyToken = require('../middlewares/auth');

const router = app => {
  app.post('/auth', auth.login);

  app.get('/confirmation/:token', confirmation.confirm);
  app.post('/resend', confirmation.resend);

  app.post('/users', account.create);
  app.all('*', verifyToken);

  app.get('/account', account.read);
  app.patch('/account', account.update);
  app.delete('/account', account.delete);
};

module.exports = router;
