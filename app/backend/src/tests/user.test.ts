import * as chai from 'chai';
import * as sinon from 'sinon';

// @ts-ignore
import chaiHttp = require('chai-http');
import * as bcryptjs from 'bcryptjs';
import { app } from '../app';

import UserModel from '../database/models/UserModel';
import { Response } from 'superagent';
import { 
  VALID_USER_FROM_REQUEST, 
  VALID_USER_TOKEN, 
  VALID_USER_FROM_DB,
  INVALID_EMAIL_USER_FROM_REQUEST,
  INVALID_PASSWORD_USER_FROM_REQUEST,
} from './mocks/user.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test user-related routes', function () {
  let chaiHttpResponse: Response;
  const sandbox = sinon.createSandbox();

  afterEach(function () {
    sandbox.restore();
  });

  describe('Route: /login', function () {
    it('Can log in with valid user and returns a token', async function () {
      sandbox.stub(UserModel, 'findOne').resolves(VALID_USER_FROM_DB as UserModel);

      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(VALID_USER_FROM_REQUEST);

      expect(chaiHttpResponse.body).to.be.deep.equal({ token: VALID_USER_TOKEN });
      expect(chaiHttpResponse.status).to.be.equal(200);
    });

    it('Can\'t log in without email', async function () {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ password: 'somepassword123' });

      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
      expect(chaiHttpResponse.status).to.be.equal(400);
    });

    it('Can\'t log in without password', async function () {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'email@email.com' });

      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
      expect(chaiHttpResponse.status).to.be.equal(400);
    });

    it('Can\'t log in with an invalid email', async function () {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(INVALID_EMAIL_USER_FROM_REQUEST);
      
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Invalid email or password' });
      expect(chaiHttpResponse.status).to.be.equal(401);
    });

    it('Can\'t log in with an invalid password', async function () {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(INVALID_PASSWORD_USER_FROM_REQUEST);
      
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Invalid email or password' });
      expect(chaiHttpResponse.status).to.be.equal(401);
    });

    it('Can\'t log in when user is valid but doesn\'t exist on db', async function () {
      sandbox.stub(UserModel, 'findOne').resolves(null);

      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(VALID_USER_FROM_REQUEST);
      
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Invalid email or password' });
      expect(chaiHttpResponse.status).to.be.equal(401);
    });
  });
});