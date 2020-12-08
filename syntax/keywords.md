## Bee Keywords

Bee core has 41 reserved keywords so far: 

```
03: if, is, or 
07: make, like, load, alias, type, method, return
09: read, write, print, alter, scrap, wait, apply, begin, defer
09: with, when, case, else, while, do, redo, done 
05: trial, cover, patch, final, case, default
03: fail, pass, raise, retry
05: exit, skip, stop, halt, yield
```

**notes:** 

* You can not use these keywords as identifiers;
* New keywords are going to be created in /draft folder;

### Semantic keywords

| Keyword  | Purpose
|----------|--------------------------------------------------------------
| if       | conditional for simple statements
| is       | query element or variable data type
| in       | used in repetitive statement to generate values from a range

### Definition statements

Next statements are used to declare new elements in a module.

| Keyword  | Purpose
|----------|-------------------------------------------------------------------
| load     | Load module or module
| alias    | Eliminate scope qualifier
| type     | Declare data super-type or sub-type in a module
| make     | Create a new variable or multiple variables
| save     | Declare constant \| Immutable variable
| method   | Create a new _business rule_ or _prototype_
| return   | End _method_ declaration and transfer control to caller


### Execution statements

Next keywords are simple statements. These represents actions called _imperative statements_.

| Keyword  | Purpose
|----------|--------------------------------------------------------------------
| apply    | Execute a _method_ and ignore the _result_ if there is one
| begin    | Commence execution of a coroutine or module 
| defer    | Postpone execution of a coroutine or module 
| wait     | Suspend current thread execution for a number of seconds
| read     | Flush the console buffer and accept user input from console 
| write    | Add something to console buffer but no new line 
| print    | Output expression result, variable or constant to console 
| alter    | Mutate variable value using an expression
| scrap    | Remove one element from its collection


## Control statements

Control statements are also known as selection statements.

| Keyword  | Purpose
|----------|------------------------------------------------------------
| when     | Execute statement block only if condition true
| else     | Alternative path for when statement
| case     | Conditional search multi-path selector
| while    | Start conditional repetitive block
| with     | Start iteration for a domain or collection
| trial    | Protect a block of code that may have exceptions
| cover    | Associated with trial to catch other errors
| patch    | Associated with trial to patch any other errors
| final    | Associated with trial to finalize the trial block
| do       | Begin a statement region in a block statement
| done     | Finalize with, when, case and trial control statements
| redo     | Cause a block to repeat or a condition to reevaluate

## Transfer statements

These statements execute a jump or make an interruption of current thread. 

| Keyword  | Purpose
|----------|--------------------------------------------------------------------
| exit     | Force silent termination of a method, module, program or driver
| stop     | Interrupt a while redo and continue past redo; keyword
| skip     | Skip the rest of while block and continue from the beginning
| fail     | Create error message if a condition is true else pass
| pass     | Clear error message if a condition is true else fail
| raise    | Used in exception handler to propagate an error out of trial block
| yield    | Suspend one coroutine and give control to another routine
| halt     | Create unrecoverable error and stop program
| retry    | Repeat a trial block a second time

**Read next:** [Syntax Overview](overview.md)