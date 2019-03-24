## Composite Types

Composite types are complex data structures. 

**Bookmarks**

* [range](#range)
* [ordinal](#ordinal)
* [list](#list)
* [stack](#stack)
* [queue](#queue)
* [tree](#tree)
* [index](#index)
* [array](#array)
* [slice](#slice)
* [varargs](#varargs)
* [string](#string)
* [classes](#classes)
* [binding](#binding)
* [aggregate](#agregate)

## Usability

Bee uses composite types to ...

* define data types using "alias", "<:" and "∈"
* declare constants using "static", ":=" and "∈"
* declare variables using "value", ":=" and "∈"
* declare parameters using symbols "*", ":=", "@:" and "∈"

## Range

Range notation is used to define a subtype.

**syntax**

```
range class_name <: type[min..max]
```

**Examples:**
```
-- sub-type declarations
range Small     <: B[0..9];
range Alfa      <: A['a'..'Z'];
range Positive  <: Z[0..+∞];
range Negative  <: Z[-∞..-1];

--Check variable belong to sub-type
when ('x' ∈ Alfa):
  print 'yes';
else:
  print 'no';
when;
```

**Notes:**

* Anonymous range expression [n..m] is of type i8
* Range can apply only to discrete basic types (A,B,Z,N)
* Control variables can be declared in range using "∈"
* To check value is in range use operator "∈"

## Ordinal

Ordinal is an abstract data set. It is a group of identifiers. Each identifier represents an integer value starting from 0 to capacity-1 by default. Ordinal values can start with a different number. Only first value can be specified using ":".

**pattern**
```
ordinal type_name <: { name1:0, name2, name3};

value a, b, c ∈ type_name;

alter a := type_name.name1; -- a=2
alter b := type_name.name2; -- b=3
alter c := type_name.name3; -- c=4
```

**Note:** When element name start with "." no need to use qualifiers for individual values

```
-- using public elements in enumeration
ordinal type_name <: { .name1, .name2 };

value a, b := 0;

alter a := name1; --a := 0
alter b := name2; --b := 1

```

## List

A list is an ordered collection of values separated by comma and enclosed in brackets.

**Syntax**
```
value <variable> := () ∈ (<Type>);
```

**Notes**: List members must have same data type

**example**
```
-- create a list of ASCII characters
list a := () ∈ (A);

-- create a list using a literal
list b := ('1','a','2','b') ∈ (A); 
```

**empty list**

An empty list is represented like this: ()

```
list a := ();      -- empty list
list b := (1,2,3); -- initialize list using assign

alter a := b; -- re-assign a and throw to garbage ()
```

**Unpacking**

A list can be assigned to multiple variables using unpacking:

**Example:**

```
--create 3 new variables using list literal
value x, y, z ∈ Z;

--unpacking modify all 3 value
alter x, y, z <+ (97, 65, 40);

print x; -->  97
print y; -->  65
print z; -->  40

--anonymous list with string template
value s := "{0} > {1} > {2}" <+ (x, y, z); 
print s; -- "97 > 65 > 40"
```

**Multiple results**

An aspect can produce multiple results in a list.

```
-- have a list of results
aspect test(x,y ∈ Z) => (r, c ∈ Z):
  alter r += x+1;
  alter c += y+1;
aspect;

items n, m ∈ Z;

-- unpacking the result
alter n, m <+ test(1,2);

print n; --will print 2
print m; --will print 3

-- ignoring the result
alter _,_ <+ test(3,4);

```

**Partial unpacking**

List members can be ignored when unpacking using anonymous variable: "_"

```
list lst := (0, 1, 2, 3, 4, 5);
value x, y, z ∈ Z;

-- first element and last 2 are ignored
alter _,x,_,z := lst;

```

**Unpacking Notes:**
* To unpack a list it must use at least one comma separated variables;
* If list is greater than target variables the rest of values are ignored;
* If the list is shorter than the number of variables the rest of variables are set to zero value;


### List processing

```
list l1 := (1, 2, 3);
list l2 := (2, 3, 4);

list l3, l4, l5 := ();

--addition between lists "+" 
alter l3 := l1 + l2; --(1,2,3,2,3,4)

--difference between lists "-"
alter l4 := l1 - l2;  -- (1)
alter l5 := l2 - l1;  -- (4)
```

**List traversal**

```
list    := ('a', 'b', 'c');
value x := list.first();
cycle
  write x;
  exit if x ≡ list.last();
  alter x := list.next(element);
  write ',';  
cycle;
```

## Stack

A stack is a LIFO collection of elements.

```
stack a := (1, 2, 3);
value last ∈ N;

-- using stack with operator "+="
alter a += 4; -- (1,2,3,4)

-- read last element using "-="
alter last := a[?];  -- last := 4, a := [1,2,3,4]

-- remove last element using pop
alter last -= a[?];  -- last := 4, a := [1,2,3]
```

## Queue

A queue is a FIFO collection of elements.

```
queue q := (1,2,3);
value  first : N;

-- using enqueue operator "+:" 
alter q += 4; -- (1,2,3,4)

-- read first element using "=" and "alter"
alter first := a[!]; --> 1 and a := (1,2,3,4)

-- dequeue first element using deq aspect
alter first -= a[!]; --> 1 and a := (2,3,4)
```

## Tree

An tree is a sorted collection of unique values.

```
--define a collection
tree s1 := {1,2,3} ∈ {N}; 
tree s2 := {2,3,4} ∈ {N};
tree s  := {}      ∈ {N}; -- empty


-- specific operations
alter s := s1 ∪ s2; --{1,2,3,4} -- union
alter s := s1 ∩ s2; --{2,3}     -- intersection
alter s := s1 - s2; --{1}       -- difference 1
alter s := s2 - s1; --{4}       -- difference 2

-- declare a new set
tree a := {1,2,3} ∈ {N};

-- using operator +/- to mutate set a
alter a := a + 4; --> {1,2,3,4} --append 4
alter a := a - 3; --> {1,2,4}   --remove 3 (not 3)

```

**Notes:** 

* Bee sets are internally sorted not indexed;
* Sets are not recommended to create queues or stacks;
* Usually you do not remove elements from a set but only append;

## Index

An index is a collection of (key:value) pairs sorted by key.

**syntax**
```
alias type_name <: hash ∈ {(key_type : value_type)}
```

**example**
```
-- declare a new empty hash map
table map ∈ type_name;

-- initial value of map
alter map := {'a':"first", 'b':"second"};

-- create new element
alter map['c'] := "third";

-- modification of non existent element will fail
alter map['e'] := "forth"; --> ERROR

-- finding elements by key
print map['a']; --'first'
print map['b']; --'second'
print map['c']; --'third'

-- remove an element by key
erase map['a']; --> remove 'first' element
print map;      --> expected: {'b'='second', 'c'='third'}

print;
```

**Note:** Hash map operators work like for sets

## Check for inclusion

We can check if an element is included in a collection.

```
value map := {'a':"first", 'b':"second"};

when ('a' ∈ map):
  print("a is found");
else
  print("not found");
when;
  
print;  
```

## Array

Bee define Array variable using notation := []().

**syntax**
```
array  array_name  := [type];      --one dimension array with unknown capacity
array  array_name  := [type](c);   --one dimension with capacity c
matrix matrix_name := [type](n,m); --two dimensions with capacity n x m
```

**Note:** 
* Empty parenthesis () are not required for unknown capacity.
* Arrays are initialized using ":=" and can not be declared with ∈.

**example**

```
-- define array with 10 Real elements
value test := [R](10); 
value m := length(test)-1;  

print test[0];   -- first element
print test[m];   -- last element

-- set value of element := subscript
value x := 0;
cycle: 
  alter test[i] := x;
  alter x += 1;
  stop if x = m;
cycle;

-- print all elements of array
print test;

print;
```

**Output:**
```
 [0,1,2,3,4,5,6,7,8,9]
```

**Notes:**

* Array of untagined capacity have no members and is equivalent to [].
* Array with capacity is automatically initialized, elements of new array are by default zero.

**custom index**

Arrays can have optional index range [!..?]

* Symbol ! represents first index 
* Symbol ? represents last index
* Array capacity `c := ? - ! + 1`

**syntax**
```
--one dimensional array with elements starting from n to m
value array_name := [member_type](n..m);  

print array_name[!]; -- print first element
print array_name[?]; -- print last element
```

**initialize elements**

Initial value for all elements in array are zero. We use notation [*] for all elements.

```
-- declare array of integers with initial value 
value zum := [Z](10);

-- add 1 to each element
alter zum[*] += 1; 
print zum; -- expect [2,2,2,2,2,2,2,2,2,2]
```

**differed initialization**
```
value vec := [A];

-- element multiply "*"
alter vec := `x` * 10;
print vec; -- expect [`x`,`x`,`x`,`x`,`x`,`x`,`x`,`x`,`x`,`x`]

```

## Slice

We can define a section of array using [n..m] notation. This is called slice. The numbers n and m represent the subscript of array element. Slices maintain references to array elements.

**Syntax:**

```
-- declare an array with capacity (n)
array array_name := [type](c);

-- slice creation using "::"
slice slice_name :: array_name[n..m];
```

**Note:** Slice has references or a copy of original members;

**example**
```
-- capacity is 5, last element is 0
array a := [1,2,3,4](5); 
print a; -- [1,2,3,4,0]

-- making 4 slice views
value b :: a[0..?]; -- [1,2,3,4,0]
value c :: a[1..?]; -- [2,3,4,0]
value d :: a[0..2]; -- [1,2,3]
value e :: a[2..4]; -- [3,4,0]

--modify slice elements
alter c[0] := 8; -- first element in c slice
alter e[0] := 0; -- first element in e slice
alter e[?] := 9; -- last element  in e slice

--original array is modified
--                 ↧ ↧   ↧                        
print a;-- expect [1,8,0,4,9]

--modify last 3 elements
alter a[2..?] := 0;
print a; -- expect [1,8,0,0,0]

```

## Copy

Default assignment ":=" and slicing operator "[..]" makes a copy.   

```
value a := [0,1,2,3,4];
value e,f,r := [Z]; -- empty array

-- by default assign ":=" copy/clone an entire collection
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
value mat := [R](4,4); -- define matrix

-- modify matrix using ":=" operator
alter mat := [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]];

print mat[0,0]; --first element
print mat[3,3]; --last element

```

**Note:** Elements are organized in _row-major_ order.

So next program will print: 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,

```
-- elements in matrix can be accessed using a cycle
value i := 0;
value x := length(mat);
  
cycle:   
  write (mat[x], ',');
  i += 1;
  stop if i = x;
cycle;

print;
```
Printing the entire matrix will use multiple rows to represent a matrix approximation.

```
value m := [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]];
print m -> matrix();
```

Will print:

```
| 1  2  3  4|
| 5  6  7  8|
| 9 10 11 12|
|13 14 15 16|
```
## Varargs

One rule or aspect can receive variable number of arguments.   
We declare an array using prefix "*" for variable parameter name.

```
--parameter *bar is an array
aspect foo(*bar ∈ [Z]) => (x ∈ Z):
  alter c := bar.count();  
  -- precondition
  when (c = 0):
    alter x := 0; 
    exit;
  when;
  value i := 0; 
  -- sum all parameters  
  cycle:
    alter x += bar[i];
    alter i += 1;
    stop if i = c;
  cycle;
aspect;

--we can call foo with variable number of arguments
print foo();     --> 0
print foo(1);    --> 1
print foo(1,2);  --> 3
print foo(1,2,3);--> 6

print;
```

## String

* S strings are _tries_ data structures (radix tree) having unlimited capacity;
* A can be used to create arrays of ASCII characters compatible with C strings; 

```
value str := S(25);   -- string with capacity 25 Extended ASCHII characters
array a   := [A](25); -- array of 25 characters

alter str := 'Long string'; 
alter a   := split(str);
```

**conversion**
Conversion of a string into number is done using _parse_ rule:

```
value x,y ∈ R;

-- rule parse return a Real number
alter x := parse("123.5",2,",.");       --convert to real 123.5
alter y := parse("10,000.3333",2,",."); --convert to real 10000.33
```

### ASCII Encoding
Default _code page_ [437](https://en.wikipedia.org/wiki/Code_page_437) is used for MS-DOS and Windows console. Greek alphabet _code page_ [737](https://en.wikipedia.org/wiki/Code_page_737) is prefered for mathematic algebra.

### Change code page on Windows
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


### Double quoted string

Double quoted strings are Unicode dynamic strings with more features than ASCII strings. 
Bee support "escape" notation using escape `\` symbol only in double quoted strings.

```
print("this represents \n new line in string")
```

### Control codes:

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
value s := "This is a Unicode string";
print type(s); -- Print: U
```

**See also:** [symbols.md](symbols.md)

### Concatenation

All operators below will concatenate two strings.

symbol| description
------|--------------------------------------------------------------------------
 .    | Concatenate two string as they are. No trim is performed!
 .+.  | Concatenate two strings and trim first strings!
 ._.  | Concatenate two strings and trim both strings to one space separator
 ./.  | Concatenate two strings with "/" separator, trim and de-duplicate "//"   
 .\\. | Concatenate two strings with "\\" separator, trim and de-duplicate "\\"   


**examples**
```
value u, c := S; -- default S length is 255

-- string concatenation
alter u := "This is".+." a long string.";
alter c := "This is"._.'fix size'; 

-- path concatenation
value test_file := $pro./."src"./."test.bee";

-- when $pro = c:\work\project\
print test_file; 
print; --> "c:\work\project\src\test.bee"
```

**Note:** You can concatenate a string with a number or two numbers using .+.

### Template

* We can include numbers into a string using template operator "<+" or "+>"
* Inside template we use "{n}" notation to find a value using the member index
* Template must be included in double quotes " " 
* If a placeholder index is not found then it is preserved as is

```
value var_name := template <+ (variable);
value var_name := template <+ (var1,var2,...);
```

**Examples:**
```
value x := 30; -- Code ASCII 0
value y := 41; -- Code ASCII A

--template writing
print ("{0} > {1} > {2}" <+ (x,y)); --print "30 > 41 > {2}"
  
```

### String Generator

It is common to create strings automatically.

**Operator:**  "*"

```
value str := constant * x ∈ S(n);
```

**Example:**
```
value sep ∈ U;
alter sep := "+"."-"*18."+";

print sep;
print "|*  this is a test  *|";
print sep;
```

**Output:**

```
+-------------------+
|*  this is a test *|
+-------------------+
```

**Note:** Operator "*" have higher precedence then "."

## Classes

Classes are complex data structures with elements enclosed in curly brackets { , , ,} and separated by comma. Classes are templates for creation of items. Each object has one or more attributes with associated data types. 

**Pattern:**
```
-- declare a category of objects
class type_name <: {attribute ∈ type_name, ...};

-- create an object instance using default constructor
object item_name := {
       attribute : constant,
       ...
       } ∈ type_name;

-- modify one object attribute
alter item_name.attribute := give_value;

-- declare receivers
value var_name ∈ type_name

-- unpacking object attributes
value var_name,... <+ item_name;
```

**Object structure can be ...**

* Flat
* Recursive
* Hierarchical

**Example:**
```
-- define recursive type Person
class Person <: {
      name ∈ S, 
      age  ∈ N,  
      children ∈ (Person)
    }; 

-- create two objects of type Person
object r1,r2 ∈ Person;

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
value r_name, r_age, r_children <+ r2;

-- using introspection
print type(r_name) ; -- S
print type(r_age)  ; -- N
print type(r_children) ; -- (Person)
           
```

**type size**

Type size is a constant that can be calculated using size(T).

**Example:**
```
class Person <: {name ∈ U, age ∈ N};

-- array of 10 persons
array catalog := [Person](10); 
  
--assign value using literals
object catalog[0] := {name:"Cleopatra", age:15};
object catalog[1] := {name:"Martin", age:17};

--using one element with dot operators
print caralog[0].name; --will print Cleopatra
print caralog[1].name; --will print Martin

--member type can be check using _type()_ built in
print type(Person.name); -- will print U
print type(Person.age);  -- will print W

--print size of structure
print size(Person);

print;
```

## Binding

An aspect can bind to items using reference parameter: "me". 

**pattern**
```
-- define Foo as object with 3 public attributes:
class Foo <: {p ∈ N};
  
-- foo setup
aspect foo(p ∈ N) => (me @ Foo):
  object me := {p};
aspect;

-- second aspect for Foo type
aspect bar(me @ Foo):
  print "p ="._.p;
aspect;

-- create Foo object 
object test :: foo(p:1);

-- test object aspect
test.bar();  -- p = 1

```
**Notes:** 
* Binded actions are using multiple dispatch so they can be overloaded;
* Constructors and actions can be overwritten in other modules;
* Actions of a type can be private to module or public using dot prefix;
* If the object type is public, the constructor must also be public;
* You can not alter object structure after it is defined.
* Bee do not have inheritance and polymorphism instead you can use mix-ins;


## Aggregate

An aggregate type can store references to classes and other composite types.

**example**
```
-- a list of lists of integers
list  clist ∈ ((Z));

-- an array of 10 lists of integers
array lheap ∈ [(Z)](10);

-- an array of arrays of integers
array aheap ∈ [[Z](5)](10);

-- an indexed catalog of persons
index caper ∈ {(S:Person)};

```

**Read next:** [Type Inference](inference.md) 