const client = require('./client')

const randomBytes = require('randombytes');
/*
const k = randomBytes(32);
const v = randomBytes(300);

*/


let k = randomBytes(32);


let newPut = {
  name: "New_Index_Test",
  key: k,
  value: randomBytes(300)
}

let newGet = {
  name: "New_Index_Test",
  key: k
}


client.put(newPut, (error, response) => {
    if (!error) {
        console.log(response)
        client.get(newGet, (err, resp) => {
            if (!err) {
                console.log(resp)
            } else {
                console.error(err)
            }
        })
    } else {
        console.error(error)
    }
})
