import * as sinon from 'sinon';
import * as chai from 'chai';
// import * as jwt from 'jsonwebtoken';

import { app } from '../app';
import MatchesModel from '../database/models/Matches.model';
// import UsersModel from '../database/models/Users.model';
// import UserModel from '../database/models/Users.model';

// @ts-ignore
import chaiHttp = require('chai-http');
// import BcryptService from '../services/Bcrypt.service';
// import JwtService from '../services/Jwt.service';

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

const inProgressMatchesMock = [
  {
		id: 41,
		homeTeam: 16,
		homeTeamGoals: 2,
		awayTeam: 9,
		awayTeamGoals: 0,
		inProgress: true,
	},
  {
		id: 42,
		homeTeam: 6,
		homeTeamGoals: 1,
		awayTeam: 1,
		awayTeamGoals: 0,
		inProgress: true,
	},
	{
		id: 43,
		homeTeam: 11,
		homeTeamGoals: 0,
		awayTeam: 10,
		awayTeamGoals: 0,
		inProgress: true,
	},
	{
		id: 44,
		homeTeam: 7,
		homeTeamGoals: 2,
		awayTeam: 15,
		awayTeamGoals: 2,
		inProgress: true,
	},
]

// const successLoginMock = {
//   email: 'admin@admin.com',
//   password: 'secret_admin',
// };

// const userMock = {
//   id: 1,
//   username: 'admin',
//   email: "admin@admin.com",
//   password: "secret_admin",
//   role: "admin",
// }

// const tokenMock = {
//   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X2FkbWluIiwiaWF0IjoxNjYxMTk3NDY1LCJleHAiOjE2NjEyMDEwNjV9.fxwGDtpFSe-Lqt_qD4VWPd9u3sLOsISYIt-0idXIX04"
// };

const createMatchMock = {
  homeTeam: 1,
  awayTeam: 2,
  homeTeamGoals: 1,
  awayTeamGoals: 1,
}

// const createdMatchMock = {
//   id: 60,
//   homeTeam: 1,
//   homeTeamGoals: 1,
//   awayTeam: 2,
//   awayTeamGoals: 1,
//   inProgress: true,
// }


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

describe('#/matches?inProgress=boolean', () => {
  
  beforeEach(async () => {
    sinon.restore();
  });
  
  it('should return a list with only the matches in progress', async () => {
    sinon.stub(MatchesModel, 'findAll').resolves(inProgressMatchesMock as MatchesModel[]);
    
    const res = await chai.request(app).get('/matches?inProgress=true');
    
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(inProgressMatchesMock);
  });

  it('should return a list with only the finished matches', async () => {
    sinon.stub(MatchesModel, 'findAll').resolves(matchesMock as MatchesModel[]);
    
    const res = await chai.request(app).get('/matches?inProgress=false');
    
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(matchesMock);
  });
});

describe('#/matches/:id/finish', () => {
  
  beforeEach(async () => {
    sinon.restore();
  });
  
  // it('should return the message "Finished" when a match searched by id is finished', async () => {
  //   sinon.stub(JwtService, 'verify').returns(tokenMock.token);
  //   sinon.stub(UsersModel, 'findOne').resolves(userMock as UserModel);
  //   sinon.stub(BcryptService, 'compareSyncPassword').returns(true);
  //   sinon.stub(JwtService, 'sign').returns(tokenMock.token);
  //   sinon.stub(MatchesModel, 'update').resolves();

  //   const loginResponse = await chai.request(app)
  //     .post('/login')
  //     .send(successLoginMock);

  //   const res = await chai.request(app).patch('/matches/1/finish');

  //   expect(res.status).to.equal(200);
  //   expect(res.body).to.deep.equal({ message: 'Finished' }); 
  // });

  it('should return the message "Authorization not found" when someone try to finish a match without authorization', async () => {
    sinon.stub(MatchesModel, 'update').resolves();

    const res = await chai.request(app).patch('/matches/1/finish');

    expect(res.status).to.equal(404);
    expect(res.body).to.deep.equal({ message: 'Authorization not found' }); 
  });
});

describe('#POST /matches', () => {
    
  beforeEach(async () => {
    sinon.restore();
  });

  it('should return the message "Token must be a valid token"', async () => {

    const res = await chai.request(app).post('/matches').send(createMatchMock);

    expect(res.status).to.equal(401);
    expect(res.body).to.deep.equal({ message: 'Token must be a valid token' }); 
  });
})

