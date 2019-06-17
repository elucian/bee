## Control Flow

A control flow statement is an unnamed block of code. 

**Statements:**

Bee has 5 control flow statements.

Name             | Description
-----------------|----------------------------------
[when](#when)    | conditional block statement
[case](#case)    | conditional path selector
[for](#for)      | collection iterator
[while](#while)  | conditional repetitive block
[trial](#trial)  | serial list of small tasks

**Restriction:**

* You can not use _"make"_ inside any control flow statements,
* You can not use a conditional _"if"_ for a control flow statement.


## when

This statement also called _branch_. It starts with _when_ and is ending with _done_:

**syntax**
```
when condition do
  ** branch
  ...
done;
```

This selector is called _fork_. It create two logical pas-ways using a condition:

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

**ladder:**

By nesting multiple _when_ blocks you can create a multi-path selector known as _ladder_:

```
make a ∈ Z;
write 'a = ';
read  a;# first decision
when a ≤ 0 do 
  print 'a ≤ 0';
  ** second decision
  when a = 0 do 
    print 'a = 0';
  else
    print "a < 0"; 
  done; ** a ≤ 0
  ** continue
done; ** a = 0
```

## Case

This selector start with _case_ and is ending with _done_. 

**pattern:**
```
case condition do
  ** first path
case condition do
  ** second path
...  
else
  ** final path
done; 
```
**Note:** 
* _case_ is a multi-path selector
* _case_ is also known as _conditional search_

**example:**
```
make a ∈ Z;
write  'Enter a number between 0 and 9:'
read    a;
case a < 0 do
  print 'wrong: a < 0';
case a > 9 do
  print 'wrong: a > 9';
else
  print ("ok: a =" + a);
done; 
```


## While

This block start with _"while"_ and is ending with _"repeat"_:

**Pattern:**

```
while condition do
  ** repetitive block
  ...
  skip if (condition); ** continue
  ...
  stop if (condition); ** break
  ...
repeat;
```

**Notes:** 
* If condition is true all the time we can end-up in infinite loop;
* Infinite while can be interrupted by timer variable: {&timer := 60};
* When timer expire, the loop will terminate. By default &timer is 60s;

**example:**

Two nested blocks: observe "done" and "repeat" are making code readable.

```
# two nested blocks
make a := 10;
while a > 0 do
  alter a -= 1;
  when a % 2 ≠ 0 do
    write a;  
    write ',';
  done;
else
  ** when a < 0  
  print (`last a =` + a);
repeat;
```

**Nested loop**

While statement can be nested:

**pattern:** 

```
while condition do
  ** outer loop
  while condition do
    ** inner loop
    ...
  repeat;  
  ...  
repeat;
```

## For each

Start with "for" and ends with "next". It is used to traverse a _domain_ or _collection_:

**Pattern:**
```
for var ∈ (min..max:rate) do
  ...
  skip if (condition); ** fast forward
  ...
  stop if (condition); ** early transfer
  ...
next;
```

**Notes:**    
* Control variable is declared in local scope;
* Control variable is incremented using next;

```
for i ∈ (0..10) do
  when i % 2 = 0 do
    skip; ** fast forward
  else
    write i; ** odd numbers
  done;
  write ',' if (i < 9);        
next;
```
> 1,3,5,7,9

**Ratio:**
Using domain ratio the example above can be simplified:

```
+-------------------------------------
| "for" statement can use a "domain" |
| domain notation: (min..max:ratio)  |
+------------------------------------+
driver domain_test:

#    min ↓  ↓max  ↓ = ratio
for i ∈ (1..9:    2) do
  write i; ** odd numbers
  write ',' if (i < 9);        
next;

over.
```

## Trial

This statement start with "trial" keyword and ends with "done".

**Notes:**
* Trial and error is a fundamental method of problem solving,
* It consist of repeated attempts until a solution is found, 
* Trial can be terminated early by a timer or by specific errors.

**Keywords:**

| word  | description
|-------|--------------------------------------------------------
| trial | start a series of task
| patch | catch other errors not found by error regions
| done  | finalize a trial block

**pattern:**
```
# a complex trial  with patch
trial
  ...
  abort if condition;
  ...
  fail if condition;
error code do 
  ** handler1
  ...
  retry;
error code do
  ** handler2
  ...  
  abort;  
patch
  ** all other errors
  ...
  retry if condition; ** repeat
  ...
  raise if condition; ** propagate
final
  ** finalization statement   
  print "final error:" + &error.code if &error.code > 0;
done;
```

**Note:**

* System variable &error is clear after trial is done;
* It is possible to have nested trial blocks;

**Transfer**

Next statements are directly associated with trial block:

| word  | description
|-------|------------------------------------------------------------------------------
| fail  | transfer execution to error handlers when a condition is satisfied
| pass  | transfer execution to error handler unless a condition is satisfied
| raise | propagate last error outside of trial block and transfer execution to parent
| abort | give up, clear the error and transfer execution to the parent
| retry | clear the error and repeat the trial to find a solution

**Errors**

Errors can be defined in your program using next notation:

```
# define error
make error_name := {code,"message"} ∈ Error;
```

Errors can be issued using: fail, raise or pass. 

```
# "fail" can be used in several ways to issue an error
fail;                              ** "standard error"
fail "message";                    ** "custom error" 
fail {code:value, message:string}; ** "instant error"
fail error_name;                   ** "defined error"

# "pass" can create only $unexpected_error: 201
pass; ** clear &error message
pass if condition; ** can create "unexpected error"
```

**Note:** 
The standard module will define standard _error objects_ as constants:

* 1   = $standard_error   with message: "standard error";
* 2   = $unexpected_error with message: "unexpected error";
* 200 = $user_error       with message: "user defined error";

**See also:** [Standard:Exception](standard@exception);

**patch**

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
  print &error.message if &error.code ≠ 0;
  print 'x = ' + x;
done;
```

**Custom errors:**

```
# define a custom error
make my_error := {201, 'my error'} ∈ E;
trial
  fail my_error; ** issue custom error
error 201 do
  print &error.message;
  print &error.line;
  ** will fall through
patch  
  raise; ** propagate the error
done;  
```

**Notes:** 
* Only abort or raise can handle an error;
* In this case the error 201 is not handled;
* The patch will be executed for all errors including 201;

**Repeating trial:**

By using _retry_ you can repeat a trial block

```
make count ∈ (0..3); 
make a ∈ (0..9);
** try maximum 3 times
trial
  alter count += 1;
  write "enter a number between 0 and 9";
  read a;
error $out_of_range do
  when count < 3 do
    retry; ** try again
  else       
    abort; ** give up 
  done;    
final
  when  a ∈ (0..9);
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