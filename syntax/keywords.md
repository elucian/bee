## Bee Keywords

Bee uses 26 reserved keywords to create statements. You can not use these keywords as identifiers. 

```
01: if,
10: read, when, else, exit, fail, pass, loop, stop, over, abort
08: write, print, modify, cycle, trial, patch, other, after 
07: define, assign, create, #import, #driver, #library, #module
```

### Definition statements

Next statements are used to import modules or declare something.

| Keyword  | Purpose
|----------|--------------------------------------------------
| import   | Import Assembly \| start assembly code
| define   | Declare: type, method, function, function
| create   | Create a variable/value using "∈", ":=" or "::"
| assign   | Create a reference to a variable using "::"


### Execution statements

Next statements represents actions. Also called Imperative statements.

| Keyword  | Purpose
|----------|--------------------------------------------------
| read     | Accept user input from console 
| write    | Add something to console buffer but no new line 
| print    | Output expression result to console 
| modify   | Mutate variable value using an expression

## Control statements

Control statements are also known as decision statements.

| Keyword  | Purpose
|----------|----------------------------------------------------
| if       | Conditional augment and pattern matching
| when     | Decision block for conditional expression 
| else     | Alternative path executed in _when_ statement
| cycle    | Start point for repetitive block
| trial    | Protect a block of code that may have exceptions

## Interruption keywords

These keywords are jumps or termination statements.

| Keyword  | Purpose
|----------|--------------------------------------------------
| loop     | Continue iteration _for_ from beginning
| stop     | stop inner cycle and continue after end of cycle.
| exit     | Silent interrupt an method or function with no error 
| fail     | Interrupt method, function or program with error 
| pass     | Null statement. It does absolutely nothing.
| over     | Program over (finalize program)

**Read next:** [Syntax Overview](overview.md)