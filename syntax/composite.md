## Composite Types

Composite types are complex data structures. 

## Index

* [range](#range)
* [ordinal](#ordinal)
* [list](#list)
* [stack](#list)
* [queue](#list)
* [array](#list)
* [string](#string)
* [object](#string)

## Usability

Bee uses composite types to ...

* define data types using "def" and "<:"
* declare constants using "con" and ":="
* declare variables using "new" and ":="
* declare parameters using "<:", "@:" or ":=" 

## Range

Range notation is used to define a subtype.

**syntax**

```
def <subtype_name> <: <Type>[min..max]
```

**Examples:**
```
-- sub-type declarations
def SmallRange    <: B[0..9];
def NegativeRange <: Z[-10...0];
def AlfaChar      <: A['a'..'Z'];
def NumChar       <: A['0'..'9'];
def Positive      <: Z[0..+];
def Negative      <: Z[-..-1];

--Check variable belong to sub-type
case 'x' ε AlfaChar
  put 'yes';
else
  put 'no';
case;

write;
```

**Notes:**

* Anonymous range expression [n..m] is of type Z
* Range can apply only to discrete basic types (A,B,Z,N)
* Control variables can be declared in range using "ε"
* To check value is in range use operator "ε"

## Ordinal

Ordinal is an abstract data set. It is a group of identifiers. Each identifier represents an integer value starting from 0 to capacity-1 by default. Ordinal values can start with a different number. Only first value can be specified using ":".

**pattern**
```
def TypeName <: { name1:0, name2, name3};

new a, b, c ε TypeName;

let a := TypeName.name1; --a=2
let b := TypeName.name2; --b=3
let c := TypeName.name3; --c=4
```

**Note:** When element name start with "." no need to use qualifiers for individual values

```
-- using public elements in enumeration
def TypeName <: { .name1, .name2 };

new a, b := 0;

let a := name1; --a := 0
let b := name2; --b := 1

```

## List

A list is an ordered collection of values separated by comma and enclosed in brackets.

**Syntax**
```
new <variable> := (<Type>);
```

**Notes**: List members must have same data type

**example**
```
-- define a list of ASCII characters
new v := (A);

-- initialize a list using a literal
new w := ('1','a','2','b'); 
```

**empty list**

An empty list is represented like this: ()

```
new a := (); -- empty list
new b := (1,2,3); -- initialize list using assign

let a := b; -- re-assign a and throw to garbage ()
```

**Unpacking**

A list can be assigned to multiple variables using unpacking:

**Example:**

```
--create 3 new variables using list notation
new x, y, z ε Z;

--unpacking modify all 3 value
let x, y, z := (97, 65, 40);

put x; -->  97
put y; -->  65
put z; -->  40

--anonymous list with string template
new s := "{0} > {1} > {2}" <+ (x, y, z); 
put s; -- "97 > 65 > 40"
```

**Multiple results**

A method can have multiple results.

```
-- create a list from expressions
test(x,y ε Z) => (r, c ε Z)
  r += x+1;
  c += y+1;
test;

new n, m ε Z;

-- unpacking the result
let n, m := test(1,2);

put n; --will print 2
put m; --will print 3

-- ignoring the result
let _,_ := test(3,4);

```

**Partial unpacking**

List members can be ignored when unpacking using anonymous variable: "_"

```
new lst := (0, 1, 2, 3, 4, 5);
new x,y,z ε Z;

-- first element and last 2 are ignored
let _,x,_,z := lst;

```

**Unpacking Notes:**
* To unpack a list it must use at least one comma separated variables;
* If list is greater than target variables the rest of values are ignored;
* If the list is shorter than the number of variables the rest of variables are set to zero value;


### List processing

```
new l1 := (1,2,3);
new l2 := (2,3,4);

new l3, l4, l5 := ();

--addition between lists "+" 
let l3 := l1 + l2; --(1,2,3,2,3,4)

--difference between lists "-"
let l4 := l1 - l2;  -- (1)
let l5 := l2 - l1;  -- (4)
```

**List traversal**

```
new list := ('a','b','c');
new element := list.first();
cycle
  say element;
  exit if element = list.last();
  element := list.next(element);
  say ',';  
cycle;
```

## Stack

A stack is a LIFO collection of elements.

```
new a := (1,2,3);
new last ε N;

-- using set with operator "+"
let a := a + 4; -- (1,2,3,4)

-- read last element using "="
let last := a.last;  -- last := 4, a := [1,2,3,4]

-- remove last element using pop
let last := a.pop(); -- last := 4, a := [1,2,3]
```

## Queue

A queue is a FIFO collection of elements.

```
new q := (1,2,3);
new first : N;

-- using enqueue operator "+:" 
let q := q + 4; -- (1,2,3,4)

-- read first element using "=" and "let"
let first := a.first; --> 1 and a := (1,2,3,4)

-- dequeue first element using deq method
let first := a.deq(); --> 1 and a := (2,3,4)
```

## Set of values

A set is a sorted collection of unique elements.

```
--define 3 collections
new s1 := {1,2,3}; 
new s2 := {2,3,4};
new s  := {N}; --this is an empty set

-- empty collection
put "set \"s\" is empty" if s ≡ {}

-- set specific operations
let s := s1 | s2; --{1,2,3,4} --union
let s := s1 & s2; --{2,3}     --intersection
let s := s1 - s2; --{1}       --difference 1
let s := s2 - s1; --{4}       --difference 2

-- declare a new set
new a := {1,2,3};

-- using operator +/- to mutate set a
let a := a + 4; --> {1,2,3,4} --append 4
let a := a - 3; --> {1,2,4}   --remove 3 (not 3)

```

**Notes:** 

* Bee sets are internally sorted not indexed;
* Sets are not recommended to create queues or stacks;
* Usually you do not remove elements from a set but only append;

## Hash Map

A map is a hash collection of (key:value) pairs indexed by key.

**syntax**
```
def <type> <: {(<key_type>:<value_type>)}
```

**example**
```
-- declare a new empty hash map
new map := {(A:S)};

-- initial value of map
let map := {'a':"first", 'b':"second"};

-- create new element
new map['c'] := "third";

-- modification of non existent element will fail
let map['e'] := "forth"; --> ERROR

-- finding elements by key
put map['a']; --'first'
put map['b']; --'second'
put map['c']; --'third'

-- remove an element by key
del map['a']; --> remove 'first' element
put map;      --> expected: {'b'='second', 'c'='third'}

write;
```

**Note:** Hash map operators work like for sets

## Check for inclusion

We can check if an element is included in a collection.

```
new map := {'a':"first", 'b':"second"};

case ('a' ε map):
  put("a is found");
else
  put("not found");
case;
  
write;  
```

## Array

Bee define Array variable using notation := []().

**syntax**
```
new <array_name>  := [<member-type>](c);   --one dimension with capacity c
new <matrix_name> := [<member-type>](n,m); --two dimensions with capacity n x m
```

**example**

```
-- define array with 10 Real elements
new test := [R](10); 
new m := length(test)-1;  

put test[0];   -- first element
put test[m];   -- last element

-- set value of element := subscript
new x := 0;
cycle 
  let test[i] := x;
  let x += 1;
  stop if x ≡ m;
cycle;

-- print all elements of array
put test;

write;
```

**Output:**
```
 [0,1,2,3,4,5,6,7,8,9]
```

**Notes:**

* Array of undefined capacity () is Null. Capacity can be established later.
* Array with capacity is automatically initialized, elements of array are 0 or 0.0.

**custom index**

Arrays can have optional index range [!..?]

* Symbol ! represents first index 
* Symbol ? represents last index
* Array capacity c = ? - ! + 1

**syntax**
```
--one dimensional array with elements starting from n to m
new <array_name>  := [<member-type>](n..m);  

put <array_name>[!]; -- print first element
put <array_name>[?]; -- print last element
```

**initialize elements**

Initial value for all elements in array are zero. We use notation [*] for all elements.

```
-- declare array of integers
new array := [Z](10);

-- modify all elements to 1
let array[*] := 1; 
```


**Array Slice**

We can define a section of array using [n..m] notation. This is called slice. The numbers n and m represent the subscript of array element. Slices maintain references to array elements.

**Syntax:**

```
-- declare an array with capacity (n)
new <array_name> := [<type>](c);

-- slice creation using "::"
new <slice_name> :: <array_name>[n..m];
```

**Note:** Slice has references or a copy of original members;

**example**
```
-- capacity is 5, last element is 0
new a := [1,2,3,4](5); 
put a; -- [1,2,3,4,0]

-- making 4 slice views
new b :: a[0..?]; -- [1,2,3,4,0]
new c :: a[1..?]; -- [2,3,4,0]
new d :: a[0..2]; -- [1,2,3]
new e :: a[2..4]; -- [3,4,0]

--modify slice elements
let c[0] := 8; -- first element in c slice
let e[0] := 0; -- first element in e slice
let e[?] := 9; -- last element  in e slice

--original array is modified
--                 ↧ ↧   ↧                        
put a;-- expect [1,8,0,4,9]

--modify last 3 elements
let a[2..?] := 0;
put a; -- expect [1,8,0,0,0]

```

**Array Copy**

Default assignment ":=" and slicing operator "[..]" makes a copy.   

```
new a := [0,1,2,3,4];


new e,f,r := [Z](); -- empty array

-- by default assign ":=" copy/clone an entire collection
let e := a; 

-- compare two collections using "≡"
put e ≡ a; --> 1 (equal collections)

-- by default a slice is a copy/clone of original data
let f := a[2..?];  -- slice copy 
```

## Matrix

It is an array with 2 or more indexes. We can have 2D or 3D array.

**Example:** 
```
new mat := [R](4,4); -- define matrix

-- modify matrix using ":=" operator
let mat := [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]];

put mat[0,0]; --first element
put mat[3,3]; --last element

```

**Note:** Elements are organized in _row-major_ order.

So next program will print: 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,

```
-- elements in matrix can be accessed using a cycle
new i := 0;
new x := length(mat);  
cycle   
  say (mat[x], ',');
  i += 1;
  stop if i ≡ x;
cycle;

write;
```
Printing the entire matrix will use multiple rows to represent a matrix approximation.

```
new m := [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]];
put m -> matrix();
```

Will print:

```
| 1  2  3  4|
| 5  6  7  8|
| 9 10 11 12|
|13 14 15 16|
```

## String

* S strings are _tries_ data structures (radix tree) having unlimited capacity;
* A can be used to create arrays of ASCII characters compatible with C strings; 

```
new str := S(25);   -- string with capacity 25 Extended ASCHII characters
new a   := [A](25); -- array of 25 characters

let str := "Long string";
let a   := split(str);
```

**conversion**
Conversion of a string into number is done using _parse_ function:

```
new x,y ε R;

-- function parse return a Real number
let x := parse("123.5",2,",.");       --convert to real 123.5
let y := parse("10,000.3333",2,",."); --convert to real 10000.33
```

## ASCII Encoding
Default _code page_ [437](https://en.wikipedia.org/wiki/Code_page_437) is used for MS-DOS and Windows console. Greek alphabet _code page_ [737](https://en.wikipedia.org/wiki/Code_page_737) is prefered for mathematic algebra.

## Change code page on Windows
Programmers working in Bee can decide to use a console editor (like edit) that is capable to display 
correct the characters for specific code page. User can verify or change the console code page using command chcp:
```
 >chcp 737  
 >edit
```

**Note:** Bee is using Extended ASCII characters to define program symbols and operators. 

For strings programmers can use several additional characters specific to a language or region. 
In Bee we use this list of characters to represent the strings: 

[Code ASCII Standard](https://en.wikipedia.org/wiki/ASCII)


## Double quoted string

Double quoted strings are dynamic strings with more features than ASCII strings. 
Bee support "escape" notation using escape `\` symbol only in double quoted strings.

```
put("this represents \n new line in string")
```

## Control codes:

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

```
new s := "This is a Unlimited string";
put type(s); -- Print: U
```

**See also:** [symbols.md](symbols.md)

**concatenation**

Strings can be concatenated using operator "." , "_" , or "+".

```
new u, c := S; -- default S length is 255

-- string concatenation
let u := "This is" + " a long string.";
let c := "Dynamic and"+_+'fix size';

-- path concatenation
new test_file := $pro."src"."test.bee";

-- when $pro := c:\work\project\
put test_file; 
write; --> "c:\work\project\src\test.bee"
```

**Note:** Anonymous constant: `_ ≡ " "`

Using "." will insert "\\" or "/" depending on the operating system.

**Template**

* We can include numbers into a string using template operator "<+" or "+>".
* Inside template we use "{n}" notation to find a value using the member index.
* Template must be included in double quotes " ".

```
new <variable> := <template> <+ <variable>;
new <variable> := <template> <+ (<var1>,[<var2>,]...);
```

**Examples:**
```
new x := 30; -- Code ASCII 0
new y := 41; -- Code ASCII A

--template writing
put ("{0} > {1}" <+ (x,y)); --print "30 > 41"
  
```
## String Generator

It is common to create strings automatically.

**Operator : Repeat := "*" is not multiplication

```
new str := <str_constant> * n;
```

**Example:**
```
new sep := "+" + ("-" * 18) + "+";

put sep;
put "|*  this is a test  *|";
put sep;
```

**Output:**

```
+-------------------+
|*  this is a test *|
+-------------------+
```
**Range:**

Range notation works for strings and Unlimited:

```
new alpha := A['a'..'z']; --lowercase letters
new beta  := A['A'..'Z']; --uppercase letters
```

## Object 

Objects are complex data structures enclosed in curly brackets { , , ,} and separated by comma. 
Each object has attributes with associated data type and identifier. 

**Syntax:**
```
def <class_name> <: {<element> : <type>, <element> : <type>...};
new <object_name> := <class_name>(<arguments>);

--using qualifier with attributes
let <object_name.element> := <value>;

--pair-up literal and values using ":"
let <object_name> := {
       <element> : <value>,
       <element> : <value>,
     ...};
```

**Object structure can be ...**

* Flat
* Recursive
* Hierarchical

**Example:**
```
-- define recursive class Person
def Person <: {
      name ε S, 
      age  ε N,  
      children ε (Person)
    }; 

-- create two objects of type Person
new r1,r2 ε Person;

-- person with no children          
let r1 := {name:'Mica', age:21};

-- person with two children
let r2 := {name:'Barbu', age:25, 
             children : (
               {name:'Telu', age:4},
               {name:'Radu', age:1} 
             )
          };
```
## _size_

Structure size is a constant that can be calculated using size(T).

**Example:**
```
def Person <: {name ε U, age ε N};

--array of 10 persons
new catalog := [Person](10); 
  
--assign value using literals
let catalog[0] := {name:"Cleopatra", age:15};
let catalog[1] := {name:"Martin", age:17};

--using one element with dot operators
put caralog[0].name; --will print Cleopatra
put caralog[1].name; --will print Martin

--member type can be check using _type()_ built in
put type(Person.name); -- will print U
put type(Person.age);  -- will print W

--print size of structure
put size(Person);

write;
```

### Partial declaration

Declare empty collections are populated later.

**Unbound literals:**
```
new c := (); -- define empty list
new a := []; -- define empty array
new b := {}; -- define empty set or map


--before initialization    
put a ≡ (); -- 1 
put b ≡ []; -- 1 
put c ≡ {}; -- 1 

let c := ('a','b','c'); -- Bound to List of A elements   
let a := ['A','B','C']; -- Bound to Array of A elements
let b := {'a','b','c'}; -- Bound to Set of A elements

--after initialization
put a ≡ (); --> 0 
put b ≡ []; --> 0 
put c ≡ {}; --> 0 
```

### Variable arguments

One function or method can receive variable number of arguments.   
Declare an array using prefix "*" for parameter name.

```
--parameter *bar is an array
foo(*bar <: [Z]) => (x ε Z)
  let c := bar.count();  
  -- precondition
  case (c ≡ 0)
    let x := 0; 
    exit;
  case;
  new i := 0; 
  -- sum all parameters  
  cycle
    let x += bar[i];
    let i += 1;
    stop if i ≡ c;
  cycle;
foo;

--we can call foo with variable number of arguments
put foo();     --> 0
put foo(1);    --> 1
put foo(1,2);  --> 3
put foo(1,2,3);--> 6

write;
```

**Read next:** [Type Inference](inference.md) 