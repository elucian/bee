## Bee Keywords

Bee uses reserved keywords to create statements. You can not use these keywords as identifiers. 

```
2: if,
3: asm, cpp, bee, 
4: read, unit, when, else, exit, fail, pass, loop, stop, over 
5: class, range, value, write, print, alter, cycle, while, solve, 
6: aspect, global, static
```

### Definition statements

Next statements are used to import modules or declare something.

| Keyword  | Purpose
|----------|--------------------------------------------------
| asm      | Import Assembly \| start assembly code
| cpp      | Import C \| C++ library
| bee      | Import Bee module \| library
| static   | Declare a constant
| global   | Declare a global variable (also start with $)
| value    | Declare a mutable native or basic variable 
| rule     | Define a rule
| class    | Define a class
| unit     | Define a new class instance
| range    | Define sub-type range
| ordinal  | Define ordinal data type

### Collection declaration

| Keyword  | Purpose
|----------|--------------------------------------------------
| array    | declare an array
| list     | declare a list
| stack    | declare a stack of elements
| queue    | declare a queue
| tree     | declare a set of elements organized in binary tree
| index    | declare a set of values indexed by a key

### Execution statements

Next statements represents actions. Also called Imperative statements.

| Keyword  | Purpose
|----------|--------------------------------------------------
| alter    | Modify/mutate variables with value or expression
| print    | Add something to console buffer with new line 
| write    | Add something to console buffer but no new line 
| read     | Accept user input from console 
| print    | Output expression result to console 

## Control statements

Control statements are also known as decision statements.

| Keyword  | Purpose
|----------|--------------------------------------------------
| if       | Conditional augment and pattern matching
| when     | Decision block for conditional expression 
| else     | Alternative path executed in _when_ statement
| cycle    | Start point for repetitive block
| while    | Execute a block of code while condition is true
| solve    | Resolve a multi-case problem that may fail

## Interruption keywords

These keywords are jumps or termination statements.

| Keyword  | Purpose
|----------|--------------------------------------------------
| loop     | Continue iteration _for_ from beginning
| stop     | stop inner cycle and continue after end of cycle.
| exit     | Silent interrupt an aspect or rule with no error 
| fail     | Interrupt aspect, rule or program with error 
| pass     | Null statement. It does absolutely nothing.
| over     | Program over (finalize program)

**Read next:** [Syntax Overview](overview.md)