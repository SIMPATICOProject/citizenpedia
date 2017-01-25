/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/qae              ->  index
 * POST    /api/qae              ->  create
 * GET     /api/qae/:id          ->  show
 * PUT     /api/qae/:id          ->  upsert
 * PATCH   /api/qae/:id          ->  patch
 * DELETE  /api/qae/:id          ->  destroy
 */

'use strict';

import Qae from './qae.model';
import Question from '../question/question.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Qaes
export function index(req, res) {
  return Qae.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Qae from the DB
export function show(req, res) {
  console.log("Search by eservice");
  var query = req.params.tag;
  console.log(query);
  Question.find({"tags.text": query}).sort({createdAt: -1}).limit(20).execAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Qae from the DB
export function showparagraph(req, res) {
  console.log("Search by eservice"+req.params.eservice+" "+req.params.paragraph);
  var query1 = req.params.eservice;
  var query2 = req.params.paragraph;
  Question.find({$and: [{"tags.text": query1}, {"tags.text": query2} ]}).sort({createdAt: -1}).limit(20).execAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Qae in the DB
export function create(req, res) {
  return Qae.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Qae in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Qae.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Qae in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Qae.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Qae from the DB
export function destroy(req, res) {
  return Qae.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
