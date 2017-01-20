'use strict';

var express = require('express');
var controller = require('./stat.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id/:tag', controller.show);
router.get('/:id/:eservice/:paragraph', controller.countparagraph);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
