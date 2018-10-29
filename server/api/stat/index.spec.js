'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var statCtrlStub = {
  index: 'statCtrl.index',
  show: 'statCtrl.show',
  create: 'statCtrl.create',
  upsert: 'statCtrl.upsert',
  patch: 'statCtrl.patch',
  destroy: 'statCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var statIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './stat.controller': statCtrlStub
});

describe('Stat API Router:', function() {
  it('should return an express router instance', function() {
    statIndex.should.equal(routerStub);
  });

  describe('GET /api/stats', function() {
    it('should route to stat.controller.index', function() {
      routerStub.get
        .withArgs('/', 'statCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/stats/:id/:tag', function() {
    it('should route to stat.controller.show', function() {
      routerStub.get
        .withArgs('/:id/:tag', 'statCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/stats', function() {
    it('should route to stat.controller.create', function() {
      routerStub.post
        .withArgs('/', 'statCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/stats/:id', function() {
    it('should route to stat.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'statCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/stats/:id', function() {
    it('should route to stat.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'statCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/stats/:id', function() {
    it('should route to stat.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'statCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
