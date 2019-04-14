## Generic Rules

A generic rule is using a type parameter. 

**pattern**
```
rule name<type_name>(param ∈ type_name, result @ type_name):
   make local ∈ type_name;   
   alter result := ...
rule;
```

**Note:** Angle brackets `<type_name>` are actually used.

**bubble sort**

```
rule sort<X>(array @ [X], gt(X,X) ∈ L ):
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
rule;
```

**Notes:**

* Rule "sort" receive type X using markup <X> 
* Rule reference "gt" is received as argument.

**sort usage**

```
type Person  <: { name @ S, age ∈ N };

-- define order action for array of Persons
rule order(cat @ [Person]):
  apply sort<Person>(cat, (a, b) => (a.name > b.name));
rule;

-- define clients and suppliers
make clients   := [Person](100);
make suppliers := [Person](10);
-- populate somehow
...

-- use new order action to sort
apply order(clients);
apply order(suppliers);
```

## Anonymous Rule

This design uses one _anonymous_ rule:


**rule**
```
 (param, param,...) => (expression)
```

This can be used to create an argument for a _signature reference_:

**signature**
```
rule foo( id(type,type, ...) ∈ type):
...
```

Using anonymous rule for parameter named id():

```
-- anonymous rule ↓ 
apply foo((param ,param ...) => (...))
```

Where: "id" is parameter name representing a rule.

**Read next:** [overview](../syntax/overview.md)