import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { Response } from 'superagent';

chai.use(chaiHttp);

import { app } from '../app';
import MatchModel from '../database/models/MatchModel';
import { ALL_MATCHES_FROM_DB } from './mocks/matches.mock';

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
  });
});