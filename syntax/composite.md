## Composite Types

Composite types are complex data structures. 

**Bookmarks**

* [range](#range)
* [ordinal](#ordinal)
* [list](#list)
* [set](#set)
* [map](#map)
* [array](#array)
* [slice](#slice)
* [varargs](#varargs)
* [strings](#strings)
* [object](#object)
* [aggregate](#agregate)
* [binding](#binding)

## Usability

Bee uses composite types to ...

* declare data types using: "<:" and "∈"
* declare constants  using: ":=" and "@"
* declare references using: ":=" and "@" 

## Range

Range notation is used to create a subtype.

**syntax**

```
-- discrete range
type range_name <: basic_type[min..max]

-- continuous range
type range_name <: basic_type(min..max)
```

**Examples:**
```
-- sub-type declarations
type Positive  <: R(0..);
type Negative  <: R(..-1);
type Digit     <: B[0..9];
type Alpha     <: U[`A`..`z`];
type Latin     <: U[U+0041..U+FB02];

--Check variable belong to sub-type
when (`x` ∈ Alpha):
  print 'yes';
else:
  print 'no';
when;
```

**Notes:**

* A range member/element is a native type;
* Anonymous range expression [n..m] is of type Z;
* Range can apply only to discrete basic types (B,U,Z,N);
* Control variables can be declared in range using "∈";
* To check value is in range use operator "∈";
* A dynamic range can be created using variables for limits;
* Using [n.!m] will exclude upper limit from range;
* Using [n!!m] will exclude both limits from range;
* Using (n..m) is necessary for a continuous type like Q, Z, N, P;
* For continuous ranges the lower or upper missing represent ∞ number;

**dynamic range**
```
#resolution:0.1
make n:=10, m:=15

print ([n..m])  --> 10,11,12,13,14,15
print ([n...m]) --> 10,11,12,13,14
print (Q(0.!1)) --> 0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9
print (Q(0!!1)) --> 0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1
```
## Ordinal

Ordinal is an abstract data set. It is a group of identifiers. Each identifier represents an integer value starting from 0 to capacity-1 by default. Ordinal values can start with a different number. Only first value can be specified using ":".

**pattern**
```
type type_name <: { name1:0, name2, name3};

make a, b, c ∈ type_name;

alter a := type_name.name1; -- a=2
alter b := type_name.name2; -- b=3
alter c := type_name.name3; -- c=4
```

**Note:** When element name start with "." no need to use qualifiers for individual values

```
-- using public elements in enumeration
type type_names <: { .name0, .name1 };

make a, b ∈ type_name;

alter  a := name0; -- a value := 0
alter  b := name1; -- b value := 1
```

## List

A list is an ordered collection of values separated by comma and enclosed in brackets. Observe that a list is a reference since it is a composite type.

**Syntax**
```
type <variable> := () @ (value_type);
```

**Notes**: List members must have same data type

**example**
```
-- create a list of code points
make a := () @ (U);

-- create a list using literals
make b := ('1','a','2','b') @ (U); 
```

**empty list**

An empty list is represented like this: ()

```
make a := ();      -- empty list
make b := (1,2,3); -- initialize list using modify

alter a := b; -- modify a and throw to garbage ()
```

**Unpacking**

A list can be assigned to multiple variables using unpacking:

**Example:**

```
--create 3 new variables using list literal
make x, y, z ∈ Z;

--unpacking modify all 3 value
alter x, y, z <+ (97, 65, 40);

print x; -->  97
print y; -->  65
print z; -->  40

--anonymous list unpacking in text template
make s := "{0} > {1} > {2}" <+ (x, y, z); 
print s; -- "97 > 65 > 40"
```


**Multiple results**

An rule can produce multiple results in a list.

```
-- have a list of results
rule test(x,y ∈ Z) => (r, c ∈ Z):
  alter r += x+1;
  alter c += y+1;
rule;

make n, m ∈ Z;

-- unpacking the result
alter n, m <+ test(1,2);

print n; --will print 2
print m; --will print 3

-- ignoring first result
alter _,m <+ test(3,4);

```

**Partial unpacking**

List members can be ignored when unpacking using anonymous variable: "_"

```
make lst := (0, 1, 2, 3, 4, 5);
make x, y, z ∈ Z;

-- first element and last 2 are ignored
alter _,x,y,z <+ lst;

```

**Unpacking Notes:**
* To unpack a list it must use at least one comma separated variables;
* If list is greater than target variables the rest of values are ignored;
* If the list is shorter than the number of variables the rest of variables are set to zero value;

### List processing

```
make l1 := (1, 2, 3);
make l2 := (2, 3, 4);
make l3, l4, l5 := ();

--addition between lists "+" 
alter l3 := l1 + l2; --(1,2,3,2,3,4)

--difference between lists "-"
alter l4 := l1 - l2;  -- (1)
alter l5 := l2 - l1;  -- (4)
```

**List traversal**

```
make list := ('a', 'b', 'c');
make x :: list[!] @ A;
while ¬ (x ≡ list[?]):
  write x;
  alter x :: list.next(x);
  write ',';
while;
```

## Stack

A stack is a LIFO collection of elements.

```
make a := (1, 2, 3);
make last ∈ N;

-- using stack with operator "+="
alter a += 4; -- (1,2,3,4)

-- read last element using "-="
alter last := a[?];  -- last = 4

-- remove last element using -=
alter a -= a[?];  -- a = (1,2,3)
```

## Queue

A queue is a FIFO collection of elements.

```
make q := (1,2,3);
make first : N;

-- using enqueue operator "+:" 
alter q += 4; -- (1,2,3,4)

-- read first element using "=" and "modify"
alter first := a[!]; --> first = 1

-- dequeue first element using "-=" operator
alter a -= a[!]; --> a = (2,3,4)
```

## Set

A set is a sorted collection of unique values.

```
--define a set

make s1 := {1,2,3} @ {N}; 
make s2 := {2,3,4} @ {N};
make s  := {}      @ {N}; -- empty


-- specific operations
alter s := s1 ∪ s2; --{1,2,3,4} -- union
alter s := s1 ∩ s2; --{2,3}     -- intersection
alter s := s1 - s2; --{1}       -- difference 1
alter s := s2 - s1; --{4}       -- difference 2

-- declare a new set
make a := {1,2,3} @ {N};

-- using operator +/- to mutate set a
alter a := a + 4; --> {1,2,3,4} --append 4
alter a := a - 3; --> {1,2,4}   --remove 3 (not 3)

```

**Notes:** 

* Sets are internally sorted not indexed;
* Sets are not recommended to create queues or stacks;
* Usually you do not remove elements from a set but only append;

## Map

A map is a set of (key:value) pairs sorted by key.

**syntax**
```
-- define a map type
type type_name <: {(key_type : value_type)}

-- declare a new empty map
make new_map := {} @ type_name;
```

**example**
```
-- initial value of map
alter map := {('a':"first"), ('b':"second")};

-- create new element
alter map['c'] := "third";

-- modification of non existent element will fail
alter map['e'] := "forth"; --> ERROR

-- finding elements by key
print map['a']; -- first
print map['b']; -- second
print map['c']; -- third

-- remove an element by key
scrap map['a']; --> remove "first" element
print map;      --> expected: {'b'="second", 'c'="third"}

```

**Note:** Hash map operators work like for sets

## Check for inclusion

We can check if an element is included in a collection.

```
type  Tmap <: {(A:U)};

make map  := {('a':"first"), ('b':"second")} @ Tmap;

when ('a' ∈ map):
  print("a is found");
else:
  print("not found");
when;
    
```

## Array

Bee define Array variable using notation := `[]()`.

**syntax**
```
make array_name ∈  [type];      --one dimension array with unknown capacity
make array_name ∈  [type](c);   --one dimension with capacity c
make array_name ∈  [type](n,m); --two dimensions with capacity n x m
```

**Note:** 
* Empty parenthesis () are not required for unknown (deferred) capacity.
* Arrays are initialized using ":=" and can not be declared with ∈.

**example**

```
-- define array with 10 Real elements
make test @ [R](10); 
make m := length(test)-1;  

print test[0];   -- first element
print test[m];   -- last element

-- set value of element := subscript
make x := 0;
while (x < m): 
  alter test[i] := x;
  alter x += 1;
while;

-- print all elements of array
print test;
over;
```

**Output:**
```
 [0,1,2,3,4,5,6,7,8,9]
```

**Notes:**

* Array of undefined capacity have no members and is equivalent to [] and can not be used.
* Array with capacity is automatically initialized, elements of new array are by default zero.

**custom index**

Arrays can have optional index range [!..?]

* Symbol ! represents first index 
* Symbol ? represents last index
* Array capacity `c := ? - ! + 1`

**syntax**
```
--one dimensional array with elements starting from n to m
make array_name := [member_type](n..m);  

print array_name[!]; -- print first element
print array_name[?]; -- print last element
```

**initialize elements**

Initial value for all elements in array are zero. We use notation [*] for all elements.

```
-- declare array of integers with initial value 
make zum @ [Z](10);

-- add 1 to each element
alter zum[*] += 1; 
print zum; -- expect [2,2,2,2,2,2,2,2,2,2]
```

**differed initialization**
```
make vec @ [U];

-- vector is initialized with 10 `x` symbols
alter vec := `x` * 10;
print vec; -- expect [`x`,`x`,`x`,`x`,`x`,`x`,`x`,`x`,`x`,`x`]

```

## Slice

We can define a section of array using [n..m] notation. This is called slice. The numbers n and m represent the subscript of array element. Slices maintain references to array elements.

**Syntax:**

```
-- declare an array with capacity (n)
make array_name @ [element_type](c);

-- slice creation using "::"
make slice_name :: array_name[n..m];
```

**Note:** Slice has references or a copy of original members;

**example**
```
-- capacity is 5, last element is 0
make   a := [1,2,3,4](5); 
print  a; -- [1,2,3,4,0]

-- making 4 slice views
make b :: a[0..?]; -- [1,2,3,4,0]
make c :: a[1..?]; -- [2,3,4,0]
make d :: a[0..2]; -- [1,2,3]
make e :: a[2..4]; -- [3,4,0]

--modify slice elements
alter c[0] := 8; -- first element in c slice
alter e[0] := 0; -- first element in e slice
alter e[?] := 9; -- last element  in e slice

--original array is modified
--                 ↧ ↧   ↧                        
print a;-- expect [1,8,0,4,9]

--modify last 3 elements
alter a[2..?] := 0;
print  a; -- expect [1,8,0,0,0]

```

## Copy

Default assignment ":=" and slicing operator "[..]" makes a copy.   

```
make a := [0,1,2,3,4];
make e,f,r @ [Z]; -- empty array references

-- by default modify ":=" copy/clone an entire collection
alter e := a; 

-- compare two collections
print e = a; --> 1 (equal collections)
print e ≡ a; --> 0 (different memory locations)

-- by default a slice is a copy/clone of original data
alter f := a[2..?];  -- copy data using slice notation

-- you can also copy a data from a basic type
alter r := Z[1..10]
print r; -- expect [1,2,3,4,5,6,7,8,9,10]
```

## Matrix

It is an array with 2 or more indexes. We can have 2D or 3D array.

**Example:** 
```
make mat @ [R](4,4); -- define matrix

-- modify matrix using ":=" operator
alter mat := [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]];

print mat[0,0]; --first element
print mat[3,3]; --last element

```

**Note:** Elements are organized in _row-major_ order.

So next program will print: 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,

```
-- elements in matrix can be accessed using while
make i := 0;
make x := length(mat);
  
while (i < x):   
  write (mat[x], ',');
  i += 1;
while;

```
Printing the entire matrix will use multiple rows to represent a matrix approximation.

```
make m := [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]];
print m -> matrix();
```

Will print:

```
⎡ 1  2  3  4⎤
⎢ 5  6  7  8⎥
⎢ 9 10 11 12⎥
⎣13 14 15 16⎦
```

## Varargs

One rule or rule can receive variable number of arguments.   
We declare an array using prefix "*" for variable parameter name.

```
--parameter *bar is an array
rule foo( *bar @ [Z]) => (x ∈ Z):
  value c := bar.count();  
  -- precondition
  when (c = 0):
    alter x := 0; 
    exit;
  when;
  alter i := 0; 
  -- sum all parameters  
  while (i < c):
    alter x += bar[i];
    alter i += 1;
  while;
rule;

--we can call foo with variable number of arguments
print foo();     --> 0
print foo(1);    --> 1
print foo(1,2);  --> 3
print foo(1,2,3);--> 6

```

## Strings

Bee has one Unicode symbol {U}, and 2 kind of strings: {S,X}

* U = Is UTF32 encoded alphanumeric code point or symbol; 
* S = Is UTF8 array with a limited capacity: 1024 bit;
* X = Is UTF8 encoded text with unrestricted capacity;

**Note:** 
Literals for strings are enclosed in 3 kind of quotes:

* U: like: \`?\` 
* S: like: '?'
* X: like: "?"

**Alternative literals**
* Using wrong quotes can trigger implicit type coercion
* Notation U+FFFF is for UTF16 code points 
* Notation U-FFFFFFFF is for UTF32 code points

### Single quoted

Single quoted strings are Unicode UTF8 strings with limited capacity of 1024 bit ≤ 128 code points.

```
-- two compatible representation of strings
make str @ S(25);   -- string with capacity   25x8 = 200 bit
make a   @ [U](25); -- array of 25 characters 25x8 = 200 bit

alter str := 'Short string'; 
alter a   := split(str);
```

**conversion**
Conversion of a string into number is done using _parse_ rule:

```
make x,y ∈ R;

-- rule parse return a Real number
alter x := parse('123.5',2,',.');       --convert to real 123.5
alter y := parse('10,000.3333',2,',.'); --convert to real 10000.33
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
7  |07 |BEL |\a    |Bell
8  |08 |BS  |\b    |Backspace
9  |09 |HT  |\t    |Horizontal Tab
10 |0A |LF  |\n    |Line Feed
11 |0B |VT  |\v    |Vertical Tab
12 |0C |FF  |\f    |Form Feed
13 |0D |CR  |\r    |Carriage Return
27 |1B |ESC |\e    |Escape

**additional escape**

* "\\\\"    escape backslash with backslash 
* "\\\""	double quote escape is necessary in double quoted strings
* "\\\'"	single quote escape is necessary in single quoted strings
* "\\d"     decimal representation for next 1 symbol
* "\\h"     hexadecimal representation for next 1 symbol
* "\\x"  	next 2 characters is hexadecimal code for ASCII symbol
* "\\u"     next 4 characters is hexadecimal code for Unicode symbol

**Examples:**

* "\\d*"    indicates 42
* "\\h*"    indicates 2A
* "\\x2A"   indicates \*
* "\\u2208" indicates ∈


**Note:** 

* This kind of string is mutable;
* This string can be a "rope" or "radix tree";

**See also:** [symbols.md](symbols.md)

### Concatenation

Below operators will concatenate two strings.

symbol| description
------|--------------------------------------------------------------------------
  `&` | Concatenate two strings as they are no trim is performed!
  `/` | Concatenate two strings with "/" separator, trim and de-duplicate "//"   
  `\\`| Concatenate two strings with "\\" separator, trim and de-duplicate "\\"   

**examples**
```
make u, c, s @ S; -- default length is 128 octets = 1024 bit

-- string concatenation
alter u := 'This is'  & ' a short string.';
alter c := 'This is ' & 'fixed size'; 

-- automatic conversion to string
alter s := 40 & 5;  --> '405'

-- path concatenation
make test_file := $pro/'src'/'test.bee';

-- when $pro = c:\work\project\
print test_file; --> c:\work\project\src\test.bee
```

**Note:** You can concatenate a string with a number or two numbers

### Template

* We can include numbers into a string using template operator "<+"
* Inside template we use "{n}" notation to find a value using the member index
* Template must be included in double quotes " " 
* If a placeholder index is not found then it is preserved as is

```
make var_name := template <+ (variable);
make var_name := template <+ (var1,var2,...);
```

**Examples:**
```
make x := 30; -- Code ASCII 0
make y := 41; -- Code ASCII A

--template writing
print ("{0} > {1} > {2}" <+ (x,y)); --print "30 > 41 > {2}"
  
```

**Escaping**

Template stings can use special escape sequences:

** \\B = binary representation 
** \\H = hexadecimal representation
** \\U = U+ Unicode representation

```
print ("This: \\H{1} is hexadecimal code for \\\"*\\\"" <+ 42);
print ("This: \\U{1} is hexadecimal code for \\\"*\\\"" <+ `*`);
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
make str := constant * n @ S(n);
```

**Example:**
```
make sep @ S;
alter sep := '+' & '-' * 18 & '+';

print sep;
print '|*  this is a test  *|';
print sep;
```

**Output:**

```
+-------------------+
|*  this is a test *|
+-------------------+
```

**Note:** Operator "*" have higher precedence then "."

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

**Example:**
```
-- define recursive type Person
type Person <: {
      name @ S, 
      age  ∈ N,  
      children @ (Person)
    }; 

-- create two objects of type Person
make r1,r2 @ Person;

-- person with no children          
alter r1 := {name:'Mica', age:21};

-- person with two children
alter r2 := {name:'Barbu', age:25, 
             children : (
               {name:'Telu', age:4},
               {name:'Radu', age:1} 
             )
          };

-- object unpacking into new variables
make r_name, r_age, r_children <+ r2;

-- using introspection
print type(r_name) ; -- S
print type(r_age)  ; -- N
print type(r_children) ; -- (Person)
           
```

**type size**

Type size is a constant that can be calculated using size(T).

**Example:**
```
type  Person <: {name @ S, age ∈ N};

-- array of 10 persons
make catalog @ [Person](10); 
  
-- initialize value using literals
make catalog[0] := {name:"Cleopatra", age:15};
make catalog[1] := {name:"Martin", age:17};

--using one element with dot operators
print caralog[0].name; --will print Cleopatra
print caralog[1].name; --will print Martin

--member type can be check using _type()_ built in
print type(Person.name); -- will print U
print type(Person.age);  -- will print W

--print size of structure
print size(Person);
```

## Aggregate

An aggregate type can store references to other composite types.

**example**
```
-- a list of lists of integers
make Dlist @ ((Z));

-- an array of 10 lists of integers
make Alist @ [(Z)](10);

-- an array of arrays of integers
make Aheap @ [[Z](5)](10);

-- an catalog of persons
make Acatp @ {(S:Person)};

```

## Binding

An object can have associated rules:

**pattern**
```
-- define Foo as object with 2 public attributes:
type Foo <: {a, b ∈ N};
  
-- foo is a constructor for Foo
rule foo(p1,p2 ∈ N) => (me @ Foo):
  make me := {a:p1, b:p2};
rule;

-- second rule for Foo type
rule bar(me @ Foo):
  print "a ="._.me.a;
  print "b ="._.me.b;
rule;

-- reference capture "::" result Foo object 
make test :: foo(p:1);

-- test object rule
apply test.bar();  
-- a = 1
-- b = 1
```
**See also:** 
* [me.bee](me.bee) -- numeral with rules
* [gc.bee](gc.bee) -- generator class

**Notes:** 
* Binded rules are using multiple dispatch so they can be overloaded;
* Rules can be overwritten in other modules;
* Rules can be private to module or public using dot prefix;
* If an object is public, the constructor must also be public;
* You can not modify object structure after it is defined.
* Bee do not have inheritance and polymorphism instead you can use mix-ins;


**Read next:** [Type Inference](inference.md) 