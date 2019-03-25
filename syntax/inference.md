# Type inference

Type inference is a logical deduction of type from constant literals.

## Default type
Each literal has a "default" type that is automatic assigned for specific notation.

```
-- character expressions
value c := `a`;        -- type = A (capacity = 1)
value s := 'str';      -- type = S (capacity = 255)
value b := "Unicode";  -- type = U (Unicode capacity)

-- numeric expressions
value i := 0;   -- type := Z
value j := 0.5; -- type := R

-- logic expressions
value false := $⊥; -- type L
value true  := $⊤; -- type L

-- multiple variables
value x,y,z := 5;   -- type := Z

-- combination of types
value n := 0, m := 0.5 -- types Z and R
```

## Composite inference

Composite structures are using () [] and {} to create different types:

```
-- create one list of integers
value t := (1,2); 

-- create one list of ASCII chars
value l := ('a','b');

-- create an Array with capacity of 4
value d := [1,2,3,4];

-- create an Array with capacity of 10
-- all elements initialized with 0.0
value e := [0.0](10);

-- create a data set of integer
value s := {1,2,3,4};

-- create a hash map
value c := {(1:"storage"),(2:"string")};

-- create a complex data structure
value  b := {name:'Goliath', age:'30'};

```

## Inference for Parameters
When we define parameters we can use type inference for: 

**Optional Parameters:**

In next rule foo, parameters a, b are optional.

```
-- result type is missing
rule foo λ (a:0, b:0) => ( a + b ); 

print foo();   -- 0
print foo(1);  -- 1
print foo(1,2);-- 3
```

**Multiple parameters:**

Parameters: a, b are mandatory, c is optional.

```
rule foo(a,b ∈ Z, c:0 ) ∈ Z => (a+b+c);

print foo(1,2);   -- 3
print foo(1,2,3); -- 6
print foo(1);     -- Error: Expected 2 arguments, 1 is value!

print;
```

**Pass arguments by name:**

We can use parameter name and pair-up ":" symbol for argument value.

```
-- fn with optional parameters
-- result type is missing
rule bar λ (a,b,c:0) => (a+b+c);

-- observe we use pair-up to new value to argument
print bar(a:1); -- print 1 because (b,c := 0) 
print bar(b:1); -- print 1 because (a,b := 0) 
print bar(c:1); -- print 1 because (a,b := 0) 

print;
```

**Read next:** [standard.md](standard.md)