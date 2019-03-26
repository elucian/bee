## Forward declaration

Declare function signature before they are used

```
define ex(Z,Z) ∈ L; 

-- execute before implementation
print ex(1,1);  
print;

-- later implement the function
define ex(a,b ∈ Z) => (r ∈ Z):
  (a + b);
define;  

over;
```

## Expression signature

Expression signature is a define declaration;

```
define CMP λ (Z,Z) ∈ L;

-- instantiate 3 functions like "CMP"
define gt λ (x, y ∈ Z) ∈ L => (x > y);
define lt λ (x, y ∈ Z) ∈ L => (x < y);
define eq λ (x, y ∈ Z) ∈ L => (x = y);

-- define a dictionary of λ expressions
define DIC <: {(U : CMP)}
 
-- define a hash map of expressions
create dic := {("gt":gt),("lt":lt),("eq":eq)} ∈ DIC;

print dic["gt"](3,1) -- expect $T
print dic["lt"](3,1) -- expect $F
print dic["eq"](3,1) -- expect $F

over;
```
