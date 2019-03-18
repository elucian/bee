## Generic Methods

A generic method is using a variable type "X". 

**generic sort**

```
sort<X>(array @ [X], cmp @ (X,X) :L ):
  ...
sort;
```

**Notes:**

* Method "sort" receive type X using markup <X> 
* Function reference "cmp" is received as argument.

**sort usage**

```
def Person  <: { name ε S, age ε N };

-- define order method for array of Persons
order(cat @ [Person]):
  sort<S>(cat, cmp::(a, b) => (a.name ≤ b.name));
order;

-- define clients and suppliers
new clients   := [Person](100);
new suppliers := [Person](10);
-- populate somehow
...

-- use new order method to sort
order(clients);
order(suppliers);
```

## Anonymous functions

This design require anonymous functions and "signature reference."

**syntax**
```
(param, param,...) => (expression)
```

This can be used to accommodate a reference to a "function signature"

**syntax**
```
 identifier @ (type,type, ...):type
```

