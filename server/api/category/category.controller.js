/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/categories              ->  index
 * POST    /api/categories              ->  create
 * GET     /api/categories/:id          ->  show
 * PUT     /api/categories/:id          ->  upsert
 * PATCH   /api/categories/:id          ->  patch
 * DELETE  /api/categories/:id          ->  destroy
 */

'use strict';

import Category from './category.model';
import Question from '../question/question.model';

/* istanbul ignore next */
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
          return res.status(204).end();
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

/* istanbul ignore next */
// Gets a list of Categorys
export function index(req, res) {
  return Category.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/* istanbul ignore next */
// Gets a single Category from the DB
export function show(req, res) {
  return Category.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/* istanbul ignore next */
// Gets questions from a category
export function getQuestions(req, res) {
  console.log("Search by category");
  var query = req.params.id;
  Question.find({"category": query}).sort({createdAt: -1}).limit(20).execAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/* istanbul ignore next */
// Creates a new Category in the DB
export function create(req, res) {
  return Category.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

/* istanbul ignore next */
// Upserts the given Category in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Category.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

/* istanbul ignore next */
// Updates an existing Category in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Category.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/* istanbul ignore next */
// Deletes a Category from the DB
export function destroy(req, res) {
  return Category.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
