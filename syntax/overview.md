## Syntax Overview

For syntax notation we use modified BNF convention:

* We use \<name\> to represent identifier names;
* We use  ...  to represent repetitive sequence;
* We use notes or examples to explain optional things;

**bookmarks**

* [Expression](#expression)
* [Data type](#data-type)
* [Logical expression](#logical-expression)
* [Reference](#reference)
* [Conditional](#conditional)
* [Pattern Matching](#pattern-matching)
* [Control Flow](#control-flow)
* [Methods](#methods)
* [Rules](#rules)
* [Parameters](#parameters)

## Expression
Expressions are created using identifiers, operators, rules and constant literals. 

* can be enumerated using comma separator ","
* can be combined to create more complex expressions;
* have type that is calculated using type inference;
* can be assigned to variables using "value" or "alter" statements;
* can be printed to console using "print" or "write" actions;
* can use () to establish order of operations;

**Examples**
```
-- simple expressions in print statement
-- no need for parentheses for a single value
print 10; -- print 10
print "this is a test";

print; --> print two rows

--complex expressions can use ()  
print (10 + 10 + 15);   -- math
print (10 > 5 | 2 < 3); -- logical

--multiple expressions in a line
print (1,',',2,',',3); --expect 1,2,3
print (10, 11, 12);    --expected 101112   

--avoid new line after 2
write (1,2);
write (3,4);  --> expect 1234

print; --> print 6 rows

-- calculation that fail will do nothing.
value x := 5 ∈ R;
value x := x ÷ 0; -- no effect
print x; -- expect x = 5
```

**Notes:** 
* print statement can receive multiple parameters;
* print statement add new line by default;
* write statement can be used to avoid new line;
* multiple arguments are separated by comma;
* multiple arguments are enclosed in parenthesis;

## Data type

Bee use 4 kind of data types:

1. native data types;
2. basic data types;
3. composite data types;
4. user defined types;

**Native types**

Native types names are using one lowercase letter and a number, representing the number of bytes used. These types are compatible with C++ native types. Are used to improve performance. 

type | name             | size
-----|------------------|---------------
 b1  | single byte      | 1 byte
 b2  | Intel word       | 2 bytes
 c1  | char (ASCII)     | 1 byte 
 c2  | expanded (DBCS)  | 2 byte 
 n4  | unsigned short   | 4 bytes 
 n8  | unsigned long    | 8 bytes  
 i4  | short integer    | 4 bytes   
 i8  | long integer     | 8 bytes
 f4  | single precision | 4 bytes
 f8  | double precision | 8 bytes
  
**notes:** 
* Using type inference with "=" create native types;
* Using type inference with ":" create basic types;

**Basic Types**

Bee basic data types have information about: 

1. name
1. representation
1. capacity
1. limits  (min/max)
1. access  (private or public or local)
1. storage (memory  or registry)

Basic types are represented with one single uppercase ASCII character.

| Name        |Bee| Description
|-------------|---|-------------------------------------------------------------
| ASCII       |A  | ASCII character
| Binary      |B  | Positive short number (4 bytes)
| Natural     |N  | Positive large number (8 bytes) 
| Integer     |Z  | Positive or negative number 
| Logical     |L  | Logical number {0,1}
| Rational    |Q  | Rational number ¹⁄₂ ¹⁄₃ ²⁄₃ ...
| Real        |R  | Real number 

**Composite types**

| Name        |Bee| Description
|-------------|---|-------------------------------------------------------------
| String      |S  | limited capacity (ASCII) string
| Unicode     |U  | unlimited capacity (Unicode) string 
| Date        |D  | DD/MM/YYYY
| Time        |T  | hh:mm,ms
| Complex     |C  | Complex number

## Literals

Bee has support for numeric constants. These can be used in expressions to represent numbers.

|   Literal | Description
|-----------|-----------------------------------------------------------
|0          | integer zero
|1234567890 | integer number : (0,1,2,3,4,5,6,7,8,9)
|0b10101010 | binary integer : {0b,0,1}
|0xFF       | hexadecimal integer: (0x,0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F)
|0.5        | real number: (., 0 , 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 ,9)
|0.0        | real number: (.,0,1,2,3,4,5,6,7,8,9) 
|5E2        | real number: 5⋅10²  := 500  (E use positive exponent)
|5e2        | real number: 5⋅10⁻² := 0.05 (e use negative exponent)

## Collection types

Bee define a collection using a special notation based on brackets.

| sym| Collection type
|----|------------------------------------------------------------------
| [] | Array \|  Matrix 
| {} | Hash Map \| Set 
| () | List \| Expression

## Constant declaration

Constants are protected memory locations representing a non-mutable value.

```
static constant_name := constant_literal;   
```

**Notes:** 
* You can use only native types or basic types for constants;
* Constant identifier is not restricted to a particular convention;

## Variable declarations

Variables are defined using keyword "value" and next operators:

sym | purpose
----|------------------------------------------------------------------
 ∈  | declare variable type | member type | parameter type
 :  | pair-up member value to a constant/expression or constructor
 := | initialize variable using a constant/expression or constructor
 :: | initialize variable using a reference to another variable


```
-- full declarations with type and initial value
value var_name ∈  type_name;
value var_name := constant ∈ type_name;

-- partial declaration using type inference
value var_name := expression; -- type inference

-- reference declaration using using operator "::"
value ref_name :: var_name; 
```

Multiple variables can be define in one single line using comma separator:
```
value var_name, var_name ... := expression;
value var_name, var_name ... := constructor;
```

**Notes:** 

* Each variable in the list will be initialized in a different location;
* If operator "::" is used you can create multiple references for same location;

## Modify values

One can modify variables using "alter" statement.

**example**
```
value a := 10 ∈ i8; -- native variable
value b := 0  ∈ Z;  -- basic variable

alter b := a + 1; -- modify b 10->11 
print b;          -- expected 11
```

**notes:** 
* Multiple variables can be modified at once if separated by comma;
* One alter statement can use one single operator ":=" or "::";

**Examples:**
```
-- declare a constant that can't change it's value
static pi := 3.14;

-- declare multiple variables using alter
value a   ∈ Z; -- Integer 
value x,y ∈ R; -- Double
value q,p ∈ L; -- Logic

--using modifier expressions
alter a := 10;  -- modify value of a := 10
alter a += 1;   -- increment value of a := 11
alter a -= 1;   -- decrement value of a := 10

-- modify two variables using one constant
alter q, p := $⊤;    -- modify value of q and p
alter x, y := 10.5;  -- modify value of x and y
```

## Type declaration

User can define composite types and sub-types using composite category and operator "<:".

```
--declare new type
category type_name <: type_descriptor;

--using new type
value var_name,var_name ... ∈ type_name;
```

category ::= { range, class, ordinal }

## Type conversion

Bee is an explicit language. We avoid implicit conversion.   
When data type mismatch we must perform explicit conversion.

* Explicit conversion is done using _pipeline operator: "->"
* This is unsafe operation. And a range check is recommended before conversion.
* Data precision may suffer. Some decimals may be lost.
* If data do not fit in the new type overflow exception is created.

**example:**
```
value a := 0, b := 20 ∈ Z;   
value v := 10.5, x := 0.0 ∈ R;

--explicit conversion
alter a := v -> N;
print a; -- truncated to 10 

--explicit conversion
alter x := b -> R;
print x; --> expect 20.0
```

## ASCII type

Bee define A := ASCII character as native type.

```
value a, b ∈ A; --ASCII character
value x, y ∈ B; --Binary number 

alter a := `0`;    -- representation of 0
alter x := a -> B; -- convert to 30
alter y := 30;     -- ASCII code for '0'
alter b := y -> A; -- convert to '0'
```
## Type checking

We can use variable type to validate expression type.

```
value a := 0;    --integer variable 
value b := 0.0;  --real variable 

alter b := 10;   --FAIL: b is of type: Real
alter a := 10.5; --FAIL: a is of type: Integer
```

## Logic type

Logic type is an enumeration of two public symbols: $⊥ = 0 = False and $⊤ = 1 = True

```
ordinal .L <: {.$0, .$1};
```

## Logic operations

Bee uses several familiar operators:

*  ¬ (not) 
*  ∧ (and) 
*  ∨ (or)  
*  ~ (xor)  
*  ↔ (inference)  
 
Precedence: { ¬, ∧, ∨, ~, ↔ }


**relations**
Relation operators will create a logical response: $⊥ = 0 or $⊤ = 1.

* comparison ( ±, ≈, =, ≠, ≡, >, <, ≤, ≥ ); 
* belonging  ( ∈, ⊃, ⊂ );

**Precedence:** 

* Logic operators have greater precedence than relations. 


## Logical expression

Logical expression have value { $⊥, $⊤ }

```
value x := $⊥; -- false
value y := $⊤; -- true

--simple expressions
print    x; -- $⊥ = 0
print  ¬ x; -- $⊤ = 1

--complex expressions
print  (x ↔ y);  --  0
print ¬(x ↔ y);  --  1
print  (x < y);  --  1
print  (x > y);  --  0
print  (x ∧ y);  --  0
print  (x ∨ y);  --  1

```
**Notes:** 
* Operators { ¬ } is unary operator;
* Operators { ∧, ∨ } are shortcut operators;
* Operators { ¬, ~ } are also bitwise operators;
* Operators { ←, →, ↑, ↓, &, | } are bitwise operators;

**coercion**
Any numeric expression ca be converted to logic using coercion operation `-> L`

```
value x, y ∈ L;
value a := 0.0, b := 1.5 ;

alter x := a -> L; -- x = $⊥
alter y := b -> L; -- y = $⊤
```

**Notes:** 
* Only integer part of a number is used in conversion;
* Fraction is truncated before conversion to logic type;
* A string that contains "Yes" "yes", "True", "true", "T" or "t" or "1" convert to: 1
* A string that contains "No", "no", "False", "true", "F" or "f" or "0" convert to: 0

## Reference

In Bee all values and composite types are references except native types. 

**assign**

* New reference can be create using operator ":="
* Existing reference can be cloned using operator: "::"

**example**
```
value i := 10 ∈ i8;  -- native type
value j ∈ Z;         -- references

-- boxing using "::"
alter j :: i; -- boxing i := 12 
alter i += 1; -- modify i := 13
print j; --> expect 13 (modified)

-- verify boxing effect
print j = i; -- 1 same value
print j ≡ i; -- 1 (true) same reference 

print;
```

## Conditional

A conditional is using "if" keyword to control one statement.   
Observe that "if" is not itself a full statement only an augment.

```
 statement if (condition);
```

The statement is executed only if the condition is 1 = $⊤. 

**notes:**
1. Conditional expression must be enclosed in ();
1. Conditional can not be associated with type statement;
1. Conditional can not be associated with value statement;
1. Conditional can not be associated with any block statement;

```
value a ∈ Z;

-- conditional execution
alter a := 1 if (a = 0);

-- conditional print
print "a is 0" if (a = 0);
print "a >  0" if (a ≥ 0);
 
print; 
```

**Notes:** Keyword "if" and "else" are not related.

## Pattern Matching

Instead of ternary operator we use conditional expressions. 
These expressions are separated by coma and enclosed in ().

**Syntax:**

```
value var_name ∈ type;

-- single matching with default value
alter var_name := (expression if condition, default);

-- multiple matching with default value
alter var_name := (xp1 if cnd1, xp2 if cnd2..., dx);

-- alternative code alignment
alter var_name := (
   xp1 if cnd1
  ,xp2 if cnd2
  ,dx  );
```

**Legend:**
 
```
var  := pretagined variable
xp1  := expression of same type with <v>
cnd1 := condition for <xp1>
dx   := default expression (optional condition).
```

**example**
```
value x := `0`;
read (x,"x:>");

value what := ("digit" if x ∈ [`0`..`9`], if x ∈ [`a`..`z`], "letter","unknown");
print "x is"._.what;

over;
```

## Control Flow

Bee has 2 control flow statements { when, cycle }:

### When

When is a decision statement selector based on one condition.

**syntax**
```
when condition:
  statement;
  ... 
when;
```

Dual selector based on single logical expression:

**pattern**
```
when <condition>:
  true_branch;
else:
  false_branch;
when;
```

**example**

```
-- nested selector
value a := 0;
when (a ≤ 0):
  print 'a ≤ 0';
  when (a = 0):
    print 'a = 0';
  else:
    print "a < 0"; 
  when;  
when;
print; 
-- expect 2 messages:
-- a ≤ 0
-- a = 0
```  

### Cycle

Create repetitive statement block.

```
cycle:
  statement block
  ...
  loop if condition;
  ...
  
  stop if condition;
  ...
cycle;
```

**example**

```
value a := 10;

cycle:
  alter a -= 1;
  -- conditional repetition
  loop if (a % 2 = 0);  
  write a;  
  -- conditional termination
  stop if (a < 0);
  write ','; 
cycle;

print;
```

**Notes:** 

* If _stop_ condition is missing the cycle is infinite;
* The cycle can be controlled using conditionals;

### Nested cycles

Nested cycles can be labeled:

**pattern:** 

```
-- label 2 nested cycles 
cycle outer: 
  cycle inner:
    -- continue with outer cycle
    loop outer if condition; 
    ...
    -- stop for both cycles
    stop outer if condition;
  cycle;
cycle;
```

**example**

```
value x   := 9;
value a,r := 0;

cycle:
  alter r := x % 2;
  alter a := (0 if r = 0, 1 if r = 0, 2);
  write "{1}:{2}" <+ (x,a);
  alter x -= 1;
  stop if (x < 5);
  write ',';
cycle;

print; --> 9:1, 8:0, 7:1, 6:0, 5:1
```

## Aspect

An aspect is a named block of code that can have parameters and create results.

**pattern**
```
aspect name(<param> ∈ <type>,...) => (<result> ∈ <type>,...):
   ...   
   alter <result> := <expression>;
   ...
aspect;
```

**Example:** 

```
-- aspect with one result:
aspect add(x,y ∈ i8) => (r ∈ i8):
  alter r := x + y; 
aspect;

-- aspect can be call using "value" or "alter"
value m := add(0,0); -- create m = 0 ∈ i8

-- two results "s" and "d"
aspect com(x,y ∈ Z) => (s ∈ Z, d ∈ Z):
  alter s := x + y; 
  alter d := x - y;
aspect;

-- unpack result to "b","c" using "<+"  
value b,c <+ com(2,1); 

print b; -- print 3 
print c; -- print 1 

-- call com and print the result
print com(0,0); -- print (0, 0)
print;

-- negative test: try to call com in expression
value x := com(1,1) + 1; -- compilation error, "com" has 2 results.

```
## Site Effects

An aspect sometimes do not have a result and is used for side-effects.

**pattern**
```
aspect <name>(<param> ∈ <type>,...):
   [<statement>];
   ...   
aspect;
```

**example**
```
-- an aspect with side-effect
aspect foo:
  print "hello, I am foo";
aspect;

-- using name of aspect will execute the aspect  
foo;
```

**Notes:**
* Aspect declaration do not require empty brackets ();
* Aspect call do not require empty brackets ();
* Aspect can have output parameters and side-effects;
* Aspect can be interrupted earlier using "exit" keyword.

**properties:** 

* An aspect have a local scope called _"context"_;
* An aspect can receive input/output parameters;
* An aspect can have optional one or more results;

**restriction:**
* An aspect can not be declared inside other aspect;
* An aspect can not be used in expressions or rules;
* An aspect result must be captured using assign ":=" o unpacking "<+"; 

## Rules

Rules are λ expressions that can have parameters and have one single result.

**syntax**
```
rule name λ (param ∈ type,...) ∈ type => (expression);
```

**Example:** 

```
-- define "ex" an aspect with two parameters
rule ex λ (x,y ∈ Z) ∈ Z => (x + y); 

-- expression can be used in larger expressions
value z := ex(1,1)+1; 
print z; -- print 3

print;
```

**properties**

* a rule can have only one result not a list;
* a rule can be created during run-time;
* a rule can be used in other rules;
* a rule can be used as parameter for an aspect or rule;
* a rule can be created as a result of an aspect;

**restriction:**

* rules can not have side effects;
* rules can not mutate variables;
* rules can not have local declarations; 
* rules can not receive input/output parameters;
* rules can not perform input/output operations;
* rules can not fail and can not be interrupted;

**See also:**
* [fn.bee](../demo/fn.bee)
* [pm.bee](../demo/pm.bee)

## Rules as Parameter

An aspect can receive rules as parameters.

**syntax**
```
aspect act_name(xp_name λ (param_list) ∈ result_type):
  ...
aspect;
```

**example**
```
-- declare aspect with lambda rule as parameter
aspect compare(a,b ∈ Z, cmp λ (Z,Z) ∈ L) => (r ∈ L):
  alter r := cmp(a,b);
aspect;

-- declare λ expressions:
rule lt λ (a,b ∈ Z) ∈ L => (a < b);

-- call compare using λ expression as named argument
value test := compare(1,2,cmp::lt);
print test; -- expect $⊤

-- call compare using anonymous λ expression argument
value test := compare(1, 2, λ(a,b) => (a ≥ b));
print test; -- expect $⊤

print;
```

**See also:**
* [ho.bee](../demo/ho.bee) 

## Parameters

Parameters are variables defined in an aspect or rule signature.

**Notes:**   
* Native type parameters are pass by value;
* Reference type parameters can be pass by value or by reference;
* For input/output parameters we must using "@" instead of "∈";

**note**
* Parameters with initial value are optional;
* Optional parameters must be last parameters or can be called by name;
* Optional parameters are initialized with pair-up operator ":";

**See also:** 
* [fi.bee](../demo/fi.bee)
* [bs.bee](../demo/bs.bee) 

**Read Next:** [Composite Types](composite.md)