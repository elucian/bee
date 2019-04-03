# Type inference

Type inference is a logical deduction of type from constant literals.

## Default type
Each literal has a "default" type that is automatic assigned for specific notation.

```
-- character expressions
make c := `a`;        -- type = A (capacity = 1)
make s := 'str';      -- type = S (capacity = 255)
make b := "Unicode";  -- type = U (Unicode capacity)

-- numeric expressions
make i := 0;   -- type := Z
make j := 0.5; -- type := R

-- define synonims for logic constants
define false := $F; -- type L = 0
define true  := $T; -- type L = 1

-- multiple variables
make x,y,z := 5;   -- type := Z

-- combination of types
make n := 0, m := 0.5 -- types Z and R
```

## Composite inference

Composite structures are using () [] and {} to create different types:

```
-- create one list of integers
make t := (1,2); 

-- create one list of ASCII chars
make l := ('a','b');

-- create an Array with capacity of 4
make d := [1,2,3,4];

-- create an Array with capacity of 10
-- all elements initialized with 0.0
make e := [0.0](10);

-- create a data set of integer
make s := {1,2,3,4};

-- create a hash map
make c := {(1:"storage"),(2:"string")};

-- create a complex data structure
make  b := {name:'Goliath', age:'30'};

```

## Inference for Parameters
When we define parameters we can use type inference for: 

**Optional Parameters:**

In rule foo, parameters a, b are optional.

```
-- result type is missing
rule foo(a,b:0) => ( a + b ) ∈ Z; 
                                  
print foo();   -- 0               
print foo(1);  -- 1
print foo(1,2);-- 3
```

**Multiple parameters:**

Parameters: a, b are mandatory, c is optional.

```
rule foo(a,b ∈ Z, c:0 ) => (a+b+c) ∈ Z;

print foo(1,2);   -- 3
print foo(1,2,3); -- 6
print foo(1);     -- Error: Expected 2 arguments, 1 is value!

```

**Pass arguments by name:**

We can use parameter name and pair-up ":" symbol for argument value.

```
-- fn with optional parameters
-- result type is missing
rule bar(a,b,c:0) => (a+b+c) ∈ Z;

-- observe we use pair-up to new value to argument
print bar(a:1); -- print 1 because (b,c := 0) 
print bar(b:1); -- print 1 because (a,b := 0) 
print bar(c:1); -- print 1 because (a,b := 0) 

```

## Multiply "*"

Using "*" we can create smarter literals that are repeating one value.

```
-- create a vector of 10 integers
make a *= 0 ∈ [Z](10);

-- equivalent of previous declaration
make a := [0 * 10];
```

```
-- create string of 10 spaces
make s *= ' ' ∈ S(10);

-- equivalent of previous declaration
make s := ' ' * 10;
```

**Read next:** [standard.md](standard.md)