## Bee concurrency

Bee is designed for high performance computing.

**features:**

* asynchronous call
* resumable coroutines 

## Asynchronous call

One or more methods can be run in parallel if the call is asynchronous.

keyword | description
--------|----------------------------------------------------------------------
start   | call a rule asynchronously and create new thread
rest    | temporary suspend main thread and wait for all threads to synchronize
wait    | suspend a thread for specific number of seconds, milliseconds
yield   | interrupting current thread and give priority to other thread

**example**

Usually asynchronous call is done from a control loop.

```
-- suspend for 2.5 sec
rule test():
  wait 2.5;
return;

-- start 4 threads
make i := 0; -- control variable
while (i ≤ 4)
  start test;    
  alter i += 1;    
repeat;
rest;
```

**file:** [ac.md](demo/ac.md) -- asynchronous call

## Resumable Coroutines 

Coroutines are two methods that wait for each other to execute in turn.

* coroutines can be executed on multiple threads
* coroutines can be used in producer/consumer paradigm

**design pattern**

```
#driver

make n ∈ N; -- control variable

-- first coroutine
rule foo(x ∈ N):
  alter x := x + 1;
  wait 5;  
  yield bar if (x < 10);
return;

-- second coroutine
rule bar(x ∈ N):
  alter x = x + 1;
  wait 10;    
  yield foo if (x < 10);
return;

-- call foo and bar asynchronously
start foo(n);
start bar(n);

-- wait for both foo and bar to finish
rest;

over.
``` 

**See also:** [pc.wee](../demo/pc.wee) -- producer consumer example
