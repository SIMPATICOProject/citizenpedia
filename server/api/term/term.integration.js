'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newTerm;

describe('Term API:', function() {
  describe('GET /api/terms', function() {
    var terms;

    beforeEach(function(done) {
      request(app)
        .get('/api/terms')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          terms = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      terms.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/terms', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/terms')
        .send({
          name: 'New Term',
          info: 'This is the brand new term!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newTerm = res.body;
          done();
        });
    });

    it('should respond with the newly created term', function() {
      newTerm.name.should.equal('New Term');
      newTerm.info.should.equal('This is the brand new term!!!');
    });
  });

  describe('GET /api/terms/:id', function() {
    var term;

    beforeEach(function(done) {
      request(app)
        .get(`/api/terms/${newTerm._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          term = res.body;
          done();
        });
    });

    afterEach(function() {
      term = {};
    });

    it('should respond with the requested term', function() {
      term.name.should.equal('New Term');
      term.info.should.equal('This is the brand new term!!!');
    });
  });

  describe('PUT /api/terms/:id', function() {
    var updatedTerm;

    beforeEach(function(done) {
      request(app)
        .put(`/api/terms/${newTerm._id}`)
        .send({
          name: 'Updated Term',
          info: 'This is the updated term!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedTerm = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTerm = {};
    });

    it('should respond with the updated term', function() {
      updatedTerm.name.should.equal('Updated Term');
      updatedTerm.info.should.equal('This is the updated term!!!');
    });

    it('should respond with the updated term on a subsequent GET', function(done) {
      request(app)
        .get(`/api/terms/${newTerm._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let term = res.body;

          term.name.should.equal('Updated Term');
          term.info.should.equal('This is the updated term!!!');

          done();
        });
    });
  });

  describe('PATCH /api/terms/:id', function() {
    var patchedTerm;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/terms/${newTerm._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Term' },
          { op: 'replace', path: '/info', value: 'This is the patched term!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedTerm = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedTerm = {};
    });

    it('should respond with the patched term', function() {
      patchedTerm.name.should.equal('Patched Term');
      patchedTerm.info.should.equal('This is the patched term!!!');
    });
  });

  describe('DELETE /api/terms/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/terms/${newTerm._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when term does not exist', function(done) {
      request(app)
        .delete(`/api/terms/${newTerm._id}`)
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
