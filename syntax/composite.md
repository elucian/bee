## Composite Types

Composite types are complex data structures. 

**Bookmarks**

* [ordinal](#ordinal)
* [tuple](#tuple)
* [array](#array)
* [set](#set)
* [hash map](#hash-map)
* [slice](#slice)
* [varargs](#varargs)
* [strings](#strings)
* [object](#object)
* [aggregate](#aggregate)
* [binding](#binding)

## Usability

Bee uses composite types to ...

* declare data types using: "<:" and "∈"
* declare constants  using: ":=" and "@"
* declare references using: ":=" and "@" 


## Ordinal

Ordinal is an abstract data set. It is a group of identifiers. Each identifier represents an integer value starting from 0 to capacity-1 by default. Ordinal values can start with a different number. Only first value can be specified using ":".

**pattern**
```
type type_name <: { name1:0, name2, name3}

make a, b, c ∈ type_name

alter a := type_name.name1  ; a=2
alter b := type_name.name2  ; b=3
alter c := type_name.name3  ; c=4
```

**Note:** When element name start with "." no need to use qualifiers for individual values

```
-- using public elements in enumeration
type type_names <: { .name0, .name1 }

make a, b ∈ type_name

alter  a := name0  ; a value := 0
alter  b := name1  ; b value := 1
```

## Tuple

It is a comma separated enumeration of values or expressions. 

**declare a tuple
```
(Z, Z, U)
(a, b ∈ Z, c ∈ U)
```

Definition of tuple on Wikipedia: [Tuple](https://en.wikipedia.org/wiki/Tuple)

**notes**
* Tuples have a static structure and are immutable;
* Expressions in a tuple can have different data types;


**define**
```
type tuple_type <: (Type,...)

new t : = (value,...) @ tuple_type  
```

**Notes**: 

* Tuple members can have divergent data types;
* You can address elements of tuple only after unpacking;
* Elements of tuple are ordered, but can not be addressed by index. 

**example**
```
-- create a tuple using implicit declaration
make b := ('1','a','2','b')
```

**unpacking**

A tuple can be unpack into multiple variables using operator "<+"

**Example:**

```
--create 3 new variables using literal
make x, y, z ∈ Z

--unpacking modify all 3 value
alter x, y, z <+ (97, 65, 40)

print x  ;97
print y  ;65
print z  ;40

-- tuple unpacking using template
make s := "{0} > {1} > {2}" <+ (x, y, z) 
print s  ; "97 > 65 > 40"
```

**Unpacking Notes:**
* If tuple has more elements than target variables the rest of values are ignored;
* If tuple has less elements, last variables are set to zero, no error is raised;
* Sometimes unpacking result is injected into a template;

**multiple results**
A rule can have multiple results in form of a tuple:

```
-- rule with multiple results
rule test(x,y ∈ Z) => (r, c ∈ Z)
  alter r += x+1
  alter c += y+1
return

make n, m ∈ Z

-- unpacking the results
alter n, m <+ test(1,2)

print n  ; will print 2
print m  ; will print 3

-- capture the entire tuple
make t := test(1,2)

print t ; expect: (2,3)
print type(l) ;expect: (Z)
```

**Partial unpacking**

Some tuple members can be ignored when unpacking using anonymous variable: "_"

```
make tuple := (0, 1, 2, 3, 4, 5)
make x, y, z, w ∈ Z

-- first element and last 2 are ignored
alter _,x,y,z <+ tuple

-- ignore all elements and unpack the last element
alter *,w <+ tuple
print w ; expect 5
```

## Array

Bee define Arrays using notation []().

**syntax**
```
make array_name @ [type]        ;list
make array_name @ [type](c)     ;vector
make array_name @ [type](n,m)   ;matrix
```

**Note:** 
* Arrays are references therefore we define arrays using "@";
* Default array index start from 0 to c-1 where c is capacity;

**example**

```
make test @ [R](10) ;vector of 10 real numbers
make m := length(test)-1

-- default array index start from 0
print test[0]  ; first element
print test[m]  ; last element

-- array traversal 
make x := 0
while (x < m) do
  alter test[i] := x
  alter x += 1
repeat

-- print all elements of array
print test
over.
```

**Output:**
```
[0,1,2,3,4,5,6,7,8,9]
```

**Notes:**

* Array can be initially empty [] with capacity 0. 
* Arrays with capacity are automatically initialized.

**custom index**

Arrays can have optional index range: (n..m). 

**syntax**
```
-- define vector with elements starting from n to m
make array_name := [member_type](n..m)

print array_name[n] ; print first element
print array_name[m] ; print last element
```

Array capacity is calculated automatic with formula: `c = m-n+1`

**initialize elements**

Initial value for elements can be set during declaration:

```
-- you can use 2 optional notations 
make zum := 1 @ [Z](1..10) ; explicit initialization
make zet := [1](1..10) ; using type inference

-- modify one element by index
alter zum[1]  := 1 
alter zum[10] := 10 
print zum  ; expect [1,2,2,2,2,2,2,2,2,10]

-- modify all elements
alter zum[*] += 1 
print zum  ; expect [2,3,3,3,3,3,3,3,3,11]

-- reset all elements
alter zum[*] := 0 ; [0,0,0,0,0,0,0,0,0,0]

-- modify multiple elements using a list
alter zum := [1,2,3]
print zum  ; expect [1,2,3,0,0,0,0,0,0,0]

-- reset zum reference (replace zum)
alter zum :: [1,2,3]
print zum ;expect [1,2,3]
```

**differed initialization**
```
-- define fixed array without members
make vec @ [U]() ;unknown capacity array 
make nec @ [N]() ;unknown capacity array

-- empty arrays
print vec = [] ; True
print nec = [] ; True

-- array capacity becomes: 10
alter vec := `x` * 10
print vec  ; expect [`x`,`x`,`x`,`x`,`x`,`x`,`x`,`x`,`x`,`x`]

-- array capacity becomes: 10
alter nec := 0 * 10
print nec  ; expect [0,0,0,0,0,0,0,0,0,0]

-- vector capacity
print nec.count() ;10
```

## Slice

A slice is a section of array using notation: [n..m]. 

**Syntax:**

```
-- declare vector with capacity (n)
make array_name @ [element_type](c)

-- slice creation using "::"
make slice_name :: array_name[n..m]
```

**Note:** 
* Slices have references to original members;
* Slices can be named or unnamed/anonymous;

**example**
```
make   a := [0](5) 
print  a ; [0,0,0,0,0]

-- making slice views
make c :: a[0..2] ; [0,0,0]
make e :: a[3..4] ; [0,0]

--modify slice elements
alter c[*] := 1 ; 
alter e[*] := 2 ; 

--original array is modified
print a ; expect [1,1,1,2,2]

--modify last 2 elements using anonymous slice
alter a[3..?] := 0

--                      ↓ ↓
print a ; expect [1,1,1,0,0]
```

## Copy

Assignment ":=" and slicing notation "[..]" can be used to copy elements of an array.

```
make a := [0,1,2,3,4] ;type inference array
make e,f,r @ [Z]()    ;deferred initialization

-- by default modify ":=" copy/clone an entire array
alter e := a 

-- compare two collections
print e = a  ;True  -- (equal collections)
print e ≡ a  ;False -- (different memory locations)

-- copy/clone original data
alter f := a[2..?]  ;initialize f with capacity 3

-- you can also copy data from range of native type
alter r := Z[1..10] ;initialize array of 10 integers
print r  ;expect [1,2,3,4,5,6,7,8,9,10]
```


## Matrix

A matrix is an array with 2 or more dimensions.

**Example:** 
```
make mat @ [R](4,4)  ; define matrix

-- modify matrix using ":=" operator
alter mat := [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]
print mat[0,0]  ; first element
print mat[3,3]  ; last element

```

**Note:** Elements are organized in _row-major_ order.

So next program will print; 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,

```
-- elements in matrix can be accessed using while
make i := 0
make x := length(mat)
  
while (i < x) do
  write (mat[x], ',')
  i += 1
repeat

over.
```

Printing the entire matrix will use multiple rows to represent a matrix approximation.

```
make m := [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]
print m
over.
```

output:
```
⎡ 1  2  3  4 ⎤
⎢ 5  6  7  8 ⎥
⎢ 9 10 11 12 ⎥
⎣13 14 15 16 ⎦
```

## Varargs

One rule or rule can receive variable number of arguments.   
We declare an array using prefix "*" for variable parameter name.

```
--parameter *bar is an array
rule foo( *bar @ [Z]) => (x ∈ Z)
  make c := bar.count()
  -- precondition
  when (c = 0) do
    alter x := 0
    exit
  done
  alter i := 0 
  -- sum all parameters  
  while (i < c) do
    alter x += bar[i]
    alter i += 1
  repeat
return

--we can call foo with variable number of arguments
print foo()      ; 0
print foo(1)     ; 1
print foo(1,2)   ; 3
print foo(1,2,3) ; 6

```

**first & last**

* First element in array: array_name[!]
* Last element in array: array_name[?]

### Array processing

```
make a1 := [1, 2, 3] 
make a2 := [2, 3, 4] 
make a3, a4, a5 := []

-- addition between two Arrays "+" 
alter a3 := a1 + a2 ;[1,2,3,2,3,4]

-- difference between two Arrays "-"
alter a4 := l1 - l2 ;[1]
alter a5 := l2 - l1 ;[4]

-- intersection between two Arrays "&" 
alter a3 := a1 & a2 ;[2,3]

-- union between two Arrays "|" 
alter a3 := a1 | a2 ;[1,2,3,4]
```

**Array traversal**

```
make array := ['a', 'b', 'c']
make c @ U
scan array +> c do
  write c
  write ','
repeat
```

## Stack

A stack is a LIFO collection of elements.

```
make a := [1, 2, 3] ;list array
make last ∈ N

-- using stack with operator "+="
alter a += 4  ;[1,2,3,4]

-- read last element using "-="
alter last := a[?] ;last = 4

-- remove last element using -=
alter a -= a[?] ;a = [1,2,3]
```

## Queue

A queue is a FIFO collection of elements.

```
make q := [1,2,3] ;list array
make first : N

-- using enqueue operator "+:" 
alter q += 4  ; [1,2,3,4]

-- read first element using ":="
alter first := a[!]  ; first = 1

-- dequeue first element using "-="
alter a -= a[!]  ; a = [2,3,4]
```

## Set

A set is a sorted collection of unique values.

```
--define a set

make s  := {}      @ {N}  ; empty set
make s1 := {1,2,3} @ {N}  ; 3 elements
make s2 := {2,3,4} @ {N}  ; 3 elements  


-- specific operations
alter s := s1 ∪ s2;{1,2,3,4}  -- union
alter s := s1 ∩ s2;{2,3}      -- intersection
alter s := s1 - s2;{1}        -- difference 1
alter s := s2 - s1;{4}        -- difference 2

-- belonging check
print s1 ⊂ s  ; True
print s  ⊃ s2 ; True

-- declare a new set
make a := {1,2,3} @ {N}

-- using operator +/- to mutate set a
alter a := a + 4 ;{1,2,3,4}  -- append 4
alter a := a - 3 ;{1,2,4}    -- remove 3 (not 3)

```

**Notes:** 

* Elements in a set have the same data type;
* Set are internally sorted not indexed;
* Set elements must be sortable types;

## Hash map

A hash map is a set of (key:value) pairs sorted by key.

**syntax**
```
-- define a map type
type type_name <: {(key_type : value_type)}

-- declare a new empty map
make new_map := {} @ type_name
```

**example**
```
-- initial value of map
alter map := {('a':"first"), ('b':"second")}

-- create new element
alter map['c'] := "third"

-- modification of non existent element will fail
alter map['e'] := "forth"  ; ERROR

-- finding elements by key
print map['a']  ; first
print map['b']  ; second
print map['c']  ; third

-- remove an element by key
scrap map['a']  ; remove "first" element
print map       ; expected: {'b'="second", 'c'="third"}

```

**Notes:** 
* Hash operators are working like for a set of keys;
* Hash key type must be numeric or sortable:{String, Date, Time};
* Hash key type can not be double quoted string or other collection;


## Check for inclusion

We can check if an element is included in a collection using "∈".

```
type  Tmap <: {(A:U)};

make map  := {('a':"first"), ('b':"second")} @ Tmap

when ('a' ∈ map) do
  print("a is found")
else
  print("not found")
done
  
```

## Strings

Bee has one Unicode symbol {U}, and 2 kind of strings: {S,X}

* U:       Is UTF32 encoded alphanumeric code point or symbol; 
* String:  Is UTF8 array with a limited capacity: 1024 bit;
* Text:    Is UTF8 encoded text with unrestricted capacity;

**Note:** 
Literals for strings are enclosed in 3 kind of quotes:

* U:   like: \`?\` 
* String: like: '?'
* Text: like: "?"

**Alternative literals**
* Using wrong quotes can trigger implicit type coercion
* Notation U+FFFF is for UTF16 code points 
* Notation U-FFFFFFFF is for UTF32 code points

### Single quoted

Single quoted strings are Unicode UTF8 strings with limited capacity of 1024 bit ≤ 128 code points.

```
-- two compatible representation of strings
make str @ String(25) ; string with capacity   25x8 = 200 bit
make a   @ [U](25) ; array of 25 characters 25x8 = 200 bit

alter str := 'Short string' 
alter a   := split(str)
```

**conversion**
Conversion of a string into number is done using _parse_ rule:

```
make x,y ∈ R

-- rule parse return a Real number
alter x := parse('123.5',2,',.') ; convert to real 123.5
alter y := parse('10,000.3333',2,',.') ; convert to real 10000.33
```

**Notes:** 

* These strings are NUL terminated Arrays and are immutable;
* These strings have no support for templates {} notation;
* Default capacity must be specified to support longer strings;

### Double quoted

Double quoted strings are Unicode UTF8 strings.  Bee support "escape" notation using escape \\ symbol in double quoted strings. This will be internally replaced by a code point. Print command will render the encoded string and will represent it to output device.


**example**
```
print("this represents \n new line in string")
```

output:
```
this represents 
new line in string
```

### Control codes

For each escape character Bee also define a constant CODE.

**escape characters**

DEC|HEX|CODE|ESCAPE|NAME
---|---|----|------|---------
0  |00 |NUL |\0    |Null
8  |08 |BS  |\b    |Backspace
9  |09 |HT  |\y    |Horizontal Tab
10 |0A |LF  |\n    |Line Feed
11 |0B |VT  |\v    |Vertical Tab
12 |0C |FF  |\f    |Form Feed
13 |0D |CR  |\r    |Carriage Return
27 |1B |ESC |\e    |Escape

**additional escape**

* "\\\\"    escape backslash with backslash 
* "\\\""	double quote escape is necessary in double quoted strings
* "\\\'"	single quote escape is necessary in single quoted strings

**Note:** 

* This kind of string is mutable;
* This string can be a "rope" or "radix tree";

**See also:** [symbols.md](symbols.md)

### Concatenation

Below operators will concatenate two strings.

symbol| description
------|--------------------------------------------------------------------------
  `+` | Trim first string, (remove last spaces) and concatenate with second string.
  `&` | Concatenate two strings as they are no trim is performed!
  `/` | Trim, de-duplicate "/" and concatenate two strings using "/" separator
  `\\`| Trim, de-duplicate "\\" and concatenate two strings using "\\" separator 

**examples**
```
make u, c, s @ String ; default length is 128 octets = 1024 bit

-- string concatenation
alter u := 'This is'  & ' a short string.'
alter c := 'This is ' & 'fixed size string' 

-- automatic conversion to string
alter s := 40 & 5 ; '405'

-- URL/path concatenation
make test_file := $pro/'src'/'test.bee'

-- when $pro = c:\work\project\
print test_file ; c:\work\project\src\test.bee
```

### Template

* We can include numbers into a string using template operator "<+"
* Inside template we use "{n}" notation to find a value using the member index
* Template must be included in double quotes " " 
* If a placeholder index is not found then it is preserved as is

```
make var_name := template <+ (variable)
make var_name := template <+ (var1,var2,...)
```

**Examples:**
```
make x := 30 ; Code ASCII 0
make y := 41 ; Code ASCII A

--template writing
print ("{0} > {1} > {2}" <+ (x,y)) ; print "30 > 41 > {2}"
  
```

**Escaping**

Format/template stings can use uppercase escape sequence:

* \\B = binary representation 
* \\H = hexadecimal representation
* \\U = U+ Unicode representation
* \\S = double quoted string
* \\s = single quoted string
```
print ("This: \h{1} is hexadecimal code for \"*\"" <+ 42)
print ("This: \u{1} is Unicode representation for \"*\"" <+ `*`)
```

Expected output:
```
This: 2A is hexadecimal representation for "*"
This: U+002A is Unicode representation for "*"
```

**Note:** More complex string formating require explicit conversion using format() built-in.

### String Generator

It is common to create strings automatically.

**Operator:**  "*"

```
make str := constant * n @ String(n)
```

**Example:**
```
make sep := '-' * 19

print '+' & sep
print '|   this is a test   |'
print sep & '+'
```

**Output:**

```
+--------------------
|  this is a test   |
--------------------+
```

**Note:** Operator "*" have higher precedence then "."

## Object

Object types are data structures with elements enclosed in curly brackets { , , ,} and separated by comma. 

**Pattern:**
```
-- declare a category of objects
type  type_name <: {attribute ∈ type_name, ...}

-- create an object instance using default constructor
make item_name := {
       attribute : constant,
       ...
       } ∈ type_name

-- modify one object attribute
alter object_name.attribute := new_value

-- declare receivers
make var1 ∈ type_1
make var2 ∈ type_2
...

-- unpacking object attributes
make var1,var2... <+ object_name
```

**Object structure can be ...**

* Flat
* Recursive
* Hierarchical


**type size**

Type size is a constant that can be calculated using size(T).

**Example:**
```
type  Person <: {name @ String, age ∈ N}

-- array of 10 persons
make catalog @ [Person](10) 
  
-- initialize value using literals
make catalog[0] := {name:"Cleopatra", age:15}
make catalog[1] := {name:"Martin", age:17}

--using one element with dot operators
print caralog[0].name ; will print Cleopatra
print caralog[1].name ; will print Martin

--member type can be check using _type()_ built in
print type(Person.name) ; will print U
print type(Person.age) ; will print W

--print size of structure
print size(Person);
```

**Recursive records**
We can limit how deep a record become using a directive. "#recursive:100"

```
** example of single recursive node
type Node <: { 
  data ∈ Z,        ;integer data
  previous ∈ Node  ;reference to previous node
}
```

This kind of structure can be used to create a data chain.

```
** example of double recursive node
type Node <: {
  data  ∈ Z,    ;integer data
  prior ∈ Node, ;reference to previous node
  next  ∈ Node  ;reference to next node
}
```

## Aggregate

An aggregate type can store references to other composite types.

**example**
```
-- a set of tuples
make STuple @ {(Z,Z,U)}

-- an array of pairs
make Aheap  @ [(U,Z)](10)

-- an catalog of persons
make Acatp  @ {(String:Person)}

```

## Binding

An object can have associated rules:

**pattern**
```
-- define Foo as object with 2 public attributes:
type Foo <: {a, b ∈ N}
  
-- foo is a constructor for Foo
rule foo(p1,p2 ∈ N) => (me @ Foo)
  make me := {a:p1, b:p2}
return

-- second rule for Foo type
rule bar(me @ Foo)
  print "a =" & me.a
  print "b =" & me.b
return

-- reference capture "::" result Foo object 
make test :: foo(p:1)

-- test object rule
apply test.bar()
-- a = 1
-- b = 1
```
**See also:** 
* [me.bee](me.bee)  ; numeral with rules
* [gc.bee](gc.bee)  ; generator class

**Notes:** 
* Binded rules are using multiple dispatch so they can be overloaded;
* Rules can be overwritten in other aspects;
* Rules can be private to aspect or public using dot prefix;
* If an object is public, the constructor must also be public;
* You can not modify object structure after it is defined.
* Bee do not have inheritance and polymorphism instead you can use mix-ins;

**Read next:** [Type Inference](inference.md) 