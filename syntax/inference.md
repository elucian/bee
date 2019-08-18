## Type inference

Type inference is a logical deduction of data type from constant literals.

**bookmarks**
* [Default](#Default)
* [Composite](#Composite)
* [Parameters](#Parameters)
* [Multiply](#Multiply)

## Default
Each literal has associated a default type.

```** string expressions
make c := 'a'     ;  //type = A
make s := '∈'     ;  //type = U
make s := "str"   ;  //type = String
make b := <Text>  ;  //type = Text
** numeric expressions
make i := 0;    //type := i64
make j := 0.50; //type := f64
** define synonyms for logic constants
save false := False; //type L = 0
save true  := True;  //type L = 1
** multiple variables get same value
make x, y, z := 5; //type = i64
** combination of types
make n := 0, m := 0.5; //types i64 and f64
```

**reason:**
* Bee infer largest possible number that can hold the constant
* Is using signed integers to be able to hold also negative numbers
* To have simple design principle (KIS) we do not use suffix for type literals

**Note:** If you do not know what sufix is: 10u could be an unsigned 10 while 10i could be signed 10. We consider this notation too complicated and it may be a burden if you use this in expressions.

## Composite

Composite structures are using () [] and {} to create different types:

```
** boxed integer (type = Z)
make i := [10]; // this notation does not make an array!
** list of integers (i64)
make t := (1,2); 

** list of references (Z)
make t := ([1],[2]); 
** list of symbols (type = A)
make l := ('a','b');

** list of Unicode symbol (type = U)
make l := ('Δ', 'Λ', 'Γ');
** array with capacity of 4 integers: i64
make d := [1,2,3,4];
** array with capacity of 10 float numbers: f64
make e := [0.00](10);
** data set of integers: i64
make s := {1,2,3,4};
** hash map of (i64: String)
make c := {(1:"storage"),(2:"string")};
** object with two attributes
make  b := {name:"Goliath", age:30};

```

## Parameters
When we define parameters we can use type inference for: 

**Optional Parameters:**

In rule foo, parameters a, b are optional.

```** result type is i64
rule foo(a,b: 0) ∈ Z => (a + b);
                                  
print foo();    // 0               
print foo(1);   // 1
print foo(1,2); // 3
```

**Multiple parameters:**

Parameters: a, b are mandatory, c is optional.

```
make foo := (a,b ∈ i64, c: 0) ∈ Z => (a + b + c);

print foo(1,2);   // 3
print foo(1,2,3); // 6
print foo(1);     //Error: expected 2 arguments

```

**Pass arguments by name:**

We can use parameter name and pair-up ":" symbol for argument value.

```** fn with optional parameters (i64)make bar := (a:0, b:0, c:0) ∈ Z => (a+b+c);
** observe we use pair-up to new value to argument
print bar(a:1); //print 1 because (b,c := 0) 
print bar(b:1); //print 1 because (a,b := 0) 
print bar(c:1); //print 1 because (a,b := 0) 
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
make  a := "01" * 4;
print a; //01010101;

** used in expression will generate string
make  b := (a & ' ') * 4;
print b; //01010101 01010101 01010101 01010101
```

**Read next:** [Data Processing](processing.md)