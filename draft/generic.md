## Generic Rules

A generic rule is using one or more "type" parameters. 

**pattern**
```
rule name{Name ∈ Type,...}(param ∈ Name) => (result @ Name):
   alter result := expression(param);
return;
```

**note:** 
* Type can be any known type or sub-type;
* Name is "first class" value of type: _Type_;

## Anonymous Rule

Anonymous rule is an expression declaration that can be used as parameter or as a result for another rule:

**anonymous rule**
```
  (param ∈ type_name, ,...) => (expression)
```

This can be used to create an argument for parameters of type "Rule" declared with "@" like:

**signature**
```
rule foo( id @ (type,type, ...) ∈ type);
...
```

Call rule "foo" with anonymous rule as argument by name:

```
apply foo(id: (param ,param ...) => (expression));
```


## Bubble sort

In this example, _bubble_ is a generic rule:


```
-- this sort is generic 
rule bubble{TT ∈ Type}(array ∈ [TT], gt @ (TT,TT) ∈ L):
  make n := length(array) ∈ N; 
  make swap := True ∈ L;
  make temp ∈ TT;
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

* Rule "sort" receive TT (Target Type) 
* Rule reference "gt" is forced reference argument.

**sort usage**

```
-- define object type to be sorted
type Person := { name ∈ S, age ∈ N } <: Object;

-- define order as expression rule for type Person
rule order( p1, p2 ∈ Person) ∈ L => (p1.name > p2.name);

-- define sort rule for Person, as a clone from _bubble_
clone sort := bubble{Person}(gt:order);

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