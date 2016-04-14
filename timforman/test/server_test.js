const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
require(__dirname + '/../lib/server');

describe('basic http server', () => {
  it('has a current time route', (done) => {
    request('localhost:3000')
    .get('/time')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql('The current time is:  ' + new Date().toTimeString() + '.');
      done();
    });
  });

  it('should four oh four on bad requests', (done) => {
    request('localhost:3000')
      .get('/badroute')
      .end((err, res) => {
        expect(err).to.not.be.eql(null);
        expect(res.status).to.eql(404);
        expect(res.text).to.eql('Not Found');
        done();
      });
  });

  it('has a greet route that accepts a name', (done) => {
    request('localhost:3000')
      .get('/greet/Bruce')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('\'ow ya goin\' Bruce!');
        done();
      });
  });

  it('has a greet route that accepts POST data', (done) => {
    request('localhost:3000')
      .post('/greet')
      .send({ 'salute': 'Hello World!' })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('Hello World!');
        done();
      });
  });
});
