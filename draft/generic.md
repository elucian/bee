## Generic Actions

A generic method is using a variable of type "X". 

**bubble sort**

```
define sort<X>(array @ [X], gt λ (X,X) ∈ L ):
  create n := length(array)-1;
  create swap ∈ L;
  create temp ∈ X;
  create i := 0 ∈ N;
  cycle
    modify i := 0;
    modify swap := $F; -- false
    cycle 
      stop if (i = n);
      -- this pair is out of order ?
      when gt(array[i], array[i+1]):
        -- swap pair and set swap flag = true
        assign temp :: array[i];
        assign array[i]  :: array[i+1];
        assign array[i+1]:: temp;
        modify swap := $T; -- true
      when;
      modify i +=1;
    cycle; 
    stop if (¬ swap);
  cycle;
define;
```

**Notes:**

* Action "sort" receive type X using markup <X> 
* Function reference "gt" is received as argument.

**sort usage**

```
define Person  <: { name ∈ S, age ∈ N };

-- tagine order action for array of Persons
define order(cat @ [Person]):
  sort<Person>(cat, λ(a, b) => (a.name > b.name));
define;

-- tagine clients and suppliers
create clients   := [Person](100);
create suppliers := [Person](10);
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