## Bee Keywords

Bee uses 21 reserved keywords to create statements. You can not use these keywords as identifiers in your program. 

```
2: if
3: asm, cpp, bee, def, new, let, put, say, get 
4: read, when, else, exit, fail, pass, loop, stop, over;
5: write, cycle
```

### Definition statements

Next statements are used to import modules or declare something.

| Keyword  | Purpose
|----------|--------------------------------------------------
| asm      | Import Assembly \| start assembly code
| cpp      | Import C \| C++ library
| bee      | Import Bee module \| library
| def      | Define data type, constant, method or function
| new      | Declare a mutable variable

### Execution statements

Next statements represents actions. Also called Imperative statements.

| Keyword  | Purpose
|----------|--------------------------------------------------
| let      | Modify/mutate variables with value or expression
| put      | Add something to console buffer with new line 
| say      | Add something to console buffer but no new line 
| get      | Accept input from console and wait for read
| read     | Accept user input from console 
| write    | Output expression result to console 

## Control statements

Control statements are also known as decision statements.

| Keyword  | Purpose
|----------|--------------------------------------------------
| if       | Conditional augment and pattern matching
| when     | Decision block for conditional expression 
| else     | Alternative path executed in _when_ statement
| cycle    | Start point for repetitive block

## Interruption keywords

These keywords are jumps or termination statements.

| Keyword  | Purpose
|----------|--------------------------------------------------
| loop     | Continue iteration _for_ from beginning
| stop     | stop inner cycle and continue after end of cycle.
| exit     | Silent interrupt a method or function with no error 
| fail     | Interrupt method, function or program with error 
| pass     | Null statement. It does absolutely nothing.
| over     | Program over (finalize program)

**Read next:** [Syntax Overview](overview.md)