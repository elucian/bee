## Forward declaration

Declare relation signatures before they are used

```
relation plus(Z,Z) ∈ Z; 

-- execute before implementation
print plus(1,1);  
print;

-- later implement the relation
relation plus(a,b ∈ Z) => (r ∈ Z):
  alter r := (a + b);
relation;  

over;
```

## Expression signature

Expression signature is a type declaration;

```
type CMP @ (Z,Z) ∈ L;

-- instantiate 3 functions like "CMP"
function gt(x, y ∈ Z) => (x > y) ∈ L;
function lt(x, y ∈ Z) => (x < y) ∈ L;
function eq(x, y ∈ Z) => (x = y) ∈ L;

-- define a dictionary of functions
type DIC <: {(U:CMP)}
 
-- define a hash map of expressions
make dic := {("gt"::gt),("lt"::lt),("eq"::eq)} ∈ DIC;

print dic["gt"](3,1) -- expect $T
print dic["lt"](3,1) -- expect $F
print dic["eq"](3,1) -- expect $F

over;
```
