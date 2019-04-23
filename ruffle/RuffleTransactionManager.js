//Connected to the Database this could be the frontend
//Given an ETL ...
//

'use strict'

//const client = require('../client');
//const mesh
//const other
//Ora

const Curkel = require('curkel-db')
//authentication


const EventEmitter = require('events')


class RuffleTransactionManager extends EventEmitter {

  constructor() {
    super();
    this.queue = new Array();
    this.running = false;
    this.reading = false;
    this.response;
    this.setMaxListeners(0); //TODO this is the issue
    this.count = 1;
  }

async requesting(request, sender = null) {
    let checked = await this.check(request); //TODO verify/anchor
    //Check request
    if (checked) {
      const str = JSON.stringify(request);
      //enqueue request
      this.queue.push(str);
      //returns
      if (this.running == false) {
        this.running = true;
        this.run();
      }
    }
}


/*
TODO eventually will need to find the proper schema for this
*/
async transaction(request) {
  let checked = await this.check(request);
  //Check request
  if (checked) {
    const str = JSON.stringify(request);
    //enqueue request
    this.queue.push(str);
    //returns
    if (this.running == false) {
      this.running = true;
      this.run();
    }
  }
}

unpack(str, m = -1) {
    let n = m;
    let l = str.length;
    if (m == -1) {
      n = l;
    }
    var bytes = [];
    for(var i = 0; i < n; i++) {
        var char = str.charCodeAt(i%l);
        bytes.push(char >>> 8, char & 0xFF);
    }
    return new Buffer.from(bytes);
}


pack(bytes) {
    var chars = [];
    for(var i = 0, n = bytes.length; i < n;) {
        chars.push(((bytes[i++] & 0xff) << 8) | (bytes[i++] & 0xff));
    }
    return String.fromCharCode.apply(null, chars);
}

//TODO I think issues arise here
async check(request) {
  let name = request.name;
  let k = this.unpack(request.key.toString(), 16);
  let v = request.value;
  if (!request.value) {
    return true;
  } else {
    var r = await Curkel.get(name, k);
    if (r.value) {
      var val = this.pack(r.value);
      var value = JSON.parse(val);
      return (value.id < v.id);
    } else {
      return true
    }
  }
}


/*
this will take a long time
*/
createFilter(filterList) {
  let filterFunct = (key, value) => {
    let v = JSON.parse(pack(value))
    for (i = 0; i < filterList.length; i++) {
      switch (filter['expression']) {
        case ">":
          return v[filter['name']] > filter['value']
        case "<":
          return v[filter['name']] < filter['value']
        case "=":
          return v[filter['name']] == filter['value']
      }
    }
  }
  return filterFunct
}



/*
This is where the Ora will go
*/
async update(request) {
  let name = request.name;
  let action = "get";
  action = request.action;
  let k = this.unpack(request.key.toString(), 16);
  switch (action) {
    case "put":
      //check
      let v = this.unpack(JSON.stringify(request.value));
      return await Curkel.put(name, k, v);
    case "get":
      return await Curkel.get(name, k);
    case "filter":
      let f = this.unpack(JSON.stringify(request.predicate));
      let pred = this.createFilter(f);
      return await Curkel.filter(name, pred)
    case "create":
      return "Unimplemented"
    case "load":
      return "Unimplemented"
    default:
      return "Incorrect usage"
  }
}


async run() {
  while (this.queue.length > 0) {
    var str = this.queue.shift();
    var request = JSON.parse(str);
    var response = await this.update(request);

    if (response.value) {
      response.value = this.pack(response.value);
    }
    this.emit(str, response);
  }
  this.running = false;
}
}

module.exports = RuffleTransactionManager



//Sanity Check ...


//Check ...
