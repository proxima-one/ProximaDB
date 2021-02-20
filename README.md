
# ProximaDB

[![CircleCI](https://circleci.com/gh/proxima-one/ProximaDB.svg?style=svg)](https://circleci.com/gh/proxima-one/ProximaDB)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request)


The authenticated data structures within this repo are integral. They feature several components:


- Authenticated Data store
- Transaction Manager
- Query Operator

When these are combined we create a powerful nosql database that can be authenticated through its merkle proof.


<!--
The main points for the repository/what it provide
## Installation
*
-->


## Installation
```
npm install proxima-db
```
## Testing

```
npm test
```

## Benchmarking
```
npm benchmark [args]
```

- benchmark type
- benchmark number
- key size
- value size
- output (output file)

## Documentation

Importing
```javascript
const ProximaDB = require('proxima-db')
var db = new ProximaDB()
```

Creating a table for transactions
```javascript
let table = "transactions"
let schema = {
  id: 'string',
  from: 'string',
  to: 'string',
  amount: 'uint'
}
var transactions = db.create(table, schema)
```

Load table for transactions
```javascript
let table = "transactions"
let schema = {
  id: 'string',
  from: 'string',
  to: 'string',
  amount: 'uint'
}
var transactions = db.create(table, schema)
```

Put key into db
```javascript
let key = 'id'
let transaction = {
  id: key,
  from: 'address1',
  to: 'address2',
  amount: 20000
}
db.put(transactions, key, value)
```

The put command returns a proof and value, or an error.
```console
Proof {

}
```

Get item from the table
```javascript
db.get(transactions, key)
```

```console

```


```javascript
let pred = {
  account: "key"
}
db.filter(transactions, pred)
```


```console

```


### Operations

#### Create

| name  |  type |  description  
|---    |---    |     ---         |
|  table | string  |  name of the table |
|  schema | JSON  |  schema for the table |

This creates a table with name, tableName, and returns a confirmation boolean if correct.

```javascript
let table = "transactions"
let schema = {
  balance: 'uint'
  account: 'string'
}
var transactions = db.create(table, schema)
```

#### Put

| name  |  type |  description  
|---    |---    |     ---         |
|  tableName | string  |  name of the table |
|  key |  byte array |  key for the value  |
| value |  bytes array | value being placed in the table |

This operation does a put, and returns a proof.

```javascript
let key = '.....'
let value = {
  account: key,
  value: 1000
}
db.put(transactions, key, value)
```


#### Get
| name  |  type |  description  
|---    |---    |     ---         |
|  table | string  |  name of the table |
|  key |  byte array |  key for the value  |

Gets a value corresponding to the key, within the tableName.

```javascript
db.get(transactions, key)
```


#### Remove

| name  |  type |  description  
|---    |---    |     ---         |
|  tableName | string  |  name of the table |
|  key |  byte array |  key for the value  |


Deletes the value associated with the key at the designated table.

### Verification


## Filters, Aggregates, Maps, and Groups



### Filter

Each filter can be shown as a combination of three variables.

| name  |  type |  description  
|---    |---    |     ---         |
|  name | string  |  name of the table |
|  expression |  string |  key for the predicate type  |
|  value |  integer, string, value type |  key for the value  |


```javascript
let filter = [{
 name: "name", expression: "=", value: "hello"
}]
db.filter(transactions, filter)
```

## Performance Testing: ProximaDB
### Motivation 
When determining performance metrics we have decided to focus on the scalability of ProximaDB, as database I/0 operations move from memory (RAM) to Storage (Disk). While it is important to look at I/O scaling in traditional benchmarking, it has more significance when comparing ProximaDB and other Merkleized databases because traditional Merkleized databases (e.g. Ethereum trie) have higher storage overhead, and require significantly higher I/Os to touch database values. 
#### Key Metrics 
These motivations impact the metrics we track during our benchmarking process. We specifically focus on how the number of values within a database impact general benchmarks. This enables us to track how the database scales even as database operations go from memory to storage.
- Performance of Database operations
- Size of Proofs and their Performance
- Memory Allocation and Size of the database 

### Significant Observations  
As a result of our benchmarks, we developed several interesting observations with regard to ProximaDB and its use for the network. 

#### Database benchmarks
The performance of the ProximaDB inserts, gets, and removes remains above several thousand transactions per second. Gets, removes and insertions do get progressively worse as the size increases, but they greatly outperform similar Merkle structures. One observation is the power of memory I/O vs storage I/O, where Cached Gets attain transaction speeds several orders of magnitude higher than uncached gets. 
#### Database scaling and Memory Allocation
Throughout the benchmarking the memory usage remained low (>2GB), even as the database size increased path the limit. It is important to note that the performance of the database operations get logarithmically worse as the database size increases. Despite these performance declines, it was still possible to achieve high-throughput while maintaining low memory usage. 
#### Proofs
Proof verification and generation remain at constant levels, with even the size of proofs remaining around 1kb. This is important information for client verification, and shows the scalability of verification of the queries. 


## Benchmarks
*All benchmarks were conducted using the given hardware, and the given key sizes. Updates and operations are given as averages after the listed number of values has been inserted.*


## Contributing


<!--
This should include:
- Contributing Guidelines
- Code of Conduct
- Good first issues/Pull requests
-->
Read below to learn how you can take part in improving our project.

### Code of Conduct

We have adopted a Code of Conduct that we expect project participants to adhere to. Please read [the full text]() so that you can understand what actions will and will not be tolerated.

### Contributing Guide

Read our [contributing guide]() to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes.

### Good First Issues

To help you get your feet wet and get you familiar with our contribution process, we have a list of [good first issues]() that contain bugs which have a relatively limited scope. This is a great place to get started.

## Licensing

This project is licensed under MIT licensing guidelines.
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE)
