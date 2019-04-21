## Generic Rules

A generic rule is using one or more type parameters. 

**pattern**
```
rule name{Type,...}(param ∈ Type) => (result ∈ Type):
   make var ∈ Type;   
   alter result := expression(param);
return;
```

**note:** 
* Type can be any known type or sub-type;
* Type is first class value and is of type: "Type";

## Anonymous Rule

Next design uses one _anonymous_ rule:

**anonymous rule**
```
 (param, param,...) => (expression)
```

This can be used to create an argument for a _signature_

**signature**
```
rule foo( id @ (type,type, ...)):
...
```

Using rule for argument using name: "id"

```
--argument ↓  rule  ↓
apply foo(id::(param ,param ...) => (expression));
```


**bubble sort**

```
-- this sort is generic 
rule bubble{XT ∈ Type}(array @ [XT], gt @ (XT,XT) ∈ L ):
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
      ready;
      alter i +=1;
    repeat;
  repeat;
return;
```

**Notes:**

* Rule "sort" receive type Type using markup <X> 
* Rule reference "gt" is received as argument.

**sort usage**

```
type Person  <: { name @ S, age ∈ N };

-- define sort rule for Person, as a clone of bubble
clone sort := bubble{XT:Person};

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