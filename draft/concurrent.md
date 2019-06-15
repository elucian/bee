## Bee concurrency

Bee is designed for high performance computing using multi-core processors.

**features:**

For improving performance Be is implementing 3 design patterns:

* Multi-thread routine
* Generators
* Coroutines

## Multi-thread run

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

**side branch:**

Coroutines can be used as a _side branch_ in parallel of the main thread.

* you need only one rule to create a side branch;
* call a branch using "make" or "apply" and suspended using "yield";
* main thread must store a handler to running coroutines;

```
# generate 10 numbers and stop
rule test(n @ N):
  for i ∈ (0..10) do
    alter n := i;
    yield; ** suspend and wait for the main thread
  next;
return;

# create a branch from rule test:
make r ∈ N; ** result reference
make branch := test(r); ** side branch
while r > 0 do
  write r; write ",";
  yield branch; ** resume test instance
repeat;
print; ** 1,2,3,4,5,6,7,8,9,0,

# using for loop with generator operator "<+"
# this operator will yield values from a coroutine
for x <+ test(r) do
  write r; write ",";
repeat;
```

**producer-consumer:**

Coroutines can be used in producer/consumer design paradigm.

* for this you need two rules: one is producer and other is consumer,
* producer is a dispatcher that distribute the work,
* consumer is a worker that resolve one task or a bunch of tasks;
* producer is usually working on a single thread;
* consumer is usually working on multiple threads;

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

# call bar asynchronously on 4 threads
for i ∈ (1..4) do
  begin bar(n); ** commence second consumer
next;  
rest; ** wait for both foo and bar to finish

over.
``` 

**Demo code:** [pc.bee](../demo/pc.bee)
