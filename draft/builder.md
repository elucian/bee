** Builders

* [set builders](#set-builders)
* [hash builders](#hash-builders)
* [logic qualifiers](#logic-qualifiers)

## Set Builders

A set builder is a declarative structure used to produce a sub-set from a set.

**syntax**
```** simple
make set_name := { x | x ∈ source};
## more complex
make set_name := { map(x) | x ∈ source ∧ condition(x)};
** two arguments from (Cartesian Product)
make set_name := { map(x,y) | (x,y) ∈ DS × DS};
```

**legend**

* map       ::= rule or expression
* source    ::= set, list, domain
* condition ::= rule or logic expression
* DS        ::= data source: domain or list

**example:**
```
make test1, test2 ∈ {Z};
** copy source elements
alter test1 := { x  | x ∈ (1..3)};
alter test2 := { x² | x ∈ (1..3)};
** expected result
fail if test1 ≠ {1,2,3};
fail if test2 ≠ {1,4,9};
```

## Hash Builder

A set builder can create also a hash map with two methods:

**syntax**

```
make map_name := { (key:map(key)) | (key ∈ source) ∧ condition(key)}
```

* source ::= a collection or domain of values
* key    ::= a value member from source
* map()  ::= rule or expression that produce value for key
* condition() ::= a logical expression or logical rule

## Logic Qualifiers

Logic quantification verify a domain to satisfy a condition. The two most common quantifiers are: "all" and "exists". 

**symbols:**
* Universal quantifier "all" is ∀, a rotated letter A 
* Existential quantifier "exists" is ∃, a rotated letter E 

Qualifiers can be used as logical expressions in statements: { when, if, while etc. }.

**example:**
```
** create a set of bit-masks
make here := {0b10011,0b10001,0b11101};
make verify ∈ L; //logical flag

** verify if any mask element has second bit from the end
alter verify := ∃(x ∈ here) ∧ (x ⊕ 0b10 ≡ x);

** verify if all elements in Here have first bit from the end
alter verify := ∀(x ∈ here) ∧ (x ⊕ 0b01 ≡ x);
```

**syntax:**
```
∃ (x ∈ DS) ∧ condition(x);
∀ (x ∈ DS) ∧ condition(x);
```

**See also:** 

* [Set Builder Notation](https://en.wikipedia.org/wiki/Set-builder_notation)
* [Qualifier Notation](https://en.wikipedia.org/wiki/Quantifier_(logic))

