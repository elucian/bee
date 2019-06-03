## Syntax Overview

I have used a simple design notation based on examples and notes:

* I have used suggestive descriptors;
* I have used "::=" to explain a descriptor;
* I have used "..." for repetitive sequences;
* I have used notes to explain the semantics;

**bookmarks**

* [Expressions](#expressions)
* [Primitive types](#primitive-types)
* [Constant literals](#constant-literals)
* [Reference types](#reference-types)
* [Composite types](#composite-types)
* [Collection types](#collection-types)
* [Type declaration](#type-declaration)
* [Range subtypes](#range-subtypes)
* [Domain subtypes](#domain-subtypes)
* [Logical expression](#logical-expression)
* [Conditionals](#conditionals)
* [Pattern matching](#pattern-matching)
* [Static rules](#static-rules)
* [Dynamic rules](#dynamic-rules)
* [Generic rules](#generic-rules)
* [Expression rules](#expression-rules)
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
```
-- simple expressions in print statement
-- no need for parentheses for a single value
print 10; 
print "this is a test";

--complex expressions can use ()  
print (10 + 10 + 15);  
print (10 > 5 | 2 < 3);

-- enumeration of multiple expressions
-- print: separate multiple values with one space
print (1,',',2,',',3);
print (10, 11, 12);

--to avoid new line and spaces use "write"
write 0;
write (1,2);
write (3,4);

-- after write use print to write a new line
print; --01234

-- Calculation that fail will generate an error
alter x := 5 ∈ R;
alter x := x ÷ 0; -- error: division by 0
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

**pattern**
```
make name := constant ∈ Type; -- full declaration
make name := constant;  -- partial declaration
```

**example**
```
make n := U+2200 ∈ A;  -- Symbol: ∀
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
* composite reference type name can start with a small letter but second must be capital letter;

**examples:**
```
u8  -- native type: byte
i32 -- native type: binary integer
Z   -- primitive type: long integer
R   -- primitive type: double float
mL  -- composite type: map Link
gC  -- composite type: graphic canvas
```
**boxing**

Boxing is the process of converting a native type to reference type. This will wrap the value and stores it on the heap. Auto-boxing is possible if the types are compatible. Otherwise you must perform explicit boxing.

```
make k ∈ Z;    -- reference integer
make n ∈ i64;  -- native integer

alter k := n;      -- auto-boxing
alter k := n -> Z; -- explicit boxing

-- reference identity
print n = k; -- 1 (same value)
print n ≡ k; -- 0 (different location)

-- consequence
alter n := 2;  -- i = 2 (modified)
print k;       -- k = 0 (unmodified)

```

**unboxing**

Unboxing is the process of converting a reference to a native type. This will unwrap the value from the heap and stores it on the stack. Unboxing is always explicit. If you try to do implicit unboxing the compiler will signal an error.

```
make r := 10 ∈ Z;   -- reference to integer
make n := 0  ∈ i32; -- native type

alter n := r -> i64; -- explicit unboxing

-- verify value identity
print n = r; -- 1 (same value)
print n ≡ r; -- 0 (different location)

-- consequence
alter n += 2;  -- n = 12 (modified)
print r;       -- r = 10 (unmodified)
```

**share vs copy**

* A reference is shared using operator ":=".
* An object is cloned using operator   ":+".

```
-- create a reference
make  a := 1 ∈ Z;

-- transfer value by share
make  c := a; -- same reference

print c = a; -- 1: same value
print c ≡ a; -- 1: same location

-- transfer value by copy
make  b :+ a ; -- new reference

print a = b; --> 1: same value
print a ≡ b; --> 0: different location
```

## Composite types

Composite types are using English full name and start with uppercase.

| Name    | Bee | Description
|---------|-----|----------------------------------------------------------------
| Complex | C   | Complex number, pair of 2 double numbers (r+i)
| String  | S   | Short string encoded as UTF8 (Array)
| Text    | X   | Large blob text encoded as UTF8 (Rope or Radix Tree) 
| Date    | D   | DD/MM/YYYY 
| Time    | T   | hh:mm,ms
| Error   | E   | Exception object: {code, message, line}
| File    | F   | File handler

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

**Notes** 
* All collections are references; 
* Collection members can be references or native types;

## Type declaration

User can define composite types and sub-types using operator "<:" (sub-type).

```
--declare new type
type Type_Identifier := type_descriptor <: super_type

--declare new references
make var_name,var_name ... ∈ Type_Identifier
```

**Notes:**

* User defined types are reference types;
* User defined types start with uppercase letter;
* Public user types start with dot prefix;

## Range subtypes

Range notation is used to create a subtype.

**syntax**

```
-- discrete range
type Range_Name = [min..max:rate] <: Discrete_Type;

-- continuous range
type Range_Name = (min..max:rate) <: Continuous_Type;
```

**Examples:**
```
-- sub-type declarations
type Positive  := (0..+) <: Q;
type Negative  := (-.!0) <: Q;
type Digit     := [0..9] <: Z;
type Alpha     := [`A`..`z`] <: A;
type Latin     := [U+0041..U+FB02] <: U;

--Check variable belong to sub-type
when (`x` ∈ Alpha) do
  print 'yes';
else
  print 'no';
done;
```

**Notes:**

* Range expression: [n..m] is of type Z;
* Range expression: (n..m) is of type Q;
* Use n.!m to exclude upper limit from range;
* Use n!.m to exclude lower limit from range;
* Use n!!m to exclude both limits from range;
* Use - for unlimited negative
* Use + for unlimited positive 

**example:**
```
-- continuous range is controlled by:
#range.rate  := 0.01; -- default rate for continuous range
#range.count := 1000; -- how many generated before give up

-- continuous default rate is 1
print [0..5]; --0,1,2,3,4,5
print [0.!5]; --0,1,2,3,4

-- integer with rate 2
print [0..10:2]; --0,2,4,6,8,10
print [1..10:2]; --1,3,5,7,9

-- continuous range with rate = 0.1
print (0..0.5:01);  -- 0,0.1,0.2,0.3,0.4,0.5

-- continuous range with rate 0.25
print (0!!1:0.25);  -- 0.25,0.5,0.75
```

## Domain subtypes

A domain is using a special notation for data ranges containing more then one segment.

**example:**
```
-- discrete domain
type DDom := [-9..1,1..9] <: Z; -- two segments of type integer

-- rational domain (default rate = 0.1)
type RDom := (-10..-1:0.1, 1..10:0.1) <: Q; -- two segments of type rational

```

**syntax:**
```
(segment, segment ...) -- continuous domain notation
[segment, segment ...] -- discrete domain notation
```

* segment ::= x,... -- enumeration segment
* segment ::= n..m  -- range segment 
* segment ::= n!.m  -- exclude n, include m
* segment ::= n.!m  -- include n, exclude m
* segment ::= n!!m  -- exclude both n, m

## Constant declaration

Constants are protected memory locations representing a non-mutable value.

```
make constant_name :: constant_literal;
make constant_name :: constant_literal ∈ type_name;
```

**Notes:** 
* You can use only native types or basic types for constants;
* Constant identifier is not restricted to a particular convention;

## Variable declarations

Variables are defined using keyword _make_ plus one of the operators:

operator | purpose
---------|------------------------------------------------------------------
 ∈       | declare native variable
 :       | share \| pair-up  \| shallow copy
 :=      | create new \| reset value \| deep copy
 ::      | immutable variable = constant 
 
```
-- primitive variable declarations with type
make var_name ∈  type_name;
make var_name := constant ∈ type_name;

-- partial declaration using type inference
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

**example**
```
make a := 10, b := 0 ∈ Z;

alter b := a + 1; -- modify b underline value
alter b += 1;     -- modify b using modifier
print b;          -- expected 12
```

**notes:** 
* Multiple variables can be modified all at once when separated by comma;
* The alter statement can use operator { := } or a modifier { += -= ÷= ·= ^= %= }

**Examples:**
```
-- declare a constant
make pi :: 3.14 ∈ R;

-- declare multiple variables
make a   ∈ Z;  -- Integer 
make x,y ∈ R;  -- Double
make q,p ∈ L;  -- Logic

--using modifiers
alter a := 10;  -- modify value of a := 10
alter a += 1;   -- increment value of a := 11
alter a -= 1;   -- decrement value of a := 10

-- modify two variables using one constant
alter x, y := 10.5;

-- modify two variables using two constants
alter q, p <+ (True, False);  
```

## Type conversion
 
When data type mismatch you must perform explicit conversion.

* Explicit conversion is using a _pipeline operator_: "->";
* This is unsafe operation. A range check is recommended before conversion;
* Data precision may suffer. Some decimals may be lost;
* If data do not fit in the new type, the overflow exception is raised.

**example:**
```
make a := 0, b := 20 ∈ Z;
make v := 10.5, x := 0.0 ∈ R;

--explicit conversion
alter a := v -> N;
print a; --truncated to 10 

--explicit conversion
alter x := b -> R;
print x; -- expect 20.0
```

## Alphanumeric type

Bee define A as single UTF-8 code point with representation: U+HH

```
make a, b ∈ A; -- ASCII 
make x, y ∈ B; -- Binary integer

alter a := '0';     -- ASCII symbol '0'
alter x := a -> B;  -- convert to binary 30
alter y := 30;      -- decimal code for '0'
alter b := y -> A;  -- convert to ASCII symbol '0'
```

## Type checking

We can use variable type to validate expression type.

```
make a := 0;    --integer variable 
make b := 0.0;  --real variable 

alter b := 10;    --FAIL: b is of type: Real
alter a := 10.5;  --FAIL: a is of type: Integer
```

## Logic type

Logic type is an enumeration of two public symbols: False and True

```
type .L := {.False:0, .True:1} <: Ordinal;

** printing logical values
print True;   --> 1
print False;  --> 0
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

**example**
```
make x := 4 ∈ Z;

print x = 4 ; -- 1 (equal)
print x ≡ 4 ; -- 0 (not identical)

when (x = 4) ∧ (x - 4 = 0) do
  print "True";
else
  print "False";  
done;
```


**design**
```
-- logic values are numeric
print False - True;  --> -1 
print True  + True;  --> +2
```

**Precedence:** 

Logic operators have greater precedence than comparison.

## Logical expression

Logical expression have value { False, True }

```
make x := False; --Type = L
make y := True;  --Type = L

--simple expressions
print   x; --> 0
print ¬ x; --> 1

--complex expressions
print  (x = y); --> 0
print  (x ≠ y); --> 1
print  (x < y); --> 1
print  (x > y); --> 0
print  (x ∧ y); --> 0
print  (x ∨ y); --> 1

```
**Notes:** 
* Operators { ¬    } is unary operator;
* Operators { ∧, ∨ } are also bitwise operators;
* Operators { ¬, ⊕ } are also bitwise operators;
* Operators { ←, → } are bitwise operators;

**coercion**
Any numeric expression ca be converted to logic using coercion operation `-> L`

```
make x, y ∈ L;
make a := 0.0, b := 1.5;

alter x := a -> L; --> 0
alter y := b -> L; --> 1
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

-- conditional execution
alter a := 1 if (a = 0);

-- conditional print
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

-- single condition matching
alter var_name := (xp if cnd1, dx);


-- multiple matching with default value
alter var_name := (xp1 if cnd1, xp2 if cnd2,... dx);

-- alternative code alignment
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

**example**
```
make x := '0';
read (x,"x:>");

make kind := ("digit" if x ∈ ['0'..'9'], "letter" if x ∈ ['a'..'z'] | "unknown");
print ("x is " & kind); --expect: "x is digit"
over.
```

## Static rules

An static rule is a named block of code that can resolve one specific task. 

**pattern**
```
rule name(param ∈ type,...):
    -- executable statements
   exit if (condition);
   ...
return;
```

**Notes:**
A static rule ...
* is finalized with: _return_ keyword;
* can be executed using: _apply_ or _alter_ keywords;
* can be terminated early using: _exit_ keyword;
* can raise and error using: _fail_ keyword;

**Restrictions:**
* A static rule can not be called from make statement;
* A static rule can not be called from an expression;
* A static rule can not be nested inside another rule;
* A static rule can not execute an aspect;

**Comments:**
* Since rule result is a reference, this reference must be allocated by _make_ before we can call the rule,
* Since a rule can have side-effects or can return multiple results is not safe to be used in expressions,
* We believe that flat is better than nested. So rules can not be nested in context of another rule,
* Since rules can be executed in parallel, you could use this trick to call an aspect in parallel and this is not safe.

### Parameters

Parameters are special variables defined in rule signature.

**Notes:**   
* A rule can have input/output parameters;
* Parameters with initial value are optional;
* Optional parameters must be enumerated last in parameter list;
* Optional parameters are initialized with pair-up operator ":";
* Parameters defined with "∈" transfer value "by copy";
* Parameters defined with "@" transfer value "by share";

Static rules can have side-effects:

**example**
```
-- a rule with side-effects and no parameter
rule foo(name ∈ S):
  print "hello:" & name & ". I am Foo. Nice to meet you!";
return;

-- using apply + rule name will execute the rule  
apply foo("Bee");

over.
```

Expected output:

```
hello: Bee. I am Foo. Nice to meet you!
```


### Rule result

A static rules can have one or multiple results:

**pattern**
```
rule name(param ∈ type,...) => (result @ type,...):
   make local_variable;
   ...   
   alter result := expression;
   ...
return;

make out ∈ type;

-- call using apply
apply name(argument,...) +> (out, ...);

-- call using alter
alter (out, ...) <+ name(argument,...);
```

**Properties:**
* A rule have a local context where we define local variables;
* A rule can be overwritten using different parameters;
* A rule can have one or multiple results;


**Note:**
* Results are explicit declared references,
* Results are enclosed in paranthesis,
* Results are declared with @ (output),
* Results are captured using unpacking: <+ or +>

**Example:** 

```
-- rule with two results "s" and "d"
rule com(x,y ∈ Z) => (s, d @ Z):
  alter s := x + y; 
  alter d := y - x;
return;

-- unpack result to "b","c" using "<+"  
make b,c <+ com(2,1);
print b;  --3 
print c;  --1 

-- alternative rule call:
alter b,c <+ com(4,5);
print b;  --9 
print c;  --1 

-- alternative rule call:
apply com(0,1) +> b, c;
print b; --1 
print c; --1 

```

## Dynamic rules

A rule that can be changed during runtime is called _dynamic rule_. 

**attributes**

Attributes of a rule are state variables. That are variables starting with dot prefix.

* Dynamic rules look exactly like static rules, except they have states;
* Rule attributes are public and can be accessed using dot scope qualifier;
* Rule attributes are static: initialized one single time;

**pattern**
```
rule rule_name(param ∈ type,...):
  -- define x,y,z states
   make .x, .y, .z := 0 ∈ Z;  
   ...
return;

-- modify rule states
alter rule_name.x = 1;
alter rule_name.y = 2;
alter rule_name.z = 3;

-- read rule states
print (rule_name.x, rule_name.y, rule_name.z);  -- 1 2 3
```

**Notes:**
* Like static rule, a dynamic rule can be call with _apply_ or _alter_;
* Attributes of dynamic rules can be used in expressions;
* A dynamic rule can not be executed from an expression;
* A dynamic rule that return a result can be used with unpacking operators: "+>" and "<+";

**See also:**
* [bs.bee](../demo/bs.bee);   --Bubble Sort

## Generic rules

A generic rule is a rule prototype that can be cloned.

**pattern**
```
-- define a rule prototype 
rule prototype_name{attributes}(parameters) => (result @ Type):
  -- compute the result
  alter result := expression(parameters);
return;

-- making a rule clone from prototype
clone new_name:= prototype_name{arguments};
```

**Notes:**
* A rule prototype can not be used until is cloned;
* A rule prototype can be dynamic or static;
* A rule clone is binding external states into local context;
* A rule clone is sharing state attributes with the prototype;
* A rule clone can be created in local context of another rule;

**example**
```
-- this is a generic rule
rule shift{s ∈ Z}(i ∈ Z) => (r @ Z):
  alter r := (s + i);
return;

-- instantiate two clones:
clone inc := shift{s: +1}; --increment 
clone dec := shift{s: -1}; --decrement 

-- verify rule properties
print inc.s; -->  1
print dec.s; --> -1

-- use first clone "inc"
print inc(1); --> 2
print inc(4); --> 5

-- use second clone "dec"
print dec(1); -->  0
print dec(2); -->  1
print dec(0); --> -1
```


## Expression rules

These kind of rules have on single expression to compute a result. 

**syntax**
```
rule name(param ∈ Type,...) ∈ Type => (expression);
```

**Example:** 

```
-- define "exp" a rule
rule xp(x,y ∈ Z) ∈ Z => (x + y);

-- using the rule in other expressions
make z := xp(1,1) + 1;
print  z;  --print 3
```

**properties:**

Expression rules...
* are binding external states;
* do not have internal states;
* do not have side-effects;
* do not depend on external states;

**result:**

* expression can have one single result;
* expression result is declared with ∈ not @;
* expression result can be primitive type;
* expression result can be native type;

**notes:**

* Expression rules are similar to mathematical functions;
* Expression rules can not be interrupted from execution;
* Expression rules can be called from expressions;
* Expression rules can be be created from static rules;
* Expression rules can be used as parameters for other rules;

## External rules

In Bee you can use external rules from Assembly or C.
Usually these rules are implemented in a library component.

**Example:**
This is myLib.bee file: 
```
#role := "component";
#name := "myLib";

load $bee/lib/cpp/myLib.bee; --load cpp library

-- define a wrapper for external "fib"
rule fib(n ∈ Z) => (x @ Z);
  alter x := myLib.fib(n);
return;

```

This is the driver file.
```
#role := "driver";

-- load library
load $bee/lib/myLib.bee;
alias myLib := bee.lib.myLib
--use external rule
print myLib.fib(5);
```

To understand more about interacting with other languages check this article about ABI:
[Application Binary Interface](https://en.wikipedia.org/wiki/Application_binary_interface)

**See also:**
* [pm.bee](../demo/pm.bee): pattern matching rules 
* [fn.bee](../demo/fn.bee): expression rules  
* [fi.bee](../demo/fi.bee): recursive rules
* [rp.bee](../demo/rp.bee): rule as a parameter
* [ho.bee](../demo/ho.bee); higher order rules

**Read Next:** [Control Flow](control.md)