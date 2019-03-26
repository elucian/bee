## Composite Types

Composite types are complex data structures. 

**Bookmarks**

* [range](#range)
* [ordinal](#ordinal)
* [list](#list)
* [cluster](#cluster)
* [table](#table)
* [array](#array)
* [slice](#slice)
* [varargs](#varargs)
* [string](#string)
* [complex](#complex)
* [aggregate](#agregate)
* [binding](#binding)

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
define range_name <: basic_type[min..max]
```

**Examples:**
```
-- sub-type declarations
define Small     <: B[0..9];
define Alfa      <: A['a'..'Z'];
define Positive  <: Z[0..+∞];
define Negative  <: Z[-∞..-1];

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
define type_name <: { name1:0, name2, name3};

create a, b, c ∈ type_name;

modify a := type_name.name1; -- a=2
modify b := type_name.name2; -- b=3
modify c := type_name.name3; -- c=4
```

**Note:** When element name start with "." no need to use qualifiers for individual values

```
-- using public elements in enumeration
define type_names <: { .name0, .name1 };

create a, b ∈ type_name;

modify  a := name0; -- a value := 0
modify  b := name1; -- b value := 1
```

## List

A list is an ordered collection of values separated by comma and enclosed in brackets.

**Syntax**
```
define <variable> := () ∈ (value_type);
```

**Notes**: List members must have same data type

**example**
```
-- create a list of ASCII characters
create a := () ∈ (A);

-- create a list using a literal
create b := ('1','a','2','b') ∈ (A); 
```

**empty list**

An empty list is represented like this: ()

```
create a := ();      -- empty list
create b := (1,2,3); -- initialize list using assign

modify a := b; -- re-assign a and throw to garbage ()
```

**Unpacking**

A list can be assigned to multiple variables using unpacking:

**Example:**

```
--create 3 new variables using list literal
create x, y, z ∈ Z;

--unpacking modify all 3 value
modify x, y, z <+ (97, 65, 40);

print x; -->  97
print y; -->  65
print z; -->  40

--anonymous list with string template
create s := "{0} > {1} > {2}" <+ (x, y, z); 
print s; -- "97 > 65 > 40"
```

**Multiple results**

An method can produce multiple results in a list.

```
-- have a list of results
define test(x,y ∈ Z) => (r, c ∈ Z):
  modify r += x+1;
  modify c += y+1;
define;

create n, m ∈ Z;

-- unpacking the result
modify n, m <+ test(1,2);

print n; --will print 2
print m; --will print 3

-- ignoring the result
modify _,_ <+ test(3,4);

```

**Partial unpacking**

List members can be ignored when unpacking using anonymous variable: "_"

```
create lst := (0, 1, 2, 3, 4, 5);
create x, y, z ∈ Z;

-- first element and last 2 are ignored
modify _,x,_,z := lst;

```

**Unpacking Notes:**
* To unpack a list it must use at least one comma separated variables;
* If list is greater than target variables the rest of values are ignored;
* If the list is shorter than the number of variables the rest of variables are set to zero value;


### List processing

```
create l1 := (1, 2, 3);
create l2 := (2, 3, 4);
create l3, l4, l5 := ();

--addition between lists "+" 
modify l3 := l1 + l2; --(1,2,3,2,3,4)

--difference between lists "-"
modify l4 := l1 - l2;  -- (1)
modify l5 := l2 - l1;  -- (4)
```

**List traversal**

```
create   := ('a', 'b', 'c');
create x := list.first();
cycle
  write x;
  exit if x ≡ list.last();
  modify x  := list.next(element);
  write ',';  
cycle;
```

## Stack

A stack is a LIFO collection of elements.

```
create a := (1, 2, 3);
create last ∈ N;

-- using stack with operator "+="
modify a += 4; -- (1,2,3,4)

-- read last element using "-="
modify last := a[?];  -- last := 4, a := [1,2,3,4]

-- remove last element using pop
modify last -= a[?];  -- last := 4, a := [1,2,3]
```

## Queue

A queue is a FIFO collection of elements.

```
create q := (1,2,3);
create  first : N;

-- using enqueue operator "+:" 
modify q += 4; -- (1,2,3,4)

-- read first element using "=" and "modify"
modify first := a[!]; --> 1 and a := (1,2,3,4)

-- dequeue first element using deq method
modify first -= a[!]; --> 1 and a := (2,3,4)
```

## Cluster

A cluster is a sorted collection of unique values.

```
--define a cluster

create s1 := {1,2,3} ∈ {N}; 
create s2 := {2,3,4} ∈ {N};
create s  := {}      ∈ {N}; -- empty


-- specific operations
modify s := s1 ∪ s2; --{1,2,3,4} -- union
modify s := s1 ∩ s2; --{2,3}     -- intersection
modify s := s1 - s2; --{1}       -- difference 1
modify s := s2 - s1; --{4}       -- difference 2

-- declare a new set
cluster a := {1,2,3} ∈ {N};

-- using operator +/- to mutate set a
modify a := a + 4; --> {1,2,3,4} --append 4
modify a := a - 3; --> {1,2,4}   --remove 3 (not 3)

```

**Notes:** 

* Bee sets are internally sorted not indexed;
* Sets are not recommended to create queues or stacks;
* Usually you do not remove elements from a set but only append;

## Table

A table is a collection of (key:value) pairs sorted by key.

**syntax**
```
define type_name <: {(key_type : value_type)}
```

**example**
```
-- declare a new empty hash map
create map := {} ∈ type_name;

-- initial value of map
modify map := {'a':"first", 'b':"second"};

-- create new element
modify map['c'] := "third";

-- modification of non existent element will fail
modify map['e'] := "forth"; --> ERROR

-- finding elements by key
print map['a']; -- first
print map['b']; -- second
print map['c']; -- third

-- remove an element by key
erase map['a']; --> remove "first" element
print map;      --> expected: {'b'="second", 'c'="third"}

```

**Note:** Hash map operators work like for sets

## Check for inclusion

We can check if an element is included in a collection.

```
define  Tmap ∈ {(A:U)};

create map  := {('a':"first"), ('b':"second")} ∈ Tmap;

when ('a' ∈ map):
  print("a is found");
else
  print("not found");
when;
    
```

## Array

Bee define Array variable using notation := `[]()`.

**syntax**
```
create array_name  := [type];      --one dimension array with unknown capacity
create array_name  := [type](c);   --one dimension with capacity c
create array_name  := [type](n,m); --two dimensions with capacity n x m
```

**Note:** 
* Empty parenthesis () are not required for unknown capacity.
* Arrays are initialized using ":=" and can not be declared with ∈.

**example**

```
-- define array with 10 Real elements
create test := [R](10); 
create m := length(test)-1;  

print test[0];   -- first element
print test[m];   -- last element

-- set value of element := subscript
create x := 0;
cycle: 
  modify test[i] := x;
  modify x += 1;
  stop if x = m;
cycle;

-- print all elements of array
print test;

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
array array_name := [member_type](n..m);  

print array_name[!]; -- print first element
print array_name[?]; -- print last element
```

**initialize elements**

Initial value for all elements in array are zero. We use notation [*] for all elements.

```
-- declare array of integers with initial value 
create zum := [Z](10);

-- add 1 to each element
modify zum[*] += 1; 
print zum; -- expect [2,2,2,2,2,2,2,2,2,2]
```

**differed initialization**
```
create vec := [A];

-- element multiply "*"
modify vec := `x` * 10;
print vec; -- expect [`x`,`x`,`x`,`x`,`x`,`x`,`x`,`x`,`x`,`x`]

```

## Slice

We can define a section of array using [n..m] notation. This is called slice. The numbers n and m represent the subscript of array element. Slices maintain references to array elements.

**Syntax:**

```
-- declare an array with capacity (n)
create array_name := [type](c);

-- slice creation using "::"
create slice_name :: array_name[n..m];
```

**Note:** Slice has references or a copy of original members;

**example**
```
-- capacity is 5, last element is 0
create a := [1,2,3,4](5); 
print a; -- [1,2,3,4,0]

-- making 4 slice views
create b :: a[0..?]; -- [1,2,3,4,0]
create c :: a[1..?]; -- [2,3,4,0]
create d :: a[0..2]; -- [1,2,3]
create e :: a[2..4]; -- [3,4,0]

--modify slice elements
modify c[0] := 8; -- first element in c slice
modify e[0] := 0; -- first element in e slice
modify e[?] := 9; -- last element  in e slice

--original array is modified
--                 ↧ ↧   ↧                        
print a;-- expect [1,8,0,4,9]

--modify last 3 elements
modify a[2..?] := 0;
print a; -- expect [1,8,0,0,0]

```

## Copy

Default assignment ":=" and slicing operator "[..]" makes a copy.   

```
create a := [0,1,2,3,4];
create e,f,r ∈ [Z]; -- empty array

-- by default assign ":=" copy/clone an entire collection
modify e := a; 

-- compare two collections
print e = a; --> 1 (equal collections)
print e ≡ a; --> 0 (different memory locations)

-- by default a slice is a copy/clone of original data
modify f := a[2..?];  -- copy data using slice notation

-- you can also copy a data from a basic type
modify r := Z[1..10]
print r; -- expect [1,2,3,4,5,6,7,8,9,10]
```

## Matrix

It is an array with 2 or more indexes. We can have 2D or 3D array.

**Example:** 
```
create mat := [R](4,4); -- define matrix

-- modify matrix using ":=" operator
modify mat := [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]];

print mat[0,0]; --first element
print mat[3,3]; --last element

```

**Note:** Elements are organized in _row-major_ order.

So next program will print: 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,

```
-- elements in matrix can be accessed using a cycle
create i := 0;
create x := length(mat);
  
cycle:   
  write (mat[x], ',');
  i += 1;
  stop if i = x;
cycle;

```
Printing the entire matrix will use multiple rows to represent a matrix approximation.

```
create m := [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]];
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

One function or method can receive variable number of arguments.   
We declare an array using prefix "*" for variable parameter name.

```
--parameter *bar is an array
define foo(*bar ∈ [Z]) => (x ∈ Z):
  value c := bar.count();  
  -- precondition
  when (c = 0):
    modify x := 0; 
    exit;
  when;
  modify i := 0; 
  -- sum all parameters  
  cycle:
    modify x += bar[i];
    modify i += 1;
    stop if (i = c);
  cycle;
define;

--we can call foo with variable number of arguments
print foo();     --> 0
print foo(1);    --> 1
print foo(1,2);  --> 3
print foo(1,2,3);--> 6

```

## String

* S strings are _tries_ data structures (radix tree) having unlimited capacity;
* A can be used to create arrays of ASCII characters compatible with C strings; 

```
create str := S(25);   -- string with capacity 25 Extended ASCHII characters
create a   := [A](25); -- array of 25 characters

modify str := 'Long string'; 
modify a   := split(str);
```

**conversion**
Conversion of a string into number is done using _parse_ function:

```
create x,y ∈ R;

-- function parse return a Real number
modify x := parse("123.5",2,",.");       --convert to real 123.5
modify y := parse("10,000.3333",2,",."); --convert to real 10000.33
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
create s := "This is a Unicode string";
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
create u, c := S; -- default S length is 255

-- string concatenation
modify u := "This is".+." a long string.";
modify c := "This is"._.'fix size'; 

-- path concatenation
create test_file := $pro./."src"./."test.bee";

-- when $pro = c:\work\project\
print test_file;  --> "c:\work\project\src\test.bee"
```

**Note:** You can concatenate a string with a number or two numbers using .+.

### Template

* We can include numbers into a string using template operator "<+" or "+>"
* Inside template we use "{n}" notation to find a value using the member index
* Template must be included in double quotes " " 
* If a placeholder index is not found then it is preserved as is

```
create var_name := template <+ (variable);
create var_name := template <+ (var1,var2,...);
```

**Examples:**
```
create x := 30; -- Code ASCII 0
create y := 41; -- Code ASCII A

--template writing
print ("{0} > {1} > {2}" <+ (x,y)); --print "30 > 41 > {2}"
  
```

### String Generator

It is common to create strings automatically.

**Operator:**  "*"

```
create str := constant * x ∈ S(n);
```

**Example:**
```
create sep ∈ U;
modify sep := "+"."-"*18."+";

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

## Complex

Complex types are data structures with elements enclosed in curly brackets { , , ,} and separated by comma. 

**Pattern:**
```
-- declare a category of objects
define  type_name <: {attribute ∈ type_name, ...};

-- create an object instance using default constructor
create item_name := {
       attribute : constant,
       ...
       } ∈ type_name;

-- modify one object attribute
modify object_name.attribute := new_value;

-- declare receivers
create var1 ∈ type_1
create var2 ∈ type_2
...

-- unpacking object attributes
create var1,var2... <+ object_name;
```

**Object structure can be ...**

* Flat
* Recursive
* Hierarchical

**Example:**
```
-- define recursive type Person
define Person <: {
      name ∈ S, 
      age  ∈ N,  
      children ∈ (Person)
    }; 

-- create two objects of type Person
create r1,r2 ∈ Person;

-- person with no children          
modify r1 := {name:'Mica', age:21};

-- person with two children
modify r2 := {name:'Barbu', age:25, 
             children : (
               {name:'Telu', age:4},
               {name:'Radu', age:1} 
             )
          };

-- object unpacking into new variables
create r_name, r_age, r_children <+ r2;

-- using introspection
print type(r_name) ; -- S
print type(r_age)  ; -- N
print type(r_children) ; -- (Person)
           
```

**type size**

Type size is a constant that can be calculated using size(T).

**Example:**
```
define  Person <: {name ∈ U, age ∈ N};

-- array of 10 persons
create catalog := [Person](10); 
  
--assign value using literals
create catalog[0] := {name:"Cleopatra", age:15};
create catalog[1] := {name:"Martin", age:17};

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

An aggregate type can store references other composite types.

**example**
```
-- a list of lists of integers
define Dlist ∈ ((Z));

-- an array of 10 lists of integers
define Alist ∈ [(Z)](10);

-- an array of arrays of integers
define Aheap ∈ [[Z](5)](10);

-- an catalog of persons
define Acat ∈ {(S:Person)};

```

## Binding

An method can bind to items using reference parameter: "me". 

**pattern**
```
-- define Foo as object with 3 public attributes:
define Foo <: {a, b ∈ N};
  
-- foo setup
define foo(p1,p2 ∈ N) => (me @ Foo):
  value me := {a:p1, b:p2};
define;

-- second method for Foo type
define bar(me @ Foo):
  print "a ="._.me.a;
  print "b ="._.me.b;
define;

-- create Foo object 
create test :: foo(p:1);

-- test object method
test.bar();  
-- a = 1
-- b = 1

```
**Notes:** 
* Binded actions are using multiple dispatch so they can be overloaded;
* Constructors and actions can be overwritten in other modules;
* Actions of a type can be private to module or public using dot prefix;
* If the object type is public, the constructor must also be public;
* You can not modify object structure after it is defined.
* Bee do not have inheritance and polymorphism instead you can use mix-ins;


**Read next:** [Type Inference](inference.md) 