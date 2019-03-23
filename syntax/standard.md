## Standard Library

Standard library contains:

* [type-system](#type-system)
* [built-in-functions](#built-in-functions)
* [mathematics](#mathematics)
* [system-library](#system-library)

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

## Built-in Functions
 
**Introspection**

| Function | Purpose
|----------|------------------------------------------ 
| type     | type name
| size     | type size 
| length   | type length 
| capacity | type capacity
| min      | type minim limit
| max      | type maxim limit
 
**List/strings**

| Function | Purpose
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
 
| Function | Purpose
|----------|------------------------------------------ 
| round    | Convert one real into an integer
| floor    | Convert one real into an integer
| parse    | Convert one string into one number
| random   | Create random numbers
 
## Mathematics

| Function | Purpose
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

To read and write into files and save to disk, we must use system.io library. This library define type "F" : file handler. It offer support for file input/output.

**Methods**

Next is a fragment from system.io library that define functions open and close.

```
def .open(name ∈ S, mode ∈ A) => (f ∈ F);
def .close(f ∈ F);
...

```
**remember:** public functions start with "."

**Examples:**

* File Open:[fo.bee](../demo/fo.bee)
* File Scan:[fs.bee](../demo/sc.bee) 

**File IO**

Other functions in system.io

|Function | Purpose
|---------|------------------------------------------ 
| exist   | Check if file exist on disk
| open    | Open a file for read or write
| close   | Close a file after using it
| erase   | Remove a file from disk
| scrub   | Remove all files from directory
| clean   | Remove all files and folders /recursive  
| make    | Make a directory
| remove  | Remove a directory
| list    | Read a list of files and folders from directory
| folder  | Current working folder name 
| change  | Change current working folder

**Read next:** [Structure](structure.md)
