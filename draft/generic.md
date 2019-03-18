## Generic Methods

A generic method is using a variable type "X". 

**generic sort**

```
sort<X>(array @ [X], func @ (X,X) :L ):
  ...
sort;
```

**Notes:**

* Method "sort" receive type X using markup <X> 
* Function reference "func" is received as argument.

**sort usage**

```
def Person  <: { name ε S, age ε N };

new clients   := [Person](100);
new suppliers := [Person](10);

-- define order method for array of Persons
order(cat @ [Person]):
  sort<S>(cat, func::(a, b) => (a if a ≤ b, b));
order;

...
*******************************************
** populate clients and suppliers somehow
*******************************************
...

-- use new order method to sort
order(clients);
order(suppliers);
```