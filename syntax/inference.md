** Type inference

Type inference is a logical deduction of type from constant literals.

**bookmarks**
* [Default](#Default)
* [Composite](#Composite)
* [Parameters](#Parameters)
* [Multiply](#Multiply)

## Default
Each literal has associated a default type.

```** character expressions
make c := `a`;    !type = A
make s := '∈';    !type = U
make s := 'str'   !type = S
make b := "Text"; !type = X
** numeric expressions
make i := 0;   !type := Z
make j := 0.5; !type := R
** define synonyms for logic constants
make false :: False; !type L = 0
make true  :: True; !type L = 1
** multiple variables
make x,y,z := 5; !type := Z
** combination of types
make n := 0, m := 0.5; !types Z and R
```

## Composite

Composite structures are using () [] and {} to create different types:

```** create one list of integers
make t := (1,2); 
** create one list of symbols
make l := ('a','b');
** create an Array with capacity of 4 integers
make d := [1,2,3,4];
** create an Array with capacity of 10 real numbers
make e := [0.0](10);
** create a data set of integers
make s := {1,2,3,4};
** create a hash map of (Z:U)
make c := {(1:"storage"),(2:"string")};
** create an object with two attributes
make  b := {name:'Goliath', age:30};

```

## Parameters
When we define parameters we can use type inference for: 

**Optional Parameters:**

In rule foo, parameters a, b are optional.

```** result type is Z
rule foo(a,b: 0) ∈ Z => (a + b);
                                  
print foo(); !0               
print foo(1); !1
print foo(1,2); !3
```

**Multiple parameters:**

Parameters: a, b are mandatory, c is optional.

```
make foo := (a,b ∈ Z, c: 0) ∈ Z => (a+b+c);

print foo(1,2); !3
print foo(1,2,3); !6
print foo(1); !Error: expected 2 arguments

```

**Pass arguments by name:**

We can use parameter name and pair-up ":" symbol for argument value.

```** fn with optional parameters** result type is missing
make bar := (a,b,c:0) ∈ Z => (a+b+c);
** observe we use pair-up to new value to argument
print bar(a:1); !print 1 because (b,c := 0) 
print bar(b:1); !print 1 because (a,b := 0) 
print bar(c:1); !print 1 because (a,b := 0) 
```

## Replication

Replication operator: "*" will concatenate a string with itself multiple times:

```** create string of 10 spaces
make s := ' ' ∈ S(10);
** equivalent with previous
make s := ' ' * 10;
```

**Examples:**
```** make a string from pattern 01
make  a := '01' * 4;
print a; ! 01010101;

** used in expression will generate string
make  b := (a & ' ') * 4;
print b; ! 01010101 01010101 01010101 01010101
```

**Read next:** [Data Processing](processing.md)