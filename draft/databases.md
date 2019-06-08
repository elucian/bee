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
load $bee_lib.db.oracle:(.)
```

## Connections

One application can connect to multiple databases simultaneously. A specific kind of application called _pipeline_ can pull data from multiple sources to update one target database. 

**pattern**
```# create a database instance
make db ∈ Oracle.DB
# create a wrapper for database connection
rule connect(user, password, dbname ∈ S):
  * prepare credentials
  make credential ∈ S;
  alter credential := user + '/' + password + '@'+ dbname;
  * connect to database
  apply db.connect(credential);
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
| execute()    | Execute a stored procedure
| commit()     | Save all pending modifications
| abort()      | Rollback all pending modifications

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

## Record
Records are dynamic object created from database structure. A record has methods and functions. Before handling a record you must create the record using scan, or make. A record has _status_ property that can be used in conditionals:

**table status**
```
type status := {.unknown:0 .verified, .updated, .deleted } <: Ordinal;
```


**Scanning tables**
You can scan one table like a collection:

**pattern**
```
scan record ∈ db.table_name  do
  * establish qualifier suppressor 
  with record do
    * use current_record fields
    print record.status; * expect: 1 = .verified
    ... 
  done;
repeat;
```

**Mutating data**
You can modify table data using current _record_. First you modify record attributes, then you call commit or abort(). Bee is cashing the updated rows and perform a bulk update using a buffer to improve performance when you commit.

```
make index ∈ Z; * counter
scan record ∈ db.table_name do
  * update current table
  with record do
    alter field_name := new_value;
     ...
  done;
  alter index += 1
  * commit batch of 100
  when (index = 100) do
    apply db.commit;
    alter index := 0
  done;
next;
# commit all pending updates
apply db.commit if (index > 0);
```

## Transactions
Data model can work with transactions. A transaction start automatically when you make first modification. Modifications must be consistent. When all modifications are done you can commit changes. If transaction fail all the modifications are reset. You can not commit a second time.

**data manipulation**

Any of the following operations will start automatically a transaction:

* [Append](#Append)
* [Update](#Update)
* [Delete](#Delete)

### Append

Bee can add new data records into one table using table _append()_ rule.

```# capture empty record
make record := table_name.append;
with record do
  alter field_name := value;
  ...
done;
apply db.commit;
# using temporary record
with table_name.append do
  alter field_name := value;
  ...
done;
apply db.commit;
```

### Update

Bee can do single or multiple row updates in one transaction.

**Syntax:**

```# use search fields and values
make record := table_name[search_field:value, search_field:value ...];
with record do
  alter field_name := value;
  ...
done;
apply db.commit;
# use anonymous record 
with table_name[search_field:value, search_field:value ...] do
  alter field_name := value;
  ...
done;
apply db.commit;
```

### Delete

This statement will remove one or more records from a table. 

**Syntax**

```# Find one single record and delete
make  record := table_name[search_field:value,...];
apply record.delete;
# check status
fail if record.status ≠ deleted;

apply db.commit;
# check status
fail if record.status ≠ verified;
# Using search fields to delete multiple records
apply table_name[search_field:value,...].delete;
apply db.commit;
# Remove all records from a table in bulk
apply table_name[..].delete;
apply db.commit;
# delete current record using scan
scan record ∈ table_name do
  record.delete if (condition);
done;
db.commit;
```

**Note:** 
* After delete the record still exist with _status_ = _deleted_;
* After commit the record becomes Null and can no linger be accessed;

## Pending buffer
The records that are modified are stored into a buffer. This buffer is empty when commit or abort.

```
# display status of all pending records
scan record ∈ table_name.pending do
  print (record.status);
done;
# display how many records are pending
print table_name.pending.count
```

## Direct SQL

Sometimes we need to bypass the ORM and execute native SQL:

```# apply a modification query to database
apply db.query(query_template ? array)
apply db.query(query_template ? record)
# apply a query that return; a buffer
type  TRecord := {
      field_name ∈ Type,      
      ...
      };# execute query string and return a list of records
make  buffer ∈ (TRecord); 
apply db.query(query_string) +> buffer; 
```

## Stored procedure

Some databases have support for stored procedures:

```
# prepare a record object 
type  TRecord := {
      field_name ∈ Type,      
      ...
      };
# execute stored procedure
make  buffer ∈ (TRecord); 
apply db.execute procedure_name(arguments) +> buffer; 
```

## Introspection

For debugging the SQL, Bee enable introspection. 

* Before execution, database related statements are converted into SQL strings; 
* We can visualize these strings by using: $trace = On to log query statements; 
* We can use #query system variable to print out last SQL statement. 
