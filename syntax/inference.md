# Type inference

Type inference is a logical deduction of type from constant literals.

## Default type
Each literal has a "default" type that is automatic assigned for specific notation.

## Type Bound

Operator ":=" can be used to define native variables using type inference.

**Defaults:**
```
-- character expressions
new c := `a`;        -- type = A (capacity = 1)
new s := 'str';      -- type = S (capacity = 255)
new b := "Unlimited";-- type = U (unlimited capacity)

-- numeric expressions
new i := 0;   -- type := Z
new j := 0.5; -- type := R

-- logic expressions
new false := $⊥; -- type L
new true  := $⊤; -- type L

-- multiple variables
new x,y,z := 5;   -- type := Z

-- combination of types
new n := 0, m := 0.5 -- types Z and R
```

## Composite inference

Composite structures are using () [] and {} to create different types:

```
-- create one list of integers
new t := (1,2); 

-- create one list of ASCII chars
new l := ('a','b');

-- create an Array with capacity of 4
new d := [1,2,3,4];

-- create an Array with capacity of 10
-- all elements initialized with 0.0
new e := [0.0](10);

-- create a data set
new s := {1,2,3,4};

-- create a hash map
new c := {(1:"storage"),(2:"string")};

-- create a data structure
new b := {name:'Goliath', age:'30'};

```

## Inference for Parameters
When we define parameters we can use type inference for: 

**Optional Parameters:**

In next function foo, parameters a, b are optional.

```
-- result type is missing
new foo λ (a:0, b:0) => ( a + b ); 

put foo();   -- 0
put foo(1);  -- 1
put foo(1,2);-- 3
```

**Multiple parameters:**

Parameters: a, b are mandatory, c is optional.

```
foo(a,b ∈ Z, c : 0 ) ∈ Z => (a+b+c);

put foo(1,2);   -- 3
put foo(1,2,3); -- 6
put foo(1);     -- Error: Expected 2 arguments, 1 is given!

write;
```

**Pass arguments by name:**

We can use parameter name and pair-up ":" symbol for argument value.

```
-- fn with optional parameters
-- result type is missing
new bar λ (a,b,c:0) => (a+b+c);

-- observe we use pair-up to give value to argument
put bar(a:1); -- print 1 because (b,c := 0) 
put bar(b:1); -- print 1 because (a,b := 0) 
put bar(c:1); -- print 1 because (a,b := 0) 

write;
```

**Read next:** [standard.md](standard.md)