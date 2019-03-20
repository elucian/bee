
** Using function signature
```
def CMP @ (Z,Z) ε L;

-- instantiate 3 functions of type "CMP"
def gt(x, y) => (x > y);
def lt(x, y) => (x < y);
def eq(x, y) => (x = y);

-- stpre 3 fimcto
new dic := {S(2):CMP}

new dic := {"gt"::gt,"lt"::lt,"eq"::eq}

put dic["gt"](3,1) -- expect $1
put dic["lt"](3,1) -- expect $0
put dic["eq"](3,1) -- expect $0

over;
```

** Forward declaration

```
def func @ (Z,Z) ε L; 

-- deferred declaration using same signature
def func(a,b ε Z) ε Z => (a + b);

-- create reference to function func
put func(1,1);     -- execute function reference
write;

over;
```