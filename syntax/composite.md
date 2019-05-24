## Composite Types

Composite types are complex data structures. 

**Bookmarks**

* [ordinal](#ordinal)
* [tuple](#tuple)
* [list](#list)
* [array](#array)
* [set](#set)
* [hash map](#hash-map)
* [slice](#slice)
* [varargs](#varargs)
* [strings](#strings)
* [object](#object)
* [method](#method)
* [exception](#exception)

## Usability

Bee uses composite types to declare ...

* declare composite variables
* declare composite constants
* declare new data types

## Ordinal

Ordinal is an abstract data set. It is a group of identifiers. Each identifier represents an integer value starting from 0 to capacity-1 by default. Associated values can start with a different number. Only first value can be specified using pair up operator ":".

**pattern**
```
type type_name <: { name1:0, name2, name3};

make a, b, c ∈ type_name;

alter a := type_name.name1; --a=2
alter b := type_name.name2; --b=3
alter c := type_name.name3; --c=4
```

**Note:** When element name start with "." no need to use qualifiers for individual values

```
-- using public elements in enumeration
type type_names <: { .name0, .name1 };

make a, b ∈ type_name;

alter  a := name0; --a value := 0
alter  b := name1; --b value := 1
```

## Tuple

A tuple is an enumeration of elements enclosed in parenthesis and separated by comma: 

**examples**
```
(a, b ∈ Z, c @ B) --parameters
('a','b','c')     --strings
(1,2,3)           --numbers
(1,'2','x')       --mixed types
```

Definition of tuple on Wikipedia: [Tuple](https://en.wikipedia.org/wiki/Tuple)

**notes**
* You can not define a variable of type tuple;
* Tuples are source code literals with a static structure;
* Values in a tuple can have different data types;
* Elements of tuple are ordered, but can not be addressed by index;
* You can use elements from a tuple using unpacking operator;

**unpacking**

A tuple can be _unpacked_ into multiple variables using operator "<+";

**Example:**

```
--receiver variables
make x, y ∈ Z;
make z ∈ S;
make a := 40;

--unpacking: modify all 3 variables
alter x, y, z <+ (97, 65, 'a');

print x; -- 97
print y; -- 65
print z; -- a

-- tuple unpacking using a template
make s := "\{0} > \{1} > \{2}" <+ (x, y, z); 
print ('a = ' + a); -- a = 40
print s; --97 > 65 > a
```

**Unpacking Notes:**
* If tuple has more elements, the rest of values are ignored;
* If tuple has less elements, last variables are set to zero;

**multiple results**
A rule can have multiple results defined using a tuple:

```
-- rule with multiple results
rule test(x,y ∈ Z) => (r, c @ Z):
  alter r += x+1;
  alter c += y+1;
return;

make n, m ∈ Z;

-- unpacking the results
alter n, m <+ test(1,2);

print n; -- 2
print m; -- 3

-- ignore one result using "_"
alter n, _ <+ test(3,0);
print n; --4

-- using apply to capture results
apply test(0,0) +> n, m
print (n,m); -- 1, 1

```

## List

A list is a dynamic collection of elements connected by two references:

* previous
* next

**list type**

You can define a _list type_ using empty list: ()

```
type type_name <: (element_type); -- list type
```

**variable**
You can use one of three forms of declarations:

```
make name ∈  (element_type); -- explicit declaration
make name := (constant,...); -- implicit declaration
make name := (constant,...) ∈ (element_type); -- full declaration
```

**properties**
* a list can be initially empty: (),
* all elements in a list have the same type,
* elements in a list are ordered by index,
* list elements can be found using index but this is slow,
* finding first element in a list is fast: list_name.first,
* finding last element in a list is fast: list_name.last,
* you can add a new element in a list very fast,
* you can remove elements from beginning or end of list.

**notes:** 
* A list is usually used as stack or queue;
* A list literal is a tuple of constant values;
* A list has unlimited capacity;

**example**

```
make list := (0, 1, 2, 3, 4, 5);

-- list traversal
make x ∈ Z;
scan list :> x do
  write x;
  write _ if x ≡ list[?]; -- Note: "_" = " "
next;
print; -- 0 1 2 3 4 5
```

## Stack

A stack is a LIFO list of elements: LIFO = (last in first out)

```
make a := (1, 2, 3); --list
make last ∈ N;

-- append to stack with operator "+="
alter a += 4; -- (1,2,3,4)

-- read last element using "-="
alter last := a[?]; --last = 4

-- remove last element using -=
alter a -= a[?]; -- a = (1,2,3)
```

## Queue

A queue is a FIFO collection of elements: (first in first out)

```
make q := (1,2,3); list
make first : N;

-- enqueue new element into list "+=" 
alter q += 4; -- (1,2,3,4)

-- read first element using ":="
alter first := a[!]; --first = 1

-- dequeue first element using "-="
alter a -= a[!]; --a = (2,3,4)
```

## Array

Bee define Arrays using notation [](c), where c is the capacity.

**syntax**
```
make array_name ∈ [type];        -- undefined capacity
make array_name ∈ [type](c);     -- capacity c
make array_name ∈ [type](n,m);   -- capacity c = n·m
```

**Note:** 
* Default array index start from 0 to c-1 where c is capacity;
* Array index can start from a different, specified value;

**example**

```
make test ∈ [R](10); -- vector of 10 real numbers
make m := length(test)-1;

-- default array index start from 0
print test[0]; --first element
print test[m]; --last element

-- array traversal 
make x := 0;
while (x < m) do
  alter test[i] := x;
  alter x += 1;
repeat;

-- print all elements of array
print test;
over.
```

**Output:**
```
[0,1,2,3,4,5,6,7,8,9]
```

**Notes:**

* Array can be initially empty [] with default capacity = 0, 
* Arrays with defined capacity are automatically initialized.

**custom index**

Arrays can have optional custom index range: [n..m]. 

**syntax**
```
-- define vector with elements starting from n to m
make array_name := [member_type][n..m];

print array_name[!]; --print first element
print array_name[?]; --print last element
```

Array capacity is calculated automatic with formula: `c = m-n+1`

**initialize elements**

Initial value for elements can be set during declaration:

```
-- you can use 2 optional notations 
make zum  := 1 ∈ [Z](10);       -- explicit initialization using single value
make zet  := [100..1000];       -- explicit initialization using range
make test := [1..10,100..1000]; -- explicit initialization using domain

-- modify one element by index
alter zum[1]  := 1; 
alter zum[10] := 10; 
print zum; --expect [1,2,2,2,2,2,2,2,2,10]

-- modify all elements
alter zum[*] += 1; 
print zum; --expect [2,3,3,3,3,3,3,3,3,11]

-- reset all elements
alter zum[*] := 0; --[0,0,0,0,0,0,0,0,0,0]

-- modify multiple elements using an Array literal
alter zum[*] := [1,2,3];
print zum; --expect [1,2,3,1,2,3,1,2,3,1]

-- reset zum reference (replace zum)
alter zum := [1,2,3];
print zum; --expect [1,2,3];

-- transfer a reference 
alter zum := zet;
print zum; -- expect [1,1,1,1,1,1,1,1,1,1];
```

**differed initialization**
We can define an empty array and initialize elements later.

```
-- array without members
make vec ∈ [U]; 
make nec ∈ [N]; 

-- arrays are empty
print vec = []; --True
print nec = []; --True

-- array capacity becomes: 10
alter vec := `x` * 10;
print vec; --expect [`x`,`x`,`x`,`x`,`x`,`x`,`x`,`x`,`x`,`x`]

-- array capacity becomes: 10
alter nec := 0 * 10;
print nec; --expect [0,0,0,0,0,0,0,0,0,0]
```

## Slice

A slice is a view of references from an array.

**Syntax:**

```
-- declare vector with capacity c
make array_name ∈ [element_type](c);

-- slice creation using ":=" and ".."
make slice_name := array_name[n..m];
```

**Note:** 
* Slices are arrays of references to original elements;
* Slices can be anonymous or can be named;

**example**
```
-- original array
make   a := [0](5); 
print  a;  --[0,0,0,0,0]

-- making two slices
make c := a[0..2]; --[0,0,0]
make e := a[3..4]; --[0,0]

--modify slice elements
alter c[*] := 1;
alter e[*] := 2;

--original array is modified
print a; -- expect [1,1,1,2,2]

--modify last 2 elements using anonymous slicing
alter a[3..?] := [2,3];

--                     ↓ ↓
print a; --expect [1,1,1,2,3]
```

## Matrix

A matrix is an array with 2 or more dimensions.

**Example:** 
```
make mat ∈ [R](4,4);  --define matrix

-- modify matrix using ":=" operator
alter mat := [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]
print mat[0,0]; --first element
print mat[3,3]; --last element

```

**Note:** Elements are organized in _row-major_ order.

So next program will print; 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,

```
-- elements in matrix can be accessed using while
make i := 0;
make x := length(mat);
  
while (i < x) do
  write (mat[x], ',');
  i += 1;
repeat;

over.
```

Printing the entire matrix will use multiple rows to represent a matrix approximation.

```
make m := [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]];
print m;
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
rule foo(*bar ∈ [Z]) => (x @ Z):
  make c := bar.count();
  -- precondition
  when (c = 0) do
    alter x := 0;
    exit;
  done;
  alter i := 0; 
  -- sum all parameters  
  while (i < c) do
    alter x += bar[i];
    alter i += 1;
  repeat;
return;

--we can call foo with variable number of arguments
print foo();       -- 0
print foo(1);      -- 1
print foo(1,2);    -- 3
print foo(1,2,3);  -- 6

```

**first & last**

* First element in array: array_name[!]
* Last element in array: array_name[?]

### Array processing

```
make a1 := [1, 2, 3]; 
make a2 := [2, 3, 4]; 
make a3, a4, a5 := [];

-- addition between two Arrays "+" 
alter a3 := a1 + a2; --[1,2,3,2,3,4]

-- difference between two Arrays "-"
alter a4 := l1 - l2; -- [1]
alter a5 := l2 - l1; -- [4]

-- intersection between two Arrays "&" 
alter a3 := a1 & a2; -- [2,3]

-- union between two Arrays "|" 
alter a3 := a1 | a2; -- [1,2,3,4]
```

**Array traversal**

```
make array := ['a', 'b', 'c'];
make c ∈ A;
scan array :> c do
  write c;
  write ',';
repeat;
```

## Set

A set is a sorted collection of unique values.

```
--define a set

make s  := {}      ∈ {N}; -- empty set
make s1 := {1,2,3} ∈ {N}; -- 3 elements
make s2 := {2,3,4} ∈ {N}; -- 3 elements  


-- specific operations
alter s := s1 ∪ s2; -- {1,2,3,4}  :union
alter s := s1 ∩ s2; -- {2,3}      :intersection
alter s := s1 - s2; -- {1}        :difference 1
alter s := s2 - s1; -- {4}        :difference 2

-- belonging check
print s1 ⊂ s;   --True
print s  ⊃ s2;  --True

-- declare a new set
make a := {1,2,3} ∈ {N};

-- using operator +/- to mutate set a
alter a := a + 4; {1,2,3,4};  -- append 4
alter a := a - 3; {1,2,4};    -- remove 3 (not 3)

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
type type_name <: {(key_type : value_type)};

-- declare a new empty map
make new_map := {} ∈ type_name;
```

**example**
```
-- initial value of map
alter map := {('a':"first"), ('b':"second")};

-- create new element
alter map['c'] := "third";

-- modification of non existent element will fail
alter map['e'] := "forth"; --ERROR

-- finding elements by key
print map['a']; --first
print map['b']; --second
print map['c']; --third

-- remove an element by key
scrap map['a']; --remove "first" element
print map;      --expected: {'b'="second", 'c'="third"}

```

**Notes:** 
* Hash operators are working like for a set of keys;
* Hash key type must be numeric or sortable:{String, Date, Time};
* Hash key type can not be double quoted string or other collection;


## Check for inclusion

We can check if an element is included in a collection using "∈".

```
type  Tmap <: {(A:U)};

make map  := {('a':"first"), ('b':"second")} ∈ Tmap;

when ('a' ∈ map) do
  print("a is found");
else
  print("not found");
done;
  
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
make str ∈ S(25);    --string with capacity   25x8 = 200 bit
make a   ∈ [B](25);  --array of 25 characters 25x8 = 200 bit

alter str := 'Short string'; 
alter a   := split(str);
```

**conversion**
Conversion of a string into number is done; using _parse_ rule:

```
make x,y ∈ R;

-- rule parse return; a Real number
alter x := parse('123.5',2,',.'); -- convert to real 123.5
alter y := parse('10,000.3333',2,',.'); -- convert to real 10000.33
```

**Notes:** 

* These strings are NUL terminated Arrays and are immutable;
* These strings have no support for templates {} notation;
* Default capacity must be specified to support longer strings;

### Double quoted

Double quoted strings are Unicode UTF8 strings.  Bee support "escape" notation using escape \\ symbol in double quoted strings. This will be internally replaced by a code point. Print command will render the encoded string and will represent it to output device.


**example**
```
print("this represents \n new line in string");
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
  `&` | Concatenate two strings as they are no trim is performed
  `+` | Trim first string and concatenate with second string
  `/` | URL/Path concatenation: trim and use single separator: "/"
  `\` | Path concatenation: trim and use single separator: "\\"
  
**examples**
```
make u, c, s ∈ S;  --default length is 128 octets = 1024 bit

-- string concatenation
alter u := 'This is'  & ' a short string.';
alter c := 'This is ' & 'fixed size string'; 

-- automatic conversion to string
alter s := 40 & 5;  --'405'

-- URL/path concatenation
make test_file := $pro\'src'\'test.bee';

-- when and $platform = "Windows"
-- Let's say $pro = "c:\work\project\"
print test_file; --> c:\work\project\src\test.bee

-- when and $platform = "Linux"
-- Let's say $pro = "/work/project/"
print test_file; --> /work/project/src/test.bee

```

### Template

* We can include numbers into a string using template operator "<+"
* Inside template we use "\{n}" notation to find a value using the member index
* Template must be included in double quotes " " 
* If a placeholder index is not found then it is preserved as is

```
make var_name := template <+ (variable);
make var_name := template <+ (var1,var2,...);
```

**Examples:**
```
make x := 30; --Code ASCII 0
make y := 41; --Code ASCII A

--template writing
print ("\{0} > \{1} > \{2}" <+ (x,y)); --print "30 > 41 > {2}"
  
```

**Escaping**

Format/template stings can use escape sequences:

```
\s  : single quoted string
\q  : double quoted string
\n  : number  
\a  : ASCII symbol 
\u  : Unicode symbol
\h  : hexadecimal
\b  : binary
\t  : time format
\d  : date DMY format
\() : [numeric format](#numeric-format)
\{} : Attribute by name/ Value by key
\[] : Array/Matrix element by index \| List elements: [!] or [?] 
```

**examples**
```
print "Numbers: \n and \n" <+ (10, 11);
print "Alpha: \n and \n" <+ ('a', 'b');
print "Strings: \s and \s" <+ ('odd','even');
print "Quoted:  \q and \q" <+ ('odd','even');
print "Unicode: \u and \u" <+ (U+2260,U+2261);
```
**Expected output:**
```
Numbers: 10 and 11
Alpha: a and b <+ ('a', 'b');
Strings:'odd' and 'even'
Quoted: "odd" and "even"
Unicode: ≠ and ≡
```

**Notes**: 
* Injector "<+" is polymorph and overloaded operator. 
* For template you can use: { tuple, list, table, array }

### String Generator

It is common to create strings automatically.

**Operator:**  "*"

```
make str := constant * n ∈ S(n);
```

**Example:**
```
make sep := '-' * 19;

print ('+' & sep);
print ('|   this is a test   |');
print (sep & '+');
```

**Output:**

```
+--------------------
|  this is a test   |
--------------------+
```

## Object

Object types are data structures with elements enclosed in curly brackets { , , ,} and separated by comma. 

**Pattern:**
```
-- declare a category of objects
type  type_name <: {attribute ∈ type_name, ...};

-- create an object instance using default constructor
make item_name := {
       attribute : constant,
       ...
       } ∈ type_name;

-- modify one object attribute
alter object_name.attribute := new_value;

-- declare receivers
make var1 ∈ type_1;
make var2 ∈ type_2;
...

-- unpacking object attributes
make var1,var2... <+ object_name;
```

**Object structure can be ...**

* Flat
* Recursive
* Hierarchical

**type size**

Type size is a constant that can be calculated using size(T).

### Flat object

**Example:**
```
type  Person <: {name ∈ S, age ∈ N};

-- array of 10 persons
make catalog ∈ [Person](10);
  
-- initialize value using literals
make catalog[0] := {name:"Cleopatra", age:15};
make catalog[1] := {name:"Martin", age:17};

--using one element with dot operators
print caralog[0].name; --will print Cleopatra
print caralog[1].name; --will print Martin

--member type can be check using _type()_ built in
print type(Person.name); --will print U
print type(Person.age); --will print W

--print size of structure
print size(Person);
```

### Recursive
We can limit how deep a structure become using a directive. "#recursive:100"

```
** example of single recursive node
type Node <: { 
  data ∈ Z,       -- integer data
  previous ∈ Node -- reference to previous node
};
```

This kind of structure can be used to create a data chain.

```
** example of double recursive node
type Node <: {
  data  ∈ Z,    -- integer data
  prior ∈ Node, -- reference to previous node
  next  ∈ Node  -- reference to next node
};
```

## Method

An object can have associated rules that are called _methods_:

**pattern**
```
-- define Foo as object with 2 public attributes:
type Foo <: {a, b ∈ N};
  
-- constructor method for Foo
rule foo(p1,p2 ∈ N) => (me @ Foo):
  make me := {a:p1, b:p2};
return;

-- define a method for Foo
rule bar(me @ Foo):
  print "a =" & me.a;
  print "b =" & me.b;
return;

-- call constructor
make test := foo(1,1);

-- run bar() method using object test as dot qualifier
apply test.bar();
fail if test.a ≠ 1; -- verify attribute a
fail if test.b ≠ 1; -- verify attribute b
```

**See also:** 
* [me.bee](me.bee); -- numeral with rules
* [gc.bee](gc.bee); -- number generator

**Notes:** 
* Binded rules are using multiple dispatch so they can be overloaded;
* Rules can be overwritten in other modules;
* Rules can be private or public using dot prefix;
* If an object is public, the constructor must also be public;
* You can not modify object structure after it is defined.

## Exception
An exception is a recoverable error. It can be declared by the user or by the system:

**definition**
```
-- global exception type
type Error <: {code ∈ Z, message ∈ S, line ∈ Z};

-- global system error
make #error ∈ Error;
```

You can define exceptions with code > 200:

**example**
```
make my_error  := {200,"my first exception"} ∈ Error;

fail my_error;
```

An error has template features. Operator <+ can be used:

**example**
```
make my_error  := {201,"exception: \s{1}"} ∈ Error;

fail my_error <+ 'test';
```

-- expected
exception: 'test'

**Notes:**
* Keyword _fail_ can raise only recoverable errors with code > 200;
* Keyword _fail_ can not terminate the main program only _halt_ or _exit_;
* All recoverable errors must be analyzed by the program using trial block;
* Error code <  200 are system reserved error codes;
* Error code ≤ -1   are unrecoverable errors created with _halt_;
* Keyword _halt_ will liberate the resources and terminate the program;


**unrecoverable**

Next we create unrecoverable exception:

```
halt -1; --end program and exit code = -1
```

**Read next:** [Type Inference](inference.md) 