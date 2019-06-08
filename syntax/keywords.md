## Bee Keywords

Bee uses 47 reserved keywords so far: 

```
04: if, is, in, as
08: make, rule, like, clone, load, alias, type, return;
06: read, write, print, alter, scrap, apply
07: when, with, check, cycle, while, scan, trial
10: do, done, none, else, case, error, other, final, repeat, next 
11: wait, exit, fail, pass, retry, solve, skip, stop, halt, abort, over, resume
```

**notes:** 

* You can not use these keywords as identifiers;
* New keywords are going to be created in /draft folder;

### Semantic keywords

| Keyword     | Purpose
|-------------|--------------------------------------------------------------
| if          | used as conditional with any simple statement
| is          | used in conjunction with check
| in          | used in conjunction with check
| as          | explicit casting operator

**Note:** (1m = 10⁻³, 1μ =10⁻⁶)

### Definition statements

Next statements are used to declare or create a module member.

| Keyword  | Purpose
|----------|-------------------------------------------------------------------
| load     | Load library or aspect
| alias    | Suppress scope qualifier for external elements from a library or module
| type     | Declare data super-type or sub-type
| make     | Create a new variable or multiple variables
| rule     | Create a new rule or _prototype_
| clone    | Create a new rule from a _prototype_
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
| with     | Start scope qualifier suppression block
| check    | Create a multi-block selection statement
| none     | Associated to check, create alternative branch
| do       | Begin a statement region in a block statement
| done     | Finalize when, check and trial control statements

## Transfer keywords

These keywords transfer control or make an interruption of current thread. 

| Keyword  | Purpose
|----------|----------------------------------------------------------------
| stop     | Interrupt a while loop and continue past repeat; keyword
| skip     | Skip the rest of while block and continue from the beginning
| exit     | Force silent termination of a rule, aspect, program or driver
| fail     | Create error message if a condition is true else pass
| pass     | Clear error message if a condition is true else fail
| abort    | Force silent early interruption of trial block
| retry    | Execute a previous case into a trial block
| solve    | Solve one forward case into a trial block
| resume   | Used in trial block to continue next case after failure
| halt     | Create unrecoverable error and stop program
| over     | End driver, library or module file. Dot suffix is mandatory.
| wait     | Suspend execution for a number of seconds

**Read next:** [Syntax Overview](overview.md)