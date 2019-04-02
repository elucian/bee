## Bee Keywords

Bee uses 33 reserved keywords to create statements. You can not use these keywords as identifiers. 

```
03: if, is, in
09: type, make, read, else, exit, fail, pass, over, panic
11: write, print, alter, scrap, solve, apply, while, trial, error, other, after, none 
08: method, aspect, define,switch, #import, #driver, #library, #module
02: function, relation
```

### Definition statements

Next statements are used to import modules or declare something.

| Keyword  | Purpose
|----------|--------------------------------------------------
| type     | Declare data type
| make     | Declare a variable 
| define   | Declare a constant
| aspect   | Declare a subroutine
| method   | Declare a mothod associated to an object
| function | Declare a function 
| relation | Declare a relation

### Execution statements

Next statements represents actions. Also called Imperative statements.

| Keyword  | Purpose
|----------|--------------------------------------------------
| solve    | Resolve one aspect of a larger problem
| read     | Accept user input from console 
| write    | Add something to console buffer but no new line 
| print    | Output expression result to console 
| alter    | Mutate variable value using an expression
| scrap    | Remove one element from a collection

## Control statements

Control statements are also known as decision statements.

| Keyword  | Purpose
|----------|----------------------------------------------------
| when     | Execute statement block only if condition true
| else     | Alternative path executed in when statement
| none     | Alternative path executed after else cases
| while    | Start point for repetitive block
| trial    | Protect a block of code that may have exceptions
| error    | Associated with trial to patch one errors
| other    | Associated with trial to patch other errors
| after    | Associated with trial to finalize the trial block
| switch   | Create a multi-path block of code

## Interruption keywords

These keywords are jumps or termination statements.

| Keyword  | Purpose
|----------|--------------------------------------------------
| exit     | Silent interrupt an aspect or function with no error 
| fail     | Interrupt aspect, function or program with error 
| pass     | Null statement. It does absolutely nothing.
| over     | Program over (finalize program)
| panic    | Create unrecoverable error

**Read next:** [Syntax Overview](overview.md)