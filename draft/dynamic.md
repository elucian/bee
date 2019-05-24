## Forward declaration

Declare rule signatures before it is used

```
rule plus(Z,Z) ∈ Z;

-- execute before implementation
print plus(1,1);

print;

-- later implement the rule
rule plus(a,b ∈ Z) => (r @ Z):
  alter r := (a + b);
return;

over.
```

## Expression signature

Expression signature is a type declaration;

```
type CMP(Z,Z) ∈ L;

-- instantiate 3 expression rules like "CMP"
rule gt(x, y ∈ Z) ∈ L => (x > y);
rule lt(x, y ∈ Z) ∈ L => (x < y);
rule eq(x, y ∈ Z) ∈ L => (x = y);

-- define a dictionary of rules
type Dic <: {(String(2) : CMP)};
 
-- define a hash map of expressions
make dic := {('gt':gt),('lt':lt),('eq':eq)} ∈ Dic;

-- call 3 rules in very unusual way
print dic['gt'](3,1); -- 1
print dic['lt'](3,1); -- 0
print dic['eq'](3,1); -- 0

over.
```
