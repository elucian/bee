## Control flow

We have two types of control statements: multi-block selector and repetitive-block or iterations. In next examples you will learn how to use these control statements to check a block of code to be 
executed depending on conditions.

**statements:**

* case   -- multiple branches
* cycle  -- repetitive block
* trial  -- trial-error block

## Case selector

A decision is based on logical expressions and two keywords: {case, else}.

```
new a := 10; 

-- single block
case (a = 10)
   put 'yes';
case;

-- two branches
case (a < 5)
  put 'yes';
else
  put 'no';
case;
```

```
-- multiple branches
case (a < 0)  -- first case
  put 'a < 0';
case (a > 5)  -- second case
  put 'a > 5';
case (a = 0) -- third case
  put "a := 0"; 
else -- alternative case
  put ("a := " + a)
case;

```  
**Notes:** 

* After the logical expression we can have end of line or comment;
* Logic expressions can be enclosed in () but this is not mandatory;


## Cycle loop

Bee can execute a block of code multiple times: { cycle , loop, stop }

```
new a := 10;

cycle
  let a -= 1;
  -- conditional repetition
  loop if (a % 2 = 0);  
  say a;  
  -- conditional termination
  stop if (a < 0);
  say ','; 
cycle;

write;
```

**Notes:** 

* If _stop_ condition is missing the cycle is infinite;
* The cycle can be controlled using conditionals;

### Nested cycles
If we need to interrupt more then one cycle then we can use a labels.

```
cycle  <label>;  --mark cycle with a label
loop   <label>;  --jump to this cycle beginning
stop   <label>;  --jump to end of this cycle 
```

**Cycle label example**
We can shortcut execution to the beginning of the next iteration.  

```
loop [label] if <condition>;

-- or alternative
case <condition>
  loop [label];
case;
```

**Cycle forward example:**
Fast forward jump the logical flow to the first statement after the iteration.   
```
stop [label] if <condition>;

-- or alternative
case <condition>
  stop [label];
case;

```

**Label example:** 
```
-- Skip more then one nested cycles:
cycle two
  cycle one
    cycle zero
       -- continue with cycle one
       loop one if <condition1>;        
       -- continue with cycle two
       loop two if <condition2>; 
       -- control for stop
       stop if <condition3>;
    cycle;
  cycle;
cycle;
```

## Trial / error

Statement trial, is used to create a robust block of code.

**Usability:**

* create local scope
* a job can fail

**example**
```
trial
  put "start trial";
  ...
error 201
  put "error 201";
error 202
  put "error 201"; 
other
  put "errors detected";
after
  put "after job"; 
trial;
```

**Read next:** [Pattern Matching](overview.md#pattern-matching)
