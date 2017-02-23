'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var qaeCtrlStub = {
  index: 'qaeCtrl.index',
  show: 'qaeCtrl.show',
  create: 'qaeCtrl.create',
  upsert: 'qaeCtrl.upsert',
  patch: 'qaeCtrl.patch',
  destroy: 'qaeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var qaeIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './qae.controller': qaeCtrlStub
});

describe('Qae API Router:', function() {
  it('should return an express router instance', function() {
    qaeIndex.should.equal(routerStub);
  });

  describe('GET /api/qae', function() {
    it('should route to qae.controller.index', function() {
      routerStub.get
        .withArgs('/', 'qaeCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/qae/:id', function() {
    it('should route to qae.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'qaeCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/qae', function() {
    it('should route to qae.controller.create', function() {
      routerStub.post
        .withArgs('/', 'qaeCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/qae/:id', function() {
    it('should route to qae.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'qaeCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/qae/:id', function() {
    it('should route to qae.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'qaeCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/qae/:id', function() {
    it('should route to qae.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'qaeCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
