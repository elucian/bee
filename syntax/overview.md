## Syntax Overview

We have used a _simple design_ for notation based on examples and notes:

* We use suggestive descriptors,
* We use "::=" to explain a descriptor,
* We use "..." for repetitive sequences,
* We use notes to explain the semantics,
* Optional keyword is enclosed in square brackets.

**bookmarks**

* [Expressions](#expressions)
* [Primitive types](#primitive-types)
* [Constant literals](#constant-literals)
* [Reference types](#reference-types)
* [Composite types](#composite-types)
* [Collection types](#collection-types)
* [Type declaration](#type-declaration)
* [Domain subtypes](#domain-subtypes)
* [Logical expression](#logical-expression)
* [Conditionals](#conditionals)
* [Pattern matching](#pattern-matching)
* [Rule as function](#Rule-as-function)
* [Rule as routine](#Rule-as-routine)
* [Rule as method](#Rule-as-method)
* [Rule as generic](#Rule-as-generic)
* [External rules](#external-rules)

## Expressions
Expressions are created using identifiers, operators, rules and constant literals. 

* can use () to establish order of operations,
* can be enumerated using comma separator ","
* can be combined to create more complex expressions,
* have a result that can be assigned to variables,
* have a result that can be printed to console,
* result type is given automatically using logical inference;

**Examples**
```
** simple expressions in print statement
** no need for parentheses for a single value
print 10; 
print "this is a test";

** complex expressions can use ()
print (10 + 10 + 15);  
print (10 > 5) | (2 < 3);

** enumeration of multiple expressions
** print: separate multiple values with one space
print 1,2,3;         // 1 2 3
print 1,',',2,',',3; // 1,2,3

** to avoid new line and spaces use "write"
write 0;   //add 0  to print buffer
write 1,2; //add 12 to print buffer 
write 3,4; //add 34 to print buffer 

** after write use print to flash and add new line
print; //output buffer: 01234
```

**Notes:** 
* print statement can receive multiple arguments,
* multiple arguments are separated by comma,
* print statement add new line by default,
* write statement can be used to avoid new line.

## Data types

Data types represent abstract _domains of values_. In other words, data type represent constrain rules that can be used to validate a particular data value. 

**Usability:** 

* Bee has predefined data types. You can also create new data types based on predefined types. You can add new constraint rules that can improve data validation further.

* Without data types, a computer language is dynamic. A dynamic language is more fragile and prone to errors. Bee language is strongly typed. That means data is constrained by rules imposed by a _"data type"_.

**Naming**

Bee give names to _data types_. It uses ASCII characters and numbers or Unicode symbols. Sometimes data types are parametrized. You can add parameters enclosed in round brackets to customize the _constraint rules_.

**examples:**
```
Z(32)   // primitive type: long integer
Q(5.2)  // primitive type: precision 0.25 
File    // composite type: text file
List    // composite type: list of values
∠ ⊡ ↗   // geometric type: angle, dot, vector
```

Bee use 2 kind of data types:

1. Primitive data types;
2. Composite data types;

## Primitive Types

Primitive data types are defined using one capital letter. 

| Name     |Ref | Description + Default representation
|----------|----|-------------------------------------------------------------------
| Logic    | L  | Numeric enumeration of two values: 0 = False, 1 = True 
| Alpha    | A  | Alpha-numeric code point E-ASCII ('0'..'9') ('a'..'Z')
| Binary   | B  | Binary number on 16 bit, max: 0b11111111 11111111
| Unicode  | U  | Unsigned code point on 32 bit, max: U-FFFFFFFF (UTF32)  
| Rational | Q  | Fix point representation number: like 1/2. Notation:  Q(14,17)
| Natural  | N  | Unsigned large positive integer 64 bit [0..+]
| Integer  | Z  | Signed large integer 64 bit  [-..+]  Z(64)
| Real     | R  | Double precision float 64 bit (-..+) R(64)

**notes:**

* Each data type has a default representation for print & output,
* Default representation can be changed using a _format template_,
* Using print with primitive type will create a specific representation,
* Precision can be specified in parenthesis after the type: Z(32) = 32 bit integer,
* Primitive data types are values allocated on the stack or in the registry.

## Constant Literals

These are symbolic representations for primitive data types:

|Example    | Type  | Literal characters
|-----------|-------|-----------------------------------------------------------
|'a'        |  A    | (+-) & (0..9) & (a..z) & (A..Z)
|'Ω'        |  U    | (Δ Λ Φ Γ Ψ Ω Σ Π π ⊥ ǁ α β ɣ ε δ μ ω ...)
|0b11111111 |  B    | (0b) & (0,1)
|1234567890 |  N    | (0,1,2,3,4,5,6,7,8,9)
|+0         |  Z    | (-+) & (0,1,2,3,4,5,6,7,8,9)
|0xFFFF     |  A    | (0x) & (0,1,2,3,4,5,6,7,8,9) & ABCDEF
|U+FFFF     |  U    | (U+) & (0,1,2,3,4,5,6,7,8,9) & ABCDEF
|U-FFFFFFFF |  U    | (U-) & (0,1,2,3,4,5,6,7,8,9) & ABCDEF
|0.05       |  R    | (-.) & (0,1,2,3,4,5,6,7,8,9) 
|-1/2       |  Q    | (-/) & (0,1,2,3,4,5,6,7,8,9)
|1E10       |  R    | (-1E)& (0,1,2,3,4,5,6,7,8,9) 
|1e10       |  R    | (-1e)& (0,1,2,3,4,5,6,7,8,9) 

**note**

* constant literals are identical to themselves 
* primitive variables are identical to themselves

## Composite types

Predefined composite types start with capital letter: 

| Name    | Description
|---------|----------------------------------------------------------------
| String  | Single quote ASCII string
| Text    | Double quote UTF8 stromg 
| Date    | DD/MM/YYYY 
| Time    | hh:mm,ms
| Error   | Error object: {code, message, line}
| File    | File handler

**Notes:**
* Composite variables are references;
* Composite variables have variable size;
* Composite variables are  allocated on the heap;

## Collection types

Bee define a collection literal using a special notation based on brackets.

| symnols | Collection type
|---------|------------------------------------------------------------------
| ()      | List
| []      | Array/ Matrix
| {}      | Ordinal / Set / Hash  / Object

**Notes:** 
* All collections are composite types therefore references; 
* Collection elements can be references or native types;

## Type declaration

User can define types and sub-types using operators ":" and "<:" (sub-type).

```
** declare new type
type Type_Identifier: type_descriptor <: super_type;

** declare variables using new type
make var_name,var_name ... ∈ Type_Identifier;
```

**Notes:**

* User defined super-types are usually specialized composite types;
* User defined sub-types can be native types and can start with lowercase;
* Public user data types start with dot prefix;

**Example:**
```
type Digit: (0..9) <: B; //binary superset 
type Digit: (0..9) <: Z; //integer superset
```

## Domain subtypes

Domain notation is used to create a subset from a superset.

**syntax**

```
type Name = (min..max:rate) <: PrimitiveType;
```

**Examples:**
```
** sub-type declarations
type Positive: (0..+:0.01)      <: Q; 
type Negative: (-..0:0.01)      <: Q; 
type Digit:    (0..9)           <: Z;      
type Alpha:    ('A'..'z')       <: A;  
type Latin:    (U+0041..U+FB02) <: U;

** check variable belong to type
when ('x' ∈ Alpha) do
  print "yes";
else
  print "no";
done;
```

**Notes:**

* Use (n..m) include n and m in domain,
* Use (n!.m) to exclude lower limit from range,
* Use (n.!m) to exclude upper limits from range,
* Use (n!!m) to exclude both limits from range,
* Use symbol - for unlimited negative number,
* Use symbol + for unlimited positive number.

**example:**
```
** continuous default rate is 1
print (0..5); //0,1,2,3,4,5
print (0.!5); //0,1,2,3,4

```

## Domain segments

A domain can use a special notation for multiple numeric intervals called segments.

**syntax:**
```
(segment, segment ...) // continuous domain notation
```

* segment ::=  n..m:ratio  // include n, include m if (m % ratio) = 0
* segment ::=  n.!m:ratio  // exclude n, include m if (m % ratio) = 0
* segment ::=  n!.m:ratio  // include n, exclude m 
* segment ::=  n!!m:ratio  // exclude both n and m

**example:**
```
** integer domain with two segments
type ZDom: (-9..1,1..9) <: Z; 

** integer domain with two segments and ratio
type ZDom: (0..8:2 , 1..9:2) <: Z; 

** real domain with two rations: 0.01 and 0.1
type RDom: (0.!10:0.01, 10..100:0.1) <: R; 

** two rational segments with same ratio: 0.01
type QDom: (-10..-1:0.01, 1..10:0.01) <: Q; 
```

## Constant declaration

Constants are defined identifiers for literal constants. 

```
** using implicit type
save constant_name := constant_literal;  

** using explicit type
save constant_name := constant_literal ∈ type_name; 
```

**Notes:** 

* Constant initial value is assigned using operator ":",
* System constants are public and have prefix "$",
* User defined constants using prefix "." are also public,
* Local constants are possible but they are transient.

**example:**
```
save n := U+2200     ∈ A; //Symbol: ∀
save n := U-00002200 ∈ U; //Symbol: ∀
```

**Note:** 
* After  U+ compiler is expecting 4 hexadecimal symbols;
* After  U- compiler is expecting 8 hexadecimal symbols;

## Variable declarations

Variables are defined using keyword _make_ plus one of the operators:

operator | purpose
---------|------------------------------------------------------------------
 ∈       | declare variable/element type 
 :       | define type \| pair-up initial values \| pair-up arguments
 :=      | binding  = assign value     \| share reference
 ::      | cloning  = duplicate object \| clone collection
 
**Notes:**
* Symbol ":" can be used to initialize one variable at a time in a list, 
* Symbol ":" can accept only constant literals for initial values (var:con,...),
* Symbol ":" accept expressions when it is used in function call (param:exp),
* Symbol ":" can be used to create pairs for hash map (key:exp),
* Symbol ":=" and "::" can be used to initialize multiple variables in a list.

```
** primitive variable declarations with type
make var_name ∈  type_name; // declaration without initial value
make var_name := constant ∈ type_name; // declaration with initialization

** partial declaration using type inference
make var_name := expression; //expression ":=" do not require type hint ("∈").

** Multiple variables can be define in one single line using comma separator:
make (var_name, var_name ...) ∈  TypeName;  //default initial values
make (var_name, var_name ...) := Expression; //use expression type inference for initial value

** Initialize multiple variables in a list with different values
make (var1:value1, var2:value2 ...) ∈  TypeName;
```



## Modify values

One can modify variables using _alter_ statement.

**example:**
```
make (a:10, b:0) ∈ Z; // initialize two variables

alter b := a + 1; // modify b using assign value
alter b += 1;     // modify b using modifier
print b;          // expected 12
```

**Notes:** 
* Multiple variables can be modified all at once when separated by comma;
* The alter statement can use operators { :=, :: } or a modifiers { += -= ÷= ·= ^= %= }

**Examples:**
```
** declare a constant
save pi := 3.14 ∈ R;

** declare multiple variables
make a   ∈ Z; //Integer 
make x,y ∈ R; //Double
make q,p ∈ L; //Logic

** using modifiers
alter a := 10; //modify value of a := 10
alter a += 1;  //increment value of a := 11
alter a -= 1;  //decrement value of a := 10

** modify two variables using one single constant
alter x, y := 10.5;

** modify two variables using two constants
alter q, p := True, False;  

** swapping two variables
alter p, q := q, p;
```

## Type conversion
 
When data type mismatch you must perform explicit conversion.

* Explicit conversion is using a symbolic operator: "->"
* This is unsafe operation. A range check is recommended before conversion;
* Data precision may suffer. Some decimals may be lost;
* If data do not fit in the new type, the overflow exception is raised.

**example:**
```
make (a: 0, b:20) ∈ Z;
make (v: 10.5, x: 0.0) ∈ R;

** explicit conversion
alter a := v -> N;
print a; //truncated to 10 

** explicit conversion
alter x := b -> R;
print x; //expect 20.00
```

**notes:** 
* making conversion will copy value not reference
* conversion to same data type is equivalent to copy "::"

## Alphanumeric type

Bee define A as single UTF-8 code point with representation: U+HH

```
make (a, b) ∈ A; //ASCII 
make (x, y) ∈ B; //Binary integer

alter a :='0';     //ASCII symbol '0'
alter x := a -> B; //convert to binary 30
alter y := 30;     //decimal code for '0'
alter b := y -> A; //convert to ASCII symbol '0'
```

## Type checking

We can use variable type to validate expression type.

```
make a := 0;   //integer variable
make b := 0.0; //real variable 

alter a:= 10.5; //Warning: a is of type: Integer  
alter b:= 10;   //Warning: b is of type: Real

print a, b; // 10, 10.00
```

You can use operator "∈" to verify data type:

```
make a := 0 ∈ Z;

** expected: Integer
fail if ¬ (a ∈ Z); // fail if a is not integer
```

## Logic type

Logic type is an enumeration of two public symbols: False and True

```
type .L: {.False: 0, .True: 1} <: Ordinal;

** printing logical values
print True;  //1
print False; //0
```

## Logic operations

Bee uses several familiar logic operators from mathematics:

* ¬ (not) 
* ∧ (and) 
* ∨ (or)  
* ⊕ (xor)  
 
Precedence: { ¬, ∧, ∨, ⊕ }. Symbol ¬ apply first (has higher precedence) 

**bitwise**

In Bee logic operators are also bitwise operators. You can use logic operators with numeric variables. 

```
print 4 ∨ 3 = 7; //1: 100 ∨ 011 = 111 = 7;
print 4 ∧ 7 = 4; //1: 100 ∧ 111 = 100 = 4;
```

**comparison**
Comparison operators will create a logical response: 1 = True or 0 = False

* comparison ( ≈, =, ≠, ≡, >, <, ≤, ≥)
* belonging  ( ∈, ⊃, ⊂ )

**example:**
```
make  (x, y) := 4 ∈  Z;  //primitive integer

** value comparison
print x = 4;  //1 (equal)
print x ≡ 4;  //1 (identical)
print x = y;  //1  
print x ≡ y;  //1 
print x ≠ 5;  //1 (different)
print x!≡ 5;  //1 (not identical)

** reference ordering
print x ≥ y;  //1: x and a are actually equal
print x ≥ 4;  //1: greater or equivalent to 4
print x ≤ 4;  //1: less than or equivalent to 4
print x > 4;  //0: not greater than 4
print x < 4;  //0: not less than 4


** arithmetic expressions have primitive results
print x - 4 = 0; //1 
print x - 4 ≡ 0; //1 
```

**singleton**

Primitive types are unique. That means they are identical.

```
** primitive values are singleton
print  1  ≡  1;  //1
print 's' ≡ 's'; //1
```

**Precedence:** 

Logic operators have greater precedence than comparison operators.

## Logical expression

Logical expression have value { 0 = False, 1 = True }

```
make x := False ∈ L; 
make y := True  ∈ L; 

** expressions with single operant
print   x; //0
print ¬ x; //1

** expressions with two operands
print (x = y); //0
print (x ≡ y); //0
print (x ≠ y); //1
print (x < y); //1
print (x > y); //0
print (x ∧ y); //0
print (x ∨ y); //1
print (x ⊕ y); //1
```
**Notes:** 
* Operators { ¬    } is unary operator;
* Operators { ∧, ∨ } are also bitwise operators;
* Operators { ¬, ⊕ } are also bitwise operators;
* Operators { «, » } are bitwise operators;

**coercion**
Any numeric expression ca be converted to logic using coercion operation `-> L`

```
make (x, y) ∈ L;
make (a:0.0, b:1.5) ∈ R;

alter x := a -> L; //0
alter y := b -> L; //1
```

**Notes:** 
* Only the integer part of a number is used in conversion to logical;
* Fraction is truncated before conversion to logical;
* A string: "Yes", "yes", "True", "true", "On","on", "T", "t" or "1" convert to: True = 1
* A string: "No", "no", "False", "false", "Off","off", "F", "f" or "0" convert to: False = 0

**design**

```
** logical values are singleton
print True  ≡ True;   //1
print False ≡ False;  //1

** logical values are numeric
print False - True; //-1 
print True  + True; //+2

** Null value is a singleton
print Null  ≡ Null   //1

** Null is not the same as false
print Null  ≡ False  //0
print Null  = False  //0
```


## Conditionals

A conditional is a logic expression used to control statement execution.

```
statement if condition;
```

The statement is executed only if the expression evaluate to True. 

**restrictions:**
1. Can not use "if" with type statement;
1. Can not use "if" with make statement;
1. Can not use "if" with block statement;

```
make a := 0 ∈ Z;

** conditional execution
alter a := 1 if a = 0;

** conditional print
print "a is 0" if a = 0;
print "a >  0" if a ≥ 0;
```

**Notes:** 
* Keywords "if" do not have "else"
* There is no ";" before "if" keyword

## Pattern Matching

Instead of ternary operator we use conditional expressions. 
These expressions are separated by coma and enclosed in ().

**Syntax:**

```
make var ∈ type;

** single condition matching
alter var := (exp if cnd1, def);


** multiple matching with default value
alter var := (exp1 if cnd1, xp2 if cnd2,..., def);

** alternative code alignment
alter var := 
  (exp1 if cnd1
  ,exp2 if cnd2
  ,def);
```

**Legend:**
 
* var  ::= predefined variable,
* exp1 ::= expression of same type with var,
* cnd1 ::= condition to produce exp1,
* def  ::= default expression (no condition).


**example:**
```
make x := '0'; //symbol
write "x:"
read   x;

make kind := ("digit" if x ∈ ['0'..'9'], "letter" if x ∈ ['a'..'z'], "unknown");
print ("x is " + kind); //expect: "x is digit"

over.
```

## Rules

Rules are named blocks of code, representing a program fragment that can be executed multiple times on demand.

**Notes:**
* A rule is declared with keyword _rule_;
* A rule can resolve a single task;
* A rule can have optional one or multiple results;
* A rule can have local variables and constants;
* A rule can have public attributes;

**Usability:**
A rule can be used for different purpose depending on a particular syntax pattern:

* Rule as function
* Rule as routine
* Rule as method
* Rule as generic

**Restrictions:**
* Rules are static: can not be created at runtime;
* Rules are primary: you can not create nested rules;
* Rules are not references: you can not pass around a rule;
* Rules can be call from other rules but not from lambda expressions;

### Parameters

Parameters are special variables defined in rule signature.

**Example:**
```
** a rule with two parameter
rule foo(name, message ∈ String):
  alter message:= "hello:" + name + ". I am Foo. Nice to meet you!";
return;

** using apply + rule name will execute the rule  
make str ∈ String;
apply foo("Bee", str);
print str; 
```

**Expected output:**

```
hello: Bee. I am Foo. Nice to meet you!
```

**Notes:**   
* Parameters are enumerated in a tuple;
* Some parameters can be optional if initialized;
* Optional parameters are initialized with pair-up operator ":";
* Native types are input parameters transfer value: _by copy_;
* Composite type and object parameters transfer value: _by share_;

### Results

A rule can have multiple results. Result variables must be declared and assigned.

**Example:** 

In this example we have a rule that return a list of two values.

```
** rule with two results "s" and "d"
** parameter x is mandatory y is optional
rule com(x ∈ Z, y:0 ∈ Z) => (s, d ∈ Z):
  alter s := x + y; 
  alter d := x - y;
return;

** capture result into a single variable
make  r := com(3,2); //create a list
print r; // (5,1) 

** deconstruction of result into variables: s, d
make  s, d := com(3,2);  // capture two values
print s, d, sep:"," ;    // 5,1 (use separator = ",")

** ignore one result using variable "_"
make  a, _ := com(3);
print a; // 3 
```

**Notes:**   
* Multiple results are declared with name and can also have initial value;
* A rule with multiple results can be called using spread operator (*) 
* You can capture results into multiple variables separated by comma;
* You can ignore one result using anonymous variable "_";
* Rules with multiple results can not be used in expressions;

### Rule as function

A rule with a single result can be used as a _function_;

**pattern:**
```
** define a functional rule
rule name(param ∈ type,...) => (result ∈ type):    
   ...
   exit if condition; //early transfer
   ...
   alter result := expression; //computing the result
   ...
return;

** direct call and print the result
print rule_name(argument,...);

** capture rule result and make a new variable:
make  r := rule_name(argument,...);

** capture result using existing variable:
make  n ∈ type;
alter n := rule_name(argument,...)

```

**Restrictions:**
A rule is pure if:

* do not have multiple results but one;
* do not have public attributes;
* do not perform unsafe data conversions;
* do not raise any unhandled errors;
* do not have side-effects;
* do not call a downgraded rule;

**Notes:**
* Usually a pure rule is also deterministic;
* If a rule break one of these restrictions it is _downgraded_ by the compiler;
* Downgraded rules can be used in assignments and print but not in expressions;
* A downgraded rule that is not _pure_ can be called also a _dirty rule_ ;

**See also:**
* [bs.bee](./demo/bs.bee); //Bubble Sort

## Rule as routine

A rule that have no results can be called _routine_: 

**properties:**

* A routine can have attributes;
* A routine can have side-effects;
* A routine can modify shared variables;
* A routine can call any other routine;

**attributes:**

Attributes of a routine are local variables starting with dot prefix.

**pattern:**
```
rule rule_name(param ∈ type,...):   
   make (.x, .y, .z) := 0 ∈ Z; 
   ...
return;

** modify rule states
alter rule_name.x  := 1;
alter rule_name.y  := 2;
alter rule_name.z  := 3;

** read rule states
print (rule_name.x, rule_name.y, rule_name.z); //1 2 3

** execute a rule that has no results:
apply rule_name(param:argument, ...);
```

**Notes:**
* Rule attributes are public and can be accessed using scope qualifier;
* Rule attributes represent _states_ and can be initialized one single time;

## Rule as method

A rule binding first parameter to an object or composite type is called: _method_ 

**properties:**

* A method can have results;
* A method can have side-effects;
* A method is defined in same module as the data type;
* A method can be overwritten in another module;

**pattern:**
```
type ObjType: {attribute:type, ...} <: Object;

rule method_name(self ∈ ObjType, param ∈ type,...) => (result ∈ type):
   ...
   result := expression;
return;

** create an object instance
make obj := {attribute:value, ...} ∈ ObjectYpe;

** execute a method and ignore the result
apply obj.method_name(argument, ...);
```

See also: [Composite:Object](composite#object)

## Rule as generic

A _generic rule_ is a _prototype_ that can be _cloned_ to create _dynamic rules_.

**pattern:**
```
** define a rule prototype 
rule prototype_name{attributes}(parameters) => (result ∈ Type):
  ...
  ** a prototype can have public attributes
  ** these attributes are shared between all clones
  make (.x, .y, .z) := 0 ∈ Z;  
  ...
  
  ** compute the result
  alter result := expression(arguments);
return;

** making a clone from prototype
make new_rule := prototype_name{arguments};
fail if ¬ (new_rule is Rule); 

** using the clone
make r := new_rule(arguments);
```

**Notes:**
* A clone have same _parameters_ same _results_ and same functionality as the prototype;
* A clone has its  _own attributes_: defined using curly brackets {attributes}; 
* A clone has some _shared attributes_: defined in the prototype with dot prefix;
* A clone can be created in _local context_ of another rule or in _component context_;

**example:**
```
** this is a generic rule
rule shift{s ∈ Z}(i ∈ Z) => (r ∈ Z):
  alter r := (s + i);
return;

** instantiate two clones:
make inc(i ∈ Z) := shift{+1} => (r ∈ Z); //increment 
make dec(i ∈ Z) := shift{-1} => (r ∈ Z); //decrement 

** verify clone attributes
print inc.s; //  1
print dec.s; // -1

** use first clone: inc()
print inc(1); // 2
print inc(4); // 5

** use second clone: dec()
print dec(1); // 0
print dec(2); // 1
```

## Forward declaration

Hoisting is a technique used by many compilers to identify declarations of members. Using this technique you can use an identifier before it is defined. In Bee there is no hoisting technique. You can not use an identifier before it is declared or loaded. 

Two rules may call each other and create a cyclic interdependence. For this you can declare a rule "signature" before implementing it. That is called "forward declaration". Therefore the main rules are usually defined on the bottom of the source code.

```
** forward declaration for rule "plus"
rule plus(Z,Z) ∈ Z; //signature

** execute before implementation
print plus(1,1);

print;

** later implement the rule "plus"
rule plus(a,b ∈ Z) => (r ∈ Z): 
  alter r := (a + b);
return;

over.
```

## External rules

In Bee you can use external rules from C language.
These rules are usually wrapped in modules.

**Example:**
This is myLib.bee file: 
```
module myLib:

load $bee.lib.cpp.myLib; //load cpp library

** define a wrapper for external "fib"
rule fib(n ∈ Z) => (x ∈ Z));
  alter x := myLib.fib(n);
return;
```

This is the driver file.
```
driver main:

** load library
load myLib := $bee.lib.myLib;

** use external rule
print myLib.fib(5);
```

To understand more about interacting with other languages check this article about ABI:
[Application Binary Interface](https://en.wikipedia.org/wiki/Application_binary_interface)

**Demo:**
* [fn.bee](./demo/fn.bee): lambda as expression  
* [rp.bee](./demo/rp.bee): lambda as parameter
* [pm.bee](./demo/pm.bee): pattern matching rules 
* [fi.bee](./demo/fi.bee): recursive rules
* [ho.bee](./demo/ho.bee): higher order rules

**Read Next:** [Control Flow](control.md)