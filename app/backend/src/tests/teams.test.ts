import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/TeamModel';
import { FIND_ALL_MOCK, ID_ONE_TEAM_MOCK } from './mocks/teams.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test team routes', function () {
  let chaiHttpResponse: Response;

  afterEach(()=>{
    (TeamModel).restore();
  });

  it('Can get all teams | Route: GET /teams', async function () {
    sinon.stub(TeamModel, 'findAll').resolves(FIND_ALL_MOCK as TeamModel[]);

    chaiHttpResponse = await chai
      .request(app)
      .get('/teams');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(FIND_ALL_MOCK);
  });

  it('Can get an specific team | Route GET /teams/:id', async function () {
    sinon.stub(TeamModel, 'findByPk').resolves(ID_ONE_TEAM_MOCK as TeamModel);

    chaiHttpResponse = await chai
      .request(app)
      .get('/teams/1');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(ID_ONE_TEAM_MOCK);
  });
});
