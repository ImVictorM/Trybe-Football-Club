import * as chai from 'chai';
import * as sinon from 'sinon';

// @ts-ignore
import chaiHttp = require("chai-http");
import { Response } from "superagent";

chai.use(chaiHttp);
import { app } from "../app";
import sequelize from '../database/models';

const { expect } = chai;

import { AWAY_LEADERBOARD_FROM_DB, HOME_LEADERBOARD_FROM_DB } from './mocks/leaderboard.mock';

describe("Test leaderboard-related routes", function () {
  let chaiHttpResponse: Response;
  const sandbox = sinon.createSandbox();

  afterEach(function () {
    sandbox.restore();
  });

  describe("Route: GET /leaderboard", function () {

  });

  describe("Route: GET /leaderboard/home", function () {
    it('Can get all home leaderboard', async function () {
      //  HOME_LEADERBOARD_FROM_DB real type: TeamInfo[], 
      //  Wrong conversion needed because in function was used QueryTypes, which returns Obj[];
      sandbox.stub(sequelize, 'query').resolves(HOME_LEADERBOARD_FROM_DB as [unknown[], unknown]);  

      chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/home');
      
      expect(chaiHttpResponse.body).to.be.deep.equal(HOME_LEADERBOARD_FROM_DB);
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  });

  describe("Route: GET /leaderboard/away", function () {
    it('Can get all away leaderboard', async function () {
      //  AWAY_LEADERBOARD_FROM_DB real type: TeamInfo[], 
      //  Wrong conversion needed because in function was used QueryTypes, which returns Obj[];
      sandbox.stub(sequelize, 'query').resolves(AWAY_LEADERBOARD_FROM_DB as [unknown[], unknown]);

      chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/away');
      
      expect(chaiHttpResponse.body).to.be.deep.equal(AWAY_LEADERBOARD_FROM_DB);
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  });
});