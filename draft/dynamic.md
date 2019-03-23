## Forward declaration

Declare function signature before they are used

```
def ex(Z,Z) ∈ L; 

-- execute before implementation
put ex(1,1);  
write;

-- later implement the function
def ex := (a,b ∈ Z) => (r ∈ Z):
  (a + b);
def;  

over;
```

## Expression signature

Expression signature is a type declaration;

```
def CMP λ (Z,Z) ∈ L;

-- instantiate 3 functions like "CMP"
new gt := (x, y ∈ Z) ∈ L => (x > y);
new lt := (x, y ∈ Z) ∈ L => (x < y);
new eq := (x, y ∈ Z) ∈ L => (x = y);

-- define a dictionary of λ expressions
def DIC <: {(U : CMP)}
 
-- define a hash map of expressions
new dic := {("gt":gt),("lt":lt),("eq":eq)} ∈ DIC;

put dic["gt"](3,1) -- expect $⊤
put dic["lt"](3,1) -- expect $⊥
put dic["eq"](3,1) -- expect $⊥

over;
```
