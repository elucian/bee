## Bee Keywords

Bee uses 29 reserved keywords to create statements. You can't use these keywords as identifiers in your program. That's the reason Bee is a minimalist language: to avoid restricting you to use English words as new identifiers in your program.

```
2: if, as  
3: asm, cpp, bee, def, get, say, put, new, let  
4: read, when, else, skip, next, exit, fail, pass, loop, stop, over 
5: write, cycle 
```

### Definition statements

Next statements are used to import modules or declare something.

| Keyword  | Purpose
|----------|--------------------------------------------------
| asm      | Import Assembly \| start assembly code
| cpp      | Import C \| C++ library
| bee      | Import Bee module \| library
| def      | Define user data type or constant
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
| fail     | Interrupt program execution with error 
| over     | Last executable statement in Bee module.

## Control statements

Control statements are also known as decision statements.

| Keyword  | Purpose
|----------|--------------------------------------------------
| if       | Conditional augment and pattern matching
| when     | Decision block for conditional expression 
| cycle    | Start point for repetitive block

## Semantic keywords

These keywords are associated with other statements to customize the statement behavior.

| Keyword  | Purpose
|----------|--------------------------------------------------
| else     | Alternative path executed in _when_ statement
| loop     | Continue iteration _for_ from beginning
| stop     | stop inner cycle and continue after end of cycle.
| fail     | Create an exception, used in job to create errors
| pass     | Clear exception and continue with next statement

**Read next:** [Syntax Overview](overview.md)