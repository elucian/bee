## Generic Methods

A generic method is using a variable type "X". 

**bubble sort**

```
def sort<X>(array @ [X], gt λ (X,X) ε L ):
    new n := length(array)-1;
    new swap ε L;
    new temp ε X;
    new i := 0 ε N;
    cycle
        let i := 0;
        let swap := $0; -- false
        cycle 
            stop if (i = n);
            -- this pair is out of order ?
            when gt(array[i], array[i+1]):
                -- swap pair and set swap flag = true
                let temp := array[i];
                let array[i]  := array[i+1];
                let array[i+1]:= temp;
                swap := $1; -- true
            when;
            let i +=1;
        cycle; 
        stop if ¬ swap;
    cycle;
def;
```

**Notes:**

* Method "sort" receive type X using markup <X> 
* Function reference "gt" is received as argument.

**sort usage**

```
def Person  <: { name ε S, age ε N };

-- define order method for array of Persons
def order(cat @ [Person]):
  sort<Person>(cat, λ(a, b) => (a.name > b.name));
def order;

-- define clients and suppliers
new clients   := [Person](100);
new suppliers := [Person](10);
-- populate somehow
...

-- use new order method to sort
order(clients);
order(suppliers);
```

## Anonymous Lambda

This design uses one _anonymous λ function_:


**function**
```
 λ(param, param,...) => (expression)
```

This can be used to create an argument for a _signature reference_:

**signature**
```
 id λ (type,type, ...) ε type
```

To assign an anonymous function as argument by name Bee uses: "::"

```
 id :: (param ,param ...) => (...)
```

Where: "id" is parameter name representing reference to function.

**Read next:** [overview](../syntax/overview.md)