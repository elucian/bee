## Generic Rules

A generic rule is using a type parameter. 

**pattern**
```
rule pattern{Type}(param ∈ Type, result @ type_name):
   make local ∈ Type;   
   alter result := expression(param)
rule;
```

**note:** 
* Type can be any known type or sub-type;
* Type is first class value and is of type: "type";

## Anonymous Rule

This design uses one _anonymous_ rule:

**anonymous rule**
```
 (param, param,...) => (expression)
```

This can be used to create an argument for a _signature reference_

**signature**
```
rule foo(id(type,type, ...) ∈ Type):
...
```

Using anonymous rule for parameter named id():

```
-- anonymous rule ↓ 
apply foo(id::(param ,param ...) => (expression))
```

Where: "id" is parameter name representing a rule.


**bubble sort**

```
-- this sort is generic 
rule bubble{Type}(array @ [Type], gt(Type,Type) ∈ L ):
  make n := length(array)-1 ∈ N; 
  make swap := $T ∈ L;
  make temp ∈ Wat;
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

-- define sort rule for Person, as a clone of bubble
clone sort :: bubble{Type:Person};

-- define clients and suppliers
make clients   @ [Person](100);
make suppliers @ [Person](10);

-- populate clients and suppliers somehow
...

-- use new order action to sort clients and suppliers
apply sort(clients);
apply sort(suppliers);
```

**Read next:** [overview](../syntax/overview.md)