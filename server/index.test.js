var expect = require('chai').expect,
      chai = require('chai'),
  chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('endpoints', function(){

//================testing submitapp endpoint=====================
  it('should successfully submit an application with a user id POST', function(done) { // <= Pass in done callback
    chai.request('http://localhost:8080')
    .post('/user/applicant/submitapp')
    .send({
      'years_experience': 1.5, 
      'desired_education': 'MA in CS', 
      'personal_statement': 'submitted during chai testing', 
      'skill_1_met': true, 
      'skill_2_met': true, 
      'skill_3_met': false, 
      'skill_4_met': false, 
      'skill_5_met': true, 
      'skill_6_met': true, 
      'skill_7_met': true, 
      'can_work_here': false, 
      'user_id': 5, 
      'job_id': 4
    })
    .end(function(err, res) {
      expect(res).to.have.status(200);
      done();                               // <= Call done to signal callback end
    });
  });

  it('should fail if job id does not exist POST');
  it('should fail if user id does not exist POST');

//================testing appsbyuser endpoint====================
  it('should successfully retrieve applications associated with a user id GET', function(done) { // <= Pass in done callback
    chai.request('http://localhost:8080')
    .get('/user/applicant/appsbyuser')
    .query({userID: 4})
    .end(function(err, res) {
      expect(res).to.have.status(200);
      done();                               // <= Call done to signal callback end
    });
  });

  it('should fail to retrieve applications when no user id is specified GET', function(done) {
    chai.request('http://localhost:8080')
    .get('/user/applicant/appsbyuser')
    .end(function(err, res) {
      expect(res).to.have.status(400);
      done();                               // <= Call done to signal callback end
    });
  });

//================testing appsbyjob endpoint=====================
  it('should successfully retrieve applications associated with a job id GET');
  it('should fail if job id does not exist GET');

//================testing submitjob endpoint=====================
  it('should successfully submit an application with a user id POST');

//================testing job endpoint=====================
  it('should return all jobs GET');

//================testing job/:id endpoint=====================
  it('should successfully retrieve job if jobID exists GET');
  it('should fail if jobID does not exist GET');

//================testing newemployer endpoint=====================
  it('should successfully submit a new employer POST');

});

// according to the docs, 'done' should not be necessary when using chai with promises,
// but it didn't seem to work correctly without it. Also, the individual tests did not
// wait until the previous test completed with the below promise-based version
/*
  it('should successfully retrieve applications associated with a user id', function(done){
    return chai.request('http://localhost:8080')
    .get('/user/applicant/appsbyuser')
    .query({userID: 4})
    //.send({ password: '123', confirmPassword: '123' })
    .then(function (res) {
      console.log("get successful response:",res.statusCode);
      expect(res).to.have.status(200);
      //res.should.be.json;
      //res.body.should.be.a('array');
      done();
    })
    .catch(function (err) {
      console.log("get failure response:",err.message);
      expect(res).to.have.status(200);
      //assert.fail(err);
      done();
      //throw err;
    })
  });
});
*/
