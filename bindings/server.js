const grpc = require('grpc')
const Curkel = require('curkel-db')
//updater

//const Curkel = require('../index') // this is the issue
const curkelProto = grpc.load('curkel.proto')
const server = new grpc.Server()

//change this
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure())

server.addService(curkelProto.CurkelService.service, {
    create: (call, callback) => {
      let request = call.request
      console.log(call.request)

      Curkel.create(request.name).then(function(response) {
        callback(null, true)
      }).catch(function(error) {
        console.log(error)
        callback(error, false)
      })
    },
    put: (call, callback) => {
      let request = call.request
      Curkel.put(request.name, request.key, request.value).then(function(response) {
        let reply = {
          root: response.root,
          proof: response.p.value
        }
        callback(null, reply)
      }).catch(function(error) {
        console.log(error)
        callback(error, null)
      })
    },
    get: (call, callback) => {
      let request = call.request
      Curkel.get(request.name, request.key).then(function(response) {
        console.log(response)
        let reply = {
          value: response.value,
          proof: response.p.value
        }
        callback(null, reply)
      }).catch(function(error) {
        console.log(error)
        callback(error, null)
      })
    },
    del: (call, callback) => {
      let request = call.request
      Curkel.del(request.name, request.key).then(function(response) {
        let reply = {
          root: response.root,
          proof: response.p.value
        }
        callback(null, reply)
      }).catch(function(error) {
        callback(error, null)
      })

    },
})
server.start()
