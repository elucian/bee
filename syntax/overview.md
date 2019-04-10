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
* [Exceptions](#exceptions)
* [Rules](#rules)
* [Parameters](#parameters)

## Expression
Expressions are created using identifiers, operators, rules and constant literals. 

* can be enumerated using comma separator ","
* can be combined to create more complex expressions;
* have type that is calculated using type inference;
* can be assigned to variables using "value" or "modify" statements;
* can be printed to console using "print" or "write" actions;
* can use () to establish order of operations;

**Examples**
```
-- simple expressions in print statement
-- no need for parentheses for a single value
print 10; -- print 10
print "this is a test";

--complex expressions can use ()  
print (10 + 10 + 15);   -- math
print (10 > 5 | 2 < 3); -- logical

--multiple expressions in a line
print (1,',',2,',',3); --expect 1,2,3
print (10, 11, 12);    --expected 101112   

--avoid new line after 2
write (1,2);
write (3,4);  --> expect 1234

-- calculation that fail will do nothing.
alter x := 5 ∈ R;
alter x := x ÷ 0; -- no effect

print  x; -- expect x = 5
```

**Notes:** 
* print statement can receive multiple parameters;
* print statement add new line by default;
* write statement can be used to avoid new line;
* multiple arguments are separated by comma;
* multiple arguments are enclosed in parenthesis;

## Data type

Bee use 3 kind of data types:

1. basic data types;
2. composite data types;
3. user defined types;

**Basic Types**

Bee basic data types have information about: 

1. name
1. capacity
1. limits  (min/max)
1. internal representation


Basic types are represented with one single upper-case character.

| Name        |Bee|Bytes|Description
|-------------|---|-----|------------------------------------------------------------
| Logical     |L  | 2   |Logical number {0,1} (aligned to 2 bit)
| Alphanumeric|A  | 4   |UTF32 code point (32 bit integer)
| Binary      |B  | 4   |Unsigned 32 bit integer < 4294967296
| Rational    |Q  | 8   |Fraction of two binary numbers like: 1/2
| Natural     |N  | 8   |Unsigned large positive number     [0..+]
| Integer     |Z  | 8   |Signed large discrete number       [-..+]
| Positive    |P  | 8   |Double precision positive numbers: (0..+)
| Real        |R  | 8   |Double precision number            (-..+)
| Complex     |C  |16   |Complex number

**Note:** 
* Basic types are values;
* Basic types have fixed size;
* Basic types are mapped to native OS types;
* Basic types are allocated on the stack;

**Composite types**

| Name        |Bee| Description
|-------------|---|----------------------------------------------------------------
| String      |S  | Limited capacity string UTF32:  Default capacity 1024 bytes
| Unlimited   |U  | Unlimited capacity string UTF8: Usually contains a single row
| Text        |X  | Large UTF8 blob text that can have multiple rows 
| Date        |D  | DD/MM/YYYY 
| Time        |T  | hh:mm,ms
| Exception   |E  | Exception object: {code, message, line}

**Notes:**
* Composite types are objects;
* Composite types are allocated on the heap;
* Composite types have usually variable size;
* Reference to composite type can be pass around.

## Literals

Bee has support for numeric constants. These can be used in expressions to represent numbers.

|   Literal | Description
|-----------|-----------------------------------------------------------
|0          | integer zero
|1234567890 | integer number : (0,1,2,3,4,5,6,7,8,9)
|0b10101010 | binary integer : (b,0,1)
|0xFFFFFFFF | hexadecimal integer: (x,0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F)
|0.05       | real number: (.,0,1,2,3,4,5,6,7,8,9) 
|1E10       | real number: 1×10¹⁰  :=   10000000000  
|1e10       | real number: 1×10⁻¹⁰ := 0.0000000001  
|1/2        | rational number: 1/2 = 0.5 

## Collection types

Bee define a collection using a special notation based on brackets.

| sym| Collection type
|----|------------------------------------------------------------------
| () | List \| Expression
| [] | Array \|  Matrix 
| {} | Set \| Map \| Object

## Constant declaration

Constants are protected memory locations representing a non-mutable value.

```
define constant_name := constant_literal;
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
 :  | pair-up member value to a constant/expression or constructor
 := | initialize variable using a constant/expression or constructor
 :: | initialize variable using a reference to another variable

```
-- full declarations with type and initial value
make var_name ∈  type_name;
make var_name := constant ∈ type_name;

-- partial declaration using type inference
make var_name := expression; -- type inference

-- reference declaration using using operator "::"
make ref_name :: var_name; 
make ref_name :: object_constructor; 
```

Multiple variables can be define in one single line using comma separator:
```
make var_name, var_name ... ∈ type;
make var_name, var_name ... := expression;
```

**Notes:** 

* Each variable in the list will be initialized in a different location;
* If operator "::" is used you can create multiple references for same location;

## Modify values

One can modify variables using "modify" statement.

**example**
```
make a := 10, b := 0 ∈ Z;  

alter b := a + 1; -- modify b 10->11 
print b;          -- expected 11
```

**notes:** 
* Multiple variables can be modified all at once when separated by comma;
* The modify statement can use only operator ":=" or "::";

**Examples:**
```
-- declare a constant that can't change it's value
define pi := 3.14 ∈ R;

-- declare multiple variables using modify
make a   ∈ Z; -- Integer 
make x,y ∈ R; -- Double
make q,p ∈ L; -- Logic

--using modifier expressions
alter a := 10;  -- modify value of a := 10
alter a += 1;   -- increment value of a := 11
alter a -= 1;   -- decrement value of a := 10

-- modify two variables using one constant
alter q, p := $T;    -- modify value of q and p
alter x, y := 10.5;  -- modify value of x and y
```

## Type declaration

User can define composite types and sub-types using operator "<:" (sub-type).

```
--declare new type
type type_name <: type_descriptor;

--using new type
make var_name,var_name ... ∈ type_name;
```

## Type conversion

Bee is an explicit language. We avoid implicit conversion.   
When data type mismatch we must perform explicit conversion.

* Explicit conversion is when; using _pipeline operator: "->"
* This is unsafe operation. And a range check is recommended before conversion.
* Data precision may suffer. Some decimals may be lost.
* If data do not fit in the new type overflow exception is created.

**example:**
```
make a := 0, b := 20 ∈ Z;   
make v := 10.5, x := 0.0 ∈ R;

--explicit conversion
alter a := v -> N;
print a ; -- truncated to 10 

--explicit conversion
alter x := b -> R;
print x ; --> expect 20.0
```

## Alphanumeric type

Bee define A := Single UTF character: native type.

```
make a, b ∈ A; --Alphanumeric symbol
make x, y ∈ B; --Binary number 

alter a := `0`;    -- representation of 0
alter x := a -> B; -- convert to 30
alter y := 30;     -- UTF code for '0'
alter b := y -> A; -- convert to '0'
```
## Type checking

We can use variable type to validate expression type.

```
make a := 0;    -- integer variable 
make b := 0.0;  -- real variable 

alter b := 10;  -- FAIL: b is of type: Real
alter a := 10.5;-- FAIL: a is of type: Integer
```

## Logic type

Logic type is an enumeration of two public symbols: $F = 0 = False and $T = 1 = True

```
type .L <: {.$F:0, .$T:1};
```

## Logic operations

Bee uses several familiar operators:

*  ¬ (not) 
*  ∧ (and) 
*  ∨ (or)  
*  ~ (xor)  
*  ↔ (inference)  
 
Precedence: { ¬, ∧, ∨, ~, ↔ }


**comparison**
Comparison operators will create a logical response: $F = 0 or $T = 1.

* comparison ( ±, ↔, =, ≠, ≡, >, <, ≤, ≥ ); 
* belonging  ( ∈, ⊃, ⊂ );

**Precedence:** 

* Logic operators have greater precedence than comparison. 


## Logical expression

Logical expression have value { $F, $T }

```
make x := $F; -- false
make y := $T; -- true

--simple expressions
print   x; -- $F = 0
print ¬ x; -- $T = 1

--complex expressions
print  (x ↔ y);  --  0
print ¬(x ↔ y);  --  1
print  (x < y);  --  1
print  (x > y);  --  0
print  (x ∧ y);  --  0
print  (x ∨ y);  --  1

```
**Notes:** 
* Operators { ¬    } is unary operator;
* Operators { ∧, ∨ } are also bitwise operators;
* Operators { ¬, ~ } are also bitwise operators;
* Operators { ←, →, ↑, ↓ } are bitwise operators;

**coercion**
Any numeric expression ca be converted to logic using coercion operation `-> L`

```
make x, y ∈ L;
make a := 0.0, b := 1.5 ;

alter x := a -> L; -- x = $F
alter y := b -> L; -- y = $T
```

**Notes:** 
* Only integer part of a number is used in conversion;
* Fraction is truncated before conversion to logic type;
* A string: "Yes" "yes", "True", "true", "T" or "t" or "1" convert to: $T
* A string: "No", "no", "False", "true", "F" or "f" or "0" convert to: $F

## Reference

All composite variables are references to objects. 

**modify**

* New references are declared using "@" instead of "∈"
* Reference can be borrowed using operator: "::"
* Reference content can be initialized using operator ":="
* Reference content/value can be cloned using operator ":="

**example**
```
make i := 10 ∈ Z;  -- basic type
make j :: i  @ Z;  -- reference to i
make k @ Z;        -- null reference

-- borrowing address / boxing
alter k :: i; -- boxing i := 12 
alter i += 1; -- modify i := 13
print k; --> expect 13 (modified)

-- verify boxing effect
print k ≡ j; -- $T (same)
print k ≡ i; -- $T (same)
print j ≡ i; -- $T (same)
```

## Conditional

A conditional is using symbol "if" that is implication to control one statement.   

```
 statement if (condition);
```

The statement is executed only if the condition is 1 = $T. 

**notes:**
1. Conditional expression must be enclosed in ();
1. Conditional can not be associated with type statement;
1. Conditional can not be associated with value statement;
1. Conditional can not be associated with any block statement;

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
   dx  );
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
make x := `0`;
read (x,"x:>");

make kind := ("digit" if x @ [`0`..`9`], "letter" if x @ [`a`..`z`], "unknown");
print "x is ".kind; -- expect: "x is digit"
over;
```

## Control Flow

Bee has 3 control flow statements { when, while, trial }:

### when

Case is a decision statement selector based on one condition.

**syntax**
```
when (condition):
  statement;
when;
```

Dual selector based on single logical expression:

**pattern**
```
when (condition):
  -- first branch;
else:
  -- second branch;
when;
```

**Note:** Column ":" is mandatory after else keyword.

**nested**

```
make a := 0;
when (a ≤ 0):
  print 'a ≤ 0';
  when (a = 0):
    print 'a = 0';
  else:
    print "a < 0"; 
  when;  
when;
```

**ladder**
```
make a := 0;
when (a < 0):
  print 'a < 0';
else (a > 0):
  print 'a > 0';
else:
  print "a = 0"; 
when;
```

### Switch

Is a multi-path selector based on a single value:

**pattern**

* "var" can be any variable or expression;
* "val" can be a value or expression;
* "..." is optional but an actual symbol;

```
switch var:  
  is val1:
    -- match first
    ...
  is val2:
    -- match second
    ...
  in (val1,val2,val3 ...):
    -- match third
    ...
  in [min..max]:
    -- match forth
other:
  -- default branch
switch;
```

**Note:**: 

* Switch is automatically break at first match unless "..." is used;
* If a case end with "..." after ";" the next case is also evaluated;

### While

Controlled repetitive block:

```
while (condition):
  -- repetitive block
  ...
  skip if condition; -- continue
  ...
  stop if condition; -- break
  ...
else:
  -- alternative path
while;
```

**Notes:** 
* If condition is true all the time we can end-up in infinite loop;
* Infinite while can be interrupted by timer directive: {#timer:10s};
* When timer expire, the loop will terminate. By default timer is 0s;

**example**

```
make a := 10;

while (a > 0):
  alter a -= 1;
  -- conditional repetition
  when (a % 2 ≠ 0);  
    write a;  
    write ','; 
  when;
while;
print;
```

### Nested loop

One while block statement can be nested:

**pattern:** 

```
while condition: 
  -- outer loop 
  
  while condition:
    -- inner loop
  while;  
  -- continue outer loop
  ...
  while condition:
    -- inner loop
    ...
  while;  
  ...       
while;
```

**example**

```
make x   := 9;
make a,r := 0;

while (x < 5):
  alter r := x % 2;
  alter a := (0 if r = 0, 1 if r = 0, 2);
  write "{1}:{2}" <+ (x,a);
  write ',' if (x < 5);
  alter x -= 1;  
while;

print;--> 9:1, 8:0, 7:1, 6:0, 5:1
```

## Trial

The "trial" statement execute a process that can fail for some reason.

**Keywords:**

| word  | description
|-------|------------------------------------------------
| trial | start and end trial block
| error | catch and fix error code
| other | catch other errors
| after | executed after trial ends
| pass  | scrub $error record and end trial
| exit  | stop current rule/rule 
| fail  | interrupt and raize exception (default 0)
| over  | unconditional stop program
| panic | unrecoverable error, stop program (default -1)
| $error| system last error record (clear by pass)

```
trial:
  -- protected region
  ...
  -- fail with error code
  fail if (condition);
  fail {code,"message"} if (condition);
  ...    
error code:
  -- patch statement
error code:
  -- patch statement  
...  
other:
  -- other errors  
after:
  -- finalization
trial;
```

**error**

Error regions are "exception handlers". Each can resolve one single error with a specific code.

**other**

The "other" region is executed when the error is not captured by a patch. In this region you can use control statements for a range of errors. 

**after**

This region is executed regardless if there is an error or not. It contains resource closing statements:

* close a file or connection to databases 
* close locked resources and free memory

## Exceptions
An exception is a recoverable error. It can be declared by the user or by the system:

**definition**
```
-- global exception type
type E <: {code ∈ Z, message @ S, line ∈ Z};

-- global system error
make $error ∈ E;
```

User can define his own exceptions with code > 200:

**example**
```
make $custom_error  := {200,"my first exception"} ∈ E; 

fail $custom_error if (condition);
```

**Notes:**
* Error code <  200 are system reserved error codes.
* Error code ≤ -1   are unrecoverable panic errors

**example**

```
panic -1 ; -- end program and exit with error code = -1
```

## Rules

An rule is a named code block that can resolve one or multiple tasks. 

**pattern**
```
rule name(param ∈ type,...):
   -- executable statements
   exit if condition;
   ...
rule;
```

**example**
```
-- a rule with side-effects and no parameter
rule foo:
  print "hello, I am foo";
rule;

-- using apply + rule name will execute the rule  
apply foo;
```

**notes:**
* A rule can be executed using keyword "apply";
* A rule can have input/output parameters;
* A rule can be terminated early using "exit";
* A rule can be interrupted using "fail","panic";
* A program can be terminated from a rule using "over";

## Parameters

Parameters are variables defined in rule signature.

**Notes:**   
* Basic arguments and literal arguments are pass by value;
* Composite type parameters can be pass by reference or by value;
* For input/output parameters we are using "@" instead of "∈";

**note**
* Parameters with initial value are optional;
* Optional parameters must be last parameters;
* Optional parameters are initialized with pair-up operator ":";

## Static rules

Static rules are named code blocks with results:

**pattern**
```
rule name(param ∈ type,...) => (result ∈ type,...):
   make local_variable;
   ...   
   alter result := expression;
   ...
rule;
```

**Example:** 

```
-- rule with two results "s" and "d"
rule com(x,y ∈ Z) => (s ∈ Z, d ∈ Z):
  alter s := x + y; 
  alter d := x - y;
rule;

-- unpack result to "b","c" using "<+"  
make b,c <+ com(2,1); 

print b; -- print 3 
print c; -- print 1 
```

**Notes:** 

* Result name is explicit declared;
* All statements are executed;
* Rules can be used in expressions;
* There is no return statement;

**properties:** 

* Static rules can create one or more results;
* Static rules can have local states and local scope;
* Static rules can receive input/output parameters;
* Static rules can have side-effects;
* Static rules results can be captured using unpacking `<+`
* Static rules can have public attributes using dot prefix;

**See also:**
* [bs.bee](../demo/bs.bee) -- Bubble Sort

## Expression rules

Expression rules are based on a single expression. 

**syntax**
```
rule name(param ∈ type,...) => (expression) ∈ type;
```

**Example:** 

```
-- define "exp" a rule
rule exp(x,y ∈ Z) => (x + y) ∈ Z; 

-- using the rule in other expression
make z := exp(1,1) + 1; 
print  z; -- print 3
```

**notes**

* Expression rules have single result;
* Expression rules are deterministic;
* Expression rules are binding external states;
* Expression rules are using referential transparency;
* Expression rules can be created at runtime;

**See also:**
* [pm.bee](../demo/pm.bee) -- expression rule
* [fn.bee](../demo/fn.bee) -- pattern matching rule
* [fi.bee](../demo/fi.bee) -- recursive rule
* [rp.bee](../demo/rp.bee) -- rule as parameter

**notes**

I have used KISS principles to design rules: 

* Explicit is better than implicit;
* Efficient is better than pure; 
* Keep it simple stupid;

## Rule object

A rule object is a rule created at runtime by another rule.

**pattern**
```
rule rule_name(parameters) => result_rule(parameters):
  rule result_rule(parameters) => (expression) ∈ type;
rule
```

**notes:**
* Parent rule is referred as rule constructor or rule factory;
* A rule object can have public attributes starting with dot prefix ".";
* A rule object can communicate with constructor using parent attributes;
* A rule object is binding external states into local scope;

**example**
```
-- this rule can create a rule object
rule shift(i ∈ Z) => g(s ∈ Z):
  rule g(s ∈ Z) => (s + i) ∈ Z;
rule shift;

-- instantiate two rule objects
make inc := shift(+1);  -- increment 
make dec := shift(-1);  -- decrement 

-- test rule object "inc"
print inc(1); --> 2
print inc(4); --> 5

-- test rule object "dec"
print dec(1); -->  0
print dec(2); -->  1
print dec(0); --> -1
```

**See also:**
* [ho.bee](../demo/ho.bee) -- High order rule

**Read Next:** [Composite Types](composite.md)