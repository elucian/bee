## Data Processing

By using collections and control structures one can read, modify and store data.

* [Array Operations](#Array-Operations)
* [Array Slicing](#Array-Slicing)
* [Matrix Operations](#Matrix-Operations)
* [Set builders](#Set-builders)
* [List operations](#List-operations)
* [Collection iteration](#Collection-iteration)
* [String Generator](#String-Generator)
* [String Interpolation](#String-interpolation)

## Array Operations

* Negative index is counting from the end toward the beginning;
* Array elements have very fast direct access by index;
* Array index is a binary integer starting from zero;
* Maximum number of elements: 2³² = 4,294,967,296;
* Array capacity is establish on array creation;
* Array capacity initialization can be deferred;
* Array capacity can be modified with data movement;

**example:**

```
make test ∈ [R](10); //vector of 10 real numbers
make m := length(test)-1;
** array index start from 0
print test[0]; //first element
print test[m]; //last element
** alternative notation
print test[0];  //first element
print test[-1]; //last element
** array traversal 
make x := 0;
while (x < m) do
  alter test[i] := x;
  alter x += 1;
repeat;
** print all elements of array
print test;
over.
```

**Output:**
```
[0,1,2,3,4,5,6,7,8,9]
```

**operations**

```
make a1 := [1, 2, 3]; //Initialized array
make a2 := [2, 3, 4]; //Initialized array
** addition between two Arrays "+" 
make a3 := a1 + a2; //[1,2,3,2,3,4]
** difference between two Arrays "-"
make a4 := l1 - l2; //[1]
make a5 := l2 - l1; //[4]
** intersection between two Arrays "&" 
make a6 := a1 ∩ a2; //[2,3]
** union between two Arrays "|" 
make a7 := a1 ∪ a2; //[1,2,3,4]
```

**example:**
```
rule test_array:
  ** array  with capacity of 10 elements
  make my_array ∈ [Z](10);
  make m := my_array.capacity();
  make i := 0 ∈ u4;
  ** traverse array and modify elements
  while i < m do
    alter my_array[i] := i;     
    alter i += 1;
  repeat;
  ** array  elements using escape template by index #[]
  print ("First element: #[1]"  ? my_array); 
  print ("Last element:  #[-1]" ? my_array);
  
  ** range of array elements are comma separated [1,2,3]
  print ("First two: #[1..2]"  ? my_array);
  print ("Lat two:   #[-2..-1]"  ? my_array);
  print ("All except lat two: #[1..-3]"  ? my_array);
return;
```

**console:**
```
This is the first element: 1   
This is the last element: 10   
```

**resize**
Array capacity can be modified using union operator "+" or "+=". This will reset the array reference. That means it will not update any slice or other references you may have to this array. 

```
** define new array and reference
make array := [0](10); 
make acopy := array; //copy reference

print array = acopy; //1 = True (same array)

** extend array with 10 more elements
alter acopy    ++ [0](10); //10 new elements
alter acopy[*] := 1; //modify all 

** print new array and reference
print acopy;  //[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
print array;  //[0,0,0,0,0,0,0,0,0,0]

print array = acopy; //0 = False (different arrays)
```

## Array spreading

Array data can be used as arguments for feeding a function that receive variable arguments.

```
rule sum(*args ∈ [i64]) => (result: 0 ∈ Z): 
  for e ∈ args do 
    result += e;
  done;  
return;

make array := [1,2,3,4,5,6,7,8,9,10];
make s := sum(*array); //array spreading
```

## Array decomposition

Array data can be assigned to multiple variables. Last elements can be captured using rest notation:

```
make array := [1,2,3,4,5];

make x, y, *other :=  [1,2,3,4,5]; //decomposition

print "x = #(n)" ? x;  // x = 1
print "y = #(n)" ? y;  // y = 2
print "other = #[*]" ? other; //other = [3,4,5]
```

## Array slicing

A slice is a small view from a larger array, created with notation [n..m].

**Syntax:**

```** declare array with capacity c
make array_name ∈ [element_type](c);
** unnamed slice can be used in expressions
print array_name[n..m]; 
** create named slice from array
make slice_name := array_name[n..m]; 
```

Where: n,m are 2 optional numbers, n ≥ 0, m <= capacity-1. 


**example:**

Anonymous slicing notation can be used to extract or modify specific elements from an array; 

```
make a:= [0,1,2,3,4,5,6,7,8,9];
do
  print a[1..-1];  // will print [0,1,2,3,4,5,6,7,8,9]
  print a[-3..-1]; // will print [7,8,9]
  print a[1..1];   // will print [0]
  print a[1..4];   // will print [1,2,3,4]
 
** modify first 4 elements
  alter a[0..3] += 2; 
  
** first 4 elements of (a) are modified
  print a; //[2,3,4,5,4,5,6,7,8,9]
done;
```

**example:**

Slicing notation can be used to create a view to original array.

```** original array
make   a := [0](5); 
print  a;  //[0,0,0,0,0]
** making two slices
make c := a[0..2]; //[0,0,0]
make e := a[3..4]; //[0,0]

** modify all slice elements
alter c[*] := 1;
alter e[*] := 2;

** original array is modified
print a; //[1,1,1,2,2]

** modify last 2 elements using anonymous slicing
alter a[3..-1] := [2,3];
print a; //[1,1,1,2,3]
```

## Matrix Operations

Modify all elements of the matrix is possible using [*] and assign operator “ := ”

```
** a matrix having 2 rows and 2 columns
** initialize all elements with 100
make M: [Z](2,2);
do
  M[*] := 100;
  print (M);
done;
```
[[100,100],[100,100]]

A matrix can be initialized using literals or constructor.
A matrix can support scalar operations like Array 

```
make M ∈ [Z](2,2);
do
** assign same value to all elements
  M[*] := 100;
** modify all elements
  M[*] += 10;
  print(M); //[[110,110],[110,110]]

** modify an entire row 
  M[1,*] := 0;
  M[2,*] := 1;
  print(M); //[[0,0],[1,1]]
  
** modify an entire column
  M[*,1] += 1;
  M[*,2] += 2;
  print(M); //[[1,2],[2,3]]
done;
```

**matrix addition**
Two matrices can be added to each other if they have the same dimensions.

```
** creation of matrix with 10 × 10 elements
make M  := [1](10,10) + [2](10,10);

** verify the result is a matrix of same dimensions  
pass if M ≡ [3](10,10); //expected
```

**Memory impedance**

Matrices are multidimensional while computer memory is linear. This is an impedance mismatch that require mapping. Some computer languages organize matrices row by row and some others organize memory column by column. The difference between the orders lies in which elements of an array are contiguous in memory.

Row-major and column-major order

Transposition Passing a memory matrix from one computer language into another can require a transposition that can be a performance bottleneck. EVE uses row-major order therefore passing matrix arguments is the most efficient with Rust and C++ languages.

Matrix Traversal When you traverse elements use rows first, than you change the column. A processor will use the internal cache more efficient in this way. If the matrix is large this can be a significant performance issue.

Example: In this example we traverse all the rows then all the column, this is the most efficient way to traverse a matrix.

```
make M := ⎡'a0','b0','c0'⎤
          ⎢'a1','b1','c1'⎥
          ⎣'a2','b2','c2'⎦
          
** traverse matrix      
make row, col := 0;
while col < 3 do     // traverse columns
  while row < 3 do   // traverse row first
    print M[row,col];
    alter row += 1;
  repeat;
  alter col += 1;
repeat;

** traversal with for
for e ∈ M do
  print e; //element
next;
```

## Set Builders

You can define elements of a set or hash map using the following construction:

```
make new_set  := { var | var ∈ domain ∧ condition(var)};
make hash_map := {(key:map(key)) | key domain ∧ condition(key)};
```

**example:**

New set defined from a domain of integers:

```
make  new_set := { x | x ∈ (0..5)   }; //{0,1,2,3,4,5}
make  new_set := { x | x ∈ (0..9:2) }; //{0,2,4,6,8}
```

New map defined from a domain 
```
make  new_map := { (x:x²) | x ∈ (0.!10) ∧ (x % 2 = 0) }; 
print new_map; //{(0:0),(2:4),(4:16),(6:36),(8:64)}
```

## Array Builder
Similar to a set builder you can initialize an array or matrix:

```
make array  := [ x | x ∈ (1..10:2) ]; //[1,3,5,7,9]
```
### Collection Casting

It is common for one collection to be created based on elements from another collection. 
Collection members can be copy into the new collection using collection builder: 

**Example:**
```
make source := [0,1,2,2,2,2];
do
  ** eliminate duplicates
  make set := { x | x ∈ source };
  print set; //{0,1,2} 
done;
```

### Collection Filtering
Build notation can use expressions to filter out elements during build.

**Example:**
```
make source := [0,1,2,3,4,5];
do
  make set := { x | x ∈ source ∧ (x % 2 = 0) };
  print set; //{0,2,4} 
done;
```

### Collection Mapping
The elements in one set or list can be transformed by a function or expression to create a new collection.

**Example:**
```
make source := {0,1,2,3,4,5};
do
  ** create Table pairs (key, value) for Table map   
  make target := {(x:x^2) | x ∈ source };
  print target; //{ 0:0, 1:1, 2:4, 3:9, 4:16, 5:25} 
done;
```

## List Operations
We can add elements to a list or remove elements from the list very fast: 

* operator ++ append one element to end of list
* operator -- delete one element by reference


### List Concatenation
List concatenation is ready using operator “+”. This operator represent union. 
Therefore List union act very similar to append, except we add multiple elements. 

```
  make a := ('a','b','c');
  make b := ('1','2','3');
  make c := ();

  alter c := a + b;
  print c; //('a','b','c','1','2','3');
```

### Join built-in
The join function receive a list and convert elements into a string separated be specified character.

```
  make str := join([1,2,3],',');
  print (str); //'1,2,3';
```

### Split built-in
The join function receive a list and convert elements into a string separated be specified character.

```
make lst := split("1,2,3",",");
print lst; //(1,2,3)
```

### List as stack

A stack is a LIFO list of elements: LIFO = (last in first out)

```
make a := (1, 2, 3); //list
make last ∈ N;
** append to stack with operator "++"
alter a ++ 4; //(1,2,3,4)
** read last element using "++"
alter last := a.tail; //last = 4
** remove last element using "--"
alter a -- last; //a = (1,2,3)
```

### List as queue

A queue is a FIFO collection of elements: (first in first out)

```
make q := (1,2,3); 
make first: N;
** enqueue new element into list "++" 
alter q ++ 4; //(1,2,3,4)
** read first element using ":="
alter first := a.head; //first = 1
** dequeue first element using "--"
alter a -- first; //a = (2,3,4)
```



### Other built-ins

Following other functions should be available
* List.append(value) // can append an element at the end of the list
* List.insert(value) // can insert an element at the beginning of the list
* List.delete(value) // can delete one element at specified index
* List.count()       // retrieve the number of elements 

### Special attributes

A list has properties that can be used in logical expressions:

* List.empty()  //True or False
* List.full()   //True or False


## Collection Iteration

Collections have common methods that enable traversal using _for_ statement. 

**built-in:**

Available for: {List, Table, Set} but not Array or Slice

* count      - retrieve the number of elements 
* fetch      - position next element 
* first      - position to first element
* last       - position to last element

**Example:**
```
make my_map := {("a":1),("b":2),("c":3)};
for (key, value) ∈ my_map do
  print('("' + key + '",' + value +')');
next;
```

Will print:
```
("a",1)
("b",2)
("c",3)
```

## Hash collections

Hash tables are sorted in memory by _key_ for faster search. It is more difficult to search by value because is not unique and not sorted. To search by value one must create a loop and verify every element. This method is very slow so you should never use it.


**example:**

```
** check if a key is present in a hash collection
make my_map := {(1:'a'),(2:'b'),(3:'c')};
make my_key := 3;
when (my_key ∈ my_map) do
  print('True'); //expected
else
  print('False');
done;
```

**example:**
```
make animals ∈ {S,S};
do
  alter animals['Bear'] := 'dog';
  alter animals['Kiwi'] := 'bird';
  print(animals);
done;
```

Output:
```
{('Bear':'dog'),('Kiwi':'bird')}
```

## Type inference

* The default type inference for empty "set" is {}
* An empty hash map will be created using notation {} 

### Example

```  
make animals := {}; //partial declaration
do
  ** establish element types (S:X)
  alter animals['Rover'] := "dog";

  ** use direct assignment to create 2 more element
  alter animals['Bear'] := "dog";
  alter animals['Kiwi'] := "bird";
  print(animals);
done;
```
output:

```
{('Rover':"dog"),('Bear':"dog"),('Kiwi':"bird")}  
```

## String: concatenation

Strings can be concatenated using:

* fast concatenation operator: "&"
* trim concatenation operator: "+"
* path concatenation operator: "/"

**Example:**
```
** this is example of string concatenation
make str := ""; 
do
  ** set string value using different operators
  alter str := "this " & " string"; //"this  string"
  alter str := "this " + " string"; //"this string"
done;
```

**path concatenation**
Two strings can be concatenated using concatenation operator "/" or "\\". This operator is used to concatenate "path" strings or URL locations. Notice "\\" is also escape character used for string templates.

```
make s := "";
do  
  alter s := 'te/' / '/st'; //"te/st"
  alter s := 'te/' \ '/st'; //"te\\st"
done;
```

## String Replicator

It is common to create strings automatically.

**Operator:**  "*"

```
make str := constant * n ∈ S(n);
```

**Example:**
```
make sep := '-' * 19;

print ('+' + sep + "-");
print ('|   this is a test   |');
print ('+' + sep + '+');
```

**Output:**

```
+--------------------
|  this is a test   |
+-------------------+
```

### Control codes

You can insert constants using notation $X or #(nn):

**Codes:**

 DEC  | HEX    |CODE  |NAME
------|--------|------|------------------
  00  | 0x00   |$NL   |Null
  08  | 0x08   |$BS   |Backspace
  09  | 0x09   |$HT   |Horizontal Tab
  10  | 0x0A   |$LF   |Line Feed
  11  | 0x0B   |$VT   |Vertical Tab
  12  | 0x0C   |$FF   |Form Feed
  13  | 0x0D   |$CR   |Carriage Return
  27  | 0x1B   |$ES   |Escape
  39  | 0x27   |$AP   |Apostroph  ''
  34  | 0x22   |$QM   |Quotation  ""


### String Interpolation

In computer programming, string interpolation is the process of evaluating a string literal named template that contains one or more placeholders. An interpolation expression is yielding a result in which the placeholders are replaced with their corresponding values. 

We use notation "#()" or "#()[]" to create a placeholder template inside of a String or Text. You can use operator "?" to replace the placeholder with values from a data source. If placeholder is not found the result will contain the placeholder unmodified.

**Notes:**

* We can inject values into a string template using modifier symbol: "?";
* System constants "$" are automatically interpolated, do not require symbol "?";
* Template must be included in double quotes "..." not single quotes '...';
* Inside template we use a symbol or format "#()" follow by index "[]";
* The index start from "[0]" and it can be negative;
* If a placeholder index is not resolved then it is preserved unmodified;
* Unlike JavaScript or other languages, variables are not recognized in string templates;

**Example:**
```
** next template uses #(n) placeholder
make template := "Duration:#(n) minutes and #(n) seconds";
make var1 := 4; 
make var2 := 55;
...
print template ? (var1,var2,...); //Duration:4 minutes and 55 seconds
```

**Example:**

```
** define two A codes
make x := 30; //Code ASCII 0
make y := 41; //Code ASCII A

** template writing alternative
print "#(n) > #(n)" ? (x,y); //"30 > 41" 
print "#(a) > #(a)" ? (x,y); //"0 > A"  

** using two dots : to separate hour from minutes 
print "#(n):#(n)" ? (10, 45); // 10:45

** using numeric format
print "#(1,000.00)" ? (1000.45); // 1,234.56
```

**Placeholders:**

Format template stings can use escape sequences:

```
"#(n)"   = natural number 
"#(z)"   = integer number
"#(r)"   = real number using default precision
"#(s)"   = single quoted string for string, symbol or number
"#(q)"   = double quoted string for string, symbol or number
"#(a)"   = ASCII symbol representation of code
"#(u)"   = Unicode symbol representation of code
"#(+)"   = UTF16 code point representation (U+HHHH) for symbol
"#(-)"   = UTF32 code point representation (U-HHHHHHHH) for symbol
"#(b)"   = binary number
"#(h)"   = hexadecimal number
"#(t)"   = time format defined by @time
"#(d)"   = date format defined by @date
"#[*]"   = array decomposition (separated by comma)
"#(n)[*]"= array decomposition with natural numbers
"#(n)[i]"= search element by index or by key


```

**Examples:**
```
print "Numbers:   #(n) and #(n)" ? (10, 11);
print "Alpha:     #(a) and #(a)" ? (30, 41);
print "Strings:   #(s) and #(s)" ? ('odd','even');
print "Quoted:    #(q) and #(q)" ? ('odd','even');
print "Unicode:   #(u) and #(u)" ? (U+2260,U+2261);
print "Unicode:   #(q) and #(q)" ? (U+2260,U+2261);
print "Collection:#[*] and #[*]" ? ([1,2,3],{1,2,3};
```

**Expected output:**
```
Numbers:   10 and 11
Alpha:     0 and A
Strings:   'odd' and 'even'
Quoted:    "odd" and "even"
Unicode:   ≠ and ≡
Collection:[1,2,3] and {1,2,3}
```

**Notes:**
 
* Template modifier: "?" is polymorph and overloaded, 
* For template source you can use: { tuple, list, set, hash, array, matrix },
* The parentheses () or [] are exclusive optional. You can use one or the other or both,
* Multiple [*] can be used with any enumerable collection types

## Large template

A large template can be stored into a file, loaded from file and format().

1. Create a map collection of elements;
2. Create the template text and store it in external file;
3. Use _for_ to visit the file row by row;
4. Use template modifier: "?" to replace placeholders row by row;
5. Alternative use _format()_ build-in rule to replace all placeholders;

**Using Hash:**

```
make template1 := "Hey look at this #[key1] it #[key2]!";
make template2 := "Hey look at this #(s)[key1] it #(q)[key2]!";
make map       := {("key1":"test"),("key2":"works")};

print template.format(map);
print template ? map;
```

Expect output:
```
Hey look at this test it works!
Hey look at this 'test' it "works"!
```

**Using Set:**
```
make  template := "Hey look at this #[0] it #[1]!";
make  my_set   := {"test","works"};
print template ? my_set; 
```

Expect Output:
```
Hey look at this test it works!
```

## Numeric format

Number type is implementing format() method. This method has one string parameter that is optional.

```
rule format(number ∈ R, pattern ∈ S) => (result ∈ S):
  ...
return;
  
```

Where pattern cab gave two forms: 

* p := "#(ap:l.d)" // 1,000.00
* p := "#(ap:l,d)" // 1.000,00
* p := "#(ap:l;d)" // 1,000.00 | 1.000,00 (depending on country)

**Note:** Last pattern is depending on regional settings: $decimal:'.'/','

* a is alignment one of { < > ^ }, 
* p is the padding character: { _ 0 }
* l is the length of result
* d is number of decimals after "."

### Alignment symbol "a" can be one of:

```
> is used to align to the right
< is used to align to the left
= is used to align to center
```

### Format examples:

```
 "#(r)"       // real number, with default precision left align 
 "#(n)"       // natural number, unsigned left align
 "#(z)"       // integer number, with sign left align
 "#(10)"      // right align numeric with 10 digits padded with spaces
 "#(10.2)"    // 10 integer digits and 2 decimals, right padded with spaces
 "#(>_:10)"   // right align 10 digits padded with spaces
 "#(>0:10.2)" // right align padded to 10 integer digits and 2 decimals
 "#(>0:10,2)" // right align European numeric style with 2 decimals
```

### Text functions:

* format (str ∈ X, map ∈ {S}) ∈ X;
* format (str ∈ X, map ∈ {Z}) ∈ X;
* format (str ∈ X, map ∈ [Z]) ∈ X;
* replace(str ∈ X, target  ∈ S, arrow ∈ S) ∈ X;
* find   (str ∈ X, pattern ∈ S) ∈ N;
* count  (str ∈ X, pattern ∈ S) ∈ N;
* length (str ∈ X) ∈ N;

**Reading a Text:**

Text is iterable by "row". The row separator CR or CRLF. So we can read a text line by line. You can use _for_ iteration to check every line of text. Each row is a string. You can also parse a row word by word using a nested _for_.

**Note:**
The text also support escape sequences like a normal string. However in a text literal we do not have to escape the single quote symbols: "'". We have to escape the double quotes like: "This is \"quoted\" text". This is very rare since quoted text should use symbols: "« »" like "«quoted»".

**Read next:** [Standard Library](standard.md)