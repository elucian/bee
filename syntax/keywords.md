## Bee Keywords

Bee core has 45 reserved keywords so far: 

```
03: if, is
04: driver, aspect, module, return
06: make, rule, like, load, alias, type
07: read, write, print, alter, scrap, apply, begin
05: for, when, case, while, trial
08: do, else, error, patch, final, repeat, next, done 
05: fail, pass, raise, abort, retry
08: exit, skip, stop, halt, wait, rest, yield, over.
```

**notes:** 

* You can not use these keywords as identifiers;
* New keywords are going to be created in /draft folder;

### Semantic keywords

| Keyword  | Purpose
|----------|--------------------------------------------------------------
| if       | conditional for simple statements
| is       | query element or variable data type

### Definition statements

Next statements are used to declare new elements in a component.

| Keyword  | Purpose
|----------|-------------------------------------------------------------------
| driver   | Define lead component
| aspect   | Define aspect component
| module   | Define reusable component
| load     | Load module or aspect
| alias    | Eliminate scope qualifier
| type     | Declare data super-type or sub-type in a component
| make     | Create a new variable or multiple variables
| save     | Declare constant \| Immutable variable
| rule     | Create a new _rule_ or _prototype_
| return   | End rule declaration and transfer control to caller


### Execution statements

Next keywords are simple statements. These represents actions called _imperative statements_.

| Keyword  | Purpose
|----------|-------------------------------------------------------------
| apply    | Apply one routine in synchronous mode and expect no results
| begin    | Comence execution for a routine in asynchronous mode
| read     | Flush the console buffer and accept user input from console 
| write    | Add something to console buffer but no new line 
| print    | Output expression result, variable or constant to console 
| alter    | Mutate variable value using an expression
| scrap    | Remove one element from a collection

## Control statements

Control statements are also known as decision statements.

| Keyword  | Purpose
|----------|------------------------------------------------------------
| when     | Execute statement block only if condition true
| else     | Alternative path for when statement
| case     | Conditional search multi-path selector
| while    | Start conditional repetitive block
| repeat   | End repetitive block while
| for      | Start iteration loop for domain or collection
| next     | Continue iteration with last element in domain or collection
| trial    | Protect a block of code that may have exceptions
| error    | Associated with trial to catch one error
| patch    | Associated with trial to patch any other errors
| final    | Associated with trial to finalize the trial block
| do       | Begin a statement region in a block statement
| done     | Finalize when, check and trial control statements


## Transfer keywords

These keywords transfer control or make an interruption of current thread. 

| Keyword  | Purpose
|----------|--------------------------------------------------------------------
| exit     | Force silent termination of a rule, aspect, program or driver
| stop     | Interrupt a while loop and continue past repeat; keyword
| skip     | Skip the rest of while block and continue from the beginning
| fail     | Create error message if a condition is true else pass
| pass     | Clear error message if a condition is true else fail
| raise    | Used in exception handler to propagate an error out of trial block
| abort    | Force silent early interruption of trial block
| retry    | Repeat a trial statement from the beginning
| wait     | Suspend execution for a number of seconds
| rest     | Suspend execution of main thread and wait for all coroutines to finish
| yield    | Suspend one coroutine and give control to another routine
| halt     | Create unrecoverable error and stop program
| over     | End driver, library or component file. Dot suffix is mandatory.

**Read next:** [Syntax Overview](overview.md)