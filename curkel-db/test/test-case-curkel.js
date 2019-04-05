'use strict';


const Curkel = require('../index');
const randomBytes = require('randombytes');

async function main() {

  // Create a tree using blake2b-256 and a depth/key-size of 256 bits.

  let key;

  var d = new Date();
  var n = d.getMilliseconds();
  var n1 = d.getSeconds();
  var n2 = d.getMinutes();
  console.log(n2, n1, n);


  for (let j = 0; j < 20000; j++) {
      const k = randomBytes(20);
      const v = randomBytes(300);
      key = k;
      const {root, proof} = await Curkel.put("new_index", k, v)
  }

  d = new Date();
  n = d.getMilliseconds();
  n1 = d.getSeconds();
  n2 = d.getMinutes();
  console.log(n2, n1, n);
/*
  const newTree = await reload("new_index")
  const iter = newTree.iterator();
  while (await iter.next()) {
    const {key, value} = iter;
    console.log('Iterated over item:');
    console.log('%s: %s', key.toString('hex'), value.toString('hex'));
  }
*/
}




async function main1() {

  // Create a tree using blake2b-256 and a depth/key-size of 256 bits.
  const tree = await Curkel.setup("new_index");

  const iter = tree.iterator();

  while (await iter.next()) {
    const {key, v} = await iter;
    const {value, proof} = await Curkel.get(tree, k)
    console.log('Iterated over item:');
    console.log('%s: %s', key.toString('hex'), value.toString('hex'));
  }
}




//main();

main();
