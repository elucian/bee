## Bee Keywords

Bee uses 26 reserved keywords to create statements. You can not use these keywords as identifiers. 

```
2: if,
4: read, when, else, exit, fail, pass, loop, stop, over 
5: write, print, modify, cycle,
6: define, create, import, driver, library, module
```

### Definition statements

Next statements are used to import modules or declare something.

| Keyword  | Purpose
|----------|--------------------------------------------------
| import   | Import Assembly \| start assembly code
| define   | Declare: type, method, function, function
| create   | Create a variable/value


### Execution statements

Next statements represents actions. Also called Imperative statements.

| Keyword  | Purpose
|----------|--------------------------------------------------
| modify   | Mutate variable value using an expression
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