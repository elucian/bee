## Syntax Overview

We have used a _simple design_ for notation based on examples and notes:

* We use suggestive descriptors;
* We use "::=" to explain a descriptor;
* We use "..." for repetitive sequences;
* We use notes to explain the semantics;

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
* [Lambda expressions](#lambda-expressions)
* [Rule as function](#Rule-as-function)
* [Rule as routine](#Rule-as-routine)
* [Rule as method](#Rule-as-method)
* [Rule as generic](#Rule-as-generic)
* [External rules](#external-rules)

## Expressions
Expressions are created using identifiers, operators, rules and constant literals. 

* can use () to establish order of operations;
* can be enumerated using comma separator ","
* can be combined to create more complex expressions;
* have type that is calculated using type inference;
* have a result that can be assigned to variables;
* have a result that can be printed to console;

**Examples**
```# simple expressions in print statement# no need for parentheses for a single value
print 10; 
print "this is a test";

# complex expressions can use ()
print (10 + 10 + 15);  
print (10 > 5 | 2 < 3);
# enumeration of multiple expressions# print: separate multiple values with one space
print (1,',',2,',',3);
print (10, 11, 12);

# to avoid new line and spaces use "write"
write 0;     ** no need for parenthesis 
write (1,2); ** writing a list
write (3,4); ** writing 
# after write use print to write a new line
print; ** 01234
# Calculation that fail will generate an error
alter x := 5 ∈ R;
alter x := x ÷ 0; ** error: division by 0
```

**Notes:** 
* print statement can receive multiple arguments;
* multiple arguments are separated by comma;
* multiple arguments are enclosed in parenthesis;
* print statement add new line by default;
* write statement can be used to avoid new line;

**Data types**

Bee use 3 kind of data types:

1. Native data types;
2. Primitive data types;
3. Composite data types;

## Native Types

Native types are defined using one small letter followed by a number.

| Type | Sign      |Bytes|Description
|------|-----------|-----|------------------------------------------------------------
| u8   | unsigned  | 1   |Unsigned 8  bit, max: 0xFF 
| u16  | unsigned  | 2   |Unsigned 16 bit, max: 0xFFFF
| u32  | unsigned  | 4   |Unsigned 32 bit, max: 0xFFFFFFFF
| u64  | unsigned  | 8   |Unsigned large positive integer [0..+]
| i8   | signed    | 1   |Signed half   integer 8  bit  [-128..127]    
| i16  | signed    | 2   |Signed short  integer 16 bit  [-32768..+32767]
| i32  | signed    | 4   |Signed binary integer 32 bit  [-..+]
| i64  | signed    | 8   |Signed large  integer 64 bit  [-..+]
| f32  | signed    | 4   |Double precision float (0..+)
| f64  | signed    | 8   |Double precision float (-..+)

## Primitive Types

Primitive data types are defined using one capital letter. 

| Name     |Ref |Native| Description
|----------|----|------|-------------------------------------------------------------
| Logic    | L  | u8   | Numeric enumeration of two values: False:0, True:1 
| Alpha    | A  | u8   | Alpha-numeric code point 8 bit, max: U+FF 
| Word     | W  | u16  | Unicode code point on 16 bit, max: U+FFFF (UTF16)
| Unicode  | U  | u32  | Unicode code point on 32 bit, max: U-FFFFFFFF (UTF32)
| Rational | Q  | u32  | Fraction like 1/2 or fix point representation: Q14.17 
| Natural  | N  | u64  | Unsigned large positive integer [0..+]
| Binary   | B  | i32  | Signed binary integer 32 bit  [-..+]
| Integer  | Z  | i64  | Signed large  integer 64 bit  [-..+]
| Positive | P  | f32  | Double precision float (0..+)
| Real     | R  | f64  | Double precision float (-..+)

**notes:**

* Primitive data types are references to native types,
* Type inference will create primitive data types,

## Constant Literals

These are symbolic representations for primitive data types:

|Example    | Type  | Literal characters
|-----------|-------|-----------------------------------------------------------
|False      |  L    | (0,1)
|True       |  L    | (1,0)
|123        |  Z    | (0,1,2,3,4,5,6,7,8,9)
|0b10101010 |  B    | (0b) & (0,1)
|U+FF       |  A    | (U+) & (0,1,2,3,4,5,6,7,8,9) & ABCDEF
|U+FFFF     |  W    | (U+) & (0,1,2,3,4,5,6,7,8,9) & ABCDEF
|U-FFFFFFFF |  U    | (U-) & (0,1,2,3,4,5,6,7,8,9) & ABCDEF
|0xFFFFFFFF |  N    | (0x) & (0,1,2,3,4,5,6,7,8,9) & ABCDEF
|0.05       |  R    | (.)  & (0,1,2,3,4,5,6,7,8,9) 
|1/2        |  Q    | (/)  & (0,1,2,3,4,5,6,7,8,9)
|1E10       |  R    | (1E) & (0,1,2,3,4,5,6,7,8,9) 
|1e10       |  R    | (1e) & (0,1,2,3,4,5,6,7,8,9) 
|9r+9j      |  C    | (r+j)& (0,1,2,3,4,5,6,7,8,9)
|9r-9j      |  C    | (r-j)& (0,1,2,3,4,5,6,7,8,9)

**pattern:**
```
make name := constant ∈ Type; ** full declaration
make name := constant;  ** partial declaration
```

**example:**
```
make n := U+2200 ∈ A;  ** Symbol: ∀
```

**Note:** 
* U is reserved letter that signify: Unsigned \| Unicode;
* Compiler will find "U+" and "U-" unique;
* After U+ compiler is expecting 4 hexadecimal symbols;
* After U- compiler is expecting 8 hexadecimal symbols;

## Reference Types

Most data types are references except native types that are values.

**identifiers...**

* native type name start with lowercase letter follow by a number representing bit length;
* primitive reference type name consist of a single capital letter;
* composite reference type name can start with a capital letter or Unicode symbol;

**examples:**
```
u8   ** native type: byte
i32  ** native type: binary integer
Z    ** primitive type: long integer
R    ** primitive type: double float
Q5.2    ** primitive type: precision 0.25 
Object  ** composite type: root class for objects
File    ** composite type: text file

```
**boxing**

Boxing is the process of converting a native type to reference type. This will wrap the value and stores it on the heap. Auto-boxing is possible if the types are compatible. Otherwise you must perform explicit boxing.

```
make k ∈ Z;    ** reference integer
make n ∈ i64;  ** native integer

alter k := n;      ** auto-boxing
alter k := n as Z; ** explicit boxing
# reference identity
print n = k; ** 1 (same value)
print n ≡ k; ** 0 (different location)
# consequence
alter n := 2;  ** i = 2 (modified)
print k;       ** k = 0 (unmodified)

```

**unboxing**

Unboxing is the process of converting a reference to a native type. This will unwrap the value from the heap and stores it on the stack. Unboxing is always explicit. If you try to do implicit unboxing the compiler will signal an error.

```
make r := 10 ∈ Z;   ** reference to integer
make n := 0  ∈ i32; ** native type

alter n := r as i64; ** explicit unboxing
# verify value identity
print n = r; ** 1 (same value)
print n ≡ r; ** 0 (different location)
# consequence
alter n += 2;  ** n = 12 (modified)
print r;       ** r = 10 (unmodified)
```

**share vs copy**

* A reference is shared using operator ":=".
* An object is copied using operator   ":+".

```# create a reference
make  a := 1 ∈ Z;
# transfer reference value
make  c := a; ** share a reference

print c = a; ** 1: same value
print c ≡ a; ** 1: same reference
# transfer value by copy
make  b :+ a ; ** new reference

print a = b; ** 1: same value
print a ≡ b; ** 0: different reference
```

## Composite types

Predefined composite types are defined using a single capital letter: 


| Name    | Symbol | Description
|---------|--------|----------------------------------------------------------------
| Complex | C      | Complex number, pair of 2 double numbers (r+i)
| String  | S      | Short string encoded as UTF8 (Array)
| Text    | X      | Large blob text encoded as UTF8 (Rope or Radix Tree) 
| Date    | D      | DD/MM/YYYY 
| Time    | T      | hh:mm,ms
| Error   | E      | Exception object: {code, message, line}
| File    | F      | File handler

**Notes:**
* Composite variables are references;
* Composite variables have variable size;
* Composite variables are  allocated on the heap;

## Collection types

Bee define a collection literal using a special notation based on brackets.

| sym| Collection type
|----|------------------------------------------------------------------
| () | Expression/ Tuple / List
| [] | Array/ Matrix/ Dynamic Array
| {} | Ordinal / Set / Hash  / Object

**Notes:** 
* All collections are references; 
* Collection elements can be references or native types;

## Type declaration

User can define composite types and sub-types using operator "<:" (sub-type).

```
# declare new type
type Type_Identifier := type_descriptor <: super_type

# declare new references
make var_name,var_name ... ∈ Type_Identifier
```

**Notes:**

* User defined types are reference types;
* User defined types start with uppercase letter;
* Public user types start with dot prefix;
* Super-type can be referenced by single letter or by full name;

**Example:**
```
type Digit := (0..9) <: W;    ** superset default notation
type Digit := (0..9) <: Word; ** superset equivalent full name 
```

## Domain subtypes

Domain notation is used to create a subset from a superset.

**syntax**

```
type Domain_Name = (min..max:rate) <: Primitive_Type;
```

**Examples:**
```# sub-type declarations
type Positive  := (0..+:0.01) <: Q; 
type Negative  := (-..0:0.01) <: Q; 
type Digit     := (0..9) <: Z;      
type Alpha     := (`A`..`z`) <: A;  
type Latin     := (U+0041..U+FB02) <: U;

# check variable belong to sub-type
when (`x` ∈ Alpha) do
  print 'yes';
else
  print 'no';
done;
```

**Notes:**

* Use n.!m to exclude upper limit from range,
* Use n!.m to exclude lower limit from range,
* Use n!!m to exclude both limits from range,
* Use symbol - for unlimited negative number,
* Use symbil + for unlimited positive number.

**example:**
```# continuous default rate is 1
print (0..5); ** 0,1,2,3,4,5
print (0.!5); ** 0,1,2,3,4

```

## Domain segments

A domain can use a special notation for multiple numeric intervals called segments.

**syntax:**
```
(segment, segment ...) ** continuous domain notation
```

* segment ::= n..m:ratio  ** include n, include m if (m % ratio) = 0
* segment ::= n!.m:ratio  ** exclude n, include m if (m % ratio) = 0
* segment ::= n.!m:ratio  ** include n, exclude m 
* segment ::= n!!m:ratio  ** exclude both n and m

**example:**
```# integer domain with two segments
type ZDom := (-9..1,1..9) <: Z; 
# integer domain with two segments and ratio
type ZDom := (0..8:2,1..9:2) <: Z; 
# real domain with two rations: 0.01 and 0.1
type RDom := (0.!10:0.01,10..100:0.1) <: R; 
# two rational segments with same ratio: 0.01
type QDom := (-10..-1:0.01, 1..10:0.01) <: Q; 
```

## Constant declaration

Constants are identifiers representing a non-mutable value.

```
make constant_name :: constant_literal;
make constant_name :: constant_literal ∈ type_name;
```

**Notes:** 

* Constant initial value is assigned using operator "::",
* System constants have prefix "$" and are public all the time,
* Other constants can be public if they are using prefix ".",
* Local constants are also possible and encouraged if necessary.

## Variable declarations

Variables are defined using keyword _make_ plus one of the operators:

operator | purpose
---------|------------------------------------------------------------------
 ∈       | declare variable/element type 
 :       | initialize element value
 :=      | initialize variable \| assign by share 
 :+      | initialize variable \| assign by copy
 
```# primitive variable declarations with type
make var_name ∈  type_name;
make var_name := constant ∈ type_name;
# partial declaration using type inference
make var_name := constant; 
make var_name := expression; 
```

Multiple variables can be define in one single line using comma separator:
```
make var_name, var_name ... ∈ Type;
make var_name, var_name ... := expression ∈ Type;
```

## Modify values

One can modify variables using _alter_ statement.

**example:**
```
make a := 10, b := 0 ∈ Z;

alter b := a + 1; ** modify b underline value
alter b += 1;     ** modify b using modifier
print b;          ** expected 12
```

**Notes:** 
* Multiple variables can be modified all at once when separated by comma;
* The alter statement can use operator { := } or a modifier { += -= ÷= ·= ^= %= }

**Examples:**
```# declare a constant
make pi :: 3.14 ∈ R;
# declare multiple variables
make a   ∈ Z;  ** Integer 
make x,y ∈ R;  ** Double
make q,p ∈ L;  ** Logic

# using modifiers
alter a := 10;  ** modify value of a := 10
alter a += 1;   ** increment value of a := 11
alter a -= 1;   ** decrement value of a := 10
# modify two variables using one constant
alter (x, y) := 10.5;
# modify two variables using two constants
alter (q, p) ? (True, False);  
```

## Type conversion
 
When data type mismatch you must perform explicit conversion.

* Explicit conversion is using a keyword for operator: "as"
* This is unsafe operation. A range check is recommended before conversion;
* Data precision may suffer. Some decimals may be lost;
* If data do not fit in the new type, the overflow exception is raised.

**example:**
```
make a := 0, b := 20 ∈ Z;
make v := 10.5, x := 0.0 ∈ R;

# explicit conversion
alter a := v as N;
print a; ** truncated to 10 

# explicit conversion
alter x := b as R;
print x; ** expect 20.0
```

## Alphanumeric type

Bee define A as single UTF-8 code point with representation: U+HH

```
make a, b ∈ A; ** ASCII 
make x, y ∈ B; ** Binary integer

alter a := '0';     ** ASCII symbol '0'
alter x := a as B;  ** convert to binary 30
alter y := 30;      ** decimal code for '0'
alter b := y as A;  ** convert to ASCII symbol '0'
```

## Type checking

We can use variable type to validate expression type.

```
make a := 0;    ** integer variable 
make b := 0.0;  ** real variable 

alter b := 10;    ** FAIL: b is of type: Real
alter a := 10.5;  ** FAIL: a is of type: Integer
```

You can use operator "is" to verify data type

```
make a := 0 ∈ Z;
# expected: Integer
fail "Unexpected error: a is not Integer" if ¬ (a is Z);
```

## Logic type

Logic type is an enumeration of two public symbols: False and True

```
type .L := {.False:0, .True:1} <: Ordinal;

# printing logical values
print True;   ** 1
print False;  ** 0
```

## Logic operations

Bee uses several familiar logic operators:

*  ¬ (not) 
*  ∧ (and) 
*  ∨ (or)  
*  ⊕ (xor)  
 
Precedence: { ¬, ∧, ∨, ⊕ }

**comparison**
Comparison operators will create a logical response: False = 0 or True = 1.

* comparison ( ≈, =, ≠, ≡, >, <, ≤, ≥)
* belonging  ( ∈, ⊃, ⊂ )

**example:**
```
make x := 4 ∈ Z;

print x = 4 ; ** 1 (equal)
print x ≡ 4 ; ** 0 (not identical)

when (x = 4) ∧ (x - 4 = 0) do
  print "True";
else
  print "False";  
done;
```


**design**
```# logic values are numeric
print False - True;  ** -1 
print True  + True;  ** +2
```

**Precedence:** 

Logic operators have greater precedence than comparison.

## Logical expression

Logical expression have value { False, True }

```
make x := False; ** Type = L
make y := True;  ** Type = L

# simple expressions
print   x; ** 0
print ¬ x; ** 1

# complex expressions
print  (x = y); ** 0
print  (x ≠ y); ** 1
print  (x < y); ** 1
print  (x > y); ** 0
print  (x ∧ y); ** 0
print  (x ∨ y); ** 1

```
**Notes:** 
* Operators { ¬    } is unary operator;
* Operators { ∧, ∨ } are also bitwise operators;
* Operators { ¬, ⊕ } are also bitwise operators;
* Operators { «, » } are bitwise operators;

**coercion**
Any numeric expression ca be converted to logic using coercion operation `-> L`

```
make x, y ∈ L;
make a := 0.0, b := 1.5;

alter x := a as L; ** 0
alter y := b as L; ** 1
```

**Notes:** 
* Only integer part of a number is used in conversion;
* Fraction is truncated before conversion to logic type;
* A string: "Yes", "yes", "True", "true", "T" or "t" or "1" convert to: True = 1
* A string: "No", "no", "False", "true", "F" or "f" or "0" convert to: False= 0


## Conditionals

A conditional is a logic expression used to control statement execution.

```
statement if (condition)
```

The statement is executed only if the expression evaluate to True. 

**notes:**
1. Conditional expression must be enclosed in ();
1. Conditional can not be associated with type statement;
1. Conditional can not be associated with make statement;
1. Conditional can not be associated with a block statement;

```
make a := 0 ∈ Z;
# conditional execution
alter a := 1 if (a = 0);
# conditional print
print "a is 0" if (a = 0);
print "a >  0" if (a ≥ 0);
```

**Notes:** 
* Keyword "if" and "else" are not related
* Conditions are enclosed in ()

## Pattern Matching

Instead of ternary operator we use conditional expressions. 
These expressions are separated by coma and enclosed in ().

**Syntax:**

```
make var_name ∈ type;
# single condition matching
alter var_name := (xp if cnd1, dx);

# multiple matching with default value
alter var_name := (xp1 if cnd1, xp2 if cnd2,... dx);
# alternative code alignment
alter var_name := (
   xp1 if cnd1,
   xp2 if cnd2,
   dx);
```

**Legend:**
 
```
var  := predefined variable
xp1  := expression of same type with <v>
cnd1 := condition for <xp1>
dx   := default expression (optional condition).
```

**example:**
```
make x := '0';
read (x,"x:>");

make kind := ("digit" if x ∈ ['0'..'9'], "letter" if x ∈ ['a'..'z'] | "unknown");
print ("x is " + kind); ** expect: "x is digit"
over.
```

## Lambda expressions

A lambda expressions is a named expression with specified result type:

**syntax**

```# simple declaration of Lambda expression using type inference
make name := (param ∈ Type,...) ∈ Type => (expression);
```

```# you can define a lambda signature first
type SigName := (Type,...) ∈ Type <: Lambda;
# then you can use the signature to create expression
make name := SigName(param ∈ Type,...) ∈ Type => (expression);
```

**Example:** 

```# define "exp" as Lambda expression
make exp := (x,y ∈ Z) ∈ Z => (x + y);
# "exp" type is created using type inference
print type(exp); ** Lambda
# use the lambda expression
make z := 1 + 2 · exp(1,1) ;
print  z;  ** print 5
```

**properties:**

Lambda Expressions...
* are similar to mathematical functions;
* are binding external states in context;
* can be used in other expressions;
* can be used as parameter in rules;
* can be created from a rule as a result;
* can be assigned to a variable of type: Lambda

**restrictions:**
* can have one single result;
* can not be interrupted from execution;
* can not call any rule that is downgraded;
* do not have internal states;
* do not have side-effects;
* do not depend on external states;

**result:**
* result can be primitive or native type but not a collection;
* result can be temporary and can be used in other expressions;


## Rules

Rules are named blocks of code, representing a program fragment that can be executed multiple times on demand.

**Notes:**
* A rule is declared with keyword _rule_;
* A rule can resolve a single task;
* A rule can have input and output parameters;
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
```# a rule with two parameter
rule foo(name ∈ S, message @ S):
  alter message:= "hello:" + name + ". I am Foo. Nice to meet you!";
return;
# using apply + rule name will execute the rule  
make str ∈ S;
apply foo("Bee", str);
print str; 
```

**Expected output:**

```
hello: Bee. I am Foo. Nice to meet you!
```

**Notes:**   
* Parameters are enumerated in a tuple;
* Input parameters can be optional, output parameters are mandatory;
* Optional parameters are initialized with pair-up operator ":";
* Input parameters are defined with "∈" and transfer value: _by copy_;
* Output parameters are defined with "@" and transfer value: _by share_;

### Results

A rule can have multiple results. For binding results to variables we are using operator: "+>"

**Example:** 
```# rule with two results "s" and "d"
rule com(x,y ∈ Z) => (s, d @ Z):
  alter s := x + y; 
  alter d := x - y;
return;
# capture result into new variables b, c
make b, c ∈ Z;
apply com(3,2) +> (b, c);

print b;  ** 5 
print c;  ** 1 
```

**Notes:**   
* Operator "+>" is named "capture operator" not "binding operator";
* A rule with multiple results can not be used in expressions;
* Multiple results are defined with names, exactly like parameters;
* You can captured results into multiple variables using _apply_;

### Rule as function

A rule with a single result can be used as a _function_;

**pattern:**
```# define a functional rule
rule name(param ∈ type,...) => (result @ type):    
   ...
   exit if (condition); ** early transfer
   ...
   alter result := expression; ** computing the result
   ...
return;
# direct call and print the result
print rule_name(argument,...);
# capture rule result and make a new variable
make  r := rule_name(argument,...);
# capture result using explicit variable:
make  n ∈ type;
alter n := rule_name(argument,...)
# call using _apply_ and capture a single variable using "+>"
apply rule_name(argument,...) +> n

```

**Restrictions:**
A function is pure if:

* do not have multiple results but one;
* do not have public attributes;
* do not perform unsafe data conversions;
* do not raise any unhandled errors;
* do not have side-effects;
* do not call a downgraded function;

**Notes:**
* Usually a pure function is also deterministic;
* If a rule break one of these restrictions it is _downgraded_ by the compiler;
* Downgraded rules can be used in assignments and print but not in expressions;
* A downgraded rule can be called also _dirty rule_ that is not _pure_;

**See also:**
* [bs.bee](../demo/bs.bee);   ** Bubble Sort

## Rule as routine

A rule that have no results can be called _routine_: 

**properties:**

* A routine can have attributes;
* A routine can have side-effects;
* A routine can modify component variables;
* A routine can call any other routine;

**attributes:**

Attributes of a routine are local variables starting with dot prefix.

**pattern:**
```
rule rule_name(param ∈ type,...):   
   make .x, .y, .z := 0 ∈ Z; 
   ...
return;
# modify rule states
alter rule_name.x = 1;
alter rule_name.y = 2;
alter rule_name.z = 3;
# read rule states
print (rule_name.x, rule_name.y, rule_name.z);  ** 1 2 3
# execute a rule that has no results:
apply rule_name(param:argument, ...);
```

**Notes:**
* Rule attributes are public and can be accessed using scope qualifier;
* Rule attributes represent _states_ and can be initialized one single time;

## Rule as method

A rule binding first parameter to input/output is called: _method_ 

**properties:**

* A method can have results;
* A method can have side-effects;
* A methods is defined in same component as the data type;
* A method can be overwritten in another component;

**pattern:**
```
type ObjType: {attribute:type, ...} <: Object;

rule method_name(bind: @ ObjType, param ∈ type,...) => (result @ type):
   ...
   result := expression;
return;
# create an object instance
make obj := {attribute:value, ...} ∈ ObjectYpe;
# execute a method and ignore the result
apply obj.method_name(argument, ...);
```

See also: [Composite:Object](composite#object)

## Rule as generic

A _generic rule_ is a _prototype_ that can be _cloned_ to create _dynamic rules_.

**pattern:**
```# define a rule prototype 
rule prototype_name{attributes}(parameters) => (result @ Type):
  ...
  ** a prototype can have attributes
  ** these attributes are shared between all clones
  make .x, .y, .z := 0 ∈ Z;  
  ...
  
  ** compute the result
  alter result := expression(arguments);
return;
# making a clone from prototype
make new_rule := prototype_name{arguments};
fail if ¬ (new_rule is Rule); 
# using the clone
make r := new_rule(arguments);
```

**Notes:**
* A clone have same _parameters_ same _results_ and same functionality as the prototype;
* A clone has its  _own attributes_: defined using curly brackets {attributes}; 
* A clone has some _shared attributes_: defined in the prototype with dot prefix;
* A clone can be created in _local context_ of another rule or in _component context_;

**example:**
```# this is a generic rule
rule shift{s ∈ Z}(i ∈ Z) => (r @ Z):
  alter r := (s + i);
return;
# instantiate two clones:
make inc(i ∈ Z) := shift{s: +1} => (r @ Z); ** increment 
make dec(i ∈ Z) := shift{s: -1} => (r @ Z); ** decrement 
# verify clone properties
print inc.s; **  1
print dec.s; ** -1
# use first clone: inc()
print inc(1); ** 2
print inc(4); ** 5
# use second clone: dec()
print dec(1); **  0
print dec(2); **  1
```

## External rules

In Bee you can use external rules from C language.
These rules are usually wrapped in modules.

**Example:**
This is myLib.bee file: 
```
module  myLib;

load myLib := $bee.lib.cpp.myLib; ** load cpp library
# define a wrapper for external "fib"
rule fib(n ∈ Z) => (x @ Z));
  alter x := myLib.fib(n);
return;
```

This is the driver file.
```
driver main:
# load library
load myLib := $bee.lib.myLib;

# use external rule
print myLib.fib(5);
```

To understand more about interacting with other languages check this article about ABI:
[Application Binary Interface](https://en.wikipedia.org/wiki/Application_binary_interface)

**Demo:**
* [fn.bee](../demo/fn.bee): lambda as expression  
* [rp.bee](../demo/rp.bee): lambda as parameter
* [pm.bee](../demo/pm.bee): pattern matching rules 
* [fi.bee](../demo/fi.bee): recursive rules
* [ho.bee](../demo/ho.bee): higher order rules

**Read Next:** [Control Flow](control.md)