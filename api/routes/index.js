const auth = require('../controllers/auth');
const user = require('../controllers/user');
const verifyToken = require('../middlewares/auth');

const router = app => {
  app.post('/auth', auth.login);

  app.all('*', verifyToken);
  app.post('/users', user.create);
  app.get('/users/:id', user.read);
  app.patch('/users/:id', user.update);
  app.delete('/users/:id', user.delete);
};

module.exports = router;
