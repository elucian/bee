## Standard Library

Standard library contains:

* [Type system](#type-system)
* [Built-in rules](#built-in-rules)
* [Mathematics](#mathematics)
* [System library](#system-library)

## Data rules
 
**Introspection**

| rule     | Purpose
|----------|------------------------------------------ 
| type     | type name
| size     | type size 

## Composite rules

| rule     | Purpose
|----------|------------------------------------------ 
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
 

## Date Time

Modules for _date_ and _time_ will contain all required rules.

**time**

| rule     | Purpose
|----------|------------------------------------------ 
| now      | get current time


**date**

| rule     | Purpose
|----------|------------------------------------------ 
| now      | get current date

## Mathematics

Library math will implement rules:

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
  |     |-- io.bee
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
rule .open(name ∈ String, mode ∈ A) => (file ∈ File);
rule .close(file ∈ File);
rule .list(folder ∈ Folder) ∈ (S);
rule .exist(name ∈ String) ∈ L;
rule ,remove(name ∈ String); 
rule ,rename(name, new_name ∈ String); 
...

```
**remember:** public rules start with dot: "."

**Examples:**

* File Open:[fo.bee](./demo/fo.bee)

**File IO**

System IO rules

| rule    | Purpose
|---------|------------------------------------------ 
| open    | Open a file
| close   | Close a file
| exist   | Check if file or folder exist on disk
| list    | Read a list of files and folders from directory
| tree    | Read tree of directory in memory
| remove  | Remove a file / directory
| rename  | Make a new directory


Two data types must be available: File, Folder

**File methods**

* clean  // erase all data in the file
* flush  // save file buffer to disk 
* change // modify file attributes

**Folder methods**

* select // select this folder as working folder
* purge  // remove all files from folder
* change // modify folder attributes

**Making files/folders**

```
make file_name   := File.open('name','w');
make folder_name := Folder.open('name');
```

## Errors
Bee has pre-define Error objects with codes in range (1..200):

```** global type
type Error: {code ∈ Z, message ∈ String} <: Object;
```

```
** exception objects
$zero_division  := {100,"division by zero"}        ∈ Error;
$null_reference := {101,"null reference usage"}    ∈ Error;
$value_overflow := {102,"value overflow"}          ∈ Error;
$out_of_range   := {103,"value out of range"}      ∈ Error;
$type_mismatch  := {104,"data type mismatch"}      ∈ Error;
$user_error     := {200,"user defined error"}      ∈ Error;
...

** Standard error
$standard_error  := {1,"standard error"}    ∈ Error;
$unexpected_error:= {2,"unexpected error"}  ∈ Error;
```

**Read next:** [Project Structure](structure.md)
