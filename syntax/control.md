## Control Flow

Bee has 5 keywords to start a control flow statement:

Name             | Description
-----------------|----------------------------------
[do](#do)     | uncontitional block
[when](#when)    | single-condition dual path statement
[with](#with)    | collection or domain iterative block
[match](#match)  | multi-path (switch) selector
[trial](#trial)  | exception handler and work-flow block

## Block:

Control flow statements are used to alter the linear program workflow. They are implemented as block statements. Each block start with a specific keyword, and must end with one of these two:

* done - statement is executed once 
* next - statement is executed several times

**Notes:** 

* You can force terminate a repetitive block using "stop",
* You can shortcut a repetitive block using "loop" keyword,
* You can use conditional _"if"_ after redo but not after _"done"_,
* Don''t use _"make"_ inside a repetitive block, it recreates the variable,
* Bee has a limit on how many loops before giving up: @loop_limit.

## run

Execute a block of code once or multiple times depending on conditions.

**local block:**

```
given
  // local variables
run
  // local block
  ...
over;
```

**over with condition:**

```
given
  // local variables
run
  // repetitive block
  ...
over if endCondition;
```

**more with condition:**

```
given
  // control variables
run
  // repetitive block
  ...
more if runCondition;
```

  
## when

This statement is also called _branch_. It create a logic branch unsing a condition:

**pattern:**
```
when condition do
  ** primary branch
  ...
else 
  ** secondary branch
  ...
done;
```

**nesting:**

You can use multiple _when_ blocks to create nested path selectors:

```
given
  a ∈ Z; //control variable
when a ≤ 0 do
  write "a = ";
  read  a;
  when a = 0 do
    print "a = 0";
  else
    print "a < 0"; 
  done; //a ≤ 0
done; 
```

**lather:**

```
given
  a ∈ Z; //control variable
run
  write "a = ";
  read  a;
  ** second decision
  when a = 0 do
    print "a = 0";
  orif a < 0
    print "a < 0"; 
  else 
    print "a > 0";   
  done; //a ≤ 0
over; 
```


## with

Run a block for a specific number of times from a domain or range.

**example:**
```
** define local scope
with x <- (0..3) run
  write x, ",";
more;
print; //0,1,2,3 
```

## Visitor

You can visit all elements of a domain using this pattern:

**Pattern:**
```
with <- (min..max:rate) run
  ...
  loop if condition; //fast forward
  ...
  exit if condition; //early transfer
  ...
more;
```

**Notes:**    
* Control variable is local to with scope;
* Control variable is incremented automatically;

```
with i <- (0..10) run
  when i % 2 = 0 do
    loop;    //fast forward
  else
    write i; //odd numbers
  done;
  write ',' if (i < 9);        
more;
```
> 1,3,5,7,9

**Ratio:**
Using domain ratio the example above can be simplified:

```
+-------------------------------------
| "with" statement can use a "domain" |
| domain notation: (min..max:ratio)   |
+-------------------------------------+
**    min ↓  ↓max  ↓ = ratio
with i <- (1..9:    2) run
  write i; //odd numbers
  write ',' if (i < 9);        
more;
```

## match

This selector is a multi-path _ladder_. 

**pattern:**
```
match x [all | one]
  match v1 do
    //first path
  match v2 do
    // second path
  match (v1,v2,v3) do
    // other path    
    ...  
  none
    //default path
done; 
```

**example:**

Using repetitive statement with match selector:

```
given a := 0 run
  write  "Enter a number between 1 and 9 or 0 to stop:"    
  read a;
  loop if $a < 0 or $a > 9;  
  check $a one
    match 0 do
        exit; //stop the loop
    match (1,3,5,7,9) do
        print "a is odd";
        $a := 0;
    match (2,4,6,8) do
        print "wrong: a > 9"; 
        $a:= 0;
    none
        print ("ok: a = " & a);
  done;  
more;
```

## Trial

This statement start with "trial" keyword and ends with "done".

**Notes:**
* Trial and error is a fundamental method of problem solving,
* It consist of looped attempts until a solution is found, 
* Trial can be terminated early by a timer or by specific errors.

**Keywords:**

| word  | description
|-------|--------------------------------------------------------
| trial | start a series of task
| patch | catch errors with specific code or code range
| cover | catch all other errors not fixed by a patch
| done  | finalize a trial block
| all   | check a
| pass  | end trial block succesfully
| fail  | end trial block with failure (default error)
| raise | end trial block with specified exception
| retry | repeat trial block

**pattern:**
```
** a complex trial  with patch
trial [all | first]
  //trial initialization (cases may be missing)
    ...
  case condition1 do
    ...
    pass if passCondition;   //optional end trial
  case condition2 do
    ...
    fail if failCondition;   //optional create exception   
  default // trial rule
    ...
    raise @error if otherCondition; //optional rize error
patch code do 
  ** handler1
  ...
  retry; //optional repeat the trial
patch (code,code) do
  ** handler2
  ...  
  pass; //optional stop the trial 
cover
  ** cover all other errors
  ...
  raise @error if condition; //propagate last error
final
  ** finalization statement (executed before leaving)  
  ** not executed when loop but: fail, raise or stop will
  print "final error:" + @error.code if @error.code > 0;
done;
```

**Note:**

* System variable @error is clear after trial is ending;
* It is unusual to create nested trial blocks;

**Errors**

Errors can be defined in your program using next notation:

```
** define error
make error_name := {code,"message"} ∈ Error;
```

Errors can be issued using: fail, pass or raise. 

```
** "fail" can be used in several ways to issue an error
fail;              // fail error: 1
fail if condition; // fail error: 1

** "pass" can create only $unexpected_error: 201
pass; //clear @error message and continue
pass if condition; //pass error: 2

** "raise" can create a customized error or message
raise error_name  //create an error that is predefined
raise @error      //propagate last error if is not empty
raise "message"   //create instant user error: 3
raise {code,"message"} //create instant custome error with code
```

**Note:** 
The standard module will define standard _error objects_ as system constants:

* code: 1   = $fail_error  with standard message: "fail error";
* code: 2   = $pass_error  with standard message: "pass error";
* code: 3   = $raise_error with standard message: "raise error";

**See also:** [Standard:Exception](standard.md#errors);

**patch**
This region can catch an error and fix it. Error can be catch by code or domain of codes. After patch the _"final"_ region is executed but only if the error handler does not do not transfer execution to somewhere else:

Next statements are transfer statements used in trial block:

| word  | description
|-------|--------------------------------------------------------------------------
| raise | transfer execution to error handlers with new error or reissue last error
| fail  | transfer execution to error handlers when a condition is satisfied
| pass  | transfer execution to error handler unless a condition is satisfied
| retry | restart the trial block

**cover**

This region is used for any other error that is not handled by _error_ handler regions. You can use any selector in this region to find an exceptions by code but you can also just report the error or log the error and abort the trial. Patch is not executed if any of previous "error" regions is triggered. 

**final**

This region is executed after trial, regardless of error status. Even if there is no error, this region is still executed. 

It can contain:

* close files
* close connection to databases 
* close locked resources

**Example:**

```
make  x ∈ Q;
make  y ∈ Q;
trial
  alter x := 1/0;
final
  print @error.message if @error.code ≠ 0;
  print "x = " + x;
done;
```

**Custom errors:**

```
** define a custom error
make my_error := {201, "my error"} ∈ E;
trial
  fail my_error; //issue custom error
patch 201 do
  print @error.message;
  print @error.line;
  ** will fall through
cover  
  raise; //propagate the error
done;  
```

**Notes:** 
* Only abort or raise can handle an error;
* In this case the error 201 is not handled;
* The patch will be executed for all errors including 201;

**Repeating trial:**

By using _loop_ you repeat a trial block:

```
make count ∈ (0..3); 
make a ∈ (0..9);
** try maximum 3 times
trial
  alter count += 1;
  write "enter a number between 0 and 9";
  read a;
  fail  if a > 9; 
  fail  if a < 0;  
patch $out_of_range do
  when count < 3 do
    write "wrong try again:" 
    retry; //try again the same exact steps 3 times
  else       
    write "wrong 3 times";
    fail; //give up 
  done;    
final
  when  a ∈ (0..9) do
    write "incorrect";
  else
    write "correct";
  done;  
  print;
done;  
```

**Note:** 
* When you _retry_ or _abort_ the error code is erased,
* When you use _raise_ the error is propagated,
* You can use _retry_ only in error handlers or patch,
* You can not use _"retry"_ in _final_ region,
* You can not use _"retry"_ inside the default region;


**Read Next:** [Composite Types](composite.md)