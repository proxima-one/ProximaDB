import grpc
import curkel_pb2_grpc
import curkel_pb2
import json
import time

#Encryption/Decryption TODO


def start(address, port):
    channel = grpc.insecure_channel(address + ":" + port)
    return curkel_pb2_grpc.CurkelServiceStub(channel)

def create(curkel, name):
    return curkel.Create(curkel_pb2.DatasetRequest(name= name))

def get(curkel, name, key, enc = False, sk = ""):
    GetResponse = curkel.Get(curkel_pb2.GetRequest(name= name, key=key))
    if enc:
        GetRequest.value = decrypt(sk, value)
    return GetResponse

def put(curkel, name, key, value, enc = False, sk = ""):
    if enc:
        value = encrypt(sk, value)
    return curkel.Put(curkel_pb2.PutRequest(name=name, key=key, value=value))

def delete(curkel, name, key):
    return curkel.Del(curkel_pb2.DeleteRequest(name= name, key=key))

def encrypt(sk, val):
    return val

def decrypt(sk, val):
    return val

def main():
    address = '0.0.0.0'
    external ='35.235.101.177'
    port = '50051'
    curkel = start(external, port)
    print("Starting client .....")
    db_name = "Python_DB"
    key = bytes(str.ljust("Binance", 32))
    value = bytes('{"contractAddress": "0xB8c77482e45F1F44dE1745F52C74426C631bDD52", "name": "BNB", "totalSupply": "189175490242498551714388965"}')
    #st = time.time()
    #create(curkel, db_name)
    #end = time.time()
    #print(end - st)
    ##print(put(curkel, db_name, key, value))
    ##for ()
    #st = time.time()
    #response = get(curkel, db_name, key)
    #end = time.time()
    print(response)
    #print(end - st)
    # 20-60 ms from AWS
    binance = json.loads(response.value.decode(encoding="utf-8"))
    
    
    print("NAME: " + binance["name"])


main()
