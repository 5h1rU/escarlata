const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiHttp = require('chai-http');
const app = require('../../../index');
const Account = require('../../../api/controllers/account');
const JWT = require('../../../api/lib/auth');

chai.use(chaiAsPromised);
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

describe('Account Controller', () => {
  describe('/GET account', () => {
    it('should get the account with valid token', async () => {
      const token = `Bearer ${JWT.create({
        data: '5b6f49230619fc36cde7424b'
      })}`;
      const res = await request(app)
        .get('/account/')
        .set('Authorization', token);
      expect(res.status).to.be.equal(200);
    });

    it('should get unauthorized response without token', async () => {
      const res = await request(app).get('/account/');
      expect(res.status).to.be.equal(403);
    });
  });

  describe('POST account', () => {
    it('should avoid create a existent user', async () => {
      const user = { 
        firstName: 'felipe',
        lastName: 'janer',
        password: '123',
        email: 'f@cymbals.com' 
      };
      const res = await request(app)
        .post('/account')
        .send(user);
      expect(res.status).to.be.equal(400);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('error');
    });
  });

  describe('PUT account', () => {
    it('should update a existent user', async () => {
      const login = await request(app)
        .post('/auth')
        .send({ email: 'f@cymbals.com', password: '123' });

      console.log(login);

      const token = `Bearer ${login.res}`;

      const user = { 
        firstName: 'ronaldinho',
        lastName: 'janer',
        email: 'f@cymbals.com'
      };
      const res = await request(app)
        .put('/account')
        .send(user)
        .set('Authorization', token);
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('error');
    });
  });
});
