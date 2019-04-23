
//const require...
'use strict'
const bcrypt = require('bcryptjs');
const EventEmitter = require('events');
const once = require('events.once');
const RuffleTransactionManager = require('./RuffleTransactionManager');

class Ruffle extends EventEmitter {

  constructor() {
    super();
    this.transactionManager = new RuffleTransactionManager();

  }

  async request(req) {
    await this.transactionManager.requesting(req);
    //let value = await once(this.transactionManager, JSON.stringify(req))
    let value = await once(this.transactionManager, JSON.stringify(req));
    try {
      return JSON.parse(value)
    } catch {
      return value
    }
  }

  async get(table, key) {
    let blockRequest = {
      key: key,
      action: 'get',
      name: table,
      id: "ID"
    };
    await this.transactionManager.requesting(blockRequest);
    let value = await once(this.transactionManager, JSON.stringify(blockRequest))
    return JSON.parse(value)
  }



  async put(table, key, value) {
    /*
      Validation
      useful for filters later
    */
    let blockRequest = {
      key: key,
      action: 'put',
      name: table,
      value: value,
      id: "ID"
    };
    await this.transactionManager.requesting(blockRequest);
    await once(this.transactionManager, JSON.stringify(blockRequest))
    //return JSON.parse(value)
  }

  async filter(table, predicate) {
    let blockRequest = {
      action: 'filter',
      name: table,
      predicate: predicate,
      id: "ID"
    };
    await this.transactionManager.transaction(blockRequest);
    let value = await once(this.transactionManager, JSON.stringify(blockRequest))
    return value
  }

/*
TODO
*/
  async create(table, schema, args = {}) {
    //create table
    let blockRequest = {
      action: 'create',
      name: table,
      schema: schema,
      id: "ID",
      args: args
    };
    var request = JSON.stringify(blockRequest);
    var req = bcrypt.hashSync(request, 10);
    console.log("Table ID: ", req)
    let tableName = blockRequest.name
    //await transactionManager.requesting(blockRequest);
    //let value = await once(transactionManager, JSON.stringify(blockRequest))
    return tableName
  }

  async load(table, schema, args = {}) {
    let blockRequest = {
      action: 'load',
      name: table,
      schema: schema,
      id: "ID",
      args: args
    };
    var request = JSON.stringify(blockRequest);
    var req = bcrypt.hashSync(request, 10);
    console.log("Table ID: ", req)
    let tableName = blockRequest.name
    //await transactionManager.requesting(blockRequest);
    //let value = await once(transactionManager, JSON.stringify(blockRequest))
    return tableName
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


}

module.exports = Ruffle
