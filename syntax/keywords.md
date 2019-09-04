## Bee Keywords

Bee core has 41 reserved keywords so far: 

```
02: if, is
07: make, rule, like, load, alias, type, return
06: read, write, print, alter, scrap, wait
05: for, when, case, while, trial
08: do, else, error, patch, final, repeat, next, done 
05: fail, pass, raise, abort, retry
05: exit, skip, stop, halt, yield
03: apply, begin, defer
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

Next statements are used to declare new elements in a module.

| Keyword  | Purpose
|----------|-------------------------------------------------------------------
| load     | Load module or module
| alias    | Eliminate scope qualifier
| type     | Declare data super-type or sub-type in a module
| make     | Create a new variable or multiple variables
| save     | Declare constant \| Immutable variable
| rule     | Create a new _rule_ or _prototype_
| return   | End rule declaration and transfer control to caller


### Execution statements

Next keywords are simple statements. These represents actions called _imperative statements_.

| Keyword  | Purpose
|----------|-----------------------------------------------------------------------------
| apply    | Execute a rule or module that do not have a result
| begin    | Commence execution of a coroutine or module 
| defer    | Postpone execution of a coroutine or module 
| wait     | Suspend current thread execution for a number of seconds
| read     | Flush the console buffer and accept user input from console 
| write    | Add something to console buffer but no new line 
| print    | Output expression result, variable or constant to console 
| alter    | Mutate variable value using an expression
| scrap    | Remove one element from its collection


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
| exit     | Force silent termination of a rule, module, program or driver
| stop     | Interrupt a while loop and continue past repeat; keyword
| skip     | Skip the rest of while block and continue from the beginning
| fail     | Create error message if a condition is true else pass
| pass     | Clear error message if a condition is true else fail
| raise    | Used in exception handler to propagate an error out of trial block
| abort    | Force silent early interruption of trial block
| retry    | Repeat a trial statement from the beginning
| yield    | Suspend one coroutine and give control to another routine
| halt     | Create unrecoverable error and stop program

**Read next:** [Syntax Overview](overview.md)