
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

#### Output

```console

```


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
