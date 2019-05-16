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
| Logical     |L  | Logical number {0,1}  (2 bytes)
| Unicode     |U  | UTF32 code point      (4 bytes)
| Binary      |B  | Positive short number (4 bytes)
| Natural     |N  | Positive large number (8 bytes)
| Integer     |Z  | Positive or negative number 
| Real        |R  | Real number (double precision)
| Rational    |Q  | Rational number precision control by #resolution:0.001

**Composite types**

| Name        | Description
|-------------|------------------------------------------------------------
| String      | Unlimited capacity string
| Date        | "YYYYDDMM" -> YDM, "DD/MM/YYYY" -> DMY, "MM/DD/YYYY" -> YDM
| Time        | "hh:mm,9999ms" -> T12 "hh:mm__, 9999ms" __={am/pm} + {T12, T24}

## Built-in rules
 
**Introspection**

| rule     | Purpose
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
| mod      | aspect rule y := \|x\|  

## System Library

Interaction with operating system require load from library.

```
+-------------------------
\bee 
  |
  |-- system
  |     | -- io.bee
  |
  |-- db
  ...
-------------------------+  
```

## File IO

To read and print into files and save to disk, we must use system.io library. This library define type "F" : file handler. It offer support for file input/output.

**Rules**

Next is a fragment from system.io library that define rules open and close.

```
type .open(name @ S, mode ∈ A) => (f ∈ F)
type .close(f ∈ F)
...

```
**remember:** public rules start with "."

**Examples:**

* File Open:[fo.bee](../demo/fo.bee)
* File Scan:[fs.bee](../demo/sc.bee) 

**File IO**

Rules with result in system.io

| rule    | Purpose
|---------|------------------------------------------ 
| exist   | Check if file exist on disk
| open    | Open a file for read or print
| files   | Read a list of files from directory
| folders | Read tree of directory in memory
| where   | Current working folder name 
| change  | Change current working folder

Rules without rules in syste.io

| rule    | Purpose
|---------|------------------------------------------ 
| save    | Save file modifications to disk
| undo    | Restore file modification before save
| close   | Close a file after using it
| new     | Make a new directory
| remove  | Remove a file / directory / with files
| change  | Change current working folder

## Exception
Bee has pre-define exceptions in range [0..200]:

```
-- global exception type
type Error <: {code ∈ Z, message @ S}
```

```
define $zero_div      := {100,"division by zero"}        ∈ Error
define $null_ref      := {101,"null reference usage"}    ∈ Error
define $val_overflow  := {102,"value overflow"}          ∈ Error
define $out_of_range  := {103,"value out of range"}      ∈ Error
define $over_capacity := {104,"value over capacity"}     ∈ Error
define $out_of_domain := {105,"subscript out of domain"} ∈ Error
```

**Read next:** [Structure](structure.md)
