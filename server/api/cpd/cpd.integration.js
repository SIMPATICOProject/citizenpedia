'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newCpd;

describe('Cpd API:', function() {
  describe('GET /api/cpds', function() {
    var cpds;

    beforeEach(function(done) {
      request(app)
        .get('/api/cpds')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          cpds = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      cpds.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/cpds', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/cpds')
        .send({
          name: 'New Cpd',
          info: 'This is the brand new cpd!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newCpd = res.body;
          done();
        });
    });

    it('should respond with the newly created cpd', function() {
      newCpd.name.should.equal('New Cpd');
      newCpd.info.should.equal('This is the brand new cpd!!!');
    });
  });

  describe('GET /api/cpds/:id', function() {
    var cpd;

    beforeEach(function(done) {
      request(app)
        .get(`/api/cpds/${newCpd._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          cpd = res.body;
          done();
        });
    });

    afterEach(function() {
      cpd = {};
    });

    it('should respond with the requested cpd', function() {
      cpd.name.should.equal('New Cpd');
      cpd.info.should.equal('This is the brand new cpd!!!');
    });
  });

  describe('PUT /api/cpds/:id', function() {
    var updatedCpd;

    beforeEach(function(done) {
      request(app)
        .put(`/api/cpds/${newCpd._id}`)
        .send({
          name: 'Updated Cpd',
          info: 'This is the updated cpd!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedCpd = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCpd = {};
    });

    it('should respond with the updated cpd', function() {
      updatedCpd.name.should.equal('Updated Cpd');
      updatedCpd.info.should.equal('This is the updated cpd!!!');
    });

    it('should respond with the updated cpd on a subsequent GET', function(done) {
      request(app)
        .get(`/api/cpds/${newCpd._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let cpd = res.body;

          cpd.name.should.equal('Updated Cpd');
          cpd.info.should.equal('This is the updated cpd!!!');

          done();
        });
    });
  });

  describe('PATCH /api/cpds/:id', function() {
    var patchedCpd;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/cpds/${newCpd._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Cpd' },
          { op: 'replace', path: '/info', value: 'This is the patched cpd!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedCpd = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedCpd = {};
    });

    it('should respond with the patched cpd', function() {
      patchedCpd.name.should.equal('Patched Cpd');
      patchedCpd.info.should.equal('This is the patched cpd!!!');
    });
  });

  describe('DELETE /api/cpds/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/cpds/${newCpd._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when cpd does not exist', function(done) {
      request(app)
        .delete(`/api/cpds/${newCpd._id}`)
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
