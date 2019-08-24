## Bee concurrency

Bee is designed for high performance computing using multi-core processors.

**features:**

For improving performance Be is implementing 3 design patterns:

* Multi-threading
* Coroutines

## Multi-threading

One or more routines can be run in parallel using _"defer"_ instead of _"apply"_.

keyword | description
--------|----------------------------------------------------------------------
defer   | call a rule asynchronously and create a new thread
wait    | suspend a thread for specific number of seconds
yield   | suspend current thread and give priority to other thread

**example:**

Asynchronous call can be done using a control loop and keyword _"begin"_:

```** suspend n seconds
rule test():
  wait 10;
return;
** prepare for execution 4 threads
for i ∈ (1..4) do
  begin test;
repeat;
yield; //wait for pending test to finish;
```

**Demo code:** [ac.bee](./demo/ac.bee);

## Coroutines 

Coroutines are resumable rules that can be executed in parallel.

**side branch:**

Coroutines can be used as a _branch_ of main thread.

* you need only one coroutine to create a side branch,
* call a branch using _"begin"_ and suspended using _"yield"_,
* resume a coroutine using _yield_ plus routine name.

```
** generate 10 numbers and stop
rule test(n ∈ N):
  for i ∈ (0..9) do
    alter n := i;    
    yield; //suspend and wait for the main thread
  next;
return;

** start secondary process
make  r ∈ N;   // result reference
begin test(r); // start side branch 
while r ≥ 0 do
  write (r, ",");
  yield test;  // suspend main thread and resume test 
repeat;
print;    // 0,1,2,3,4,5,6,7,8,9,
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

** data source/target to process
make s := [0](1000); //array of integers
** producer coroutine
rule foo(channel ∈ (N), start, end, batch ∈ N):
    ** prepare next batch    
  make mark := start;
  while mark < end do    
    while channel.length < batch do
      alter channel ++ mark; //append mark to channel
      exit if mark = end;    //stop the producer
      alter mark += 1; //next number in channel
    done;
    yield; //suspend producer
    alter mark := 0;
  repeat;  
return;
** consumer coroutine
rule bar(channel ∈ (N), batch ∈ N):  
  make index = 0;
  while channel.length > 0 do
    for index in [0..batch]  do
      write channel.head,",";  
      alter channel -= channel.head;
      wait 1; //slow down for a second
      exit if channel.length = 0; //empty
    done;
    print
    yield; //suspend consumer
  repeat;  
return;
** prepare a channel
make ch ∈  (N); //empty list of natural numbers

** activate producer
begin foo(ch, start:1000, end:2000, batch:100); //synchronous call
while ch.length > 0 do
  ** prepare consumers
  for i ∈ (1..4) do
    defer bar(n); //asynchronous call
  next; 
  yield bar; // execute consumers on 4 threads
  yield foo if (ch.length = 0); // execute producer on single thread
repeat;  

over.
``` 

**Demo code:** [pc.bee](./demo/pc.bee)
