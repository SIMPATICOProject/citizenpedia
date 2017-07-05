'use strict';

var express = require('express');
var controller = require('./tag.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/byname/:query', controller.findByName);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);
router.get('/updatetag/:id/:name', auth.hasRole('admin'), controller.updateTag);

module.exports = router;
