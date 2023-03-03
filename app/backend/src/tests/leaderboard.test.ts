import * as chai from 'chai';
import * as sinon from 'sinon';

// @ts-ignore
import chaiHttp = require("chai-http");
import { Response } from "superagent";

chai.use(chaiHttp);
import { app } from "../app";

const { expect } = chai;

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
      
    });
  });

  describe("Route: GET /leaderboard/away", function () {

  });
});