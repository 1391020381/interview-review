// EventEmitter  发布订阅

const EventEmitter = require('events');

const event = new EventEmitter();

event.on('test',(data)=>{
    console.log(data)
})

event.emit('test','justdoit')