import * as sinon from 'sinon';
import * as chai from 'chai';
// import * as jwt from 'jsonwebtoken';

import { app } from '../app';
import MatchesModel from '../database/models/Matches.model';
// import UsersModel from '../database/models/Users.model';
// import UserModel from '../database/models/Users.model';

// @ts-ignore
import chaiHttp = require('chai-http');
import { createMatchMock, inProgressMatchesMock, matchesMock } from './mocks/match.mock';
// import BcryptService from '../services/Bcrypt.service';
// import JwtService from '../services/Jwt.service';

chai.use(chaiHttp);

const { expect } = chai;
describe('#GET /matches', () => {
  
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

describe('#GET /matches?inProgress=boolean', () => {
  
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

describe('#PATCH /matches/:id/finish', () => {
  
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

