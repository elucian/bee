## Bee Keywords

Bee uses 34 reserved keywords to create statements. You can not use these keywords as identifiers. 

```
03: if, is, in
12: type, make, rule, read, exit, fail, pass, over, stop, skip, else, none 
12: alias, write, print, alter, scrap, apply, while, trial, error, other, after, panic
07: define, import, switch, resolve, #driver, #library, #aspect
```

### Definition statements

Next statements are used to import aspects or declare something.

| Keyword  | Purpose
|----------|--------------------------------------------------
| type     | Declare data type
| make     | Declare a variable 
| rule     | Declare a subroutine
| define   | Declare a constant
| import   | Load a library and assign a qualifier for it
| alias    | Declare a local name for an aspect file and path

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
| resolve  | Launch one aspect in execution to resolve a large problem

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
| stop     | Interrupt a while loop and continue after end 
| skip     | Skip forward in while block to continue from beginning
| exit     | Early termination of a rule with no error 
| fail     | Interrupt rule or program with recoverable error
| pass     | Null statement. It does absolutely nothing.
| over     | Finalize program and give control to OS
| panic    | Create unrecoverable error and stop program

**Read next:** [Syntax Overview](overview.md)