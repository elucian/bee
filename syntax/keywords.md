## Bee Keywords

Bee uses 51 reserved keywords to create basic statements: 

```
03: if, is, to
05: #driver, #library, #aspect, #timer, #precision
09: load, alias, type, define, make, rule, clone, input, output, return
07: read, play, write, print, alter, scrap, apply 
08: when, else, cycle, while, repeat, scan, next, ready
07: begin, with, trial, case, error, cover, final
12: exit, fail, pass, stop, halt, skip, over, abort, retry, solve, resume
```

**notes:** 

* You can not use these keywords as identifiers;
* New keywords are going to be created in /draft;

### Operators

| Keyword     | Purpose
|-------------|--------------------------------------------------------
| if          | conditional suffix operator
| is          | introspection operator (is of type)
| to          | used in conjunction with append

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
|----------|-------------------------------------------------------------------
| input    | Declare input parameters
| output   | Declare output parameters
| define   | Declare a constant 
| load     | Load library or aspect
| alias    | Suppress qualifier for external elements from a library or module
| type     | Declare data super-type or sub-type
| make     | Create a new variable or multiple variables
| rule     | Create a new rule or rule prototype 
| clone    | Create a new rule from an rule prototype
| return   | End rule declaration and return control to caller

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
| repeat   | End repetitive block: cycle, while
| scan     | Start iteration loop for range of numbers
| next     | Continue counting until the last number in range
| trial    | Protect a block of code that may have exceptions
| case     | One trial block can resolve multiple cases
| error    | Associated with trial to patch one errors
| cover    | Associated with trial to patch other errors
| final    | Associated with trial to finalize the trial block
| ready    | Close when or trial control blocks
| begin    | Start unconditional anonymous block / local context 
| with     | Start qualifier suppression block

## Interruption keywords

These keywords are jumps or termination statements.

| Keyword  | Purpose
|----------|----------------------------------------------------------------
| stop     | Interrupt a while loop and continue past repeat keyword
| skip     | Skip the rest of while block and continue from the beginning
| exit     | Force silent termination of a rule, aspect, program or driver
| fail     | Interrupt a rule or block with recoverable error
| pass     | Null statement. It does absolutely nothing
| abort    | Force silent early interruption of trial block
| retry    | Execute a previous case into a trial block
| solve    | Solve one forward case into a trial block
| resume   | Used in trial block to continue next case after failure
| halt     | Create unrecoverable error and stop program
| over    | End driver, library or module file. Dot suffix is mandatory.

**Read next:** [Syntax Overview](overview.md)