## Composite Types

Composite types are complex data structures. 

**Bookmarks**

* [ordinal](#ordinal)
* [tuple](#tuple)
* [list](#list)
* [array](#array)
* [set](#set)
* [hash map](#hash-map)
* [strings](#strings)
* [object](#object)
* [method](#method)
* [varargs](#varargs)
* [exception](#exception)

## Usability

Bee uses composite types to declare ...

* declare composite variables
* declare composite constants
* declare new data types

## Pattern

A new type is defined from a super-type using symbol "<:"

```
type new_type := descriptor <: super_type
```

new_type   ::= identifier name usually start with capital letter
descriptor ::= depending on super-type
super_type ::= primitive type or composite type 

**Note:**
* The type descriptor is usually enclosed in  parenthesis: (), [] or {}
* The super_type is optional. It can be inferred from type descriptor

## Ordinal

Ordinal is an abstract data set. It is a group of identifiers. Each identifier represents an integer value starting from 0 to capacity-1. Associated values can start with a different integer number. Values can be specified using pair up operator ":". All values must be unsigned integer (i ≤ 0) in consecutive ascending order.

**pattern**
```
type type_name := { name1:0, name2, name3} <: Ordinal;

make a, b, c ∈ type_name;

alter a := type_name.name1; ** a=2
alter b := type_name.name2; ** b=3
alter c := type_name.name3; ** c=4
```

**Note:** When element name start with "." no need to use qualifiers for the individual values

```** using public elements in enumeration
type type_names := { .name0, .name1 } <: Ordinal;

make a, b ∈ type_name;

alter  a := name0; ** a = 0
alter  b := name1; ** b = 1
```

## Tuple

A tuple is enumeration of elements enclosed in parenthesis and separated by comma: 

**examples**
```
(a, b ∈ Z, c @ B) ** parameters
(result @ X)      ** single result
(r1,r2 @ Z)       ** multiple results
('a','b','c')     ** list of strings
(1,2,3)           ** list of integers
(1,`2`,'x')       ** list of various literals
```

**Notes:**

Bee tuples are very different from Python and other languages.

* Tuples are source code literals with a static structure;
* Values in a tuple can have different data types;
* Elements of tuple are ordered, but can not be addressed by index;
* You can not define a variable of type tuple;

**See also:** definition of tuple on Wikipedia: [Tuple](https://en.wikipedia.org/wiki/Tuple)

**multiple results**
A rule can have multiple results defined using a tuple:

```** rule with multiple results
rule test(x,y ∈ Z) => (r, c @ Z):
  alter r += x+1;
  alter c += y+1;
return;

make n, m ∈ Z;
** collecting the results
alter n, m := test(1,2);

print n; ** 2
print m; ** 3
** ignore one result using "_"
alter  n, _ := test(3,0);
print  n; ** 4
```

## List

A list is a dynamic collection of elements connected by two references:

* prior
* next

A list has two very important elements: _head_ and _tail_.

**list type**

You can define a _list type_ using empty list: ()

```
type type_name := (element_type) <: List; 
```

**variable declaration**
You can use one of three forms of declarations:

```
make name ∈  (element_type); ** explicit declaration
make name := (constant,...); ** implicit declaration
make name := (constant,...) ∈ (element_type); ** full declaration
```

**properties**
* a list has unlimited capacity,
* a list can be initially empty (),
* all elements in a list have the same type,
* elements in a list are ordered,
* accessing elements in a list by index is slow.

**example**

```** define a list type of unsigned short integers
type Lou  := (u16) <: List;
** define a list variable of defined type Lou
make list := (0, 1, 2, 3, 4, 5) ∈ Lou;
** list traversal
scan x ∈ list do
  write x;
  write _ if (x ≠ list.head);
next;
print; ** 0 1 2 3 4 5
```

## Array

Bee define Arrays using notation [Type](c), where c is the capacity.

**syntax**
```** diverse array variables
make array_name ∈ [element_type]     ;  ** undefined capacity
make array_name ∈ [element_type](c)  ;  ** capacity c
make array_name ∈ [element_type](n,m);  ** capacity c = n·m
** define new kind of array
type Array_Type := [element_type](c) <: Array; 
** use previous  defined type
make array_name ∈ Array_Type;  
```

**Notes:** 

* Array index start from 0 to c-1 where c is capacity;
* Array capacity is immutable after array initialization;

**example**

```
make array := [`a`, `b`, `c`];
scan c ∈ array do
  write c;
  write ',';
repeat;
```

**Notes:**

* Array can be initially empty [] with default capacity = 0, 
* Arrays with defined capacity are automatically initialized.

**initialize elements**

Initial value for elements can be set during declaration:

```** you can use 4 optional initialization notations 
make zum  := 0       ∈ [Z](10) ; ** explicit initialization using single value
make zet  := 1..10   ∈ [Z] ; ** explicit initialization using range
make test := 0..10:2 ∈ [Z] ; ** explicit initialization using rate
** modify one element by index
alter zum[1]  := 1; 
alter zum[10] := 10; 
print zum; ** expect [1,2,2,2,2,2,2,2,2,10]
** modify all elements
alter zum[*] += 1; 
print zum; ** expect [2,3,3,3,3,3,3,3,3,11]
** reset all elements
alter zum[*] := 0; ** [0,0,0,0,0,0,0,0,0,0]
** modify multiple elements using an Array literal
alter zum[*] := [1,2,3];
print zum; ** expect [1,2,3,1,2,3,1,2,3,1]
** reset zum reference (replace zum)
alter zum := [1,2,3];
print zum; ** expect [1,2,3];
** transfer a reference 
alter zum := zet;
print zum; ** expect [1,1,1,1,1,1,1,1,1,1];
```

**differed initialization**
We can define an empty array and initialize elements later.

```** array without capacity (partial type inference)
make vec ∈ [U]; 
make nec ∈ [N]; 
** arrays are empty
print vec = []; ** True
print nec = []; ** True
** array capacity becomes: 10
alter vec := `x` * 10;
print vec; ** expect [`x`,`x`,`x`,`x`,`x`,`x`,`x`,`x`,`x`,`x`]
** array capacity becomes: 10
alter nec := 0 * 10;
print nec; ** expect [0,0,0,0,0,0,0,0,0,0]
```

## Matrix

A matrix is an array with 2 or more dimensions.

**Example:** 
```
make mat ∈ [R](4,4) <: Matrix;  ** define matrix
** modify matrix using ":=" operator
alter mat := [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]
print mat[0,0]; ** first element
print mat[3,3]; ** last element

```

**Note:** Elements are organized in _row-major_ order.

So next program will print; 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,

```** elements in matrix can be accessed using while
make i := 0;
make mat := [1,2,3] × [1,2,3]; 
 
make x := length(mat);
  
while (i < x) do
  write (mat[x], ',');
  i += 1;
repeat;
print; ** 
over.
```

output:
```
⎡ 1  2  3 ⎤
⎢ 2  4  6 ⎥
⎣ 3  6  9 ⎦
```

## Set

A set is a sorted collection of unique values.

```** user define a set
type NS := {N} <: Set; ** Natural set
make uds ∈ NS; 
** define a variable set 
make s1 := {1,2,3} ∈ {N}; ** 3 elements
make s2 := {2,3,4} ∈ {N}; ** 3 elements  

** specific operations
make u  := s1 ∪ s2; ** {1,2,3,4,5}  :union
make i  := s1 ∩ s2; ** {2,3}      :intersection
make d1 := s1 - s2; ** {1}        :difference 1
make d2 := s2 - s1; ** {4}        :difference 2
make d  := s2 ⊖ s1; ** {1,4}      :symmetric difference
** verify expectation
pass if d = d1 ∪ d2; ** equivalent (else fail)
** belonging check
print s1 ⊂ s;   ** True
print s  ⊃ s2;  ** True
** declare a new set
make a := {1,2,3} ∈ {N};
** using operator +/- to mutate set a
alter a := a + 4; {1,2,3,4};  ** append 4
alter a := a - 3; {1,2,4};    ** remove 3 (not 3)

```

**Notes:** 

* Elements in a set have the same data type;
* Set are internally sorted not indexed;
* Set elements must be sortable types;

## Hash map

A hash map is a set of (key:value) pairs sorted by key.

**syntax**
```** define a hash map type
type type_name := {(key_type : value_type)} <: Hash;
** declare a new empty hash map
make new_map := {} ∈ type_name;
```

**example**
```** initial value of map
make map := {('a':"first"), ('b':"second")};
** create new element
alter map['c'] := "third";
** modification of non existent element will fail
alter map['e'] := "forth"; ** ERROR
** finding elements by key
print map['a']; ** first
print map['b']; ** second
print map['c']; ** third
** remove an element by key
scrap map['a']; ** remove "first" element
print map;      ** expected: {'b'="second", 'c'="third"}

```

**Notes:** 
* Hash operators are working like for a set of keys;
* Hash key type must be numeric or sortable:{String, Date, Time};
* Hash key type can not be double quoted string or other collection;


## Check for inclusion

We can check if an element is included in a collection using "∈".

```
type  Tmap := {(A:U)} <: Hash;

make map  := {('a':"first"), ('b':"second")} ∈ Tmap;

when ('a' ∈ map) do
  print("a is found");
else
  print("not found");
done;
  
```

## Strings

Bee has one A type = ASCII char, and 2 kind of strings: {S,X}

* A:       Is equivalent to char, ocupy a single bit;
* String:  Is UTF8 array with a limited capacity: 1024 bit;
* Text:    Is UTF8 encoded text with unrestricted capacity;

**Note:** 
Literals for strings are enclosed in 3 kind of quotes:

* A:      like: \`_\` 
* String: like: '_'
* Text:   like: "_"

**Alternative literals**
* Using wrong quotes can trigger implicit type coercion
* Notation U+FFFF is for UTF16 code points 
* Notation U-FFFFFFFF is for UTF32 code points

### Single quoted

Single quoted strings are Unicode UTF8 strings with limited capacity of 1024 bit ≤ 128 code points.

```** define String sub-type
type Str128 := S(128) <: String; 
make s := 'this is a test' ∈ Str128;
** two compatible representation of strings
make str ∈  S(25);  ** string with capacity minim  25x4 = 100 bytes
make a   ∈ [B](25); ** array of binary code points 25x4 = 100 bytes

alter str := 'Short string'; 
alter a   := split(str);
```

**conversion**
Conversion of a string into number is done; using _parse_ rule:

```
make x,y ∈ R;
** rule parse return; a Real number
alter x := parse('123.5',2,',.'); ** convert to real 123.5
alter y := parse('10,000.3333',2,',.'); ** convert to real 10000.33
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
make u, c, s ∈ S;  ** default length is 128 octets = 1024 bit
** string concatenation
alter u := 'This is'  & ' a short string.';
alter c := 'This is ' & 'fixed size string'; 
** automatic conversion to string
alter s := 40 & 5;  ** '405'
** URL/path concatenation
make test_file := $pro\'src'\'test.bee';
** when and $platform = "Windows"** Let's say $pro = "c:\work\project\"
print test_file; ** c:\work\project\src\test.bee
** when and $platform = "Linux"** Let's say $pro = "/work/project/"
print test_file; ** /work/project/src/test.bee

```

## Object

Object types are data structures with elements enclosed in curly brackets { , , ,} and separated by comma. 

**Pattern:**
```** declare a category of objects
type  type_name := {attribute ∈ type_name, ...} <: Object;
** create an object instance using default constructor
make item_name := {
       attribute : constant,
       ...
       } ∈ type_name;
** modify one object attribute
alter object_name.attribute := new_value;
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
type  Person := {name ∈ S, age ∈ N} <: Object;
** array of 10 persons
make catalog ∈ [Person](10);
  ** initialize value using literals
make catalog[0] := {name:"Cleopatra", age:15};
make catalog[1] := {name:"Martin", age:17};

--using one element with dot operators
print caralog[0].name; ** will print Cleopatra
print caralog[1].name; ** will print Martin

--member type can be check using _type()_ built in
print type(Person.name); ** will print U
print type(Person.age); ** will print W

--print size of structure
print size(Person);
```

### Recursive
We can limit how deep a structure become using a directive. "#recursive:100"

```
** example of single recursive node
type Node := { 
  data ∈ Z,       ** integer data
  previous ∈ Node ** reference to previous node
} <: Object;
```

This kind of structure can be used to create a data chain.

```
** example of double recursive node
type Node <: {
  data  ∈ Z,    ** integer data
  prior ∈ Node, ** reference to previous node
  next  ∈ Node  ** reference to next node
} <: Object;
```

## Method

An object can have associated rules that are called _methods_:

**pattern**
```** define Foo as object with 2 public attributes:
type Foo := {a, b ∈ N} <: Object;
  ** constructor method for Foo
rule foo(p1,p2 ∈ N) => (me @ Foo):
  make me := {a:p1, b:p2};
return;
** define a method for Foo
rule bar(me @ Foo):
  print "a =" & me.a;
  print "b =" & me.b;
return;
** call constructor
make test := foo(1,1);
** run bar() method using object test as dot qualifier
apply test.bar;
fail if test.a ≠ 1; ** verify attribute a
fail if test.b ≠ 1; ** verify attribute b
```

**See also:** 
* [me.bee](me.bee); ** numeral with rules
* [gc.bee](gc.bee); ** number generator

**Notes:** 
* Binded rules are using multiple dispatch so they can be overloaded;
* Rules can be overwritten in other modules;
* Rules can be private or public using dot prefix;
* If an object is public, the constructor must also be public;
* You can not modify object structure after it is defined.

## Varargs

Is a last parameter in a parameter list, declared with prefix "*" that can receive numerous arguments.

```
--parameter *bar is an array
rule foo(*bar ∈ [Z]) => (x @ Z):
  make c := bar.count();
  ** precondition
  when (c = 0) do
    alter x := 0;
    exit;
  done;
  alter i := 0; 
  ** sum all parameters  
  while (i < c) do
    alter x += bar[i];
    alter i += 1;
  repeat;
return;

--we can call foo with variable number of arguments
print foo();       ** 0
print foo(1);      ** 1
print foo(1,2);    ** 3
print foo(1,2,3);  ** 6

```

**first & last**

* First element in array: array_name[0]
* Last element in array: array_name[-1]

## Exception
An exception is a recoverable error. It can be declared by the user or by the system:

**definition**
```** global exception type
type Error := {code ∈ Z, message ∈ S, line ∈ Z} <: Object;
** global system error
make #error ∈ Error;
```

You can define exceptions with code > 200 and raise exceptions with two statements:

* fail
* pass

**pattern:**
```
make my_error := {200,"message"} ∈ Error;

fail my_error if condition;
pass my_error if condition;
```

Template modifier "?" can be used to customize the error message:

**example**
```
read flag ∈ L;
make my_error  := {201,"exception: \s{1}"} ∈ Error;

fail my_error ? 'test' if flag;
pass my_error ? 'test' if flag;
```
** expected output
```
exception: 'test'
```

**Notes:**
* Keyword _fail_ will modify system variable #error to create a message;
* Keyword _fail_ can raise only recoverable errors with code ≥ 200;
* Keyword _fail_ can not terminate a _driver_ only _halt_ or _exit_ can;
* Keyword _halt_ will liberate the resources and terminate the program;
* Keyword _pass_ is opposite of _fail_ and is clearing the #error message;
* Error code <  200 are system reserved error codes;
* Error code ≤ -1   are unrecoverable errors created with _halt_;
* Recoverable errors must be analyzed by the program using a trial block;

**unrecoverable:**

Next we create unrecoverable exception:

```
halt -1; ** end program and exit code = -1
halt -2; ** end program and exit code = -2
```

**Read next:** [Type Inference](inference.md) 