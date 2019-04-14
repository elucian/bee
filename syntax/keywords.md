## Bee Keywords

Bee uses 34 reserved keywords to create statements. You can not use these keywords as identifiers. 

```
02: if, is
05: #driver, #library, #aspect, #timer, #precision
08: alias, type, make, rule, load, define, accept, return
07: read, play, write, print, alter, scrap, apply 
09: while, trial, error, other, after, else, quest, case, cover
07: exit, fail, pass, over, stop, halt, skip
```

### Operators

| Keyword     | Purpose
|-------------|--------------------------------------------------------
| if          | conditional suffix operator
| is          | introspection operator (is of type)

### Directives

| Keyword     | Purpose
|-------------|--------------------------------------------------------
| #driver     | Declare file name for a primary module
| #aspect     | Declare file name for a secondary module
| #library    | Declare file name for a library
| #timer      | Declare maximum time spent for a program to run
| #precision  | Declare maximum precision to use for decimal numbers

### Definition statements

Next statements are used to load aspects or declare something.

| Keyword  | Purpose
|----------|--------------------------------------------------
| define   | Declare a constant
| load     | Load a library and assign a qualifier
| alias    | Declare a local name for an aspect
| type     | Declare data type
| make     | Declare a variable 
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
| play     | Launch one aspect in execution to play a large problem

## Control statements

Control statements are also known as decision statements.

| Keyword  | Purpose
|----------|------------------------------------------------------
| when     | Execute statement block only if condition true
| else     | Alternative path for when statement
| while    | Start point for repetitive block
| trial    | Protect a block of code that may have exceptions
| error    | Associated with trial to patch one errors
| other    | Associated with trial to patch other errors
| after    | Associated with trial to finalize the trial block
| quest    | Create a multi-path block of code
| case     | One quest can cover multiple cases
| cover    | Alternative case for quest statement

## Interruption keywords

These keywords are jumps or termination statements.

| Keyword  | Purpose
|----------|--------------------------------------------------
| stop     | Interrupt a while loop and continue after end 
| skip     | Skip forward in while block to continue from beginning
| exit     | Early termination of a rule with no error 
| fail     | Interrupt rule or program with recoverable error
| pass     | Null statement. It does absolutely nothing
| over     | Finalize program and give control to OS
| halt     | Create unrecoverable error and stop program

**Read next:** [Syntax Overview](overview.md)