/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/terms              ->  index
 * POST    /api/terms              ->  create
 * GET     /api/terms/:id          ->  show
 * PUT     /api/terms/:id          ->  update
 * DELETE  /api/terms/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Term from './term.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
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
function handleUnauthorized(req, res) {
  return function(entity) {
    if (!entity) {return null;}
    if(entity.user._id.toString() !== req.user._id.toString()){
      res.send(403).end();
      return null;
    }
    return entity;
  }
}
// Gets a list of Terms
export function index(req, res) {
  var query = req.query.query && JSON.parse(req.query.query);
  Term.find(query).sort({createdAt: -1}).limit(20).execAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Term from the DB
export function show(req, res) {
  Term.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Term in the DB
export function create(req, res) {
  req.body.user = req.user;
  Term.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Term in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Term.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(handleUnauthorized(req, res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Term from the DB
export function destroy(req, res) {
  Term.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(handleUnauthorized(req, res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

export function createAnswer(req, res) {
  req.body.user = req.user;
  Term.update({_id: req.params.id}, {$push: {answers: req.body}}, function(err, num) {
    if(err) { return handleError(res)(err); }
    if(num === 0) { return res.send(404).end(); }
    exports.show(req, res);
    Term.updateSearchText(req.params.id);
  });
}

export function destroyAnswer(req, res) {
  Term.update({_id: req.params.id}, {$pull: {answers: {_id: req.params.answerId , 'user': req.user._id}}}, function(err, num) {
    if(err) { return handleError(res)(err); }
    if(num === 0) { return res.send(404).end(); }
    exports.show(req, res);
    Term.updateSearchText(req.params.id);
  });
}

export function updateAnswer(req, res) {
  Term.update({_id: req.params.id, 'answers._id': req.params.answerId}, {'answers.$.content': req.body.content, 'answers.$.user': req.user.id}, function(err, num){
    if(err) { return handleError(res)(err); }
    if(num === 0) { return res.send(404).end(); }
    exports.show(req, res);
    Term.updateSearchText(req.params.id);
  });
}

/* comments APIs */
export function createComment(req, res) {
  req.body.user = req.user.id;
  Term.update({_id: req.params.id}, {$push: {comments: req.body}}, function(err, num){
    if(err) {return handleError(res)(err); }
    if(num === 0) { return res.send(404).end(); }
    exports.show(req, res);
    Term.updateSearchText(req.params.id);
  })
}
export function destroyComment(req, res) {
  Term.update({_id: req.params.id}, {$pull: {comments: {_id: req.params.commentId , 'user': req.user._id}}}, function(err, num) {
    if(err) { return handleError(res)(err); }
    if(num === 0) { return res.send(404).end(); }
    exports.show(req, res);
    Term.updateSearchText(req.params.id);
  });
}
export function updateComment(req, res) {
  Term.update({_id: req.params.id, 'comments._id': req.params.commentId}, {'comments.$.content': req.body.content, 'comments.$.user': req.user.id}, function(err, num){
    if(err) { return handleError(res)(err); }
    if(num === 0) { return res.send(404).end(); }
    exports.show(req, res);
    Term.updateSearchText(req.params.id);
  });
}

/* answersComments APIs */
export function createAnswerComment(req, res) {
  req.body.user = req.user.id;
  Term.update({_id: req.params.id, 'answers._id': req.params.answerId}, {$push: {'answers.$.comments': req.body}}, function(err, num){
    if(err) {return handleError(res)(err); }
    if(num === 0) { return res.send(404).end(); }
    exports.show(req, res);
    Term.updateSearchText(req.params.id);
  })
}
export function destroyAnswerComment(req, res) {
  Term.update({_id: req.params.id, 'answers._id': req.params.answerId}, {$pull: {'answers.$.comments': {_id: req.params.commentId , 'user': req.user._id}}}, function(err, num) {
    if(err) { return handleError(res)(err); }
    if(num === 0) { return res.send(404).end(); }
    exports.show(req, res);
    Term.updateSearchText(req.params.id);
  });
}
export function updateAnswerComment(req, res) {
  Term.find({_id: req.params.id}).exec(function(err, terms){
    if(err) { return handleError(res)(err); }
    if(terms.length === 0) { return res.send(404).end(); }
    var term = terms[0];
    var found = false;
    for(var i=0; i < term.answers.length; i++){
      if(term.answers[i]._id.toString() === req.params.answerId){
        found = true;
        var conditions = {};
        conditions._id = req.params.id;
        conditions['answers.' + i + '.comments._id'] = req.params.commentId;
        conditions['answers.' + i + '.comments.user'] = req.user._id;
        var doc = {};
        doc['answers.' + i + '.comments.$.content'] = req.body.content;
        /*jshint -W083 */
        Term.update(conditions, doc, function(err, num){
          if(err) { return handleError(res)(err); }
          if(num === 0) { return res.send(404).end(); }
          exports.show(req, res);
          Term.updateSearchText(req.params.id);
          return;
        });
      }
    }
    if(!found){
      return res.send(404).end();
    }
  });
}














/* star/unstar term */
export function star(req, res) {
  Term.update({_id: req.params.id}, {$push: {stars: req.user.id}}, function(err, num){
    if(err) { return handleError(res)(err); }
    if(num === 0) { return res.send(404).end(); }
    exports.show(req, res);
  });
}
export function unstar(req, res) {
  Term.update({_id: req.params.id}, {$pull: {stars: req.user.id}}, function(err, num){
    if(err) { return handleError(res, err); }
    if(num === 0) { return res.send(404).end(); }
    exports.show(req, res);
  });
}

/* star/unstar answer */
export function starAnswer(req, res) {
  Term.update({_id: req.params.id, 'answers._id': req.params.answerId}, {$push: {'answers.$.stars': req.user.id}}, function(err, num){
    if(err) { return handleError(res)(err); }
    if(num === 0) { return res.send(404).end(); }
    exports.show(req, res);
  });
}
export function unstarAnswer(req, res) {
  Term.update({_id: req.params.id, 'answers._id': req.params.answerId}, {$pull: {'answers.$.stars': req.user.id}}, function(err, num){
    if(err) { return handleError(res)(err); }
    if(num === 0) { return res.send(404).end(); }
    exports.show(req, res);
  });
}

/* star/unstar term comment */
export function starComment(req, res) {
  Term.update({_id: req.params.id, 'comments._id': req.params.commentId}, {$push: {'comments.$.stars': req.user.id}}, function(err, num){
    if(err) { return handleError(res)(err); }
    if(num === 0) { return res.send(404).end(); }
    exports.show(req, res);
  });
}
export function unstarComment(req, res) {
  Term.update({_id: req.params.id, 'comments._id': req.params.commentId}, {$pull: {'comments.$.stars': req.user.id}}, function(err, num){
    if(err) { return handleError(res)(err); }
    if(num === 0) { return res.send(404).end(); }
    exports.show(req, res);
  });
}

/* star/unstar term answer comment */
var pushOrPullStarAnswerComment = function(op, req, res) {
  Term.find({_id: req.params.id}).exec(function(err, terms){
    if(err) { return handleError(res)(err); }
    if(terms.length === 0) { return res.send(404).end(); }
    var term = terms[0];
    var found = false;
    for(var i=0; i < term.answers.length; i++){
      if(term.answers[i]._id.toString() === req.params.answerId){
        found = true;
        var conditions = {};
        conditions._id = req.params.id;
        conditions['answers.' + i + '.comments._id'] = req.params.commentId;
        var doc = {};
        doc[op] = {};
        doc[op]['answers.' + i + '.comments.$.stars'] = req.user.id;
        // Term.update({_id: req.params.id, 'answers.' + i + '.comments._id': req.params.commentId}, {op: {('answers.' + i + '.comments.$.stars'): req.user.id}}, function(err, num){
        /*jshint -W083 */
        Term.update(conditions, doc, function(err, num){
          if(err) { return handleError(res)(err); }
          if(num === 0) { return res.send(404).end(); }
          exports.show(req, res);
          return;
        });
      }
    }
    if(!found){
      return res.send(404).end();
    }
  });
};
export function starAnswerComment(req, res) {
  pushOrPullStarAnswerComment('$push', req, res);
}
export function unstarAnswerComment(req, res) {
  pushOrPullStarAnswerComment('$pull', req, res);
}
