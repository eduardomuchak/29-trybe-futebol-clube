import * as sinon from 'sinon';
import * as chai from 'chai';

import { app } from '../app';
import TeamsModel from '../database/models/Teams.model';

// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

const teamsMock = [
  {
		id: 1,
		teamName: "Avaí/Kindermann"
	},
	{
		id: 2,
		teamName: "Bahia"
	},
	{
		id: 3,
		teamName: "Botafogo"
	},
	{
		id: 4,
		teamName: "Corinthians"
	},
	{
		id: 5,
		teamName: "Cruzeiro"
	},
	{
		id: 6,
		teamName: "Ferroviária"
	},
	{
		id: 7,
		teamName: "Flamengo"
	},
	{
		id: 8,
		teamName: "Grêmio"
	},
	{
		id: 9,
		teamName: "Internacional"
	},
	{
		id: 10,
		teamName: "Minas Brasília"
	},
	{
		id: 11,
		teamName: "Napoli-SC"
	},
	{
		id: 12,
		teamName: "Palmeiras"
	},
	{
		id: 13,
		teamName: "Real Brasília"
	},
	{
		id: 14,
		teamName: "Santos"
	},
	{
		id: 15,
		teamName: "São José-SP"
	},
	{
		id: 16,
		teamName: "São Paulo"
	}
]

const searchedTeamMock = {
  id: 12,
  teamName: "Palmeiras"
};

const notFoundMock = { 
  message: 'Team not found'
};

describe('#/teams', () => {
  
  beforeEach(async () => {
    sinon.restore();
  });

  it('should return a list with the id and name of all teams', async () => {
    sinon.stub(TeamsModel, 'findAll').resolves(teamsMock as TeamsModel[]);
    
    const response = await chai.request(app).get('/teams');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(teamsMock);
  });  
});

describe('#/teams/:id', () => {
  
  beforeEach(async () => {
    sinon.restore();
  });

  it('should return the id and name of a team searched by id', async () => {
    sinon.stub(TeamsModel, 'findOne').resolves(searchedTeamMock as TeamsModel);
    
    const response = await chai.request(app).get('/teams/12');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(searchedTeamMock);
  });

  it('should return a 404 error if the team searched by id does not exist', async () => {
    sinon.stub(TeamsModel, 'findOne').resolves(null);
    
    const response = await chai.request(app).get('/teams/99');

    expect(response.status).to.equal(404);
    expect(response.body).to.deep.equal(notFoundMock);
  });
});