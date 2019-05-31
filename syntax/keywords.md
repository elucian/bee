## Bee Keywords

Bee uses 53 reserved keywords so far: 

```
04: if, is, to, in
09: make, rule, clone, input, output, load, alias, type, return;
07: read, write, print, alter, scrap, apply, play 
07: when, with, quest, cycle, while, scan, trial
11: else, case, error, other, final, match, none, repeat, next, do, done
11: exit, fail, pass, stop, halt, skip, over, abort, retry, solve, resume
04: append, update, delete, from
```

**notes:** 

* You can not use these keywords as identifiers;
* New keywords are going to be created in /draft folder;

### Semantic keywords

| Keyword     | Purpose
|-------------|--------------------------------------------------------
| if          | conditional suffix operator
| is          | introspection operator (is of type)
| to          | used in conjunction with append
| in          | used in conjunction with update 

**Note:** (1m = 10⁻³, 1μ =10⁻⁶)

### Definition statements

Next statements are used to declare or create a module member.

| Keyword  | Purpose
|----------|-------------------------------------------------------------------
| input    | Declare input parameters
| output   | Declare output parameters
| define   | Declare a constant 
| load     | Load library or aspect
| alias    | Suppress scope qualifier for external elements from a library or module
| type     | Declare data super-type or sub-type
| make     | Create a new variable or multiple variables
| rule     | Create a new rule or rule prototype 
| clone    | Create a new rule from an rule prototype
| return   | End rule declaration and return; control to caller

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
| play     | Launch one aspect in execution

## Control statements

Control statements are also known as decision statements.

| Keyword  | Purpose
|----------|------------------------------------------------------------
| when     | Execute statement block only if condition true
| else     | Alternative path for when statement
| cycle    | Start unconditional repetitive block
| while    | Start conditional repetitive block
| repeat   | End repetitive block: cycle, while
| scan     | Start iteration loop for range or collection
| next     | Continue counting until the last number in range
| trial    | Protect a block of code that may have exceptions
| case     | One trial block can resolve multiple cases
| error    | Associated with trial to patch one errors
| other    | Associated with trial to patch other errors
| final    | Associated with trial to finalize the trial block
| do       | Begin a statement region for when, quest and trial blocks
| done     | Finalize when, quest and trial control blocks
| with     | Start scope qualifier suppression block
| quest    | Create a multi-block selection statement
| match    | Associated to quest, create one branch
| none     | Associated to quest, create alternative branch

## Transfer keywords

These keywords transfer control or make an interruption of current thread. 

| Keyword  | Purpose
|----------|----------------------------------------------------------------
| stop     | Interrupt a while loop and continue past repeat; keyword
| skip     | Skip the rest of while block and continue from the beginning
| exit     | Force silent termination of a rule, aspect, program or driver
| fail     | Interrupt a rule or block with recoverable error
| pass     | Null statement. It does absolutely nothing
| abort    | Force silent early interruption of trial block
| retry    | Execute a previous case into a trial block
| solve    | Solve one forward case into a trial block
| resume   | Used in trial block to continue next case after failure
| halt     | Create unrecoverable error and stop program
| over     | End driver, library or module file. Dot suffix is mandatory.

## Database operations

| Keyword  | Purpose
|----------|----------------------------------------------------------------
| append   | create a record to a table 
| update   | alter a record in a table
| delete   | remove a record from a table
| from     | associated with delete statement

**Read next:** [Syntax Overview](overview.md)