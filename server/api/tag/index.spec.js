'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var tagCtrlStub = {
  index: 'tagCtrl.index',
  show: 'tagCtrl.show',
  create: 'tagCtrl.create',
  upsert: 'tagCtrl.upsert',
  patch: 'tagCtrl.patch',
  destroy: 'tagCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var tagIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './tag.controller': tagCtrlStub
});

describe('Tag API Router:', function() {
  it('should return an express router instance', function() {
    tagIndex.should.equal(routerStub);
  });

  describe('GET /citizenpedia/api/tags', function() {
    it('should route to tag.controller.index', function() {
      routerStub.get
        .withArgs('/', 'tagCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /citizenpedia/api/tags/:id', function() {
    it('should route to tag.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'tagCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /citizenpedia/api/tags', function() {
    it('should route to tag.controller.create', function() {
      routerStub.post
        .withArgs('/', 'tagCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /citizenpedia/api/tags/:id', function() {
    it('should route to tag.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'tagCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /citizenpedia/api/tags/:id', function() {
    it('should route to tag.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'tagCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /citizenpedia/api/tags/:id', function() {
    it('should route to tag.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'tagCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
