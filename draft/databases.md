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
* [models](#models)
* [databases](#databases) 
* [transactions](#transactions)

## Models

A model is a complex data structure mapping Bee data types to database. Bee can read and update a database using an internal data model. This kind of applications are called _data-centric_. A model is connecting to a databases using API function library.

```
load Oracle := $bee_lib.db.oracle
```

## Connections

One application can connect to multiple databases simultaneously. A specific kind of application called _pipeline_ can pull data from multiple sources to update one target database. 

**pattern**
```
-- create a database instance
make db ∈ Oracle.DB

-- create a wrapper for database connection
rule connect(user, password, dbname ∈ String):
   -- prepare credentials
  make credential ∈ String 
  alter credential := user + '/' + password + '@'+ dbname
   -- connect to database
  apply db.connect(credential) 
return;
```

**Note:**
Usually a database has a security protocol based on user-name and password. These credentials can not be encoded in the Bee script they need to be received as input parameters by a driver. Once a connection is established it can be used to manipulate data, using Bee statements.

## Databases

A database library must provide basic functionality:

| operation    | Description
|--------------|------------------------------
| connect()    | Connect the database
| disconnect() | Disconnect from database
| query()      | Direct SQL execution
| exec()       | Execute a stored procedure
| commit()     | Save all updates
| rollback()   | Rollback all updates

**target database**

Bee should provide drivers for main-stream databases:

* [PostgreSQL](http://www.postgresql.org/), 
* [Oracle](http://www.oracle.com/), 
* [MySQL](https://www.mysql.com/)

**Structure**
One database provide a structure for tables. An application can read table structure and map it to memory model. Then you can perform operations on data tables: {search, update, delete}. 

**Mapping**
A table usually has records but sometimes has objects or nested tables. Bee strategy is to map a records to objects. We can read one record into one object. For multiple records we can use a hash map or list of objects. Mapping is explicit. 

## Tables
Tables are database objects. We can read a table in memory record by record. For this we need to define one compatible object type for each table. A compatible object uses same name for all attributes and has compatible data types to match a table structure.

**Scanning tables**
You can scan one table like a collection:

**pattern**
```
begin:
  -- declare current record
  make  current_record ∈ {record_field ∈ data_type, ...}  
  scan db.table_name +> current_record:
    -- establish qualifier suppressor 
    with current_record:
      ** use current_record fields
      ... 
    ready; 
  repeat; 
ready;
```

**Mutating data**
You can modify table data using current_record fields. First you modify values for some of the fields, then you call commit or rollback(). Bee is cashing the updated rows and perform a bulk update using a buffer to improve performance when you commit.

```
type: Record_Type <: {record_fields}
begin:
  make current_record ∈ Record_Type
  make index ∈ Z
  scan db.table_name +> current_record:
    ** update current table
    update db.table_name[rowid:current_record.rowid]:
       alter field_name := new_value
       ...
    ready;
    alter index += 1
    ** commit batch of 10
    when (index = 10):
      apply db.commit()
      alter index := 0
    ready;
  next;
  ** commit all pending updates
  apply db.commit() if (index > 0)
ready;  

```

## Transactions
Data model can work with transactions. A transaction start automatically when you make first modification. Modifications must be consistent. When modifications are ready you can commit changes. If any table reference or constraint fail verification transaction is rolled back automatically and signal back an error.

**data manipulation**

Any of the following opperations will start automatically a transaction:

* [Append](#Append)
* [Update](#Update)
* [Delete](#Delete)

### Append

Bee can add new data records into one table using _append_ statement.

```
-- using block statement
append to table_name:
  field_name := value
  ...
ready;  

-- single line statement
append to table_name: append_recod
```

### Update

Bee can do single or multiple row updates.

**Syntax:**

```
-- use mapping block
update table_name[search_field:value]: 
   field_name := value
   ...
ready;   

-- Use search fields: 
update table_name[search_field:value, ...]: update_record

-- Use search record:
update table_name[search_record]: update_record
```


**note:** 
* The best candidates for search_field is ROWID;
* The update_record must match some table fields;
* The order of the fields in update_record is not significant;
* Search record must match all fields otherwise will fail;

### Delete

This statement will remove one or more records from a table. 

**Syntax**

```
-- Using search fields
delete table_name[search_field:value,...]

-- Using search record
delete table_name[search_record]
```

## Direct SQL

Sometimes we need to bypass the ORM and execute native SQL:

```
-- apply a query to database
apply db.query(query_template <+ list)
apply db.query(query_template <+ record)

-- apply a query that return a result
apply db.query(query_string) +> record
apply db.query(query_string) +> list_of_records

```

## Stored procedure

Some databases have support for stored procedures:

```
apply db.exec(procedure_name <+ list) 
apply db.exec(procedure_name <+ record) 
```

## Introspection

For debugging SQL Bee enable introspection. 

* Before execution database related statements are converted into SQL strings; 
* We can visualize these strings by using: #echo:on to log query statements; 
* We can use $query system object to print out last sql. 
