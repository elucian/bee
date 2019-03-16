## Bee Syntax

For syntax notation we use modified BNF convention:

* We use \<name\> to represent identifier names;
* We use  ...  to represent repetitive sequence;
* We use notes or examples to explain optional things;

**bookmarks**

* [Expression](#expression)
* [Data type](#data-type)
* [Control Flow](#control-flow)
* [Pattern Matching](#pattern-matching)
* [Functions](#functions)
* [Methods](#methods)
* [References](#references)


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
put (10 + 10 + 15);     -- math
put (10 > 5) | (2 < 3); -- logical

--multiple expressions in a line
put (1,',',2,',',3); --expect 1,2,3
put (10, 11, 12);    --expected 101112   

--avoid new line after 2
say (1,2);
say (3,4);  --> expect 1234

write --> print 6 rows
```

**Notes:** 
* put statement can receive multiple parameters
* put statement add new line by default
* to avoid new line use coma separated parameters
* to avoid new line you must use "say" statement instead of "put"
* multiple expressions or arguments are separated by comma
* you can omit the parentheses when you call a method with one single parameter

## Data type

Digital data is based on binary numbers: {0, 1}.
Using this basic values we represent all data types.

Bee use 4 kind of data types:

1. native data types;
2. basic data types;
3. composite data types;
4. user defined types;

**Native types**

In Bee native types are created using a lowercase letter and a number representing the number of bytes used. These types are compatible to C++ native types and are used for ABI but can be also used to improve performance in critical applications. 

type | name             | size
-----|------------------|---------------
 b1  | single byte      | 1 byte
 b2  | Intel word       | 2 bytes
 c1  | char (ASCII)     | 1 byte 
 c2  | expanded (DBCS)  | 2 byte 
 n4  | short number     | 4 bytes 
 n8  | long number      | 8 bytes  
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
| String      |S  | limited capacity string   (single quoted)
| Unlimited   |U  | unlimited capacity string (double quoted)
| Date        |D  | DD/MM/YYYY
| Time        |T  | hh:mm,ms
| Complext    |C  | Complex number

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

Constants are protected memory locations representing a un-mutable value.

```
def <constant_name> := <constant> ε <type>;   
```

**Notes:** 
* You can use only native types or basic types for constants;
* Constant identifier is not restricted to a particular convention;

## Variable declarations

Variables are defined using keyword "new" and next operators:

sym | purpose
----|------------------------------------------------------------------
 ε  | declare variable type | member type | parameter type
 :  | pair-up member value to a constant/expression or constructor
 := | initialize variable using a constant/expression or constructor
 :: | initialize variable using a reference to another variable


```
-- full declarations with type and initial value
new <var_name> ε <type>;
new <var_name> := <constant> ε <type>;

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
new a := 10 ε i8; -- native variable
new b := 0  ε Z;  -- basic variable

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
new a   ε Z; -- Integer 
new x,y ε R; -- Double
new q,p ε L; -- Logic

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
new <var_name>[,<var_name>] ... ε <type_name>;
```

## Type conversion

Bee is an explicit language. We avoid implicit conversions.
When data type mismatch we must perform explicit conversion.

* If data do not fit in the new type you receive a runtime error.
* Explicit conversion is done using _pipeline operator: "->"

**example:**
```
new a := 0, b := 20 ε Z;   
new v := 10.5, x := 0.0 ε R;

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
new a,b ε A; --ASCII character
new x,y ε B; --Binary number 

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

Logic type is an enumeration of two public symbols: ƒ = 0 False and † = 1 True

```
def .L <: {f, t};
```

## Logic operations

Bee uses several familiar operators:

*  ¬ (not) unary operator, has the highest precedence
*  & (and) dual operator, has moderate precedence
*  | (or)  dual operator, has lowest precedence

Precedence: { ¬, &, | }

**relations**
Relation operators will create a logical response: † or ƒ.

* comparison ( ≈, =, =, >, <, ≤, ≥ ); 
* belonging operation ( ε, >>, <<, >=, <= );
* logic equivalent ( ↔ ); 

**Precedence:** 

* Logic operators have greater precedence than relations. 
* Lowest precedence is for "↔". 

## Logical expression

Logical expression have value { ƒ, † }

```
new x := ƒ ε L;
new y := † ε L;

--simple expressions
put    x; -- ƒ
put  ¬ x; -- †

--complex expressions
put  (x ↔ y);  --  ƒ
put ¬(x ↔ y);  --  †
put  (x < y);  --  †
put  (x > y);  --  ƒ
put  (x & y);  --  ƒ
put  (x | y);  --  †

```
**Notes:** 
* Operators { ¬ } is unary operator;
* Operators { &, | } are shortcut operators;

**coercion**
Any numeric expression ca be converted to logic using coercion operation `-> L`

```
new x, y ε L;
new a := 0.0, b := 1.5 ;

let x := a -> L; -- x := 0
let y := b -> L; -- y := 1
```

**Notes:** 
* Only integer part of a number is used;
* Fraction is eliminated before conversion;
* A string that contains "True" "true", "T" or "t" or "1" convert to: †
* A string that contains "False", "true", "F" or "f" or "0" convert to: ƒ

## Control Flow

Bee has 3 control flow statements {if, when, cycle }:

## Conditional

A conditional is using "if" keyword to control one statement.   
Observe that "if" is not itself a full statement only an augment.

```
<statement> if (<condition>);
```

The statement is executed only if the condition is T = true. 

**notes:**
1. Conditional expression must be enclosed in ();
1. Conditional can not be used with declaration statements;
1. Conditional can not be used with block statements;

```
new a ε Z;

-- conditional execution
let a := 1 if (a = 0);

-- conditional output
put "a is 0" if (a = 0);
put "a >  0" if (a ≥ 0);
 
write; 
```

**Notes:** Keyword "if" and "else" are not related.

### When

Dual selector based on single logical expression.

**pattern**
```
when <condition>:
  <branch>;
else:
  <branch>;
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

## Pattern Matching

Instead of ternary operator we use conditional expressions. 
These expressions are separated by coma and enclosed in (, , ,).

**Syntax:**

```
new <var> ε <type>;

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
<dx>   := default expression (no condition).
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

Bee functions are named expressions that can return a single result:

**syntax**
```
<name>(<param> ε <type>,...) ε type => (expression);
```

**Example:** 

```
new z ε Z;
func(x,y ε Z) ε Z => (x + y); 

-- function call
let z := func(1,1); 
put z; -- print 2 

write;
```

**Note:** 
* Functions must have one single result;
* Result expression is enclosed in brackets ();
* Arguments for function calls require ();

## Methods

A method is a named block that can have one or more results.

```
<name>(<param> ε <type>,...) => (<result> ε <type>,...):
   [<statement>];
   ...   
   let <result> := <expression>;
<name>;
```

**Example:** 

```
-- two results "s" and "d"
com(x,y ε Z) => (s ε Z, d ε Z):
  let s := x + y; 
  let d := x - y;
com;

-- unpack result to "b","c" using "<+"  
new b,c <+ com(2,1); 

put b; -- print 3 
put c; -- print 1 

-- call com and print the result
put com(0,0); -- print (0, 0)
write;
```

**Side effects**

* Some methods have no parameters and no results; 
* These methods are used for side-effects;

**example**
```
-- using:↓↓↓ for empty result makes this a method
foo() => ():
  put "hello, I am foo";
foo;

-- using name of method will execute the method  
foo();

```

**Notes:**
* Method declaration is using "()" to indicate no result;
* Method with no parameters require empty brackets () for declaration;
* Method calls do not require brackets () for one single argument;
* Multiple arguments can be enumerated only with brackets (arg1, arg2...);
* A method can not be used in expressions except assign expressions;
* A method can have side-effects or output parameters;
* We can interrupt a method prematurely using "abort" keyword. 

**Bounding**
A method can bound to the first parameter. The first parameter is called: "me" but this name is not restricted you can also use: "it","he", "she", depending on gender. Bounding methods enable object oriented design in Bee.

**Constructor**
One special method is called constructor. This method has same name as the bounded type but with lowercase. It can have other name defined by the user convention. Also a constructor has a result that is a reference to "me" object. 

**example**
```
-- define Foo as object with 3 public attributes:
def Foo <: {.p1 ε N, .p2 ε N, .p3 ε S};

-- constructor (same name as Foo)
-- create a result of type Foo (me)
foo() => (me @ Foo):
  let me := {0,0,0}
foo;

-- initialization method for Foo type
bar(me @ Foo, p1, p2 ε Z, p3 ε S) => ():
  --precondition
  fail if (p1 < 0 | p2 < 0 | p3 = "");
  
  --modify Foo members
  let me.p1 := p1;
  let me.p2 := p2;
  let me.p3 := p3;
bar;

-- second method for Foo type
print(me @ Foo) => ():
  put "{p1={0},p2={1},p3={2}}" <+ (me.p1, me.p2, me.p3);
print;

-- declare instance of Foo
new test := foo(); 

test.bar(1,2,"Test"); -- initialize foo
test.print; -- call second method for foo

write;


```
**Notes:** 
* Bee is using single dispatch to identify first parameter;
* If the type is public, the constructor should be also public;
* Methods of a type can be private to module or public using dot prefix;
* Constructors and methods can be overloaded using multiple dispatch;
* Constructors and methods can be overwritten in other modules;

## References 

In Bee all basic types and user defined types are references. 

* Default assign `:=` copy a value or execute an expression. 
* Reference assign `::` clone a reference and fail if this is not possible.

**example**
```
new i := 0  ε i4; 
new j := 10 ε Z;

-- explicit un-boxing
let i := j; -- copy j value. make i = 10
let i := i + 2; -- modify i := 12
put j; --> j = 10 (unmodified)

-- verify assignment effect
put j = i; -- 1 same value
put j ≡ i; -- 0 different reference 

-- explicit boxing using "::"
let j :: i; -- boxing i := 12 
let i += 1; -- modify i := 13
put j; --> expect 13 (modified)

-- verify boxing effect
put j = i; -- 1 same value
put j ≡ i; -- 1 (true) same reference 

write;
```

**See also:** [nu.bee](../demo/nu.bee) 

## Parameters & Arguments

Parameters are variables defined in method or function signature.   
Arguments part of the function call and can be constants, variables or expressions.

**Notes:**   
* Parameters can be pass by value or by reference depending on the type;
* If a parameter is a native type is is received by value;
* If a parameter is a reference type it is received by reference;
* For input/output parameters we must require a reference using "@";

**Read Next:** [Composite Types](composite.md)