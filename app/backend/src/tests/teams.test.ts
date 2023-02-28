import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { TeamModel } from '../database/models';
import { FIND_ALL_MOCK } from './mocks/teams.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('"/teams" route', () => {
  let chaiHttpResponse: Response;

  afterEach(()=>{
    (TeamModel).restore();
  });

  it('Can get all teams | Route: GET /teams', async () => {
    sinon.stub(TeamModel, 'findAll').resolves(FIND_ALL_MOCK as TeamModel[]);

    chaiHttpResponse = await chai
        .request(app)
        .get('/teams');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(FIND_ALL_MOCK);
  });
});
