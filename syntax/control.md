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
error value do 
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

**Transfer**

Next statements are directly associated with trial block:

| word  | description
|-------|------------------------------------------------------------
| fail  | transfer execution to error handlers when a condition is satisfied
| pass  | transfer execution to error handler unless a condition is satisfied
| raise | propagate last error outside of patch region
| abort | early control transfer to get ready for interruption

**catch**

You can use any selector in this region to handle exceptions by code. Most usual selector is case or check;

**final**

Get _ready_ region executed before done, regardless of error status. It contains resource closing statements:

* close a file or connection to databases 
* close locked resources and free memory

**Example:**

```
trial
  make x := 1/0;
patch
  print &error.message;
done;
```

**Read Next:** [Composite Types](composite.md)