## Control Flow

Bee has 5 control flow statements:

Name             | Description
-----------------|----------------------------------
[when](#when)    | conditional block statement
[case](#case)    | conditional path selector
[for](#for)      | collection iterator
[while](#while)  | conditional repetitive block
[trial](#trial)  | serial list of small tasks

## when

The _when_ keyword is a multi-conditional selector.

**syntax**
```
when condition do
  ## statements
  ...
done;
```

Dual selector based on single logical expression:

**pattern:**
```
when condition do
  ## true branch
  ...
else
  ## false branch
  ...
done;
```

**nested**

```
make a ∈ Z;
write 'a = ';
read  a;# first decision
when a ≤ 0 do 
  print 'a ≤ 0';
  ## second decision
  when a = 0 do 
    print 'a = 0';
  else
    print "a < 0"; 
  done; ** a ≤ 0
done; ** a = 0
```

## Case

Multipath conditional selector example:

```
make a ∈ Z;
read (a, 'Enter a number between 0 and 9:');
case a < 0 do
  print 'a < 0';
case a > 9 do
  print 'a > 9';
else
  print ("ok: a =" + a);
done; 
```

## While

Conditional repetitive block:

**Pattern:**

```
while condition do
  ## repetitive block
  ...
  skip if (condition); ** continue
  ...
  stop if (condition); ** break
  ...
else
  ## alternate path
  ...
repeat;
```

**Notes:** 
* If condition is true all the time we can end-up in infinite loop;
* Infinite while can be interrupted by timer variable: {&timer := 60};
* When timer expire, the loop will terminate. By default timer is 60s;

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
repeat;
print a; ** still available
```

**Nested loop**

While statement can be nested:

**pattern:** 

```
while condition do
  ## outer loop
  while condition do
    ## inner loop
    ...
  repeat;  
  ...  
repeat;
```

## For each

This is used to traverse a _domain_ or a _collection_:

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

The "trial" statement execute several statements that can fail or pass.

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
  ## declare local variables
  ...
  abort if (condition);
  ...
  fail if (condition);
error code do 
  ## handler1
  ...
error code do
  ## handler2
  ...    
patch
  ## all other errors
  ...
  raise; ** propagate
final
  ## finalization statement    
  ...
done;
```

**note:**
* Trial block has an optional local scope
* Trial local variables will disappear after done;
* System variable &error is clear after trial is done;
* It is possible to have nested trial blocks;

**Transfer**

Next statements are directly associated with trial block:

| word  | description
|-------|------------------------------------------------------------
| fail  | transfer execution to error handlers when a condition is satisfied
| pass  | transfer execution to error handler unless a condition is satisfied
| raise | propagate last error outside of patch region
| abort | early control transfer to get ready for interruption


**Errors**

Errors can be defined in your program using next notation:

```
# define error
make error_name :: {code,"message"} ∈ Error;
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

* close a files 
* close connection to databases 
* close locked resources


**Example:**

```
trial
  make x := 1/0;
patch
  print &error.message;
done;
```

**Custom exception:**
```
# you can use code > 200 to create your errors
make my_error :: {201, 'my error'} ∈ E;
trial
  fail my_error;
error 201 do
  print &error.message;
  print &error.line;
  raise; ** propagate the error
done;  
```


**Read Next:** [Composite Types](composite.md)