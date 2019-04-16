## Tail Call Optimization

TCO apply to a special case of recursion. The gist of it is, if the last thing you do in a function is call itself (e.g. it is calling itself from the "tail" position), this can be optimized by the compiler to act like iteration instead of standard recursion.

Normally during recursion, the runtime needs to keep track of all the recursive calls, so that when one returns it can resume at the previous call and so on. Keeping track of all the calls takes up space, which gets significant when the function calls itself a lot. But with TCO, it can just say "go back to the beginning, only this time change the parameter values to these new ones." It can do that because nothing after the recursive call refers to those values.


**Example1** 
```
--this function is not optimized:
rule fact(n ∈ N) => (r ∈ N):
  when n == 0:
    alter r := 1;
  else:  
    alter r := n · fact(n-1);
  ready;  
over;
``` 

**Example2**
```
--this function can be optimized:
rule tail(n ∈ N, acc ∈ N) => (r ∈ N):
  when n == 0:
    alter r:= acc;
  else:   
    alter r:= tail(n-1, acc · n);
  ready; 
over;

rule fact(n ∈ N) => (r ∈ N):
  alter r := tail(n , 1);
over;  
```  

**Example3**
```
--this function is manually optimized:
rule fact(a ∈ N, b ∈ N) => (r ∈ N):
  while (b > 1):
    alter a := a · a + a;
    alter b := b - 1;  
  else:
    alter r := a; 
  repeat;
over;
```  