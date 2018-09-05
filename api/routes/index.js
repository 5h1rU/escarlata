const auth = require('../controllers/auth');
const account = require('../controllers/account');
const confirmation = require('../controllers/confirmation');
const cart = require('../controllers/cart');
const inventory = require('../controllers/inventory');
const product = require('../controllers/product');
const event = require('../controllers/event');
const venue = require('../controllers/venue');
const verifyToken = require('../middlewares/auth');

const router = app => {
  app.post('/auth', auth.login);

  app.get('/confirmation/:token', confirmation.confirm);
  app.post('/resend', confirmation.resend);

  app.post('/account', account.create);
  // app.all('*', verifyToken);

  app.get('/account', account.read);
  app.patch('/account', account.update);
  app.delete('/account', account.delete);

  app.post('/cart', cart.create);
  app.get('/cart', cart.read);
  app.put('/cart', cart.update);
  app.delete('/cart', cart.delete);

  app.get('/inventory', inventory.readAll);
  app.get('/inventory/:id', inventory.read);

  app.post('/products', product.create);
  app.get('/products', product.readAll);
  app.get('/products/:id', product.read);
  app.put('/products/:id', product.update);
  app.delete('/products/:id', product.delete);

  app.post('/events', event.create);
  app.get('/events', event.readAll);
  app.get('/events/:id', event.read);
  app.put('/events/:id', event.update);
  app.delete('/events/:id', event.delete);

  app.post('/venues', venue.create);
  app.get('/venues', venue.readAll);
  app.get('/venues/:id', venue.read);
  app.put('/venues/:id', venue.update);
  app.delete('/venues/:id', venue.delete);
};

module.exports = router;
