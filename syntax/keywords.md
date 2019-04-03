## Bee Keywords

Bee uses 30 reserved keywords to create statements. You can not use these keywords as identifiers. 

```
03: if, is, in
10: type, make, rule, read, else, exit, fail, pass, over, panic
11: write, print, alter, scrap, apply, while, trial, error, other, after, none 
06: define,switch, #import, #driver, #library, #module
```

### Definition statements

Next statements are used to import modules or declare something.

| Keyword  | Purpose
|----------|--------------------------------------------------
| type     | Declare data type
| make     | Declare a variable 
| define   | Declare a constant
| rule     | Declare a subroutine

### Execution statements

Next statements represents actions. Also called Imperative statements.

| Keyword  | Purpose
|----------|--------------------------------------------------
| apply    | Apply one rule that have no result
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
| exit     | Early termination of a rule with no error 
| fail     | Interrupt rule or program with recoverable error
| pass     | Null statement. It does absolutely nothing.
| over     | Finalize program and give control to OS
| panic    | Create unrecoverable error and stop program

**Read next:** [Syntax Overview](overview.md)