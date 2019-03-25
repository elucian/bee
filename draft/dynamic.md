## Forward declaration

Declare function signature before they are used

```
aspect ex(Z,Z) ∈ L; 

-- execute before implementation
print ex(1,1);  
print;

-- later implement the function
aspect ex := (a,b ∈ Z) => (r ∈ Z):
  (a + b);
aspect;  

over;
```

## Expression signature

Expression signature is a type declaration;

```
rule CMP λ (Z,Z) ∈ L;

-- instantiate 3 functions like "CMP"
rule gt := (x, y ∈ Z) ∈ L => (x > y);
rule lt := (x, y ∈ Z) ∈ L => (x < y);
rule eq := (x, y ∈ Z) ∈ L => (x = y);

-- define a dictionary of λ expressions
type DIC <: {(U : CMP)}
 
-- define a hash map of expressions
value dic := {("gt":gt),("lt":lt),("eq":eq)} ∈ DIC;

print dic["gt"](3,1) -- expect $⊤
print dic["lt"](3,1) -- expect $⊥
print dic["eq"](3,1) -- expect $⊥

over;
```
