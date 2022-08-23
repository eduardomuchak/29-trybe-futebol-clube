import * as sinon from 'sinon';
import * as chai from 'chai';

import { app } from '../app';
import UsersModel from '../database/models/Users.model';

// @ts-ignore
import chaiHttp = require('chai-http');
import UserModel from '../database/models/Users.model';
import BcryptService from '../services/Bcrypt.service';
import JwtService from '../services/Jwt.service';

chai.use(chaiHttp);

const { expect } = chai;

const successLoginMock = {
  email: 'admin@admin.com',
  password: 'secret_admin',
};

const failureLoginMock = {
  email: 'eduardo@betrybe.com.br',
  password: 'trybe',
};

const tokenMock = {
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X2FkbWluIiwiaWF0IjoxNjYxMTk3NDY1LCJleHAiOjE2NjEyMDEwNjV9.fxwGDtpFSe-Lqt_qD4VWPd9u3sLOsISYIt-0idXIX04"
};

const userMock = {
  id: 1,
  username: 'admin',
  email: "admin@admin.com",
  password: "secret_admin",
  role: "admin",
}

describe('#/login', () => {
  
  beforeEach(async () => {
    sinon.restore();
  });

  it('should return a token if successful login attempt', async () => {
    sinon.stub(UsersModel, 'findOne').resolves(userMock as UserModel);
    sinon.stub(BcryptService, 'compareSyncPassword').returns(true);
    sinon.stub(JwtService, 'sign').returns(tokenMock.token);

    const response = await chai.request(app)
      .post('/login')
      .send(successLoginMock);

    expect(response.status).to.equal(200);
    expect(response.body.token).to.equal(tokenMock.token);
  });

  it('should return an error when trying to login with incorrect email or password', async () => {
    sinon.stub(UsersModel, 'findOne').resolves(userMock as UserModel);
    sinon.stub(BcryptService, 'compareSyncPassword').returns(false);

    const response = await chai.request(app)
      .post('/login')
      .send(failureLoginMock);

    expect(response.status).to.equal(401);
    expect(response.body.message).to.equal('Incorrect email or password');
  });

  it('should return an error if attempt to login with email only', async () => {
    const response = await chai.request(app)
      .post('/login')
      .send(failureLoginMock.email);

    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal('All fields must be filled');
  });

  it('should return an error if attempt to login with password only', async () => {
    const response = await chai.request(app)
      .post('/login')
      .send(failureLoginMock.password);

    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal('All fields must be filled');
  });

  it('should return a user role if is valid token', async () => {
    sinon.stub(JwtService, 'verify').returns(tokenMock.token);
    sinon.stub(UsersModel, 'findOne').resolves(userMock as UserModel);
    sinon.stub(BcryptService, 'compareSyncPassword').returns(true);
    sinon.stub(JwtService, 'sign').returns(tokenMock.token);

    const response = await chai.request(app)
      .get('/login/validate')
      .set({Authorization: tokenMock.token});

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ role: 'admin' });
  })

  it('should return an authorization error if not provided a token', async () => {
    const response = await chai.request(app)
      .get('/login/validate')
      .set({ Authorization: '' });

    expect(response.status).to.equal(404);
    expect(response.body).to.deep.equal({ message: 'Authorization not found' });
  });
  
});
