# Standard Library

Standard library is automatically included in Bee language.


## Type system

In Bee the types are considered finite or infinite sets.   
Following types are included in standard library.

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
| mod      | modulo y := \|x\|  

**Read next:** [Structure](structure.md)
