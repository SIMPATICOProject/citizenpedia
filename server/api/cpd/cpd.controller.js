/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/cpds              ->  index
 * POST    /api/cpds              ->  create
 * GET     /api/cpds/:id          ->  show
 * PUT     /api/cpds/:id          ->  upsert
 * PATCH   /api/cpds/:id          ->  patch
 * DELETE  /api/cpds/:id          ->  destroy
 */

'use strict';

import Cpd from './cpd.model';
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

/* istanbul ignore next */
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

/* istanbul ignore next */
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

/* istanbul ignore next */
function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

/* istanbul ignore next */
function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Cpds
export function index(req, res) {
  return Cpd.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Qae from the DB
export function show(req, res) {
  console.log("Search by eservice");
  var query = req.params.tag;
  console.log(query);
  Question.find({$and: [{"tags.text": "Diagram"}, {"tags.text": query} ]}).sort({createdAt: -1}).limit(20).execAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/* istanbul ignore next */
// Creates a new Cpd in the DB
export function create(req, res) {
  return Cpd.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

/* istanbul ignore next */
// Upserts the given Cpd in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Cpd.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

/* istanbul ignore next */
// Updates an existing Cpd in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Cpd.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/* istanbul ignore next */
// Deletes a Cpd from the DB
export function destroy(req, res) {
  return Cpd.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
