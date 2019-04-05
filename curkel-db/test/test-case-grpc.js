'use strict';

const bcrypto = require('bcrypto');
const optimize = require('urkel/optimized');
const randomBytes = require('randombytes');
const {SHA256} = bcrypto;
const {Tree, Proof} = optimize;
const CurkelClient = require('../proto/client');
const {promisify} = require('util');
const put = promisify(CurkelClient.put);





const name = "New_Index_grpc";

async function main() {
  let key = randomBytes(32)
  let value = randomBytes(300)

  let putRequest = {
    name: name,
    key: key,
    value: value
  }

  var d = new Date();
  var n = d.getMilliseconds();
  var n1 = d.getSeconds();
  var n2 = d.getMinutes();
  console.log(n2, n1, n);


  for (let j = 0; j < 1; j++) {
    for (let i = 0; i < 1; i++) {
      console.log("Request", putRequest);
      const resp = await CurkelClient.put(putRequest);

        //console.log("Response", resp);
        d = new Date();
        n = d.getMilliseconds();
        n1 = d.getSeconds();
        n2 = d.getMinutes();
        console.log(n2, n1, n);
        putRequest.key = randomBytes(32);
        putRequest.value = randomBytes(300);

      }
  }
}





function mainCallback() {
  let key = randomBytes(32)
  let value = randomBytes(300)

  let putRequest = {
    name: name,
    key: key,
    value: value
  }

  let getRequest = {
    name: name,
    key: key
  }

  var d = new Date();
  var n = d.getMilliseconds();
  var n1 = d.getSeconds();
  var n2 = d.getMinutes();
  console.log(n2, n1, n);
  getCalls(getRequest, 10000)
}



function putCalls(putR, n) {
  if (n <=0 ) {
    var d = new Date();
    var n = d.getMilliseconds();
    var n1 = d.getSeconds();
    var n2 = d.getMinutes();
    console.log(n2, n1, n);
    return;
  }
  CurkelClient.put(putR, (error, response) => {
       if (!error) {
         //console.log("Request", putR);
         //console.log("Response", response);
         putR.key = randomBytes(32);
         putR.value = randomBytes(500);
         numberOfCalls(putR, n-1)
       } else {
         //console.log("Request", putR);
         //console.error(error);
         putR.key = randomBytes(32);
         putR.value = randomBytes(500);
         numberOfCalls(putR, n-1)
       }
   })
 }


   function getCalls(getR, n) {
     if (n <=0 ) {
       var d = new Date();
       var n = d.getMilliseconds();
       var n1 = d.getSeconds();
       var n2 = d.getMinutes();
       console.log(n2, n1, n);
       return;
     }
     CurkelClient.get(getR, (error, response) => {
          if (!error) {
            //console.log("Request", getR);
            //console.log("Response", response);
            getR.key = randomBytes(32);
            getCalls(getR, n-1)
          } else {
            //console.log("Request", getR);
            //console.error(error);
            getR.key = randomBytes(32);
            getCalls(getR, n-1)
          }
      })


}



//interval();
//main();
mainCallback();
