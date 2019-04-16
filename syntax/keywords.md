## Bee Keywords

Bee uses 47 reserved keywords to create statements. 

```
02: if, is
05: #driver, #library, #aspect, #timer, #precision
09: rule, type, make, load, alias, clone, define, input, output
07: read, play, write, print, alter, scrap, apply 
08: when, else, cycle, while, repeat, scan, next, ready
05: trial, case, error, cover, final
11: exit, fail, pass, stop, halt, skip, over, abort, retry, solve, resume
```

**note:** You can not use these keywords as identifiers. 

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
| #timer      | Declare maximum time spent for a program to run. (default: 30s)
| #precision  | Declare maximum precision to use for decimal numbers. (default: 1m) 

**Note:** (1m = 10⁻³, 1μ =10⁻⁶)

### Definition statements

Next statements are used to declare or create a module member.

| Keyword  | Purpose
|----------|--------------------------------------------------
| input    | Declare input parameters
| output   | Declare output parameters
| define   | Declare a constant 
| load     | Declare a qualifier and load library
| alias    | Declare a local synonym for an aspect file
| type     | Declare data super-type or sub-type
| make     | Create a new variable or multiple variables
| rule     | Create a new rule or rule prototype 
| clone    | Create a new rule from an rule prototype

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
| cycle    | Start unconditional repetitive block
| while    | Start conditional repetitive block
| scan     | Start iteration loop for range or collection
| repeat   | End repetitive block: cycle, while, scan
| trial    | Protect a block of code that may have exceptions
| case     | One quest can cover multiple cases
| error    | Associated with trial to patch one errors
| cover    | Associated with trial to patch other errors
| final    | Associated with trial to finalize the trial block
| ready    | Close when or trial control blocks

## Interruption keywords

These keywords are jumps or termination statements.

| Keyword  | Purpose
|----------|----------------------------------------------------------------
| stop     | Interrupt a while loop and continue past repeat keyword
| skip     | Skip the rest of while block and continue from the beginning
| exit     | Force silent termination of a rule with no error 
| fail     | Interrupt a rule or block with recoverable error
| pass     | Null statement. It does absolutely nothing
| halt     | Create unrecoverable error and stop program
| over     | End rule or program and give control back to caller or OS
| abort    | Force silent early interruption of trial block
| retry    | Execute a previous case into a trial block
| solve    | Solve one forward case into a trial block
| resume   | Used in trial block to continue next case after failure

**Read next:** [Syntax Overview](overview.md)