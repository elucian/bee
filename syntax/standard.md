## Standard Library

Standard library contains:

* [Type system](#type-system)
* [Built-in rules](#built-in-rules)
* [Mathematics](#mathematics)
* [System library](#system-library)

## Type system

Following types are included in standard library:

**Basic types**

| Name        |Bee| Description
|-------------|---|-------------------------------------------------------------
| ASCII       |A  | ASCII character       (two bytes)
| Binary      |B  | Positive short number (two bytes)
| Natural     |N  | Positive large numbar 
| Integer     |Z  | Positive or negative number 
| Logical     |L  | Logical number {0,1}
| Real        |R  | Real number (double precision)
| Rational    |Q  | Rational number precision control by #resolution:(n,m)

**Composite types**

| Name        |Bee| Description
|-------------|---|-------------------------------------------------------------
| String      |S  | Unlimited capacity string
| Date        |D  | "YYYYDDMM" -> YDM, "DD/MM/YYYY" -> DMY, "MM/DD/YYYY" -> YDM
| Time        |T  | "hh:mm,9999ms" -> T12 "hh:mm__, 9999ms" __={am/pm} + {T12, T24}

## Built-in rules
 
**Introspection**

| rule | Purpose
|----------|------------------------------------------ 
| type     | type name
| size     | type size 
| length   | type length 
| capacity | type capacity
| min      | type minim limit
| max      | type maxim limit
 
**List/strings**

| rule     | Purpose
|----------|------------------------------------------ 
| split    | Split a string into a list / array
| join     | Join a list into a string 
| find     | Search one sub-string in a string
| replace  | Replace one sub-string in a string
| trim     | Remove blank spaces from string
| right    | Align string to right by adding spaces
| left     | Align string to left by adding spaces
| center   | Align string to center by adding spaces
 
**Numeric**
 
| rule     | Purpose
|----------|------------------------------------------ 
| round    | Convert one real into an integer
| floor    | Convert one real into an integer
| parse    | Convert one string into one number
| random   | Create random numbers
 
## Mathematics

| rule     | Purpose
|----------|------------------------------------------ 
| sin      | sinus 
| cos      | cousin
| tan      | tangent
| pow      | power
| sqr      | square root
| fac      | factorial
| mod      | module rule y := \|x\|  

## System Library

Interaction with operating system require import from library.

```
+-------------------------
\bee 
  |
  |-->system
  |     |-->io.bee
  |
  --->db
  ...
-------------------------+  
```

## File IO

To read and print into files and save to disk, we must use system.io library. This library define type "F" : file handler. It offer support for file input/output.

**Aspects**

Next is a fragment from system.io library that define rules open and close.

```
type .open(name ∈ S, mode ∈ A) => (f ∈ F);
type .close(f ∈ F);
...

```
**remember:** public rules start with "."

**Examples:**

* File Open:[fo.bee](../demo/fo.bee)
* File Scan:[fs.bee](../demo/sc.bee) 

**File IO**

Other rules in system.io

| rule    | Purpose
|---------|------------------------------------------ 
| exist   | Check if file exist on disk
| open    | Open a file for read or print
| files   | Read a list of files from directory
| folders | Read tree of directory in memory
| where   | Current working folder name 
| change  | Change current working folder

Other aspects in syste.io

| aspect  | Purpose
|---------|------------------------------------------ 
| save    | Save file modifications to disk
| undo    | Restore file modification before save
| close   | Close a file after using it
| clean   | Remove one or more file from disk
| new     | Make a new directory
| remove  | Remove a directory / with files
| change  | Change current working folder

## Exception
Bee has pre-define exceptions in range [0..200]:

```
-- global exception type
type E <: {code ∈ Z, message ∈ S};
```

```
static $zero_div      := {100,"division by zero"}        ∈ E;
static $null_ref      := {101,"null reference usage"}    ∈ E;
static $val_overflow  := {102,"value overflow"}          ∈ E;
static $out_of_range  := {103,"value out of range"}      ∈ E;
static $over_capacity := {104,"value over capacity"}     ∈ E;
static $out_of_domain := {105,"subscript out of domain"} ∈ E;
```

**Read next:** [Structure](structure.md)
