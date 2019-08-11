** Database Layer

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

A model is a complex data structure mapping Bee data types to database. Bee can read and update a database using an internal data model. This kind of applications are called _data-centric_. A model is connecting to one or multiple  databases using API library.

**loading**

A model must load database library using this statement:

```
load $bee_lib.db.core:(*);
load Oracle := $bee_lib.db.oracle;
```

## Connection

One application can connect to multiple databases simultaneously. A specific kind of application called _pipeline_ can pull data from multiple sources to update one target database. 

**pattern:**
```** create a wrapper for database connection
rule connect(name, password, database ∈ S) => (db ∈ Oracle.Database):
  ** prepare credentials
  make credential := user + '/' + password + '@'+ dbname;
  ** connect to database
  apply db.connect(credential);
return;

** create database connection
make db := connect(user:'test',password:'password',database:'bee_demo');
```

**Note:**
Usually a database has a security protocol based on user-name and password. These credentials can not be encoded in the Bee script they need to be received as input parameters by a driver. Once a connection is established it can be used to manipulate data, using Bee statements.

## Databases

A _Database_ module must provide a basic functionality:

| operation    | Description
|--------------|------------------------------
| connect()    | Connect the database
| disconnect() | Disconnect from database
| query()      | Direct SQL execution
| execute()    | Execute a stored procedure
| commit()     | Save all pending modifications
| rollback()   | Rollback all pending modifications

**target database**

Bee should provide drivers for main-stream databases:

* [PostgreSQL](http://www.postgresql.org/), 
* [Oracle](http://www.oracle.com/), 
* [MySQL](https://www.mysql.com/)

**Structure**
One database provide a structure for tables. An application can read table structure and map it to internal memory model. Then you can perform operations on data model: {search, append, update, delete}. 

**Mapping**
A database table has records. Bee strategy is to define one _memory table_ as a collection of objects for each _database table_. The _memory table_ is mapped to _database table_. Mapping is _one to one_. Field names are case sensitive.

## Tables
Internal _memory tables_ are mixed collections of objects having same name as _database tables_. We can read a database table record by record on demand. A _memory table_ can load one or multiple _records_ in memory. 

## Records
Records are _object instances_ created from table structure in memory. A record has a _status_ property that can be used in conditionals. One record is the current record. Several records are cached in memory for a table. 

**record type
```
** This type is defined in core database library
type Record: {rowid ∈ S(32), status ∈ Status} <: Object;
```
**record status**
```
** This type is defined in core database library
type Status: {.unknown:0 .verified, .updated, .deleted } <: Ordinal;
```

**table structure**
For table structure we must define a _record type_ then use generic _Table_ to declare table structure:

**Note:**
* For Record_Name is good to use singular names starting with uppercase letter like: "Person"
* For table_name is  gppd tp ise plural lowecase names like: "persons"

```
type Record_Name: {field_name ∈ Type, ...}  <: Record;              ** entity record
make table_name := db.open('table_name','w') ∈  Table{Record_Name}; //table mapping
```

**table methods**
```
** first record
make  bookmark ∈ Table_Record;
apply table_name.first;
alter bookmark := table_name.record;  //bookmark current record 

** fetch next record
apply table_name.fetch;

** last record
apply table_name.last;

** previous record
apply table_name.back;

** synchronize current record
apply table_name.seek(bookmark);

** find a specific record
apply table_name.find(field_name:value,...);

** get filed values
print table_name.field_name; //data from current record
pass if bookmark.field_name ≡ table_name.field_name; //same data 
```

**Table traversal**
You can read one table record by record:

**pattern:**
```
....
** table must be open to be scanned
for record ∈ table_name do
  ** use current_record fields
  print record.status; //expect: 1 = .verified
  ... 
next;
```

**Mutating data**
You can modify table data using current _record_. First you modify record attributes, then you call commit or abort(). Bee is cashing the updated rows and perform a bulk update using a buffer to improve performance when you commit.

```
for record ∈ table_name do
  ** update current record
  alter table_name.field_name := new_value;
  ...
next;
apply db.commit;
```

## Transactions
Data model can work with transactions. A transaction start automatically when you make first modification. Modifications must be consistent. When all modifications are done you can commit changes. If transaction fail all the modifications are reset. You can not commit a second time.

**data manipulation**

Any of the following operations will start automatically a transaction:

* [Append](#Append)
* [Update](#Update)
* [Delete](#Delete)

### Append

Bee can add new data records into one table using _append()_ rule.

```** create empty record
apply table_name.append;

** modify record attributes
alter table_name.field_name := value;
...

apply db.commit;
```

### Update

Bee can do single or multiple row updates in one transaction.

**Syntax:**

```** use search fields and values
apply table_name.find(search_field:value, search_field:value ...);

** prepare record
alter table_name.field_name := value;
  ...
apply db.commit;```

### Delete

This statement will remove one or more records from a table. 

**Syntax**

```** Find one single record and delete
make  table_name.find(search_field:value,...);
apply table_name.delete;
** check status
pass if table_name.status ≡ deleted;
apply db.commit;
** Using search fields to delete multiple records
apply table_name.delete(search_field:value,...);
apply db.commit;
** Remove all records from a table in bulk
apply table_name.scrub;
apply db.commit;
** delete current record using _for_
for record ∈ table_name do
  record.delete if (condition);
done;
apply db.commit;
```

**Note:** 
* After delete the record still exist with _status_ ≡ _deleted_;
* After closing the table all references to records become Null;

## Direct SQL

Sometimes we need to bypass the ORM and execute native SQL:

```** apply a modification query to database
apply db.query(query_template ? source)
** apply a query that return; a buffer
type  TRecord: {
      field_name ∈ Type,      
      ...
      };** execute query string and return a list of records
make  buffer ∈ (TRecord); 
alter buffer := db.query(query_template ? source); 
```

## Stored procedure

Some databases have support for stored procedures:

```
** prepare an object (not updatable)
type  Result_Record: {
      field_name ∈ Type,      
      ...
      } <: Object;
** prepare a list of records      
make  buffer ∈ (Result_Record); 

** execute stored procedure
alter buffer := db.execute procedure_name(arguments); 
```

## Introspection

For debugging the SQL, Bee enable introspection. 

* Before execution, database related statements are converted into SQL strings; 
* We can visualize these strings by using: $trace = On to log query statements; 
* We can use @query system variable to print out last SQL statement. 
