/**
 * Tag model events
 */

'use strict';

import {EventEmitter} from 'events';
import Tag from './tag.model';
var TagEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TagEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Tag.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    TagEvents.emit(event + ':' + doc._id, doc);
    TagEvents.emit(event, doc);
  };
}

export default TagEvents;
