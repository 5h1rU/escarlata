const auth = require('../controllers/auth');
const user = require('../controllers/account');
const verifyToken = require('../middlewares/auth');

const router = app => {
  app.post('/auth', auth.login);

  app.all('*', verifyToken);
  app.post('/users', user.create);

  app.get('/account', user.read);
  app.patch('/account', user.update);
  app.delete('/account', user.delete);
};

module.exports = router;
