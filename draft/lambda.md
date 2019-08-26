## Lambda expressions

A lambda expressions is a named expression with parameters and specified result type:

**syntax**

```
** declaration of Lambda expression
make name := λ(param ∈ Type,...) ∈ ResultType => (expression);
```

```
** you can define a lambda signature first
type SigName: (Type,...) ∈ Type <: Lambda;

** then you can declare a λ variable
make name ∈ SigName; // Null Expression

** then you can modify assign expression to variable
alter name := λ(param ∈ Type,...) ∈ Type => (expression);
```

**Example:** 

```
** define "exp" as Lambda expression
make exp: (x,y ∈ Z) ∈ Z => (x + y);

** "exp" type is created using type inference
print type(exp); //Lambda

** use the lambda expression
make z := 1 + 2 · exp(1,1); 
print  z; //print 5
```

**properties:**

Lambda Expressions...
* are similar to mathematical functions;
* are binding external states in context;
* can be used in other expressions;
* can be used as parameter in rules;
* can be created from a rule as a result;
* can be assigned to a variable of type: Lambda

**restrictions:**
* can have one single result;
* can not be interrupted from execution;
* can not call any rule that is downgraded;
* do not have internal states;
* do not have side-effects;
* do not depend on external states;

**result:**
* result can be primitive or native type but not a collection;
* result can be temporary and can be used in other expressions;

## Lambda signature

Lambda expression signature is a type declaration;

```
** declare a rule signature
type CMP:(Z,Z) ∈ L <: Lambda;

** instantiate 3 Lambda expressions like "CMP"
make gt := (x, y ∈ Z) ∈ L => (x > y);
make lt := (x, y ∈ Z) ∈ L => (x < y);
make eq := (x, y ∈ Z) ∈ L => (x = y);

** define a dictionary of rules
type Dic: {(String(2) : CMP)} <: Hash;
 
** define a hash map of expressions
make dic := {('gt':gt),('lt':lt),('eq':eq)} ∈ Dic;

** call 3 rules in very unusual way
print dic['gt'](3,1); //1
print dic['lt'](3,1); //0
print dic['eq'](3,1); //0

over.
```
