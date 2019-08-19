## Generics in Bee

Bee has generic rules and generic classes. The notation for both is very similar and consistent. You declare a generic rule when you act upon native or primitive data. You can declare a generic class to create a customized collection that can hold a specific data type.

* [Generic rules](#generic_rules)
* [Generic Classes](#generic_classes)

## Generic Rules

A generic rule is using one or more "type" parameters. 

**pattern:**
```
rule name{Name ∈ Type,...}(param ∈ Name) => (result ∈ Name):
   alter result := expression(param);
return;
```

**note:** 
* Type can be any known type or sub-type;
* Name is "first class" value of type: _Type_;

### Anonymous Expression

Anonymous expression is like lambda expression except it does not have a name:

**anonymous expression**
```
(param ∈ type_name, ,...) => (expression)
```

This notation can be used to create an arguments of type expression, declared with "∈" like:

**signature**
```
rule foo(exp(type,type, ...) ∈ type);
   ... 
   ** you can use the  exp
   make r := exp(param,...);
   print r;
return;
```

Call rule "foo" with anonymous rule as argument by name:

```
apply foo(exp:(param ,param ...) => (expression));
```

### Bubble sort

In this example, _bubble_ is a generic rule:

```** this sort is generic 
rule bubble{TT ∈ Type}(array ∈ [TT], gt(TT,TT) ∈ L):
  make n := length(array) ∈ N; 
  make swap := True ∈ L;
  make temp ∈ TT;
  make i ∈ N;
  while swap do
    alter i := 0;
    alter swap := False;
    while (i < n-1) do
      ** this pair is out of order ?
      when gt(array[i], array[i+1]) do
        ** swap pair and set swap flag = true
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

```** define object type to be sorted
type Person: { name ∈ String, age ∈ N } <: Object;
** define order as lambda expression for type Person
make order := ( p1, p2 ∈ Person) ∈ L => (p1.name > p2.name);
** define sort rule for Person, as a clone from _bubble_
make sort := bubble{Person};
** define clients and suppliers
make clients   ∈ [Person](100);
make suppliers ∈ [Person](10);
** populate clients and suppliers somehow
...
** use new order action to sort clients and suppliers
apply sort(clients, gt:order);
apply sort(suppliers, gt:order);
```

## Generic Classes

A class can receive type as parameters. This allows to create generic algorithms for different data types. A similar effect can be created using variant parameters. The difference is at compile time the generic types create more efficient code.

**declare:**
```
class {Generic_Type:Default_Type,...} Generic_Name(self: Null, param ∈ Generic_Type,...) <: Base_Class:
  ** declarations
  ...
create
  ** constructor
  ...
return;
```

**usage:**
Generic class is used to define a subtype then you can declare one or more objects using alias type:

```
** declare new alias type from generic
type new_type: Generic_Class{Generic_Type:Type_Name};

** create new object: using new alias with arguments
make object_name :=  new_type(param:value,...);

** alternative: create new object directly from generic type
make onject_name := generic_class{Type_Name}(param:value,...);

```

**Read next:** [overview](./syntax/overview.md)