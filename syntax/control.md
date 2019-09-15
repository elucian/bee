## Control Flow

Bee has 4 keywords to start a control flow statement:

Name             | Description
-----------------|----------------------------------
[when](#when)    | single-condition dual path statement
[case](#case)    | multi-condition multi-path selector
[with](#with)    | collection or domain iterative block
[trial](#trial)  | exception handler and work-flow block

## Repetition:

Control flow statement is ending with one of two keywords:

* done - statement is executed once 
* loop - statement is executed several times

**Notes:** 

* You can use conditional _"if"_ after loop but not after _"done"_,
* Careful using _"make"_ inside a loop, you could overwhelm the machine,
* Bee has a limit on how many loops before giving up: @loop_limit.

## when

This statement is also called _branch_. It create a logic branch unsing a condition:

**syntax**
```
when condition do
  ** branch
  ...
done or loop;
```

This statement is called _fork_. It create two logical branches using a condition:

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

**repetition:**
```
when condition do
  ** primary branch
  ...
else
  ** secondary branch
  ...
loop;
```

**example:**

You can use multiple _when_ blocks to create nested path selectors:

```
** first decision
make  a ∈ Z;
when a ≤ 0 do 
  write "a = ";
  read  a;
  ** second decision
  when a = 0 do 
    print "a = 0";
  else
    print "a < 0"; 
  done; //a ≤ 0
loop; 
```

## Case

This selector is a multi-path _ladder_. 

**pattern:**
```
case condition do
  ** first path
case condition do
  ** second path
...  
else
  ** final path
done or loop; 
```
**Note:** 
* _case_ is preferred way to create a _ladder_
* _case_ is also known as _conditional search_

**example:**

```
make a: 0 ∈ Z; 
case a = 0 do 
  write  "Enter a number between 0 and 9:"  
  read a;
  skip; //jump to loop
case a < 0 do
  print "wrong: a < 0";
case a > 9 do
  print "wrong: a > 9"; 
else
  print ("ok: a = " & a);
  stop; //stop execution of case
loop; 
```

## With

This statement establish a local, anonymous _name space_.

**example:**
```
** define local scope
make x := 4; // outer scope
with x: 0 ∈ Z, y: 0 ∈ Z do
  alter x += 1; 
  print x, y; // 1, 0
done;
print x; //4 (unmodified)
print y; //  (undefined)
```

**example**
This entire block is repeated several times:

```
with x := 0 do
  alter x += 1;
  stop if x = 11;
  write x & ",";
loop;
print; // 1,2,3,4,5,6,7,8,9,10
```

**example**
This block similar with previous but is ending with conditional:

```
with x := 0 do
  alter x += 1;
  write x & ",";
loop if x < 11; //conditional repetition

print; // 1,2,3,4,5,6,7,8,9,10,
```

## Visitor

You can visit all elements of a domain using this pattern:

**Pattern:**
```
with var ∈ (min..max:rate) do
  ...
  skip if condition; //fast forward
  ...
  stop if condition; //early transfer
  ...
loop;
```

**Notes:**    
* Control variable is local to with scope;
* Control variable is incremented automatically;

```
with i ∈ (0..10) do
  when i % 2 = 0 do
    skip; //fast forward
  else
    write i; //odd numbers
  done;
  write ',' if (i < 9);        
loop;
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
with i ∈ (1..9: 2) do
  write i; //odd numbers
  write ',' if (i < 9);        
loop;
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

**pattern:**
```
** a complex trial  with patch
trial
  ...
  skip if condition; //jump to the end
  ...
  stop if condition; //force stop
  ...
  fail if condition; //create exception
patch code do 
  ** handler1
  ...
  skip; //optional
patch (domain) do
  ** handler2
  ...  
  stop; //optional  
cover
  ** cover all other errors
  ...
  raise @error if condition; //propagate last error
final
  ** finalization statement (executed before leaving)  
  ** not executed when skip but: fail, raise or stop will
  print "final error:" + @error.code if @error.code > 0;
done or loop;
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
|-------|------------------------------------------------------------------------------
| raise | transfer execution to error handlers with new error or reissue last error
| fail  | transfer execution to error handlers when a condition is satisfied
| pass  | transfer execution to error handler unless a condition is satisfied
| stop  | give up, clear the error, execute final and transfer to the parent
| skip  | do not execute anything else, just jump to end of the block

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
  stop if a = 0;
  fail if a > 9; 
  fail if a < 0;  
patch $out_of_range do
  when count < 3 do
    write "wrong try again:" 
    skip; //try again the same exact steps 3 times
  else       
    write "wrong 3 times";
    stop; //give up 
  done;    
final
  when  a ∈ (0..9) do
    write "incorrect";
  else
    write "correct";
  done;  
  print;
loop;  
```

**Note:** 
* When you _retry_ or _abort_ the error code is erased,
* When you use _raise_ the error is propagated,
* You can use _retry_ only in error handlers or patch,
* You can not use _"retry"_ in _final_ region,
* You can not use _"retry"_ inside the default region;


**Read Next:** [Composite Types](composite.md)