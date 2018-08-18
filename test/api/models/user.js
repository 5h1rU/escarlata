const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiHttp = require('chai-http');
const app = require('../../index');
const User = require('../../api/models/user');

chai.use(chaiAsPromised);
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

describe('User', () => {
  beforeEach(async () => await User.remove());

  describe('/GET users', () => {
    it('should get a user', async () => {
      const res = await request(app).get('/users/');
      expect(res.status).to.be.equal(200);
    });
  });

  describe('POST user', () => {
    it('should post a user', async () => {
      const user = { name: 'felipe' };
      const res = await request(app)
        .post('/user')
        .send(user);
      expect(res.status).to.be.equal(201);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('user');
      expect(res.body.user).to.have.property('name');
    });
  });
});
