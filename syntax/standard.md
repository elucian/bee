## Standard Library

Standard library contains:

* [Type system](#type-system)
* [Built-in functions](#built-in-functions)
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

## Built-in functions
 
**Introspection**

| function | Purpose
|----------|------------------------------------------ 
| type     | type name
| size     | type size 
| length   | type length 
| capacity | type capacity
| min      | type minim limit
| max      | type maxim limit
 
**List/strings**

| function | Purpose
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
 
| function | Purpose
|----------|------------------------------------------ 
| round    | Convert one real into an integer
| floor    | Convert one real into an integer
| parse    | Convert one string into one number
| random   | Create random numbers
 
## Mathematics

| function | Purpose
|----------|------------------------------------------ 
| sin      | sinus 
| cos      | cousin
| tan      | tangent
| pow      | power
| sqr      | square root
| fac      | factorial
| mod      | module function y := \|x\|  

## System Library

Interaction with operating system require import from library.

```
+-------------------------
\bee 
  |
  |-->system
  |     |-->io.bee
  |
  +-->db
  ...
-------------------------+  
```

## File IO

To read and print into files and save to disk, we must use system.io library. This library define type "F" : file handler. It offer support for file input/output.

**Methods**

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

|function | Purpose
|---------|------------------------------------------ 
| exist   | Check if file exist on disk
| open    | Open a file for read or print
| close   | Close a file after using it
| erase   | Remove a file from disk
| scrub   | Remove all files from directory
| clean   | Remove all files and folders /recursive  
| alter   | Make a directory
| remove  | Remove a directory
| list    | Read a list of files and folders from directory
| folder  | Current working folder name 
| change  | Change current working folder

## Exception
Bee has pre-define exceptions in range [0..200]:

```
-- global exception type
define E <: {code ∈ Z, message ∈ S};
```

```
define $zero_div      := {100,"division by zero"}       ∈ E;
define $val_overflow  := {101,"value overflow"}         ∈ E;
define $out_of_range  := {102,"value is out of range"}  ∈ E;
define $over_capacity := {103,"value is over capacity"} ∈ E;
define $out_of_domain := {104,"out of domain subscript"}∈ E;
```

**Read next:** [Structure](structure.md)
