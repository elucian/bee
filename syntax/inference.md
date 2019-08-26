## Type inference

Type inference is a logical deduction of data type from constant literals.

**bookmarks**
* [Default](#Default)
* [Composite](#Composite)
* [Parameters](#Parameters)

## Default
Each literal has associated a default type, induced by operators {":=", "::", ":"}.

```** string expressions
make c := 'a'     ;  //type = A
make s := '∈'     ;  //type = U
make s := "str"   ;  //type = String
make b := <Text>  ;  //type = Text
** numeric expressions
make i := 0;    //type = Z
make j := 0.50; //type = R
** define synonyms for logic constants
save false := False; //type L = 0
save true  := True;  //type L = 1
** multiple variables get same value
make x, y, z := 5; //type = Z

** multiple variables get multiple values
make int, rea := 4, 4.44;
print type(int); // Z
print type(rea); // R
```

**Notes:** 
* Type inference is triggered by operator ":=", or "::"

**Restriction:**

You can nod use two operators ":=" in a single line:

```
make n := 0, m := 0.5; //ERROR
```

## Composite

Composite structures are using () [] and {} to create different types:

```
** boxed integer (type = Z)
make i := [10]; //array of one value!

** list of one value (Z)
make a := (1,); 
** list of integers (Z)
make b := (1,2); 
** list of symbols (type = A)
make l := ('a','b');

** list of Unicode symbol (type = U)
make u := ('Δ', 'Λ', 'Γ');
** array with capacity of 4 integers: Z
make d := [1,2,3,4];
** array with capacity of 10 real numbers: R
make e := [0.00](10);
** data set of 4 integers: Z
make s := {1,2,3,4};
** hash map of (Z: String)
make c := {(1:"storage"),(2:"string")};
** object with two attributes: name ∈ String, age ∈ Z 
make  b := {name:"Goliath", age:30};

```

## Parameters
When we define parameters we can not use type inference: 

**Optional Parameters:**

In rule foo, parameters a, b are optional.

```** result type is Z
rule foo(a: 0, b: 0 ∈ Z) ∈ Z => (a + b);
                                  
print foo();    // 0               
print foo(1);   // 1
print foo(1,2); // 3
```

**Multiple parameters:**

Parameters: a, b are mandatory, c is optional.

```
make foo: (a,b,c:0 ∈ Z) ∈ Z => (a + b + c);

print foo(1,2);   // 3
print foo(1,2,3); // 6
print foo(1);     //Error: expected 2 arguments

```

**Pass arguments by name:**

We can use parameter name and pair-up ":" symbol for argument value.

```** fn with optional parameters (Z)make bar: (a:0, b:0, c:0 ∈ Z) ∈ Z => (a+b+c);
** observe we use pair-up to new value to argument
print bar(a:1); //print 1 because (b,c := 0) 
print bar(b:1); //print 1 because (a,b := 0) 
print bar(c:1); //print 1 because (a,b := 0) 
```

**Read next:** [Data Processing](processing.md)