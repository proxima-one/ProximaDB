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


  for (let j = 0; j < 200; j++) {
      const k = unpack(j.toString(), 16);
      const v = randomBytes(100);
      key = k;
      const {root, proof} = await Curkel.put("new_index", k, v)
  }

  d = new Date();
  n = d.getMilliseconds();
  n1 = d.getSeconds();
  n2 = d.getMinutes();
  console.log(n2, n1, n);

  //const ar = await Curkel.range("new_index", 0, 50)
  var b = randomBytes(100)
  var n = 10;
  n = unpack(n.toString(), 16)

  const arr = await Curkel.filter("new_index", (key, value) => {
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




//main();

main();
