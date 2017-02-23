'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newQae;

describe('Qae API:', function() {
  describe('GET /api/qae', function() {
    var qaes;

    beforeEach(function(done) {
      request(app)
        .get('/api/qae')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          qaes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      qaes.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/qae', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/qae')
        .send({
          name: 'New Qae',
          info: 'This is the brand new qae!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newQae = res.body;
          done();
        });
    });

    it('should respond with the newly created qae', function() {
      newQae.name.should.equal('New Qae');
      newQae.info.should.equal('This is the brand new qae!!!');
    });
  });

  describe('GET /api/qae/:id', function() {
    var qae;

    beforeEach(function(done) {
      request(app)
        .get(`/api/qae/${newQae._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          qae = res.body;
          done();
        });
    });

    afterEach(function() {
      qae = {};
    });

    it('should respond with the requested qae', function() {
      qae.name.should.equal('New Qae');
      qae.info.should.equal('This is the brand new qae!!!');
    });
  });

  describe('PUT /api/qae/:id', function() {
    var updatedQae;

    beforeEach(function(done) {
      request(app)
        .put(`/api/qae/${newQae._id}`)
        .send({
          name: 'Updated Qae',
          info: 'This is the updated qae!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedQae = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedQae = {};
    });

    it('should respond with the updated qae', function() {
      updatedQae.name.should.equal('Updated Qae');
      updatedQae.info.should.equal('This is the updated qae!!!');
    });

    it('should respond with the updated qae on a subsequent GET', function(done) {
      request(app)
        .get(`/api/qae/${newQae._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let qae = res.body;

          qae.name.should.equal('Updated Qae');
          qae.info.should.equal('This is the updated qae!!!');

          done();
        });
    });
  });

  describe('PATCH /api/qae/:id', function() {
    var patchedQae;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/qae/${newQae._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Qae' },
          { op: 'replace', path: '/info', value: 'This is the patched qae!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedQae = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedQae = {};
    });

    it('should respond with the patched qae', function() {
      patchedQae.name.should.equal('Patched Qae');
      patchedQae.info.should.equal('This is the patched qae!!!');
    });
  });

  describe('DELETE /api/qae/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/qae/${newQae._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when qae does not exist', function(done) {
      request(app)
        .delete(`/api/qae/${newQae._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
