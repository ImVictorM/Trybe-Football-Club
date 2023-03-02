import * as chai from 'chai';
import * as sinon from 'sinon';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { Response } from 'superagent';

chai.use(chaiHttp);

import { app } from '../app';
import MatchModel from '../database/models/MatchModel';
import { 
  ALL_MATCHES_FROM_DB, 
  IN_PROGRESS_MATCHES_FROM_DB, 
  NOT_IN_PROGRESS_MATCHES_FROM_DB 
} from './mocks/matches.mock';

const { expect } = chai;

describe('Test match-related routes', function () {
  let chaiHttpResponse: Response;
  const sandbox = sinon.createSandbox();

  afterEach(function () {
    sandbox.restore();
  });

  describe('Route: GET /matches', function () {
    it('Can get all matches without any filter', async function () {
      sandbox.stub(MatchModel, 'findAll').resolves(ALL_MATCHES_FROM_DB as unknown as MatchModel[]);

      chaiHttpResponse = await chai
        .request(app)
        .get('/matches');
      
      expect(chaiHttpResponse.body).to.be.deep.equal(ALL_MATCHES_FROM_DB);
      expect(chaiHttpResponse.status).to.be.equal(200);
    });

    it('Can get all matches in progress', async function () {
      sandbox
        .stub(MatchModel, 'findAll')
        .resolves(IN_PROGRESS_MATCHES_FROM_DB as unknown as MatchModel[]);

      chaiHttpResponse = await chai
        .request(app)
        .get('/matches?inProgress=true');
      
      expect(chaiHttpResponse.body).to.be.deep.equal(IN_PROGRESS_MATCHES_FROM_DB);
      expect(chaiHttpResponse.status).to.be.equal(200);
    });

    it('Can get all matches not in progress', async function () {
      sandbox
      .stub(MatchModel, 'findAll')
      .resolves(NOT_IN_PROGRESS_MATCHES_FROM_DB as unknown as MatchModel[]);

      chaiHttpResponse = await chai
        .request(app)
        .get('/matches?inProgress=false');
      
      expect(chaiHttpResponse.body).to.be.deep.equal(NOT_IN_PROGRESS_MATCHES_FROM_DB);
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  });

  describe('Route: PATCH /matches/:id', function () {
    it('Returns the correspondent affected rows on update of a match', async function () {
      sandbox.stub(MatchModel, 'update').returns([2] as any);
      sandbox.stub(jwt, 'verify').returns();

      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/2')
        .auth('token', { type:'bearer' });

      expect(chaiHttpResponse.body).to.be.deep.equal({ affectedRows: 2 });
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  });

  describe('Route: PATCH /matches/:id/finish', function () {
    it('Returns a message when finishes a match', async function () {
      sandbox.stub(MatchModel, 'update').resolves();
      sandbox.stub(jwt, 'verify').returns();

      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/2/finish')
        .auth('token', { type:'bearer' });

      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Finished' });
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  });
});