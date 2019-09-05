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
make s := "str"   ;  //type = S
make b := <Text>  ;  //type = Text
** numeric expressions
make i := 0;    //type = Z
make j := 0.50; //type = R
** define synonyms for logic constants
save false := False; //type L = 0
save true  := True;  //type L = 1
** multiple variables get same value
make (x, y, z) := 5; //type = Z for all

** multiple variables get multiple values
make (int, rea) := (4, 4.44);
print type(int); // Z
print type(rea); // R
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
When we define parameters we can use type inference only for optional parameters: 

**Optional Parameters:**

```** in rule foo, parameters a, b are optional.
rule foo(a: 0, b: 0) => (r ∈ Z):
  alter r := a + b;
rule;  
        
rule main():        
  print foo();    // 0               
  print foo(1);   // 1
  print foo(1,2); // 3
return;  
```

**Multiple parameters:**

```
** parameters: a, b are mandatory, c is optional.
rule foo(a, b ∈ Z, c:0) => (r ∈ Z):
  alter r := (a + b + c);
return;  

rule main():
  print foo(1,2);   // 3
  print foo(1,2,3); // 6
  print foo(1);     // Error: expected 2 arguments
return;  
```

**Pass arguments by name:**

We can use parameter name and pair-up ":" symbol for argument value.

```** rule with optional parameters (Z)rule bar(a:0, b:0, c:0 ∈ Z) => (result ∈ Z):
  alter result := (a+b+c);
return;  
** observe we use pair-up ":" to give value for each argument
rule main():
  print bar(a:1); //print 1 because (b,c := 0) 
  print bar(b:1); //print 1 because (a,b := 0) 
  print bar(c:1); //print 1 because (a,b := 0) 
return;  
```

**Read next:** [Data Processing](processing.md)