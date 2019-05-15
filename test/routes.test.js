const app = require('../api/app');
const request = require('supertest');
const chai = require('chai')
const expect = chai.expect;

//require('dotenv').config();

describe('GET /api', () => {
    it('welcomes the user', (done) => {
        request(app).get('/api')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                done();
            });
    });
});
