/**
 * Qae model events
 */

'use strict';

import {EventEmitter} from 'events';
import Qae from './qae.model';
var QaeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
QaeEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Qae.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    QaeEvents.emit(event + ':' + doc._id, doc);
    QaeEvents.emit(event, doc);
  };
}

export default QaeEvents;
