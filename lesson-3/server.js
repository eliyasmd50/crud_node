const logEvents = require('./logEvents');

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {};

//initialize objects
const myEmitter = new MyEmitter();

myEmitter.on('log', (msg) => logEvents(msg));

setTimeout(() => {
  //emit event
  myEmitter.emit('log', 'Logs Emitted Successfully');
}, 2000);