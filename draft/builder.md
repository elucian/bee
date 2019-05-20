## Set Builders

A set builder is a declarative structure used to create a sub-set from a set of elements.

**syntax**
```
-- simple
make set_name := { element ∀ element ∈ source};

-- more complex
make set_name := { func(element) ∀ element ∈ source ∧ filter };
```

**legend**

* func = rule(element) or expression
* key  = new key in hash map pair
* source = collection or range
* filter = logic expression

**example**
```
make source := [1,2,1,2,3]
make test1, test2 ∈ {Z}

-- copy source elements
alter test1 := { x  ∀ x ∈ source}
alter test2 := { x² ∀ x ∈ source}

-- expected result
print test1; -- {1,2,3}
print test2; -- {1,4,9}
```

## Hash Map

A set builder can create also a hash map:

**syntax**

```
make map_name := { (key : func(key)) ∀ key ∈ source ∧ filter }
```

* key ::= a value member from source
* source ::= a collection or range of values
* filter ::= a conditional expression



