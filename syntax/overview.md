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
* [Functions](#functions)
* [Methods](#methods)
* [Parameters](#parameters)
* [Lambda Expression](#lambda)

## Expression
Expressions are created using identifiers, operators, functions and constant literals. 

* can be enumerated using comma separator ","
* can be combined to create more complex expressions;
* have type that is calculated using type inference;
* can be assigned to variables using "new" or "let" statements;
* can be printed to console using "put" or "say" methods;
* can use () to establish order of operations;

**Examples**
```
-- simple expressions in put statement
-- no need for parentheses for a single value
put 10; -- print 10
put "this is a test";

write; --> print two rows

--complex expressions can use ()  
put (10 + 10 + 15);   -- math
put (10 > 5 | 2 < 3); -- logical

--multiple expressions in a line
put (1,',',2,',',3); --expect 1,2,3
put (10, 11, 12);    --expected 101112   

--avoid new line after 2
say (1,2);
say (3,4);  --> expect 1234

write --> print 6 rows

-- calculation that fail will do nothing.
new x := 5 ∈ R;
new x := x ÷ 0; -- no effect
put x; -- expect x = 5
```

**Notes:** 
* put statement can receive multiple parameters;
* put statement add new line by default;
* say statement can be used to avoid new line;
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
def <constant_name> := <constant> ∈ <type>;   
```

**Notes:** 
* You can use only native types or basic types for constants;
* Constant identifier is not restricted to a particular convention;

## Variable declarations

Variables are defined using keyword "new" and next operators:

sym | purpose
----|------------------------------------------------------------------
 ∈  | declare variable type | member type | parameter type
 :  | pair-up member value to a constant/expression or constructor
 := | initialize variable using a constant/expression or constructor
 :: | initialize variable using a reference to another variable


```
-- full declarations with type and initial value
new <var_name> ∈ <type>;
new <var_name> := <constant> ∈ <type>;

-- partial declaration using type inference
new <var_name> := <expression>; -- native type inference
new <var_name> := <constructor>;-- object type inference

-- reference declaration using using operator "::"
new <ref_name> :: <var_name>; 
```

Multiple variables can be define in one single line using comma separator:
```
new <var_name>, <var_name> ... := <expression>;
new <var_name>, <var_name> ... := <constructor>;
```

**Notes:** 

* Each variable in the list will be initialized in a different location;
* If operator "::" is used you can create multiple references for same location;

## Modify values

One can modify variables using "let" statement.

**example**
```
new a := 10 ∈ i8; -- native variable
new b := 0  ∈ Z;  -- basic variable

let b := a + 1; -- modify b 10->11 
put b;          -- expected 11
```

**notes:** 
* Multiple variables can be modified at once if separated by comma;
* One let statement can use one single operator ":=" or "::";

**Examples:**
```
-- declare a constant that can't change it's value
def pi := 3.14;

-- declare multiple variables using let
new a   ∈ Z; -- Integer 
new x,y ∈ R; -- Double
new q,p ∈ L; -- Logic

--using modifier expressions
let a := 10;  -- modify value of a := 10
let a += 1;   -- increment value of a := 11
let a -= 1;   -- decrement value of a := 10

-- modify two variables using one constant
let q, p := T;     -- modify value of q and p
let x, y := 10.5;  -- modify value of x and y
```

## Type declaration

User can define composite types and sub-types using keyword "def" and operator "<:".

```
def <type_name> <: <type_constructor>;

--using new type
new <var_name>[,<var_name>] ... ∈ <type_name>;
```

## Type conversion

Bee is an explicit language. We avoid implicit conversions.
When data type mismatch we must perform explicit conversion.

* If data do not fit in the new type you receive a runtime error.
* Explicit conversion is done using _pipeline operator: "->"

**example:**
```
new a := 0, b := 20 ∈ Z;   
new v := 10.5, x := 0.0 ∈ R;

--explicit conversion
let a := v -> N;
put a; -- expect 10

--explicit conversion
let x := b -> R;
put x; --> expect 20.0
```

## ASCII type

Bee define A := ASCII character as native type.

```
new a,b ∈ A; --ASCII character
new x,y ∈ B; --Binary number 

let a := `0`;    -- representation of 0
let x := a -> B; -- convert to 30
let y := 30;     -- ASCII code for '0'
let b := y -> A; -- convert to '0'
```
## Type checking

We can use variable type to validate expression type.

```
new a := 0;    --integer variable 
new b := 0.0;  --real variable 

let b := 10;   --FAIL: b is of type: Real
let a := 10.5; --FAIL: a is of type: Integer
```

## Logic type

Logic type is an enumeration of two public symbols: $⊥ = 0 = False and $⊤ = 1 = True

```
def .L <: {.$0, .$1};
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
new x := $⊥;
new y := $⊤;

--simple expressions
put    x; -- $⊥ = 0
put  ¬ x; -- $⊤ = 1

--complex expressions
put  (x ↔ y);  --  0
put ¬(x ↔ y);  --  1
put  (x < y);  --  1
put  (x > y);  --  0
put  (x ∧ y);  --  0
put  (x ∨ y);  --  1

```
**Notes:** 
* Operators { ¬ } is unary operator;
* Operators { ∧, ∨ } are shortcut operators;
* Operators { ¬, ~ } are also bitwise operators;
* Operators { ←, →, ↑, ↓, &, | } are bitwise operators;

**coercion**
Any numeric expression ca be converted to logic using coercion operation `-> L`

```
new x, y ∈ L;
new a := 0.0, b := 1.5 ;

let x := a -> L; -- x = $⊥
let y := b -> L; -- y = $⊤
```

**Notes:** 
* Only integer part of a number is used in conversion;
* Fraction is eliminated before conversion to logic type;
* A string that contains "True" "true", "T" or "t" or "1" convert to: 1
* A string that contains "False", "true", "F" or "f" or "0" convert to: 0

## Reference

In Bee all basic types, sub-types and composite types are references. 

**assign**

* New reference can be create using operator ":="
* Existing reference can be cloned using operator: "::"

**example**
```
new i := 10  ∈ i8; 
new j ∈ Z;

-- boxing using "::"
let j :: i; -- boxing i := 12 
let i += 1; -- modify i := 13
put j; --> expect 13 (modified)

-- verify boxing effect
put j = i; -- 1 same value
put j ≡ i; -- 1 (true) same reference 

write;
```

## Conditional

A conditional is using "if" keyword to control one statement.   
Observe that "if" is not itself a full statement only an augment.

```
<statement> if (<condition>);
```

The statement is executed only if the condition is 1 = $⊤. 

**notes:**
1. Conditional expression must be enclosed in ();
1. Conditional can not be associated with def statement;
1. Conditional can not be associated with new statement;
1. Conditional can not be associated with any block statement;

```
new a ∈ Z;

-- conditional execution
let a := 1 if (a = 0);

-- conditional output
put "a is 0" if (a = 0);
put "a >  0" if (a ≥ 0);
 
write; 
```

**Notes:** Keyword "if" and "else" are not related.

## Pattern Matching

Instead of ternary operator we use conditional expressions. 
These expressions are separated by coma and enclosed in ().

**Syntax:**

```
new <var> ∈ <type>;

-- single matching with default value
let <var> := (<xp> if <cnd>, <dx>);

-- multiple matching with default value
let <var> := (<xp1> if <cnd1>, <xp2> if <cnd2>..., <dx>);

-- alternative code alignment
let <var> := (
  <xp1> if <cnd1>,
  <xp2> if <cnd2>,
  <dx>  );
```

**Legend:**
 
```
<var>  := predefined variable
<xp1>  := expression of same type with <v>
<cnd1> := condition for <xp1>
<dx>   := default expression (optional condition).
```

**example**
```
new x := `0`;
get (x,"x:>");
new what := ("digit" if x ∈ [`0`..`9`], if x ∈ [`a`..`z`], "letter","unknown");
put "x is"._.what;
over;
```

## Control Flow

Bee has 2 control flow statements { when, cycle }:

### When

When is a decision statement selector based on one condition.

**syntax**
```
when <condition>:
  <statement>;
  ... 
when;
```

Dual selector based on single logical expression:

**pattern**
```
when <condition>:
  <true_branch>;
else:
  <false_branch>;
when;
```

**example**

```
let a := 0;
-- nested selector
when (a ≤ 0):  
  put 'a ≤ 0';
  when (a = 0):  
    put 'a = 0';
  else:
    put "a < 0"; 
  when;  
when;
write; 
-- expect 2 messages:
-- a ≤ 0
-- a = 0
```  

### Cycle

Create repetitive statement block.

```
cycle:
  <statement block>
  ...
  loop if <condition>;
  ...
  
  stop if <condition>;
  ...
cycle;
```

**example**

```
new a := 10;

cycle:
  let a -= 1;
  -- conditional repetition
  loop if (a % 2 = 0);  
  say a;  
  -- conditional termination
  stop if (a < 0);
  say ','; 
cycle;

write;
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
    loop outer if <condition>; 
    ...
    -- stop for both cycles
    stop outer if <condition>;
  cycle;
cycle;
```

**example**

```
new x   := 9;
new a,r := 0;

cycle:
  let r := x % 2;
  let a := (0 if r = 0, 1 if r = 0, 2);
  say "{1}:{2}" <+ (x,a);
  let x -= 1;
  stop if (x < 5);
  say ',';
cycle;

write; --> 9:1, 8:0, 7:1, 6:0, 5:1
```

## Functions

A function is a named block of code that can have parameters and results.

**pattern**
```
def <name>(<param> ∈ <type>,...) => (<result> ∈ <type>,...):
   [<statement>];
   ...   
   let <result> := <expression>;
   ...
def;
```

**Example:** 

```
-- method with one result:
def add(x,y ∈ i8) => (r ∈ i8):
  let r := x + y; 
def;

-- method can be call using "new" or "let"
new m := add(0,0); -- create m = 0 ∈ i8

-- two results "s" and "d"
def com(x,y ∈ Z) => (s ∈ Z, d ∈ Z):
  let s := x + y; 
  let d := x - y;
def;

-- unpack result to "b","c" using "<+"  
new b,c <+ com(2,1); 

put b; -- print 3 
put c; -- print 1 

-- call com and print the result
put com(0,0); -- print (0, 0)
write;

-- negative test: try to call com in expression
new x := com(1,1) + 1; -- compilation error, "com" has 2 results.

```

**Notes:**
* A function can not have output parameters;
* A function can not be interrupted using "exit" keyword;

**properties:** 

* functions have a local scope called _"context"_;
* functions can have one or more results;

**restriction:**
* a function can not be declared inside other function;
* a function result must be captured using assign ":=" o unpacking "<+"; 

## Methods

A method is a named block that have optional parameters but no result.

**pattern**
```
def <name>(<param> ∈ <type>,...):
   [<statement>];
   ...   
def;
```

**example**
```
-- a method with side-effect
def foo:
  put "hello, I am foo";
def;

-- using name of method will execute the method  
foo;
```

**Notes:**
* A method declaration do not require empty brackets ();
* A method call do not require empty brackets ();
* A method can have output parameters and side-effects;
* A method can be interrupted earlier using "exit" keyword.

**properties:** 

* method have a local scope called _"context"_;
* method can receive input/output parameters;
* method can have optional one or more results;

**restriction:**
* a method can not be declared inside other method;
* a methods can not be used in expressions except assign expression;
* a method result must be captured using assign ":=" o unpacking "<+"; 

## Parameters

Parameters are variables defined in a method or function signature.

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

## Lambda Expression

A λ expressions is a named expression that can have parameters and can create a result.

**syntax**
```
def <name> λ (<param> ∈ <type>,...) ∈ type => (expression);
```

**Example:** 

```
-- define "ex" a method with two parameters
def ex λ (x,y ∈ Z) ∈ Z => (x + y); 

-- expression can be used in larger expressions
new z := ex(1,1)+1; 
put z; -- print 3

write;
```

**properties**

* λ expressions can have only one result not a list;
* λ expressions can be created during run-time;
* λ expressions can be used in other λ expressions;
* λ expressions can be used as parameter for a method or function;
* λ expressions can be created as a result of a function;

**restriction:**

* λ expressions can not have side effects;
* λ expressions can not mutate variables;
* λ expressions can not have local declarations; 
* λ expressions can not receive input/output parameters;
* λ expressions can not perform input/output operations;
* λ expressions can not fail and can not be interrupted;

**See also:**
* [fn.bee](../demo/fn.bee)
* [pm.bee](../demo/pm.bee)

## Expression as Parameter

A method can receive λ expressions as parameters.

**syntax**
```
def <method_name>(<expression_name>λ(<param_list>) ∈ <result_type>):
  ...
def;
```

**example**
```
-- declare method with lambda parameter
def compare(a,b ∈ Z, cmp λ (Z,Z) ∈ L) => (r ∈ L):
  let r := cmp(a,b);
def;

-- declare λ expressions:
def lt λ(a,b ∈ Z) ∈ L => (a < b);

-- call compare using λ expression as named argument
new test := compare(1,2,cmp::lt);
put test; -- expect $⊤

-- call compare using anonymous λ expression argument
new test := compare(1, 2, λ(a,b) => (a ≥ b));
put test; -- expect $⊤

write;
```

**See also:**
* [ho.bee](../demo/ho.bee) 

**Read Next:** [Composite Types](composite.md)