'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newStat;

describe('Stat API:', function() {
  describe('GET /api/stats/', function() {
    var stats;

    beforeEach(function(done) {
      request(app)
        .get('/api/stats/')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          stats = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      stats.should.be.instanceOf(Array);
    });
  });

  // describe('POST /api/stats/questions/', function() {
  //   beforeEach(function(done) {
  //     request(app)
  //       .post('/api/stats/questions/')
  //       .send({
  //         name: 'New Stat',
  //         info: 'This is the brand new stat!!!'
  //       })
  //       .expect(201)
  //       .expect('Content-Type', /json/)
  //       .end((err, res) => {
  //         if(err) {
  //           return done(err);
  //         }
  //         newStat = res.body;
  //         done();
  //       });
  //   });

  //   it('should respond with the newly created stat', function() {
  //     newStat.name.should.equal('New Stat');
  //     newStat.info.should.equal('This is the brand new stat!!!');
  //   });
  // });

  describe('GET /api/stats/questions/:id', function() {
    var stat;

    beforeEach(function(done) {
      request(app)
        .get(`/api/stats/questions/BS607A`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          stat = res.body;
          done();
        });
    });

    afterEach(function() {
      stat = {};
    });

    it('should respond with an number', function() {
      stat.should.be.a('Number');
    });
  });

  describe('GET /api/stats/questions/:id/:paragraph', function() {
    var stat;

    beforeEach(function(done) {
      request(app)
        .get(`/api/stats/questions/BS607A/Paragraph1`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          stat = res.body;
          done();
        });
    });

    afterEach(function() {
      stat = {};
    });

    it('should respond with an number', function() {
      stat.should.be.a('Number');
    });
  });

  // describe('PUT /api/stats/questions/:id', function() {
  //   var updatedStat;

  //   beforeEach(function(done) {
  //     request(app)
  //       .put(`/api/stats/questions/${newStat._id}`)
  //       .send({
  //         name: 'Updated Stat',
  //         info: 'This is the updated stat!!!'
  //       })
  //       .expect(200)
  //       .expect('Content-Type', /json/)
  //       .end(function(err, res) {
  //         if(err) {
  //           return done(err);
  //         }
  //         updatedStat = res.body;
  //         done();
  //       });
  //   });

  //   afterEach(function() {
  //     updatedStat = {};
  //   });

  //   it('should respond with the updated stat', function() {
  //     updatedStat.name.should.equal('Updated Stat');
  //     updatedStat.info.should.equal('This is the updated stat!!!');
  //   });

  //   it('should respond with the updated stat on a subsequent GET', function(done) {
  //     request(app)
  //       .get(`/api/stats/${newStat._id}`)
  //       .expect(200)
  //       .expect('Content-Type', /json/)
  //       .end((err, res) => {
  //         if(err) {
  //           return done(err);
  //         }
  //         let stat = res.body;

  //         stat.name.should.equal('Updated Stat');
  //         stat.info.should.equal('This is the updated stat!!!');

  //         done();
  //       });
  //   });
  // });


  // describe('DELETE /api/stats/questions/:id', function() {
  //   it('should respond with 204 on successful removal', function(done) {
  //     request(app)
  //       .delete(`/api/stats/questions/${newStat._id}`)
  //       .expect(204)
  //       .end(err => {
  //         if(err) {
  //           return done(err);
  //         }
  //         done();
  //       });
  //   });

  //   it('should respond with 404 when stat does not exist', function(done) {
  //     request(app)
  //       .delete(`/api/stats/questions/${newStat._id}`)
  //       .expect(404)
  //       .end(err => {
  //         if(err) {
  //           return done(err);
  //         }
  //         done();
  //       });
  //   });
  // });
});
