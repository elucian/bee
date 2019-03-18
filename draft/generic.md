## Generic Methods

A generic method is using a variable type "X". 

**bubble sort**

```
sort<X>(array @ [X], gt @ (X,X) :L ):
    new n := length(array);
    new swap ε L;
    new temp ε X;
    new i := 0 ε N;
    cycle
        let i := 0;
        let swap := ƒ;
        cycle 
            stop if (i = n);
            -- this pair is out of order ?
            when gt(array[i], array[i+1]):
                -- swap pair and set swap flag = true
                let temp := array[i];
                let array[i]  := array[i+1];
                let array[i+1]:= temp;
                swap := †;
            when;
            let i +=1;
        cycle;
        stop if ¬ swap;
    cycle;
sort;
```

**Notes:**

* Method "sort" receive type X using markup <X> 
* Function reference "gt" is received as argument.

**sort usage**

```
def Person  <: { name ε S, age ε N };

-- define order method for array of Persons
order(cat @ [Person]):
  sort<S>(cat, gt::(a, b) => (a.name > b.name));
order;

-- define clients and suppliers
new clients   := [Person](100);
new suppliers := [Person](10);
-- populate somehow
...

-- use new order method to sort
order(clients);
order(suppliers);
```

## Anonymous functions

This design require anonymous functions and "signature reference."

**syntax**
```
(param, param,...) => (expression)
```

This can be used to accommodate a reference to a "function signature"

**syntax**
```
 identifier @ (type,type, ...):type
```

