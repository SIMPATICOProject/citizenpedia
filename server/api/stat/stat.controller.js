/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/stats              ->  index
 * POST    /api/stats              ->  create
 * GET     /api/stats/:id          ->  show
 * PUT     /api/stats/:id          ->  upsert
 * PATCH   /api/stats/:id          ->  patch
 * DELETE  /api/stats/:id          ->  destroy
 */

'use strict';

import Stat from './stat.model';
import Question from '../question/question.model';

/* istanbul ignore next */
function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) { 
      return res.status(statusCode).json(entity); 
  };

/*
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
*/
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

/* istanbul ignore next */
// Gets a list of Stats
export function index(req, res) {
  return Stat.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/* istanbul ignore next */
// Gets a single Stat from the DB
export function show(req, res) {
  // console.log("Stats");
  var query = req.params.tag;
    if (req.params.id == "questions") {
      Question.find({"tags.text": query}).count().execAsync()
        .then(respondWithResult(res))
        .catch(handleError(res));
    }

    if (req.params.id == "diagrams") {
      // console.log("diagrams->"+query);
      Question.find({$and: [{"tags.text": "Diagram"}, {"tags.text": query} ]}).count().execAsync()
        .then(respondWithResult(res))
        .catch(handleError(res));
    }

    if (req.params.id == "total") {
      // console.log("totalQuestions");
      Question.count()
        .then(respondWithResult(res))
        .catch(handleError(res));
    }

    // if (req.params.id != "questions") {
    //   console.log("another");
    //   Question.find({$and: [{"tags.text": "Diagram"}, {"tags.text": req.params.id} ]}).count().execAsync()
    //   // return Stat.findById(req.params.id).exec()
    //     .then(handleEntityNotFound(res))
    //     .then(respondWithResult(res))
    //     .catch(handleError(res));
    // }

}

/* istanbul ignore next */
// Swagger sucks. Have to make this function just to swagger to work
export function countparagraph(req, res) {
  // console.log("Stats from eservice and paragraph");
  var query1 = req.params.eservice;
  var query2 = req.params.paragraph;

    if (req.params.id == "questions") {
      // console.log("questions");
      Question.find({$and: [{"tags.text": query1}, {"tags.text": query2} ]}).count().execAsync()
        .then(respondWithResult(res))
        .catch(handleError(res));
    }

    if (req.params.id == "diagrams") {
      // console.log("diagrams");
      Question.find({$and: [{"tags.text": "Diagram"}, {"tags.text": query1}, {"tags.text": query2} ]}).count().execAsync()
        .then(respondWithResult(res))
        .catch(handleError(res));
    }
    // Waiting for CPD methods
    // if (req.params.id != "questions") {
    //   console.log("Error. Only questions for now, please");
    //   // return Stat.findById(req.params.id).exec()
    //   //   .then(handleEntityNotFound(res))
    //   //   .then(respondWithResult(res))
    //   //   .catch(handleError(res));
    // }

}

/* istanbul ignore next */
// Function to get total number of questions
export function totalquestions(req, res)
{
  // console.log("totalQuestions");
  Question.count()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/* istanbul ignore next */
// Function to get total number of stars
export function totalstars(req, res)
{
  // console.log("totalstars");
  Question.count({"stars" : { $exists: true, $not: {$size: 0} } })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/* istanbul ignore next */
// Creates a new Stat in the DB
export function create(req, res) {
  return Stat.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

/* istanbul ignore next */
// Upserts the given Stat in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Stat.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

/* istanbul ignore next */
// Updates an existing Stat in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Stat.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/* istanbul ignore next */
// Deletes a Stat from the DB
export function destroy(req, res) {
  return Stat.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
