const auth = require('../controllers/auth');
const account = require('../controllers/account');
const confirmation = require('../controllers/confirmation');
const product = require('../controllers/product');
const verifyToken = require('../middlewares/auth');

const router = app => {
  app.post('/auth', auth.login);

  app.get('/confirmation/:token', confirmation.confirm);
  app.post('/resend', confirmation.resend);

  app.post('/account', account.create);
  app.all('*', verifyToken);

  app.get('/account', account.read);
  app.patch('/account', account.update);
  app.delete('/account', account.delete);

  app.post('/products', product.create);
  app.get('/products/:id', product.read);
  app.put('/products/:id', product.update);
  app.delete('/products/:id', product.delete);
};

module.exports = router;
