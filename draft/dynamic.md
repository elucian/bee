## Forward declaration

Declare rule signatures before it is used

```
rule plus(Z,Z) ∈ Z;
** execute before implementation
print plus(1,1);

print;
** later implement the rule
rule plus(a,b ∈ Z) => (r ∈ Z):
  alter r := (a + b);
return;

over.
```

## Lambda Expression

Lambda expression signature is a type declaration;

```** declare a rule signature
type CMP: (Z,Z) ∈ L <: Lambda;
** instantiate 3 Lambda expressions like "CMP"
make gt := (x, y ∈ Z) ∈ L => (x > y) like CMP;
make lt := (x, y ∈ Z) ∈ L => (x < y) like CMP;
make eq := (x, y ∈ Z) ∈ L => (x ≡ y) like CMP;
** define a dictionary of rules
type Dic: {(S(2) : CMP)} <: Hash;
 ** define a hash map of expressions
make dic := {('gt':gt),('lt':lt),('eq':eq)} ∈ Dic;
** call 3 rules in very unusual way
print dic['gt'](3,1); //1
print dic['lt'](3,1); //0
print dic['eq'](3,1); //0

over.
```
