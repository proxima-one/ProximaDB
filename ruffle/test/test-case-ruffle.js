'use strict';


const Ruffle = require('../index');
const randomBytes = require('randombytes');
var ruffle = new Ruffle()
async function main() {

  // Create a tree using blake2b-256 and a depth/key-size of 256 bits.

  let key;

  var d = new Date();
  var n = d.getMilliseconds();
  var n1 = d.getSeconds();
  var n2 = d.getMinutes();
  console.log(n2, n1, n);


  for (let j = 0; j < 2000; j++) {
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
      console.log("Epoch get", r_6)
    //  console.log("blockHash", r_2)
    //  console.log("epoch", r_3)
  }

  d = new Date();
  n = d.getMilliseconds();
  n1 = d.getSeconds();
  n2 = d.getMinutes();
  console.log(n2, n1, n);



/*

  //const ar = await Curkel.range("new_index", 0, 50)
  var b = randomBytes(100)
  var n = 10;
  n = unpack(n.toString(), 16)

  const arr = await Ruffle.filter("new_index", (key, value) => {
    return key < n || key.equals(n);
  });

}


function unpack(str, m = -1) {
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


function pack(bytes) {
    var chars = [];
    for(var i = 0, n = bytes.length; i < n;) {
        chars.push(((bytes[i++] & 0xff) << 8) | (bytes[i++] & 0xff));
    }
    return String.fromCharCode.apply(null, chars);
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

*/
}


//main();

main();
