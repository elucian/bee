## Generic Aspects

A generic aspect is using a variable of type "X". 

**bubble sort**

```
aspect sort<X>(array @ [X], gt @ (X,X) ∈ L ):
  make n := length(array)-1 ∈ N; 
  make swap := $T ∈ L;
  make temp ∈ X;
  make i ∈ N;
  while swap:
    alter i := 0;
    alter swap := $F; -- false
    while (i ≤ n): 
      -- this pair is out of order ?
      when gt(array[i], array[i+1]):
        -- swap pair and set swap flag = true
        alter temp :: array[i];
        alter array[i]  :: array[i+1];
        alter array[i+1]:: temp;
        alter swap := $T; -- true
      when;
      alter i +=1;
    while; 
  while;
aspect;
```

**Notes:**

* Aspect "sort" receive type X using markup <X> 
* Rule reference "gt" is received as argument.

**sort usage**

```
type Person  <: { name ∈ S, age ∈ N };

-- tagine order action for array of Persons
aspect order(cat @ [Person]):
  sort<Person>(cat, λ(a, b) => (a.name > b.name));
aspect;

-- tagine clients and suppliers
make clients   := [Person](100);
make suppliers := [Person](10);
-- populate somehow
...

-- use new order action to sort
solve order(clients);
solve order(suppliers);
```

## Anonymous Lambda

This design uses one _anonymous λ rule:


**rule**
```
 (param, param,...) => (expression)
```

This can be used to create an argument for a _signature reference_:

**signature**
```
 ( id @ (type,type, ...) ∈ type)
```

To modify an anonymous rule as argument by name Bee uses: "::"

```
 (id :: (param ,param ...) => (...))
```

Where: "id" is parameter name representing reference to rule.

**Read next:** [overview](../syntax/overview.md)