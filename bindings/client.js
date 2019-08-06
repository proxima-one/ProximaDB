const grpc = require('grpc')
const PROTO_PATH = '../curkel.proto'
const CurkelService = grpc.load(PROTO_PATH).CurkelService
let provider = '0.0.0.0:50051'
const client = new CurkelService(provider, grpc.credentials.createInsecure())

module.exports = client
