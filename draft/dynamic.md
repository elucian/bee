## Forward declaration

Declare rule signatures before it is used

```
rule plus(Z,Z) ∈ Z; 

-- execute before implementation
print plus(1,1);  
print;

-- later implement the rule
rule plus(a,b ∈ Z) => (r ∈ Z):
  alter r := (a + b);
rule;  

over;
```

## Expression signature

Expression signature is a type declaration;

```
type CMP @ (Z,Z) ∈ L;

-- instantiate 3 rules like "CMP"
rule gt(x, y ∈ Z) => (x > y) ∈ L;
rule lt(x, y ∈ Z) => (x < y) ∈ L;
rule eq(x, y ∈ Z) => (x = y) ∈ L;

-- define a dictionary of rules
type DIC <: {(U:CMP)}
 
-- define a hash map of expressions
make dic := {("gt"::gt),("lt"::lt),("eq"::eq)} ∈ DIC;

print dic["gt"](3,1) -- expect $T
print dic["lt"](3,1) -- expect $F
print dic["eq"](3,1) -- expect $F

over;
```
