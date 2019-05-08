'use strict';

const bcrypto = require('bcrypto');
const {SHA256} = bcrypto;
const optimized = require('urkel');

//const {SHA256} = bcrypto;
const {Tree, Proof} = optimized;


const DATABASE_PATH = './db/';



/*
class Curkel {
*/
/*
Drop a table
*/

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

/*
Config file
*/
//



/*
Create or load index, name
Return snapshot
*/
async function load(index) {
  const tree = new Tree(SHA256, 256, DATABASE_PATH + index);
  try {
    await tree.open();
  } catch (err) {
    console.log(err)
  }
  return tree
}

/*
Checkout index
(make transaction)
return transaction
*/
async function checkout(index) {
  const transaction = await index.transaction();
  return transaction;
}


/*
Commit (index)
Return root, snapshot
*/
async function commit(index, transaction) {
  const root = await transaction.commit();
  const snapshot = await index.snapshot(root);
  return {root, snapshot}
}

/*
Write (index, tx)
Return bool true, false
*/
async function close(index) {
  await index.close()
}

/*
Get (index, key)
Returns Proof of inclusion, root
*/
async function get(index, key) {
  const value = await index.get(key)
  const p = await proofOfInclusion(index, key)
  return {value, p}
}

/*
Put (index, key, value)
Can return proof of inclusion, root
*/
async function put(index, transaction, key, value) {
  await transaction.insert(key, value);
  const {root, snapshot} = await commit(index, transaction)
  const p = await proofOfInclusion(snapshot, key)
  return {root, p}
}

/*
Update (index, key, value)
Returns proof of update, root
*/
async function update(index, transaction, key, value) {
  return await put(transaction, key, value)
}

/*
Remove (index, key)
//TODO this does not completely offer the proof
Returns Proof of update, root
*/
async function del(index, transaction, key) {
  return await update(index, transaction, key, 0)
}

/*
*/
async function verify(proof, root, key) {
  const [code, value] = proof.verify(root, key, SHA256, 256);
  //Proof inclusion of the key
  if (code !== 0) {
    console.log('Could not verify proof: %s.', Proof.code(code));
    return 0;
  }

  if (value) {
    console.log('Valid proof for %s: %s',
      key.toString('hex'), value.toString('hex'));
      return 1;
  } else {
    console.log('Absence proof for %s.', key.toString('hex'));
    return 0;
  }
}

/*
reduces the size of the db
*/
async function compaction(tree) {
  tree.compact();
  return true;
}


async function range(index, start, finish) {
  const iter = index.iterator();
  var count = 0;
  var array = new Array();
  while (await iter.next()) {
    if (count <= finish && count >= start) {
      const {key, value} = iter;
      //console.log('Iterated over item:');
      //console.log('%s: %s', key, value.toString('hex'));
      var proof = await proofOfInclusion(index, key)
      array.push({value: value, proof: proof});
    }
    count++;
  }
  //console.log(array)
  return array
}


async function filter(index, pred) {
  const iter = index.iterator();
  var array = new Array();
  while (await iter.next()) {
      const {key, value} = iter;
      if (pred(key, value)) {
        var proof = await proofOfInclusion(index, key)
        array.push({value: value, proof: proof});
      }
  }
  //console.log(array)
  return array
}


/*
async function getSync(index) {
  const iter = index.iterator();
  var array = new Array();
  while (await iter.next()) {
      const {key, value} = iter;
      var proof = await proofOfInclusion(index, key)
      array.push({key: key, value: value, proof: proof});
    }
  }
  return array
}

async function synchronize(index, transaction objects) {
  for (obj in objects) {
    await transaction.insert(obj.key, obj.value);
  }
  const {root, snapshot} = await commit(index, transaction)
  return root
}
*/

/*
Returns an iterator over a stream
*/
async function iterator(tree) {
  return await tree.iterator();
}

/*
Proof of inclusion
*/
async function proofOfInclusion(snapshot, key) {
  try {
    let proof = await snapshot.prove(key);
    return proof;
  } catch {
    return "Does not exist"
  }

}


module.exports = {
  verify,
  //getSync,
  //synchronize,
  del,
  update,
  put,
  filter,
  get,
  range,
  load,
  checkout,
  commit,
  iterator,
  close
}
