## Control Flow

Bee has 7 control flow statements:

Name             | Description
-----------------|----------------------------------
[do](#do)        | local context
[with](#with)    | qualifier suppression block
[when](#when)    | conditional block statement
[check](#check)  | multi-path selection block
[cycle](#cycle)  | unconditional repetitive  block
[while](#while)  | conditional repetitive block
[scan](#scan)    | visit elements in collection
[trial](#trial)  | trial work-flow

## do

Define anonymous local context;

```
do
  -- declarations
  make var ∈ type_name;
  -- statements
  ...
done;
```

## with

Define a _scope qualifier_ suppression block:

```
with (qualifier) do
  -- instead of qualifier.member()
  apply member();
  ...
done;
```

Using alias for scope qualifier:

```
with (scope: long.qualifier) do
  -- instead of long_qualifier.member()
  apply scope.member();
  ...
done;
```

Using 2 qualifiers for mapping using assignment:

```
with (target: target_qualifier, source: source_qualifier) do
  -- copy value from source to target
  alter target.member := source.member;
  ...
done;
```


## when

The _when_ keyword is a multi-conditional selector.

**syntax**
```
when condition do
  -- statements
  ...
done;
```

Dual selector based on single logical expression:

**pattern**
```
when condition do
  -- first pass-way
else
  -- second pass-way
done;
```

**nested**

```
make a := 0;
-- first decision
when a ≤ 0 do 
  print 'a ≤ 0';
  -- second decision
  when a = 0 do 
    print 'a = 0';
  else
    print "a < 0"; 
  done; -- a ≤ 0
done; -- a = 0
```

**note:** I have used comments ";" after "done;"

**ladder**

```
make a := 0;
when a < 0 do
  print 'a < 0';
else if a > 10 do
  print 'a > 100';
else if a > 10 do
  print 'a > 2';
else if a > 1  do
  print 'a > 1';
else
  print "a ≥ 0";
done; 
```

## Check

The _check_ is a multi-path value based selector. 

**syntax:**

```
check expression:   
  is (value)      do
    ** first path
    ... 
  in (min..max)   do
    ** second path
    ... 
  in (value, ...) do
    ** third path
    ...
none
  ** default path
  ...
done;
```

**Notes:** 
* it is similar to _switch_ from other languages.
* it is mapping to a _"jump table"_ like switch,
* there is not _break_ statement like in switch, 
* default path _none_ is executed when there is no match.

## Cycle

Create unconditional repetitive block.

**pattern**

```
cycle
  ...
  skip if condition;
  ...
  stop if condition;
  ...
repeat;
```

**notes**
* If stop statement is missing you can create infinite loop;
* You can leave an infinite loop using other interruption statements;
* It is forbidden to make a new variables in a cycle;

**example**

In this example "a" is a local variable visible in cycle and after cycle;

```
make a := 10 ∈ Z;
cycle
  alter a -= 1;
  ** conditional repetition
  skip if (a % 2 = 0);
  write a;  
  ** conditional termination
  write ',';
  stop if (a < 0);
repeat;
```

**Notes:** 

* The cycle can be controlled using conditional if;
* If _stop_ condition is missing the cycle is infinite;
* Infinite cycle is interrupted automatic by a #timer

**nested**

Nested cycles are very rare but possible:

**pattern:** 

```
cycle -- outer cycle
  ...
  skip if (condition); -- skip inner cycle
  ...
  cycle -- inner cycle
    ...
    skip if (condition); -- repeat inner cycle
    ...    
    stop if (condition); -- stop inner cycle
  repeat;
  ...
  stop if (condition); -- stop outer cycle  
  ...
repeat;
```

**example**

```
make x   := 9; 
make a,r := 0; 
cycle
  alter r := x % 2;
  alter a := (0 if r = 0, 1);
  write "{1}:{2}" <+ (x,a);
  alter x -= 1;
  write ',';
  stop if (x < 5);
repeat;
print;  -- expect 9:1, 8:0, 7:1, 6:0, 5:1,
```

## While

Conditional repetitive block:

```
while condition do
  -- repetitive block
  ...
  skip if (condition); -- continue
  ...
  stop if (condition); -- break
  ...
else
  -- alternate path
  ...
repeat;
```

**Notes:** 
* If condition is true all the time we can end-up in infinite loop;
* Infinite while can be interrupted by timer directive: {#timer:10s};
* When timer expire, the loop will terminate. By default timer is 0s;

**example**

```
make a := 10;
while a > 0 do
  alter a -= 1;
  -- conditional repetition
  when a % 2 ≠ 0 do
    write a;  
    write ',';
  done;
repeat;
print;
```

**Nested loop**

One while block statement can be nested:

**pattern:** 

```
** outer loop   
while condition do
  ** inner loop
  while condition do
     ** statements
     ...
  repeat;  
  ...  
repeat;
```

**example**

```
make x   := 9; -- local variable
make a,r := 0; -- two local variable
while x < 5 do
  alter r := x % 2;
  alter a := 0 if r = 0, 1 if r = 0, 2;
  write "{1}:{2}" <+ (x,a);
  write ',' if (x < 5);
  alter x -= 1;
repeat;
print; --9:1, 8:0, 7:1, 6:0, 5:1
```

## Scan 

This is used to traverse a _range_ or a _subset_ from a discrete _type_.  

**Pattern:**
```
scan var ∈ [min..max] do
  ** block statements
  skip if (condition);
  ...
  stop if (condition);
  ...
next;
```

**Notes:**    
* Control variable must be declared in local scope;
* Control variable is incremented using next;

Example of forward skip in counting iteration:
```
make i ∈ Z; -- local variable
scan i ∈ [0..10] do
  ** force next iteration
  when i % 2 = 0 do
    skip;
  else
    ** write only odd numbers
    write i;
    write ',' if (i < 10);
  done;
next;
print i; -- still available
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
  case name_0 do
    fail code if (condition);
    ...    
  case name_1 do
    fail {code,"message"} if (condition);
    ...
  case name_2 do
    abort if (condition);
    ...
  case name_3 do
    retry name_1 if (condition);
    ...
  case name_4 do
    solve name_5 if (condition);
    ...       
  case name_5 do
    ...
error code:
   -- patch statement
error code:
   -- patch statement  
...  
other
   -- covering all other errors 
   ...
final
   -- finalization
   ...
done;
```

**note:**
* Trial block has an optional local scope
* Local variables will disappear after done;

**Transfer**

Next statements are directly associated with trial block:

| word  | description
|-------|------------------------------------------------------------
| solve | execute specified case forward to current case
| retry | execute specified case previous to current case
| fail  | interrupt execution and transfer control to error handlers
| resume| used from error handlers to continue with next case 
| abort | terminate execution and transfer control to next statement
| pass  | terminate execution and cleanup #error record

**error**

Error regions are "exception handlers". Each can catch one single error with a specific code.

**other**

The "other" region is executed when the error is not captured. In this region you can use control statements to check for a range of errors or resolve any unknown error. This may be very generic like printing the error message to console. 

**final**

This final region is executed regardless if there is an error or not. It contains resource closing statements:

* close a file or connection to databases 
* close locked resources and free memory

**Read Next:** [Composite Types](composite.md)