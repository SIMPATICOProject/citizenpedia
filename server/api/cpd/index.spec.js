'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var cpdCtrlStub = {
  index: 'cpdCtrl.index',
  show: 'cpdCtrl.show',
  create: 'cpdCtrl.create',
  upsert: 'cpdCtrl.upsert',
  patch: 'cpdCtrl.patch',
  destroy: 'cpdCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var cpdIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './cpd.controller': cpdCtrlStub
});

describe('Cpd API Router:', function() {
  it('should return an express router instance', function() {
    cpdIndex.should.equal(routerStub);
  });

  describe('GET /api/cpd', function() {
    it('should route to cpd.controller.index', function() {
      routerStub.get
        .withArgs('/', 'cpdCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/cpd/:id/:tag', function() {
    it('should route to cpd.controller.show', function() {
      routerStub.get
        .withArgs('/:id/:tag', 'cpdCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/cpd', function() {
    it('should route to cpd.controller.create', function() {
      routerStub.post
        .withArgs('/', 'cpdCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/cpd/:id', function() {
    it('should route to cpd.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'cpdCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/cpds/:id', function() {
    it('should route to cpd.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'cpdCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/cpds/:id', function() {
    it('should route to cpd.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'cpdCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
