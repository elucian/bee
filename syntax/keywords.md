## Bee Keywords

Bee uses 29 reserved keywords to create statements. You can't use these keywords as identifiers in your program. That's the reason Bee is a minimalist language: to avoid restricting you to use English words as new identifiers in your program.

```
2: {if, as}  
3: {asm, cpp, bee, def, con, get, say, put, new, let}  
4: {read, case, else, next, over, exit, fail, pass, loop, stop} 
5: {write, cycle, abort, trial, error, other, after} 
```

### Definition statements

Next statements are used to import modules or declare something.

| Keyword  | Purpose
|----------|--------------------------------------------------
| asm      | Import Assembly \| start assembly code
| cpp      | Import C \| C++ library
| bee      | Import Bee module \| library
| def      | Define user data type or type alias
| con      | Declare immutable variable (constant)
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
| exit     | Silent interrupt a method with no error 
| abort    | Interrupt program execution with error 
| over     | Last executable statement in Bee module.

## Control statements

Control statements are also known as decision statements.

| Keyword  | Purpose
|----------|--------------------------------------------------
| case     | Decision block for conditional expression 
| cycle    | Start point for repetitive block
| trial    | Anonymous block and exception handler


## Semantic keywords

These keywords are associated with other statements to customize the statement behavior.

| Keyword  | Purpose
|----------|--------------------------------------------------
| if       | Conditional augment and pattern matching
| else     | Alternative path executed in _when_ statement
| loop     | Continue iteration _for_ from beginning
| stop     | stop inner cycle and continue after end of cycle.
| fail     | Create an exception, used in job to create errors
| pass     | Clear exception and continue with next statement
| error    | Create specific exception handler in trial block
| other    | Create generic exception handler in trial block
| after    | Create finalization region for trial-error block

**Read next:** [Syntax Overview](overview.md)