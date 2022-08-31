import * as sinon from 'sinon';
import * as chai from 'chai';

import { app } from '../app';
import MatchesModel from '../database/models/Matches.model';

// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

const matchesMock = [
  {
		id: 1,
		homeTeam: 16,
		homeTeamGoals: 1,
		awayTeam: 8,
		awayTeamGoals: 1,
		inProgress: false,
	},
  {
		id: 2,
		homeTeam: 9,
		homeTeamGoals: 1,
		awayTeam: 14,
		awayTeamGoals: 1,
		inProgress: false,
	},
	{
		id: 3,
		homeTeam: 4,
		homeTeamGoals: 3,
		awayTeam: 11,
		awayTeamGoals: 0,
		inProgress: false,
	},
	{
		id: 4,
		homeTeam: 3,
		homeTeamGoals: 0,
		awayTeam: 2,
		awayTeamGoals: 0,
		inProgress: false,
	},
	{
		id: 5,
		homeTeam: 7,
		homeTeamGoals: 1,
		awayTeam: 10,
		awayTeamGoals: 1,
		inProgress: false,
	},
]

describe('#/matches', () => {
  
  beforeEach(async () => {
    sinon.restore();
  });

  it('should return a list with all matches list', async () => {
    sinon.stub(MatchesModel, 'findAll').resolves(matchesMock as MatchesModel[]);
    
    const res = await chai.request(app).get('/matches');
    
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(matchesMock);
  });  
});