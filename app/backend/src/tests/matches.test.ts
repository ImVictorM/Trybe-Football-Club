import * as chai from "chai";
import * as sinon from "sinon";
import * as jwt from "jsonwebtoken";
// @ts-ignore
import chaiHttp = require("chai-http");

import { Response } from "superagent";

chai.use(chaiHttp);

import { app } from "../app";
import MatchModel from "../database/models/MatchModel";
import TeamModel from "../database/models/TeamModel";
import {
  ALL_MATCHES_FROM_DB,
  IN_PROGRESS_MATCHES_FROM_DB,
  MATCH_WITH_SAME_TEAMS,
  NEW_MATCH_FROM_DB,
  NEW_MATCH_FROM_REQ,
  NOT_IN_PROGRESS_MATCHES_FROM_DB,
} from "./mocks/matches.mock";
import { ID_ONE_TEAM_MOCK } from "./mocks/teams.mock";

const { expect } = chai;

describe("Test match-related routes", function () {
  let chaiHttpResponse: Response;
  const sandbox = sinon.createSandbox();

  afterEach(function () {
    sandbox.restore();
  });

  describe("Route: GET /matches", function () {
    it("Can get all matches without any filter", async function () {
      sandbox
        .stub(MatchModel, "findAll")
        .resolves(ALL_MATCHES_FROM_DB as unknown as MatchModel[]);

      chaiHttpResponse = await chai.request(app).get("/matches");

      expect(chaiHttpResponse.body).to.be.deep.equal(ALL_MATCHES_FROM_DB);
      expect(chaiHttpResponse.status).to.be.equal(200);
    });

    it("Can get all matches in progress", async function () {
      sandbox
        .stub(MatchModel, "findAll")
        .resolves(IN_PROGRESS_MATCHES_FROM_DB as unknown as MatchModel[]);

      chaiHttpResponse = await chai
        .request(app)
        .get("/matches?inProgress=true");

      expect(chaiHttpResponse.body).to.be.deep.equal(
        IN_PROGRESS_MATCHES_FROM_DB
      );
      expect(chaiHttpResponse.status).to.be.equal(200);
    });

    it("Can get all matches not in progress", async function () {
      sandbox
        .stub(MatchModel, "findAll")
        .resolves(NOT_IN_PROGRESS_MATCHES_FROM_DB as unknown as MatchModel[]);

      chaiHttpResponse = await chai
        .request(app)
        .get("/matches?inProgress=false");

      expect(chaiHttpResponse.body).to.be.deep.equal(
        NOT_IN_PROGRESS_MATCHES_FROM_DB
      );
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  });

  describe("Route POST /matches", function () {
    // this route needs a token
    beforeEach(function () {
      sandbox.stub(jwt, "verify").returns();
    });

    it("Can create a new match and return it", async function () {
      sinon
        .stub(MatchModel, "create")
        .resolves(NEW_MATCH_FROM_DB as MatchModel);

      chaiHttpResponse = await chai
        .request(app)
        .post("/matches")
        .auth("token", { type: "bearer" })
        .send(NEW_MATCH_FROM_REQ);

      expect(chaiHttpResponse.body).to.be.deep.equal(NEW_MATCH_FROM_DB);
      expect(chaiHttpResponse.status).to.be.equal(201);
    });

    it("Can't create a match containing same teams", async function () {
      chaiHttpResponse = await chai
        .request(app)
        .post("/matches")
        .auth("token", { type: "bearer" })
        .send(MATCH_WITH_SAME_TEAMS);

      expect(chaiHttpResponse.body).to.be.deep.equal({
        message: "It is not possible to create a match with two equal teams",
      });
      expect(chaiHttpResponse.status).to.be.equal(422);
    });

    it("Can't create a match with any invalid team", async function () {
      sandbox
        .stub(TeamModel, "findByPk")
        .onFirstCall()
        .resolves(null)
        .onSecondCall()
        .resolves(ID_ONE_TEAM_MOCK as TeamModel);

      chaiHttpResponse = await chai
        .request(app)
        .post("/matches")
        .auth("token", { type: "bearer" })
        .send(NEW_MATCH_FROM_REQ);

      expect(chaiHttpResponse.body).to.be.deep.equal({
        message: "There is no team with such id!",
      });
      expect(chaiHttpResponse.status).to.be.equal(404);
    });
  });

  describe("Route: PATCH /matches/:id", function () {
    it("Returns the correspondent affected rows on update of a match", async function () {
      sandbox.stub(MatchModel, "update").returns([2] as any);
      sandbox.stub(jwt, "verify").returns();

      chaiHttpResponse = await chai
        .request(app)
        .patch("/matches/2")
        .auth("token", { type: "bearer" });

      expect(chaiHttpResponse.body).to.be.deep.equal({ affectedRows: 2 });
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  });

  describe("Route: PATCH /matches/:id/finish", function () {
    it("Returns a message when finishes a match", async function () {
      sandbox.stub(MatchModel, "update").resolves();
      sandbox.stub(jwt, "verify").returns();

      chaiHttpResponse = await chai
        .request(app)
        .patch("/matches/2/finish")
        .auth("token", { type: "bearer" });

      expect(chaiHttpResponse.body).to.be.deep.equal({ message: "Finished" });
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  });
});
