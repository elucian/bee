## Bee concurrency

Bee is designed for high performance computing using multi-core processors.

**features:**

For improving performance Be is implementing 3 design patterns:

* Multi-threading
* Coroutines

## Multi-threading

One or more routines can be run in parallel using _"begin"_ instead of _"apply"_.

keyword | description
--------|----------------------------------------------------------------------
begin   | call a rule asynchronously and create a new thread
rest    | temporary suspend main thread and wait for all threads to synchronize
wait    | suspend a thread for specific number of seconds
yield   | interrupting current thread and give priority to other thread

**example:**

Asynchronous call can be done using a control loop and keyword _"begin"_:

```** suspend n seconds
rule test(n ∈ N):
  write "n";
  wait n;
  print ".";
return;
** begin 4 threads
for i ∈ (1..4) do
  begin test(i);
repeat;
rest; //wait to finish
```

**Demo code:** [ac.bee](./demo/ac.bee);

## Coroutines 

Coroutines are two methods that wait for each other to execute in turn.

**side branch:**

Coroutines can be used as a _side branch_ in parallel of the main thread.

* you need only one rule to create a side branch;
* call a branch using _"begin"_ and suspended using _"yield"_;
* main thread must store a handler to running coroutines;

```
** generate 10 numbers and stop
rule test(n ∈ N):
  for i ∈ (0..9) do
    alter n := i;
    yield; //suspend and wait for the main thread
  next;
return;

** create a branch from rule test:
make  r ∈ N;   // result reference
begin test(r); // side branch 
while r ≥ 0 do
  write r; write ",";
  yield test;  // suspend main thread and resume test 
repeat;
print;  // 0,1,2,3,4,5,6,7,8,9,
```

**producer-consumer:**

Coroutines can be used in producer/consumer design paradigm.

* for this you need two rules: one is producer and other is consumer,
* the main thread is starting threads and then using _rest_ is waiting,
* producer is a dispatcher that distribute the work,
* consumer is a worker that resolve one task or a bunch of tasks;
* producer is usually working on a single thread;
* consumer is usually working on multiple threads;

```
driver pc:

make n ∈  (N); // channel
make c := 100; // batch capacity

make target := 1000; // simulate data target
make mark ∈ N; // current item to process

** data source/target to process
make s := [0](1000); //array of integers
** first coroutine (produce)
rule foo(channel ∈ (N)):
  while mark < target) do 
    ** prepare next batch
    while channel.count < c do
      alter mark += 1; //side effect
      alter channel += mark; //append
      exit if mark = target; //stop the producer
    done;
    yield bar; //suspend foo and broadcast wake-up for bar
  repeat;  
return;
** second coroutine (consume)
rule bar(channel ∈ (N)):  
  while True do
    while channel ≠ () do
      print ":>" + channel.head;  
      alter channel -= channel.head;
      wait 1; //slow down for a second
    done;
    exit if mark = target;          
    yield foo; //suspend bar and signal foo to wake-up
  repeat;  
return;
** call foo asynchronously on 1 thread 
begin foo(n); // commence producer foo 

** call bar asynchronously on 4 threads
for i ∈ (1..4) do
  begin bar(n); //start a consumer thread
next;  
rest; // wait for both foo and bar to finish

over.
``` 

**Demo code:** [pc.bee](./demo/pc.bee)
