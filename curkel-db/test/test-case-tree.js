'use strict';

const bcrypto = require('bcrypto');
const optimize = require('urkel/optimized');
const randomBytes = require('randombytes');
const {SHA256} = bcrypto;
const {Tree, Proof} = optimize;







async function create(index) {
  const tree = new Tree(SHA256, 256, './db/' + index);
  await tree.open();
  return tree
}

async function main() {
  const tree = await create("new_index");

  let key;
  var d = new Date();
  var n = d.getMilliseconds();
  var n1 = d.getSeconds();
  var n2 = d.getMinutes();
  console.log(n2, n1, n);

  for (let j = 0; j < 100000; j++) {
    const txn = tree.transaction();
    for (let i = 0; i < 1; i++) {
      const k = randomBytes(32);
      const v = randomBytes(300);
      await txn.insert(k, v);
      key = k;
      const root = await txn.commit();
      const snapshot = tree.snapshot(root);
      const proof = await snapshot.prove(key);
    }





    }

  d = new Date();
  n = d.getMilliseconds();
  n1 = d.getSeconds();
  n2 = d.getMinutes();
  console.log(n2, n1, n);

  await tree.close();



}




main();
