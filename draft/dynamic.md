## Forward declaration

Declare rule signature before they are used

```
rule ex(Z,Z) ∈ L; 

-- execute before implementation
print ex(1,1);  
print;

-- later implement the rule
rule ex(a,b ∈ Z) => (r ∈ Z):
  (a + b);
rule;  

over;
```

## Expression signature

Expression signature is a type declaration;

```
type CMP(Z,Z) ∈ L;

-- instantiate 3 rules like "CMP"
rule gt(x, y ∈ Z) => (x > y) ∈ L;
rule lt(x, y ∈ Z) => (x < y) ∈ L;
rule eq(x, y ∈ Z) => (x = y) ∈ L;

-- define a dictionary of λ expressions
type DIC <: {(U:CMP)}
 
-- define a hash map of expressions
make dic := {("gt":gt),("lt":lt),("eq":eq)} ∈ DIC;

print dic["gt"](3,1) -- expect $T
print dic["lt"](3,1) -- expect $F
print dic["eq"](3,1) -- expect $F

over;
```
