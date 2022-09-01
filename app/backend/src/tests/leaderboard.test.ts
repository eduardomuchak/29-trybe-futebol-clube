import * as sinon from 'sinon';
import * as chai from 'chai';

import { app } from '../app';

// @ts-ignore
import chaiHttp = require('chai-http');
import { awayLeaderboard, completeLeaderboard, homeLeaderboard } from './mocks/leaderboard.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('#GET /leaderboard', () => {
  beforeEach(async () => {
    sinon.restore();
  });

  it('should return the complete leaderboard with the results of all matches', async () => {
    const res = await chai.request(app).get('/leaderboard');

    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(completeLeaderboard);
  });
});

describe('#GET /leaderboard/home', () => {
  beforeEach(async () => {
    sinon.restore();
  });

  it('should return the home leaderboard', async () => {
    const res = await chai.request(app).get('/leaderboard/home');

    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(homeLeaderboard);
  });
});

describe('#GET /leaderboard/away', () => {
  beforeEach(async () => {
    sinon.restore();
  });

  it('should return the away leaderboard', async () => {
    const res = await chai.request(app).get('/leaderboard/away');

    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(awayLeaderboard);
  });
});