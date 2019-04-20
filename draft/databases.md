# Database Layer

Bee has basic interaction with relational databases. 

**Goals:**

* Resolve impedance mismatch using ORM;
* Read and update tables in a database;
* Provide easy way to map data in ETL;
* Provide data for visual applications;
* Store complex data for multi-user applications;

**Bookmarks:**

**definition**
* [model](#model)
* [record](#record) 
* [table](#table)
* [view](#view)

## Model

A model is a complex data structure mapping Bee data types to database. Bee can read and update a database using an internal data model. This kind of applications are called _data-centric_. A model is connecting to a databases using API function library.

```
load Oracle := $bee_lib.db.oracle
```

## Connection

One application can connect to multiple databases simultaneously. A specific kind of application called _pipeline_ can pull data from multiple sources to update one target database. 

**pattern**
```
-- create a database instance
make db ∈ Oracle.DB;

-- create a wrapper for database connection
rule connect(user, password, dbname ∈ S):
  -- prepare credentials
  make credential ∈ S; 
  alter credential := user + '/' + password + '@'+ dbname;
  -- connect to database
  apply db.connect(credential); 
over;
```

**Note:**
Usually a database has a security protocol based on user-name and password. These credentials can not be encoded in the Bee script they need to be received as input parameters by a driver. Once a connection is established it can be used to manipulate data, using Bee statements.

## Database

A database library must provide basic functionality:

| operation    | Description
|--------------|------------------------------
| connect()    | Connect the database
| disconnect() | Disconnect from database
| commit()     | Save all updates
| rollback()   | Rollback all updates

## Structure
One database provide a structure for tables. An application can read table structure and map it to memory model. Then you can perform operations on data tables: {search, update, delete}. 

## Mapping
A table usually has records but sometimes has objects or nested tables. Bee strategy is to map a records to objects. We can read one record into one object. For multiple records we can use a hash map or list of objects. Mapping is explicit. 

### Recursive Records
Recursive records can be used to represent lists or trees. Recursive data structures can dynamically grow to a ubrestricted size until memory of computer is full. We can limit how deep a record become using a directive. "#recursive:100"

```
** example of single recursive node
type Node <: { 
  data ∈ Z,        -- integer data
  previous ∈ Node  -- reference to previous node
}
```
This kind of structure can be used to create a data chain.

```
** example of double recursive node
type: Node <: {
  data  ∈ Z,    ** integer data
  prior ∈ Node, ** reference to previous node
  next  ∈ Node  ** reference to next node
}
```

## Tables
Tables are database objects. We can read a table in memory record by record. For this we need to define one compatible object type for each table. A compatible object uses same name for all attributes and has compatible data types to match a table structure.

**Scanning tables**
You can scan one table like a collection:

**pattern**
```
local
  ** declare current record
  make  current_record ∈ {record_field ∈ data_type, ...};
scan db.table_name +> current_record:
  with current_record:
    ** use current_record fields
    ... 
  ready; 
repeat;
```

**Mutating data**
You can modify table data using current_record fields. First you modify values for some of the fields, then you call commit or rollback(). Bee is cashing the updated rows and perform a bulk update using a buffer to improve performance when you commit.

```
type: Record_Type <: {record_fields}

local  
  make buffer_count ∈ Z;
  make current_record ∈ Record_Type;
scan db.table_name +> current_record:
  ** update current table
  update db.table_name[rowid:current_record.rowid]:
     alter field_name := new_value;
     ...
  ready;
  ** update batch of 10
  when index > 10:
    apply db.commit();
    alter index := 0;
  ready;
next;
** commit all pending updates
db.commit();

```

## Data Transactions
Data model can work with transactions. A transaction start automatically when you make first modification. After all modifications are ready you can commit or rollback changes. Notice transactions are always clean. Nobody can read data that is not committed to disk. If you forget to commit the changes are lost when you close the database.

## Views

Related tables can be connected using views. One tables is the lead table in a view. Other tables can have a relation 1:1, 1:M with the leading table. The view can filter data using logic expressions. View do not store data permanently. 

**View Rules**
* Views and tables are similar data sources;
* Views can not be updated, they are read only structures;

**Scanning a view**
We can scan view using _scan_ statement. This is the most common way to access all records in a view. 

``` 
local
  make current_record ∈ {attribute_name:type,...};
scan db.view_name +> current_record:
  print (current_record)
next;
```

## Data Manipulation

We can scan one source table and manipulate data in a target table. 

*[Append](#Append)
*[Update](#Update)
*[Delete](#Delete)

## Append

We can append data into target table using operator ":".

```
-- using append block
append to table_name:
  field_name:value;
  ...
ready;  

-- using append record;
append to table_name: append_recod;
```

## Update

Bee can do single or multiple row updates.

**Syntax:**

```
-- use mapping block:
update table_name[search_field:value]: 
   field_name := value;
   ...
ready;   

-- Use search fields: 
update table_name[search_field:value, ...]: update_record;

-- Use search record:
update table_name[search_record]: update_record;
```


**note:** 
* The best candidates for search_field is ROWID;
* The update_record must match some table fields;
* The order of the fields in update_record is not significant;
* Search record must match all fields otherwise will fail;

## Delete

This statement will remove one or more records from a table. 

**Syntax**

```
-- Using search fields
delete table_name[search_field:value,...];

-- Using search record
delete table_name[search_record];
```

## SQL Introspection

For debugging SQL Bee enable introspection. 

* Before execution database related statements are converted into SQL strings; 
* We can visualize these strings by using: #echo:on to log query statements; 
* We can use $query system object to print out last sql. 


## Targeted Databases

Bee should provide drivers for main-stream databases:

* [PostgreSQL](http://www.postgresql.org/), 
* [Oracle](http://www.oracle.com/), 
* [MySQL](https://www.mysql.com/)
