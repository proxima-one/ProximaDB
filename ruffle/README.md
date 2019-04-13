
# Ruffle


## Installation
```
npm install ruffle
```

## Example Usage

Importing 
```javascript
const Ruffle = require('./ruffle')
var ruffle = new Ruffle()
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
var transactions = ruffle.create(table, schema)
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
var transactions = ruffle.create(table, schema)
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
ruffle.put(transactions, key, value)
```

The put command returns a proof and value, or an error.
```console
Proof {

}
```

Get item from the table
```javascript
ruffle.get(transactions, key)
```

```console

```


```javascript
let pred = {
  account: "key"
}
ruffle.filter(transactions, pred)
```


```console

```


## Documentation


### CRUD Operations

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
var transactions = ruffle.create(table, schema)
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
ruffle.put(transactions, key, value)
```


#### Get
| name  |  type |  description  
|---    |---    |     ---         |
|  table | string  |  name of the table |
|  key |  byte array |  key for the value  |

Gets a value corresponding to the key, within the tableName.

```javascript
ruffle.get(transactions, key)
```


#### Remove

| name  |  type |  description  
|---    |---    |     ---         |
|  tableName | string  |  name of the table |
|  key |  byte array |  key for the value  |


Deletes the value associated with the key at the designated table.

### Verification


## Filters, Aggregates, Maps, and Groups


#### Filter 



```javascript
let filter = [{
 name: "name", expression: "=", value: "hello"
}]
ruffle.filter(transactions, filter)
```


```console

```


## Future Work













