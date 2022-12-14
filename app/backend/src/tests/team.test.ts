import * as sinon from 'sinon';
import * as chai from 'chai';

import { app } from '../app';
import TeamsModel from '../database/models/Teams.model';

// @ts-ignore
import chaiHttp = require('chai-http');
import { notFoundMock, teamsMock } from './mocks/team.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('#GET /teams', () => {
  
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

describe('#GET /teams/:id', () => {
  
  beforeEach(async () => {
    sinon.restore();
  });

  it('should return the id and name of a team searched by id', async () => {
    sinon.stub(TeamsModel, 'findOne').resolves(teamsMock[11] as TeamsModel);
    
    const response = await chai.request(app).get('/teams/12');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(teamsMock[11]);
  });

  it('should return a 404 error if the team searched by id does not exist', async () => {
    sinon.stub(TeamsModel, 'findOne').resolves(null);
    
    const response = await chai.request(app).get('/teams/99');

    expect(response.status).to.equal(404);
    expect(response.body).to.deep.equal(notFoundMock);
  });
});