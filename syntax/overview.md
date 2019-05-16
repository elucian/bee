## Syntax Overview

I have used a simple design notation based on examples and notes:

* I have used notes to explain the semantics;
* I have used suggestive descriptor names;
* I have used "::=" to explain a descriptor;
* I have used "..." for repetitive sequences;

**bookmarks**

* [Expressions](#expressions)
* [Basic types](#basic-types)
* [Constant literals](#constant-literals)
* [Composite types](#composite-types)
* [Type declaration](#type-declaration)
* [Range subtypes](#range-subtypes)
* [Logical expression](#logical-expression)
* [Reference](#reference)
* [Conditionals](#conditionals)
* [Pattern matching](#pattern-matching)
* [Static rules](#static-rules)
* [Dynamic rules](#dynamic-rules)
* [Generic rules](#generic-rules)
* [Expression rules](#expression-rules)
* [Rule mapping](#rule-mapping)

## Expressions
Expressions are created using identifiers, operators, rules and constant literals. 

* can use () to establish order of operations;
* can be enumerated using comma separator ","
* can be combined to create more complex expressions;
* have type that is calculated using type inference;
* can be assigned to variables using "value" or "modify" statements;
* can be printed to console using "print" or "write" actions;

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
alter x := x ÷ 0; --error: division by 0
```

**Notes:** 
* print statement can receive multiple arguments;
* multiple arguments are separated by comma;
* multiple arguments are enclosed in parenthesis;
* print statement add new line by default;
* write statement can be used to avoid new line;

**Data types**

Bee use 3 kind of data types:

1. basic data types;
2. composite data types;
3. user defined types;

## Basic Types

Bee basic data types have information about: 

1. name
1. capacity
1. limits  (min/max)
1. literal notation

Basic types are represented with one single upper-case character.

| Name        |Bee|Bytes|Description
|-------------|---|-----|------------------------------------------------------------
| Logical     | L | 2   |Logical number {0,1} (aligned to 2 bit)
| Unicode     | U | 4   |Code point 32 bit, max: U+FFFF or U-FFFFFFFF
| Binary      | B | 4   |Unsigned 32 bit, max: 0b11111111111111111111111111111111
| Rational    | Q | 8   |Fraction of two binary numbers like: 1/2 (precision 0.001)
| Natural     | N | 8   |Unsigned large positive number     [0..+]
| Integer     | Z | 8   |Signed large discrete number       [-..+]
| Positive    | P | 8   |Double precision positive numbers: (0..+)
| Real        | R | 8   |Double precision number            (-..+)
| Complex     | C |16   |Complex number: pairs like (r+i)

**Note:** 
* These capital letters are reserved and locked; 
* Basic types represent values not memory locations;
* Basic types have aligned fixed size;
* Basic types are mapped to native OS types;
* Basic types are usually allocated on the stack;


## Constant Literals

Bee has support for numeric constants. These can be used in expressions to represent numbers.

|   Literal | Description
|-----------|-----------------------------------------------------------
|0          | integer zero
|1234567890 | integer number : (0,1,2,3,4,5,6,7,8,9)
|0b10101010 | binary integer : (0b) & (0,1)
|U+FFFF     | Unicode code point: (U+) & (0,1,2,3,4,5,6,7,8,9) & ABCDEF
|0xFFFFFFFF | Hexadecimal integer:(Ox) & (0,1,2,3,4,5,6,7,8,9) & ABCDEF
|0.05       | real number: (.,0,1,2,3,4,5,6,7,8,9) 
|1E10       | real number: 1×10¹⁰  :=   10000000000  
|1e10       | real number: 1×10⁻¹⁰ := 0.0000000001  
|1/2        | rational number: 1/2 = 0.5 
|9r+9i      | complex number r = real part, i = imaginary part (no spaces)
|9r-9i      | complex number r = real part, i = imaginary part (no spaces)

**pattern**
```
make name := constant ∈ Type
```

**example**
```
make n := U+2200 ∈ U ; --∀
```

**Note:** 
* "U" is reserved, therefore compiler will find "U+" combination unique;
* After U+ compiler is expecting 4,6 or 8 hexadecimal symbols;


## Composite types

Composite types are using English full name and start with uppercase.

| Name     | Description
|----------|----------------------------------------------------------------
| String   | Short string encoded as UTF8 (Array)
| Text     | Large blob text encoded as UTF8 (Rope or Radix Tree) 
| Date     | DD/MM/YYYY 
| Time     | hh:mm,ms
| Error    | Exception object: {code, message, line}

**Notes:**
* Composite types are references to memory location;
* Composite types are usually allocated on the heap;
* Composite types have usually variable size;
* Composity types are specified with symbol "@" instead of "∈";

**pattern**
```
make name := constant @ Type
```

**example**
```
make str := 'test' @ String
```

## Collection types

Bee define a collection using a special notation based on brackets.

| sym| Collection type
|----|------------------------------------------------------------------
| () | Tuple / List  / Expression
| [] | Array/ Matrix/ Dynamic Array
| {} | Set / Hash  / Object

## Type declaration

User can define composite types and sub-types using operator "<:" (sub-type).

```
--declare new type
type type_name <: type_descriptor

--declare new references
make var_name,var_name ... @ type_name
```

## Range subtypes

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
when (`x` ∈ Alpha) do
  print 'yes';
else
  print 'no';
done;
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
* The lower or upper limit missing represent unlimited: ("∞");

**dynamic range**
```
#precision:0.1

-- integer range
print [0..5]  ; --0,1,2,3,4,5
print [0.!5]  ; --0,1,2,3,4

-- rational range
print (0..1)  ; --0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1
print (0.!1)  ; --0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9
```

## Constant declaration

Constants are protected memory locations representing a non-mutable value.

```
define constant_name := constant_literal
```

**Notes:** 
* You can use only native types or basic types for constants;
* Constant identifier is not restricted to a particular convention;

## Variable declarations

Variables are defined using keyword "create" and next operators:

sym | purpose
----|------------------------------------------------------------------
 ∈  | declare variable type | member type | parameter type
 @  | declare reference to composite type or native type
 :  | pair-up member/parameter to a constant/expression or constructor
 := | initialize variable using a constant/expression or constructor
 :: | initialize variable using a reference to another variable

```
-- full declarations with type and initial value
make var_name ∈  type_name;
make var_name := constant ∈ type_name;

-- partial declaration using type inference
make var_name := expression ; --type inference

-- reference declaration using using operator "::"
make ref_name @  type_name;
make ref_name :: var_name;
make ref_name :: object_constructor;
```

Multiple variables can be define in one single line using comma separator:
```
make var_name, var_name ... ∈ Type;
make var_name, var_name ... := expression;
```

**Notes:** 

* Each variable in the enumeration will be initialized to a different location;
* If operator "::" is used you can create multiple references for same location;

## Modify values

One can modify variables using "modify" statement.

**example**
```
make a := 10, b := 0 ∈ Z;

alter b := a + 1 ; --modify b 10->11 
print b          ; --expected 11
```

**notes:** 
* Multiple variables can be modified all at once when separated by comma;
* The modify statement can use only operator ":=" or "::";

**Examples:**
```
-- declare a constant that can not change its value
define pi := 3.14 ∈ R;

-- declare multiple variables using modify
make a   ∈ Z ; --Integer 
make x,y ∈ R ; --Double
make q,p ∈ L ; --Logic

--using modifier expressions
alter a := 10 ; --modify value of a := 10
alter a += 1  ; --increment value of a := 11
alter a -= 1  ; --decrement value of a := 10

-- modify two variables using one constant
alter q, p := True ; --modify value of q and p
alter x, y := 10.5 ; --modify value of x and y
```

## Type conversion

Bee is an explicit language. We avoid implicit conversion.   
When data type mismatch we must perform explicit conversion.

* Explicit conversion is using pipeline operator: "->"
* This is unsafe operation. A range check is recommended before conversion.
* Data precision may suffer. Some decimals may be lost.
* If data do not fit in the new type, the overflow exception is raised.

**example:**
```
make a := 0, b := 20 ∈ Z;
make v := 10.5, x := 0.0 ∈ R;

--explicit conversion
alter a := v -> N;
print a  ; --truncated to 10 

--explicit conversion
alter x := b -> R;
print x  ; --expect 20.0
```

## Alphanumeric type

Bee define U as single UTF32 code point with representation: U+HHHH or U+HHHHHH

```
make a, b ∈ U ; --Unicode 
make x, y ∈ B ; --Binary

alter a := '0' ; --representation of 0
alter x := a -> B ; --convert to 30
alter y := 30 ; --UTF code for '0'
alter b := y -> A ; --convert to '0'
```


## Type checking

We can use variable type to validate expression type.

```
make a := 0   ; --integer variable 
make b := 0.0 ; --real variable 

alter b := 10   ; --FAIL: b is of type: Real
alter a := 10.5 ; --FAIL: a is of type: Integer
```

## Logic type

Logic type is an enumeration of two public symbols: False and True

```
type .L <: {.False:0, .True:1};

** printing logical values
print True  ; -- 1
print False ; -- 0
```

## Logic operations

Bee uses several familiar logic operators:

*  ¬ (not) 
*  ∧ (and) 
*  ∨ (or)  
*  ~ (xor)  
*  ↔ (if and only if)  
 
Precedence: { ¬, ∧, ∨, ~ }

**comparison**
Comparison operators will create a logical response: False = 0 or True = 1.

* comparison ( ≈, =, ≠, ≡, >, <, ≤, ≥, ↔)
* belonging  ( ∈, ⊃, ⊂ )

**example**
```
make x ∈ Z
when (x = 4 ↔ x - 4 = 0) do
  print "True";
else
  print "False";  
done;
```


**design**
```
-- logic values are numeric
print False - True ; --> -1 
print True  + True ; --> +2
```

**Precedence:** 

Logic operators have greater precedence than comparison.

## Logical expression

Logical expression have value { False, True }

```
make x := False ; --Type = L
make y := True  ; --Type = L

--simple expressions
print   x; --0
print ¬ x; --1

--complex expressions
print  (x ↔ y); -- 0
print ¬(x ↔ y); -- 1
print  (x < y); -- 1
print  (x > y); -- 0
print  (x ∧ y); -- 0
print  (x ∨ y); -- 1

```
**Notes:** 
* Operators { ¬    } is unary operator;
* Operators { ∧, ∨ } are also bitwise operators;
* Operators { ¬, ~ } are also bitwise operators;
* Operators { ←, → } are bitwise operators;

**coercion**
Any numeric expression ca be converted to logic using coercion operation `-> L`

```
make x, y ∈ L;
make a := 0.0, b := 1.5;

alter x := a -> L; --0
alter y := b -> L; --1
```

**Notes:** 
* Only integer part of a number is used in conversion;
* Fraction is truncated before conversion to logic type;
* A string: "Yes", "yes", "True", "true", "T" or "t" or "1" convert to: True = 1
* A string: "No", "no", "False", "true", "F" or "f" or "0" convert to: False= 0

## Reference

All composite variables are references to objects. 

**modify**

* New references are declared using "@" instead of "∈"
* Reference can be borrowed using operator: "::"
* Reference content can be initialized using operator ":="
* Reference content/value can be cloned using operator ":="

**example**
```
make i := 10 ∈ Z ; -- basic type
make j :: i  @ Z ; -- reference to i
make k @ Z ; -- null reference

-- borrowing address / boxing
alter k :: i ; -- boxing i := 12 
alter i += 1 ; -- modify i := 13
print k ; --expect 13 (modified)

-- verify boxing effect
print k ≡ j; -- True (same)
print k ≡ i; -- True (same)
print j ≡ i; -- True (same)
```

## Conditionals

A conditional is a logic condition used to control statement execution.

```
statement if (condition)
```

The statement is executed only if the condition evaluate true = True. 

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

**Notes:** Keyword "if" and "else" are not related.

## Pattern Matching

Instead of ternary operator we use conditional expressions. 
These expressions are separated by coma and enclosed in ().

**Syntax:**

```
make var_name ∈ type;

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

make kind := ("digit" if x @ ['0'..'9'], "letter" if x @ ['a'..'z'], "unknown");
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

**notes:**
A static rule block ...
* is finalized with: _return_ keyword;
* can be executed using: _apply_ keyword;
* can be terminated early using: _exit_ keyword;
* can raise and error using: _fail_ keyword;

### Parameters

Parameters are special variables defined in rule signature.

**Notes:**   
* A rule can have input/output parameters;
* Parameters with initial value are optional;
* Optional parameters must be enumerated last in parameter list;
* Optional parameters are initialized with pair-up operator ":";
* Basic arguments and literal arguments are pass by value;
* Composite type parameters can be pass by reference or by value;
* For input/output parameters we are using "@" instead of "∈";

Static rules can have side-effects:

**example**
```
-- a rule with side-effects and no parameter
rule foo(name ∈ @String):
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
rule name(param ∈ type,...) => (result ∈ type,...):
   make local_variable;
   ...   
   alter result := expression;
   ...
return;
```

**Example:** 

```
-- rule with two results "s" and "d"
rule com(x,y ∈ Z) => (s, d ∈ Z):
  alter s := x + y; 
  alter d := y - x;
return;

-- unpack result to "b","c" using "<+"  
make b,c <+ com(2,1);
print b ; --3 
print c ; --1 

-- alternative rule call:
alter b,c <+ com(4,5);
print b ; --9 
print c ; --1 

-- alternative rule call:
apply com(0,1) +> (b,c);
print b ; --1 
print c ; --1 

```

**static rules:**
* have a local context where we define local variables;
* can be overwritten using different parameters;
* can have one or multiple results;

## Dynamic rules

A rule that can be changed during runtime is called _dynamic rule_. 

**attributes**

Attributes of a rule are state variables. That are variables starting with dot prefix.

* Dynamic rules look exactly like static rules, except they have states;
* Rule attributes are public and can be accessed using dot qualifier;
* Rule attributes are static: initialized one single time;

**pattern**
```
rule name(param ∈ type,...):
  -- define x,y,z states
   make .x, .y, .z := 0 ∈ Z;  
   ...
return;

-- modify rule states
alter rule.x = 1;
alter rule.y = 2;
alter rule.z = 3;

-- read rule states
print rule.x, rule.y, rule.z ; --1 2 3
```

**See also:**
* [bs.bee](../demo/bs.bee)  ; --Bubble Sort

## Generic rules

A generic rule is a rule prototype that can be cloned.

**pattern**
```
-- define a rule prototype 
rule prototype_name{attributes}(parameters) => (result ∈ Type):
  -- compute the result
  alter result := expression(parameters);
return;

-- making a rule clone from prototype
clone new_name:= prototype_name{arguments};
```

**notes:**
* A rule prototype can not be used until is cloned;
* A rule prototype can be dynamic or static;
* A rule clone is binding external states into local context;
* A rule clone is sharing state attributes with the prototype;

**example**
```
-- this rule can create a rule object
rule shift{s ∈ Z}(i ∈ Z) => (r ∈ Z):
  make r := (s + i);
return;

-- instantiate two rule clones:
clone inc := shift{s: +1} ; --increment 
clone dec := shift{s: -1} ; --decrement 

-- verify object properties
print inc.s ; --expect: 1
print dec.s ; --expect:-1

-- use first rule object "inc"
print inc(1) ; --2
print inc(4) ; --5

-- use second rule object "dec"
print dec(1) ; -- 0
print dec(2) ; -- 1
print dec(0) ; ---1
```

## Expression rules

Expression rules are based on a single expression. 

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
print  z ; --print 3
```

**properties**

Expression rules...
* have a single result;
* are binding external states;
* can be created at runtime;
* can be overwritten or recreated;
* can not be interrupted from execution;
* can not have internal states;
* do not have side-effects;
* do not depend on external states;

**notes:**

* Expression rules are similar to mathematical functions;
* Expression rules can be created by other rules;

## Rule mapping

In Bee you can use external rules from Assembly or C.
Usually these rules are implemented in a library component.

**Example:**
This is myLib.bee file: 
```
#library "mLib"

load $bee/lib/cpp/myLib.bee; --load cpp library

-- define a wrapper for external "fib"
rule fib(n ∈ Z) => (x ∈ Z);
  alter x := myLib.fib(n -> Z);
return;

```

This is the driver file.
```
#module.role := "driver";

-- load library
load $bee/lib/myLib.bee;
alias myLib := bee.lib.myLib
--use external rule
print myLib.fib(5);
```

To understand more about interacting with other languages check this article about ABI:
[Application Binary Interface](https://en.wikipedia.org/wiki/Application_binary_interface)

**See also:**
* [pm.bee](../demo/pm.bee); --expression rule
* [fn.bee](../demo/fn.bee); --pattern matching rule
* [fi.bee](../demo/fi.bee); --recursive rule
* [rp.bee](../demo/rp.bee); --rule as parameter

**See also:**
* [ho.bee](../demo/ho.bee); --High order rule

**Read Next:** [Control Flow](control.md)