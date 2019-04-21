
//const require...
'use strict'
const bcrypt = require('bcrypt');
const EventEmitter = require('events')
const once = EventEmitter.once;
const RuffleTransactionManager = require('./RuffleTransactionManager');

class Ruffle extends EventEmitter {



  constructor() {
    super();
    this.transactionManager = new RuffleTransactionManager();

  }

  async get(table, key) {
    let blockRequest = {
      key: key,
      action: 'get',
      name: table,
      id: "ID"
    };
    await transactionManager.requesting(blockRequest);
    let value = await once(updater, JSON.stringify(blockRequest))
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
      value,
      id: "ID"
    };
    await transactionManager.requesting(blockRequest);
    await once(transactionManager, JSON.stringify(blockRequest))
    //return JSON.parse(value)
  }

  async filter(table, predicate) {
    let blockRequest = {
      action: 'filter',
      name: table,
      predicate: predicate,
      id: "ID"
    };
    await transactionManager.transaction(blockRequest);
    let value = await once(transactionManager, JSON.stringify(blockRequest))
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