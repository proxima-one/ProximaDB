'use strict';


const Ruffle = require('../index');
const randomBytes = require('randombytes');
var ruffle = new Ruffle()


async function main() {
  //console.log("Basic Testing")
  //await basicTest();
  //console.log("Range Testing")
  //await rangeTest();
  console.log("Filter Testing")
  await filterTest();
}

async function basicTest() {

  // Create a tree using blake2b-256 and a depth/key-size of 256 bits.

  let key;

  var d = new Date();
  var n = d.getMilliseconds();
  var n1 = d.getSeconds();
  var n2 = d.getMinutes();
  console.log(n2, n1, n);


  for (let j = 0; j < 200; j++) {
      const id = Date.now();
      const k_1 = "supply";
      const k_2 = "blockHash";

      const req_2 = {
        name: "new",
        key: "epoch",
        action: "put",
        value: {value: randomBytes(10), id: id},
        id: j
      };

      const req_4 = {
        name: "new",
        key: "slot",
        action: "put",
        value: {value: randomBytes(10), id: id},
        id: j
      };

      const req_3 = {
        name: "new",
        key: "epoch",
        action: "get",
        id: j
      };

      const req_1 = {
        name: "new_index",
        key: 'supply',
        action: "get",
        id: j
      };
      const v_1 = {value: randomBytes(100), id: id};
      const v_2 = {value: randomBytes(100), id: id};
      const r_1 = await ruffle.put("new_index", k_1, v_1)
      const r_2 = await ruffle.put("new_index", k_2, v_2)

      const r_4 = await ruffle.request(req_1)
      //const r_5 = await ruffle.request(req_2)
      const r_6 = await ruffle.request(req_3)
      const r_7 = await ruffle.request(req_4)
      //console.log("Supply put", r_1)
      //console.log("Supply get", r_4)

    //  console.log("Epoch put", r_5)
      //console.log("Epoch get", r_6)
    //  console.log("blockHash", r_2)
    //  console.log("epoch", r_3)
  }

  d = new Date();
  n = d.getMilliseconds();
  n1 = d.getSeconds();
  n2 = d.getMinutes();
  console.log(n2, n1, n);

}



async function setup(x = 20) {
    //Setup
    var d = new Date();
    var n = d.getMilliseconds();
    var n1 = d.getSeconds();
    var n2 = d.getMinutes();
    console.log(n2, n1, n);
    for (let j = 0; j < x; j++) {
      let value = {value: j, id: Date.now()}
      let key = j
      let req = {
        name: "testTable",
        action: 'put',
        key: key,
        value: value,
        id: Date.now()
      }
      await ruffle.request(req)
    }
    d = new Date();
    n = d.getMilliseconds();
    n1 = d.getSeconds();
    n2 = d.getMinutes();
    console.log(n2, n1, n);
}

async function rangeTest() {
  await setup();
  var d = new Date();
  var n = d.getMilliseconds();
  var n1 = d.getSeconds();
  var n2 = d.getMinutes();

  //const ar = await Curkel.range("testTable", 0, 50)
  console.log(ar)
  d = new Date();
  n = d.getMilliseconds();
  n1 = d.getSeconds();
  n2 = d.getMinutes();
  console.log(n2, n1, n);
}



async function filterTest() {
  await setup();
  var d = new Date();
  var n = d.getMilliseconds();
  var n1 = d.getSeconds();
  var n2 = d.getMinutes();
  console.log(n2, n1, n);

  let pred = [{
    name: 'value',
    expression: '>',
    value: 10000
  }]
  let req = {
    name: "testTable",
    action: 'filter',
    predicate: pred,
    id: Date.now()
  }

  const arr = await ruffle.request(req)
  console.log(arr);
  d = new Date();
  n = d.getMilliseconds();
  n1 = d.getSeconds();
  n2 = d.getMinutes();
  console.log(n2, n1, n);
}






async function iterateTest() {

  // Create a tree using blake2b-256 and a depth/key-size of 256 bits.
  const tree = await Curkel.setup("testTable");

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
