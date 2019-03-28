## Bee Keywords

Bee uses 24 reserved keywords to create statements. You can not use these keywords as identifiers. 

```
01: if,
09: read, else, exit, fail, pass, over, abort
08: write, print, while, trial, patch, other, after 
08: define, modify, create, #import, #driver, #library, #module
```

### Definition statements

Next statements are used to import modules or declare something.

| Keyword  | Purpose
|----------|--------------------------------------------------
| import   | Import Assembly \| start assembly code
| define   | Declare: type, method, function, function
| create   | Create a variable/value using "∈", ":=" or "::"


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
| do if    | Execute statement block only if condition true
| done     | End of do block, follow by semicolumn
| else     | Alternative path executed in _do_ statement
| while    | Start point for repetitive block
| trial    | Protect a block of code that may have exceptions

## Interruption keywords

These keywords are jumps or termination statements.

| Keyword  | Purpose
|----------|--------------------------------------------------
| exit     | Silent interrupt an method or function with no error 
| fail     | Interrupt method, function or program with error 
| pass     | Null statement. It does absolutely nothing.
| over     | Program over (finalize program)

**Read next:** [Syntax Overview](overview.md)