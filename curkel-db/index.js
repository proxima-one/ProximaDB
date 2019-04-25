'use strict';

const Curkel = require('./curkel');

//Create a mapping
let mapping = {};

//Load indexName, checkout, close
async function setup(indexName) {
  if (indexName in mapping) {
    return mapping[indexName];
  } else {
    return await Curkel.load(indexName);
  }
}

async function teardown(indexName, index) {
  mapping[indexName] = index;
  //await Curkel.close(index);
}

async function get(indexName, key) {
  const index = await setup(indexName);
  const {value, p} = await Curkel.get(index, key);
  await teardown(indexName, index);
  return {value, p}
}

async function range(indexName, start, finish) {
  const index = await setup(indexName);
  const values = await Curkel.range(index, start, finish);
  await teardown(indexName, index);
  return values;
}

async function filter(indexName, pred) {
  const index = await setup(indexName);
  const values = await Curkel.filter(index, pred);
  await teardown(indexName, index);
  return values
}

async function put(indexName, key, value) {
  const index = await setup(indexName);
  const txn = await Curkel.checkout(index);
  const {root, p} = await Curkel.put(index, txn, key, value);
  await teardown(indexName, index);
  return {root, p}
}

async function getSync(indexName) {
  const index = await setup(indexName);
  const values = await Curkel.synchronize(index, pred);
  await teardown(indexName, index);
  return values
}

async function synchronize(indexName, values) {
  const index = await setup(indexName);
  const txn = await Curkel.checkout(index);
  const root = await Curkel.synchronize(index, txn, values);
  await teardown(indexName, index);
  return root
}


async function del(indexName, key) {
  const index = await setup(indexName)
  const txn = await Curkel.checkout(index)
  const response = await Curkel.del(index, key)
  await teardown(indexName, index);
  return response
}

async function create(indexName) {
  const index = await setup(indexName)
  await teardown(indexName, index);
  return true
}


module.exports = {
  create,
  filter,
  getSync,
  synchronize,
  del,
  range,
  put,
  get
}
