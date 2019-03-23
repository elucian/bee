## Forward declaration

Declare function signature before they are used

```
def ex(Z,Z) ε L; 

-- execute before implementation
put ex(1,1);  
write;

-- later implement the function
def ex := (a,b ε Z) => (r ε Z):
  (a + b);
def;  

over;
```

## Expression signature

Expression signature is a type declaration;

```
def CMP λ (Z,Z) ε L;

-- instantiate 3 functions like "CMP"
new gt := (x, y ε Z) ε L => (x > y);
new lt := (x, y ε Z) ε L => (x < y);
new eq := (x, y ε Z) ε L => (x = y);

-- define a dictionary of λ expressions
def DIC <: {(U : CMP)}
 
-- define a hash map of expressions
new dic := {("gt":gt),("lt":lt),("eq":eq)} ε DIC;

put dic["gt"](3,1) -- expect $1
put dic["lt"](3,1) -- expect $0
put dic["eq"](3,1) -- expect $0

over;
```
