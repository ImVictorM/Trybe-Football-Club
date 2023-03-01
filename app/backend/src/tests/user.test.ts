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
} from './mocks/user.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test user-related routes', function () {
  let chaiHttpResponse: Response;

  afterEach(function () {
    (UserModel).restore();
  });

  describe('Route: /login', function () {
    it('Can log in with valid user and returns a token', async function () {
      sinon.stub(UserModel, 'findOne').resolves(VALID_USER_FROM_DB as UserModel);

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
  });
});