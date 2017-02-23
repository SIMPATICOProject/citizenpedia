/**
 * Cpd model events
 */

'use strict';

import {EventEmitter} from 'events';
import Cpd from './cpd.model';
var CpdEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CpdEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Cpd.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CpdEvents.emit(event + ':' + doc._id, doc);
    CpdEvents.emit(event, doc);
  };
}

export default CpdEvents;
