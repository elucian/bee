## Bee concurrency

Bee is designed for high performance computing.

**features:**

* parallel processes
* coroutines

## Multi-thread

One or more routines can be run in parallel using "begin" instead of "apply".

keyword | description
--------|----------------------------------------------------------------------
begin   | call a rule asynchronously and create new thread
rest    | temporary suspend main thread and wait for all threads to synchronize
wait    | suspend a thread for specific number of seconds
yield   | interrupting current thread and give priority to other thread

**example:**

Asynchronous call can be done using a control loop and keyword `begin`:

```# suspend n seconds
rule test(n ∈ N):
  write "n";
  wait n;
  print ".";
return;
# begin 4 threads
for i ∈ (1..4) do
  begin test(i);
repeat;
rest; ** wait to finish
```

**Demo code:** [ac.bee](../demo/ac.bee);

## Coroutines 

Coroutines are two methods that wait for each other to execute in turn.

**design pattern:**

* coroutines can be call in synchronous mode using _apply_
* coroutines are suspended/resumable routines
* coroutines can be used as a side branch 


```
load $bee.lib.time:(.);

# generate 100 numbers
rule test():
  for i ∈ (0..10) do
    alter x := i;
    write i;
    write ",";
    yield; ** suspend and wait for main thread
  next;
return;

# force test to generate for 10 seconds
make start := time.now();
make time  := 0;
make r ∈ N; ** result
while time < 10 do
  apply test(); ** start or resume if suspended
  print;
  wait 0.1; ** slow down between prints
  apply time := time.now() - start;
repeat;
```

**design pattern:**

* coroutines can be call in asyncronous mode using _begin_,
* coroutines can be executed on multiple threads,
* coroutines can be used in producer/consumer paradigm.

```
#driver

make n ∈  (N);   ** channel
make c :: 100;   ** batch capacity

make target := 1000;  ** simulate data target
make mark ∈ N;        ** current item to process

# data source/target to process
make s := [0](1000); ** array of integers
# first coroutine (produce)
rule foo(channel @ (N)):
  while mark < target) do 
    # prepare next batch
    while channel.count < c do
      alter mark += 1;       ** side effect
      alter channel += mark; ** append
      exit if mark = target; ** stop the producer
    done;
    yield bar; ** suspend and broadcast wake-up for bar
  repeat;  
return;
# second coroutine (consume)
rule bar(channel @ (N)):  
  while True do
    while channel ≠ () do
      print ":>" + channel.head;  
      alter channel -= channel.head;
      wait 1; ** slow down for a second
    done;
    exit if mark = target;          
    yield foo; ** suspend and broadcast wake-up for foo
  repeat;  
return;
# call foo asynchronously on 1 thread
begin foo(n); ** commence producer foo 

# call bar asynchronously on 2 threads
begin bar(n); ** commence first consumer
begin bar(n); ** commence second consumer

rest; ** wait for both foo and bar to finish

over.
``` 

**Demo code:** [pc.bee](../demo/pc.bee)
