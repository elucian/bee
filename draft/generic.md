## Generics in Bee

Bee has generic rules and generic classes. The notation for both is very similar and consistent. You declare a generic rule when you act upon native or primitive data. You can declare a generic class to create a customized collection that can hold a specific data type.

* [Generic rules](#generic_rules)
* [Generic Classes](#generic_classes)

## Generic Rules

A generic rule is using one or more "type" parameters. 

**pattern:**
```
rule name{TypeName,...}(param ∈ TypeName) => (result ∈ TypeName):
   alter result := expression(param);
return;
```

**note:** 
* TypeName can be any known type or sub-type;
* TypeName is first class value having type: _Type_;

### Variable rule

You can define rule signature and later create a _variable rule_.

**syntax**
```
type VariableRule: (Z,Z,...) => Z;
```

This notation can be used to create an arguments of type expression, declared with "∈" like:

**parameter**

```
** Using a rule as input parameter
rule foo(my_rule ∈ VariableRule, a, b ∈ Z) => (r ∈ Z):
   make r := my_rule(a,b); //call my_rule 
return;
```

Call rule "foo" with other rule as argument:

```
** making a rule that look like VariableRule
rule test(a, b ∈ TypeName) => (a + b);

** call rule foo with "test" as argument
print foo(my_rule:test, a:10, b:10); //20
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
type Person: { name ∈ S, age ∈ N } <: Object;
** define order rule for type Person
rule order(p1, p2 ∈ Person) ∈ L => (p1.name > p2.name);
** define a clone of bubble rule, called: "sort", specific to Person
rule sort := bubble{Person};
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
class {Generic_Type} Generic_Name(param ∈ Generic_Type,...) <: Base_Class:
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
** declare new type from generic
type New_Type: Generic_Class{Type_Name};

** create new object: using new alias with arguments
make object_name :=  Tew_Type(param:value,...);

** alternative: create new object directly from generic type
make onject_name := Generic_Class{Type_Name}(param:value,...);
```

**alternative:**
```
** create new object directly from generic type
make onject_name := Generic_Class{Type_Name}(param:value,...);
```

**Read next:** [overview](./syntax/overview.md)