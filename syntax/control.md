## Control Flow

Bee has 5 control flow statements:

* [when](#when)
* [cycle](#cycle)
* [while](#while)
* [scan](#scan)
* [trial](#trial)

### when

Case is a decision statement selector based on one condition.

**syntax**
```
when (condition):
  statement;
ready;
```

Dual selector based on single logical expression:

**pattern**
```
when (condition):
  -- first branch;
else:
  -- second branch;
ready;
```

**Note:** Column ":" is mandatory after else keyword.

**nested**

```
make a := 0;
when (a ≤ 0):
  print 'a ≤ 0';
  when (a = 0):
    print 'a = 0';
  else:
    print "a < 0"; 
  ready;  
ready;
```

**ladder**

```
make a := 0;
when (a < 0):
  print 'a < 0';
else if (a > 10):
  print 'a > 100';      
else if (a > 10):
  print 'a > 2';  
else if (a > 1):
  print 'a > 1';
else:
  print "a ≥ 0"; 
ready;
```

### Cycle

Create unconditional repetitive statement block.

**pattern**

```
cycle:
  ...
  skip if (condition)
  ...
  stop if (condition)
  ...
repeat;
```

**example**

```
make a := 10 ∈ Z;
cycle:
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
* Infinite cycle is intrerupted automatic by #timer:??

### Nested cycles

Nested cycles can be labeled

**pattern:** 

```
** label 2 nested cycles 
cycle outer:
  ** outer cycle
  cycle inner:
    ** skip both cycles
    skip outer if (condition)
    ...    
    ** stop both cycles
    stop outer if (condition)    
  repeat;
repeat;
```

**example**

```
make x   := 9; 
make a,r := 0;
cycle:
  alter r := x % 2
  alter a := (0: r = 0, 1)
  write "{1}:{2}" <+ (x,a)
  x -= 1
  write ','
  stop if (x < 5)
repeat;

print ** 9:1, 8:0, 7:1, 6:0, 5:1,
```

### While

Controlled repetitive block:

```
while (condition):
  -- repetitive block
  ...
  skip if condition; -- continue
  ...
  stop if condition; -- break
  ...
else:
  -- alternate path
repeat;
```

**Notes:** 
* If condition is true all the time we can end-up in infinite loop;
* Infinite while can be interrupted by timer directive: {#timer:10s};
* When timer expire, the loop will terminate. By default timer is 0s;

**example**

```
make a := 10;

while (a > 0):
  alter a -= 1;
  -- conditional repetition
  when (a % 2 ≠ 0);  
    write a;  
    write ','; 
  ready;
repeat;
print;
```

**Nested loop**

One while block statement can be nested:

**pattern:** 

```
while condition: 
  -- outer loop   
  while condition:
    -- inner loop
  repeat;  
  -- continue outer loop
  ...
  while condition:
    -- inner loop
    ...
  repeat;  
  ...       
repeat;
```

**example**

```
make x   := 9;
make a,r := 0;

while (x < 5):
  alter r := x % 2;
  alter a := (0 if r = 0, 1 if r = 0, 2);
  write "{1}:{2}" <+ (x,a);
  write ',' if (x < 5);
  alter x -= 1;  
repeat;

print;
--> 9:1, 8:0, 7:1, 6:0, 5:1
```

## Scan

Scan a "range", that is a _subset_ from a discrete _type_ using syntax: `[n..m]`.  

**Pattern:**
``` 
make min := constant ∈ N;
make max := constant ∈ N; 
scan var ∈ Z[min..max]:
  ** block statements;
  skip if (condition);
  ...
  stop if (condition);
  ...
next;
```

**Notes:**    
* Control variable is automatic incremented;
* Control variable must be declared in local scope;

Example of forward iteration:
```
scan i ∈ Z[0..10]:
  ** force next iteration
  when (i % 2 = 0):
    skip;
  else:
    ** write only odd numbers
    write(i);
    write(',') if (i < 10);
  ready;
next;
```
> 1,3,5,7,9

**Notes:**
* scan can be shortcut using skip;
* scan can be terminated early using stop;

## Trial

The "trial" statement execute a sequential process that can fail for some reason.

**Keywords:**

| word  | description
|-------|--------------------------------------------------------
| trial | start trial/error block
| error | catch errors by code and start a patch region
| cover | catch other errors not found by error regions
| final | executed before trial is over after last case or error

**pattern**
```
trial:
  -- declaration region
  ...
  -- fail with error code
  fail code if (condition);

  -- fail with error code and message
  fail {code,"message"} if (condition);

  -- multiple use cases
  case name_1:
    abort if (condition);
  case name_2:
    retry name_1 if (condition);
  case name_3:
    solve name_4 if (condition);  
  ...    
error code:
  -- patch statement
error code:
  -- patch statement  
...  
cover:
  -- other errors  
final:
  -- finalization
ready;
```

**Interruptions**

| word  | description
|-------|---------------------------------------------------
| retry | execute previous solved case or specified case
| resume| continue next case after one case fail
| solve | solve one forward case in same trial and skip some
| abort | silent early trial termination
| pass  | scrub $error record and end trial block

**error**

Error regions are "exception handlers". Each can catch one single error with a specific code.

**cover**

The "cover" region is executed when the error is not captured. In this region you can use control statements to check for a range of errors or resolve any unknown error. 

**final**

This final region is executed regardless if there is an error or not. It contains resource closing statements:

* close a file or connection to databases 
* close locked resources and free memory

**Read Next:** [Composite Types](composite.md)