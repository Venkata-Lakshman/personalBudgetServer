const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it, before, after } = require('mocha');
const { server, app } = require('../server'); 
const SignupSchema = require("../models/SignupModel")

chai.use(chaiHttp);
const expect = chai.expect;

describe('Server API Tests', () => {
 
  const newUser = {
      username: 'Rahul',
     password: '123',
  };

  let authToken; 

  // before(async () => {
    

  //   const res = await chai.request(server)
  //     .post('/login')
  //     .send(testUser);

    
  //   authToken = res.body.token;
  // });

  

  it('should successfully register a new user', (done) => {
   

    chai.request(server)
      .post('/Signup')
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('success').to.equal(true);
        done();
      });
  });
  

  it('should return a JWT token on successful login', (done) => {


    chai.request(server)
      .post('/login')
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        SignupSchema.deleteOne(
         { username:newUser.username}
        )
        .then(() =>done())
        
      });
  });

  

 
  // it('should add an expense with a valid JWT token', (done) => {
  //   const expenseData = {
  //     userId: '656b6df6195d579b6e278a23', 
  //     month: 'January',
  //     category: 'Groceries',
  //     expense: 50,
  //   };
  
  //   chai.request(server)
  //     .post('/add-expense/:userId')
  //     .set('Authorization', `Bearer ${authToken}`)
  //     .send(expenseData)
  //     .end((err, res) => {
  //       expect(res).to.have.status(200);
  //       expect(res.body).to.have.property('success').to.equal(true);
  //       done();
  //     });
  // });
  
  
  
  
});
