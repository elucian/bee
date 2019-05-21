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
* Type is first class value of type: "Type";

## Anonymous Rule

Next design uses one _anonymous_ rule:

**anonymous rule**
```
 (param, param,...) => (expression)
```

This can be used to create an argument for a _signature_

**signature**
```
rule foo( id @ (type,type, ...) ∈ type );
...
```

Using rule for argument using name: "id"

```
--argument ↓  parameters  ↓ ... expression ↓
apply foo((param ,param ...) => (expression)):
```


**bubble sort**

```
-- this sort is generic 
rule bubble{XT ∈ Type}(array ∈ [XT], gt @ (XT,XT) ∈ L):
  make n := length(array) ∈ N; 
  make swap := True ∈ L;
  make temp ∈ XT;
  make i ∈ N;
  while swap do
    alter i := 0;
    alter swap := False;
    while (i < n) do
       -- this pair is out of order ?
      when gt(array[i], array[i+1]) do
         -- swap pair and set swap flag = true
        alter temp := array[i];
        alter array[i] := array[i+1];
        alter array[i+1] := temp;
        alter swap := True;
      done;
      alter i += 1;
    repeat;
  repeat;
return;
```

**Notes:**

* Rule "sort" receive type Type using markup <X> 
* Rule reference "gt" is received as argument.

**sort usage**

```
-- define object type to be sorted
type Person  <: { name ∈ S, age ∈ N };

-- define sort rule for Person, as a clone of bubble
clone sort := bubble{XT:Person};

-- define clients and suppliers
make clients   ∈ [Person](100);
make suppliers ∈ [Person](10);

-- populate clients and suppliers somehow
...

-- use new order action to sort clients and suppliers
apply sort(clients);
apply sort(suppliers);
```

**Read next:** [overview](../syntax/overview.md)