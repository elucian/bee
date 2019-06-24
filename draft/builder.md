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
make source := [1,2,1,2,3]
make test1, test2 ∈ {Z}
** copy source elements
alter test1 := { x  | x ∈ source}
alter test2 := { x² | x ∈ source}
** expected result
print test1; //{1,2,3}
print test2; //{1,4,9}
```

## Hash Builder

A set builder can create also a hash map with two methods:

**syntax**

```
make map_name := { (k:map(k)) | (k ∈ source) ∧ condition(k)}
make map_name := { (x : y) | (x, y) ∈ (DS × DS) ∧ condition(x,y)}
```

* map(k)    ::= rule or expression
* DS        ::= domain source: A,Z,N ...
* key       ::= a value member from source
* source    ::= a collection or domain of values
* condition ::= a logical expression (filter)

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
alter verify := ∃(x ∈ here) ∧ (x ⊕ 0b10 = x);

** verify if all elements in Here have first bit from the end
alter verify := ∀(x ∈ here) ∧ (x ⊕ 0b01 = x);
```

**syntax:**
```
∃ (x ∈ DS) ∧ condition(x);
∀ (x ∈ DS) ∧ condition(x);
```

**See also:** 

* [Set Builder Notation](https://en.wikipedia.org/wiki/Set-builder_notation)
* [Qualifier Notation](https://en.wikipedia.org/wiki/Quantifier_(logic))

