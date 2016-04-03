var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/app');
var should = chai.should();
var expect = chai.expect;

chai.use(chaiHttp);


describe('logins', function() {

  it('should respond to /test GET', function(done) {
  	chai.request('http://localhost:8080')
    	.get('/test')
    	.end(function(err, res){
      		res.should.have.status(200);
      		done();
    	});
  });

  it('should return a token on /login POST', function(done) {
  chai.request('http://localhost:8080')
    .post('/login')
    .send({'name': 'gregg', 'password': '1234'})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      expect(res.body).to.have.property('token');

      done();
    });
  });

  it('should return success on /logout POST', function(done) {
  chai.request('http://localhost:8080')
    .post('/logout')
    .send({'token': 9999})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      expect(res.body).to.have.property('logout');

      done();
    });
  });

  it('should not create a token when the password is incorrect on /login POST', function(done) {
  chai.request('http://localhost:8080')
    .post('/login')
    .send({'name': 'specialsauce', 'password': '6666'})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      expect(res.body).to.have.property('error');

      done();
    });
  });
  
});