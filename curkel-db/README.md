
# CurkelDB

This is an implementation of the Urkel Tree. This is a specific database api.

## Installation
```
npm install curkel-db
```

## Use 
This package can be used as follows: 

```javascript
const Curkel = require('curkel-db')
```


## API

### Create a table
```javascript
Curkel.create(tableName)
```
| name  |  type |  description  
|---    |---    |     ---         |
|  tableName | string  |  name of the table |

This creates a table with name, tableName, and returns a confirmation boolean if correct.

### Put(tableName, key, value)

```javascript
Curkel.put(tableName, key, value)
```

| name  |  type |  description  
|---    |---    |     ---         |
|  tableName | string  |  name of the table |
|  key |  byte array |  key for the value  |
| value |  bytes array | value being placed in the table |

This operation does a put, and returns a proof.

### Get(tableName, key)
```javascript
Curkel.get(tableName, key)
```
| name  |  type |  description  
|---    |---    |     ---         |
|  tableName | string  |  name of the table |
|  key |  byte array |  key for the value  |

Gets a value corresponding to the key, within the tableName.

### Del(tableName, key)
```javascript
Curkel.del(tableName, key)
```
| name  |  type |  description  
|---    |---    |     ---         |
|  tableName | string  |  name of the table |
|  key |  byte array |  key for the value  |


Deletes the value associated with the key at the designated table.
