## Control Flow

Bee has 8 control flow statements:

Name             | Description
-----------------|----------------------------------
[do](#do)        | anonymous block
[with](#with)    | qualifier suppression
[when](#when)    | decision statement
[quest](#quest)  | multi-path selector
[cycle](#cycle)  | unconditional loop
[while](#while)  | conditional loop
[scan](#scan)    | for visitor pattern
[trial](#trial)  | trial work-flow

## do

Anonymous block of code:

```
do
  -- local context
  ...
done
```

**Note:** 
* This is the most simple block of code,
* In practice we use more complex blocks.

## with

Define a qualifier suppression block:

```
with qualifier do
  -- instead of qualifier.member()
  apply member()
done
```

Using alias for qualifier:

```
with (short: long.qualifier) do
  -- instead of long_qualifier.member()
  apply short.member() 
done
```

Using 2 qualifiers for mapping assignment:

```
with (target: target_qualifier, source: source_qualifier) do
  -- copy value from source to target
  alter target.member := source.member
done
```


## when

The _when_ keyword is a multi-conditional selector.

**syntax**
```
when condition do
  -- statements
  ...
done
```

Dual selector based on single logical expression:

**pattern**
```
when condition do
  -- first pass-way
else
  -- second pass-way
done
```

**nested**

```
make a := 0
-- first decision
when a ≤ 0 do 
  print 'a ≤ 0'
  -- second decision
  when a = 0 do 
    print 'a = 0'
  else
    print "a < 0" 
  done ;a ≤ 0
done ;a = 0
```

**note:** I have used comments ";" after "do" and "done"

**ladder**

```
make a := 0
when a < 0 do
  print 'a < 0'
else if a > 10 do
  print 'a > 100'
else if a > 10 do
  print 'a > 2'
else if a > 1  do
  print 'a > 1'
else
  print "a ≥ 0"
done 
```

## Quest

The quest is a multi-path value based selector. 
It is used in conjunction with: do, none, done

**syntax:**

```
quest expression 
  match constant1 do
    ** first path
  match constant2 do
    ** second path
  match constant3 do
    ** third path
none
  ** default path
done; end quest
```

## Cycle

Create unconditional repetitive statement block.

**pattern**

```
cycle
  ...
  skip if condition
  ...
  stop if condition
  ...
repeat
```

**notes**
* It is forbidden to declare new variables in a cycle;
* It is forbidden to start a nested context in a cycle;

**example**

In this example "a" is a local variable visible in cycle and after cycle;

```
do
  make a := 10 ∈ Z
  cycle
    alter a -= 1
    ** conditional repetition
    skip if (a % 2 = 0)
    write a  
    ** conditional termination
    write ','
    stop if (a < 0)
  repeat
  print a
done
```

**Notes:** 

* The cycle can be controlled using conditional if;
* If _stop_ condition is missing the cycle is infinite;
* Infinite cycle is interrupted automatic by a #timer

**nested**

Nested cycles can be labeled. Local context is optional.

**pattern:** 

```
** label 2 nested cycles 
cycle outer
  ** outer cycle
  cycle inner
    ** skip both cycles
    skip outer if (condition)
    ...    
    ** stop both cycles
    stop outer if (condition)
  repeat ;inner
repeat ;outer
```

**example**

```
do
  make x   := 9 
  make a,r := 0
  cycle
    alter r := x % 2
    alter a := (0: r = 0, 1)
    write "{1}:{2}" <+ (x,a)
    alter x -= 1
    write ','
    stop if (x < 5)
  repeat
  print ;expect 9:1, 8:0, 7:1, 6:0, 5:1,
done
```

## While

Controlled repetitive block:

```
while condition do
  -- repetitive block
  ...
  skip if (condition)  ; continue
  ...
  stop if (condition)  ; break
  ...
else
  -- alternate path
repeat
```

**Notes:** 
* If condition is true all the time we can end-up in infinite loop;
* Infinite while can be interrupted by timer directive: {#timer:10s};
* When timer expire, the loop will terminate. By default timer is 0s;

**example**

```
-- use global context
make a := 10 
while a > 0 do
  alter a -= 1
  -- conditional repetition
  when a % 2 ≠ 0 do
    write a  
    write ',' 
  done
repeat
print
```

**Nested loop**

One while block statement can be nested:

**pattern:** 

```
** outer loop   
while condition do
  ** inner loop
  while condition do
     -- statements
     ...
  repeat  
  ...  
repeat
```

**example**

```
-- use global context
make x   := 9
make a,r := 0
while x < 5 do
  alter r := x % 2
  alter a := 0 if r = 0, 1 if r = 0, 2
  write "{1}:{2}" <+ (x,a)
  write ',' if (x < 5)
  alter x -= 1
repeat
print ; 9:1, 8:0, 7:1, 6:0, 5:1
```

## Scan 

This is used to traverse a _range_ or a _subset_ from a discrete _type_.  

**Pattern:**
```
make var ∈ N 
scan [min..max] +> var do
  ** block statements
  skip if (condition)
  ...
  stop if (condition)
  ...
next
```

**Notes:**    
* Control variable must be declared in local scope;
* Control variable is incremented using next

Example of forward skip in counting iteration:
```
make i ∈ Z
scan [0..10] +> i do
  ** force next iteration
  when i % 2 = 0 do
    skip
  else
    ** write only odd numbers
    write (i)
    write (',') if (i < 10)
  done
next
```
> 1,3,5,7,9

**Notes:**
* "scan" can be shortcut using skip;
* "scan" can be terminated early using stop;

## Trial

The "trial" statement execute a sequential process that can fail for some reason.

**Keywords:**

| word  | description
|-------|--------------------------------------------------------
| trial | start trial/error block
| error | catch errors by code and start a patch region
| other | catch other errors not found by error regions
| final | executed before trial is over after last case or error

**pattern**
```
trial
  -- private context
  ...  
  -- multiple use cases
  case first go
    fail code if (condition)
    ...    
  case second go
    fail {code,"message"} if (condition)  
    ...
  case name_1 go
    abort if (condition)
    ...
  case name_2 go
    retry name_1 if (condition)
    ...
  case name_3 go
    solve name_4 if (condition)  
    ...       
  case name_4 go
    ...
error code do
   -- patch statement
error code do
   -- patch statement  
...  
other
   -- covering all other errors
final
   -- finalization
done;
```

**note:**
* Trial block has an optional local scope

**Interruptions**

| word  | description
|-------|---------------------------------------------------
| retry | execute previous solved case or specified case
| solve | solve one forward case in same trial and skip some
| abort | silent early trial termination
| pass  | scrub $error record and end trial block
| resume| continue next case after one case fail

**error**

Error regions are "exception handlers". Each can catch one single error with a specific code.

**other**

The "other" region is executed when the error is not captured. In this region you can use control statements to check for a range of errors or resolve any unknown error. This may be very generic like printing the error message to console. 

**final**

This final region is executed regardless if there is an error or not. It contains resource closing statements:

* close a file or connection to databases 
* close locked resources and free memory

**Read Next:** [Composite Types](composite.md)