## Bee concurrency

Bee is designed for high performance computing.

**features:**

* asynchronous calls
* resumable coroutines 

## Asynchronous call

One or more routines can be run in parallel if the call is asynchronous.

keyword | description
--------|----------------------------------------------------------------------
begin   | call a rule asynchronously and create new thread
rest    | temporary suspend main thread and wait for all threads to synchronize
wait    | suspend a thread for specific number of seconds, milliseconds
yield   | interrupting current thread and give priority to other thread

**example:**

Asynchronous call can be done using a control loop and keyword `begin`:

```# suspend for 2.5 sec
rule test():
  wait 2.5;
return;
# start control loop
make i := 0; 
while i ≤ 4 do
  begin test();
  alter i += 1;
  wait 1;
repeat;
rest;
```

**file:** [ac.md](demo/ac.md); **  asynchronous call

## Resumable Coroutines 

Coroutines are two methods that wait for each other to execute in turn.

* coroutines can be executed on multiple threads
* coroutines can be used in producer/consumer paradigm

**design pattern:**

```
#driver

make n ∈ (N);  ** channel
make c :: 100; ** capacity
make x :: 10;  ** duration
# first coroutine (produce)
rule foo(channel @ (N)):
  for i ∈ (0..c) do
    print "+" + i;  
    alter channel += i;
    wait x;
  done;
  yield bar;
return;
# second coroutine (consume)
rule bar(channel @ (N)):  
  while channel ≠ () do
    print "-" + channel.head;  
    alter channel -= channel.head;
    wait  2·x;
  done;
  yield foo;
return;
# call foo and bar asynchronously
begin foo(n); ** commence foo
begin bar(n); ** commence bar (first consumer)
begin bar(n); ** commence bar (second consumer)

rest; ** wait for both foo and bar to finish

over.
``` 

**See also:** [pc.wee](../demo/pc.wee)
