/*
const hah = require('events');

console.log(hah);
*/
/*
const EventEmitter = require('events');

console.log(EventEmitter);

class EventEmitter extends EventEmitter()

const myemitter = new MyEmitter();

myemitter.on('test',()=>{
	console.log('runing...');
})
*/

  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;

  const blogSchema = new Schema({
    title:  String,
    author: String,
    body:   String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
      votes: Number,
      favs:  Number
    }
  });