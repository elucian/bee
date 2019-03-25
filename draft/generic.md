## Generic Actions

A generic aspect is using a variable type "X". 

**bubble sort**

```
aspect sort<X>(array @ [X], gt λ (X,X) ∈ L ):
    value n := length(array)-1;
    value swap ∈ L;
    value temp ∈ X;
    value i := 0 ∈ N;
    cycle
        alter i := 0;
        alter swap := $⊥; -- false
        cycle 
            stop if (i = n);
            -- this pair is out of order ?
            when gt(array[i], array[i+1]):
                -- swap pair and set swap flag = true
                alter temp := array[i];
                alter array[i]  := array[i+1];
                alter array[i+1]:= temp;
                alter swap := $⊤; -- true
            when;
            alter i +=1;
        cycle; 
        stop if ¬ swap;
    cycle;
aspect;
```

**Notes:**

* Action "sort" receive type X using markup <X> 
* Function reference "gt" is received as argument.

**sort usage**

```
type Person  <: { name ∈ S, age ∈ N };

-- tagine order action for array of Persons
aspect order(cat @ [Person]):
  sort<Person>(cat, λ(a, b) => (a.name > b.name));
aspect;

-- tagine clients and suppliers
value clients   := [Person](100);
value suppliers := [Person](10);
-- populate somehow
...

-- use new order action to sort
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
 (id λ (type,type, ...) ∈ type)
```

To assign an anonymous function as argument by name Bee uses: "::"

```
 (id :: (param ,param ...) => (...))
```

Where: "id" is parameter name representing reference to function.

**Read next:** [overview](../syntax/overview.md)