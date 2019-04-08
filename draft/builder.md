## Set Builders

A set builder is a declarative structure used to create a sub-set from a set of elements.

**syntax**
```
make set_name := { f(element) | element @ Source ∧ filter };
make map_name := { (key: expression) | key @ Source ∧ filter };

```

**legend**

* f = rule or rule
* source = collection or range
* filter = logic expression
* expression = rule or rule dependent upon key

**example**
```
make source := [1,2,1,2,3];
make test @ {Z};

-- copy source elements
alter test := {x | x @ Source};

-- expected result
print test ; -- {1,2,3}
```

**Note:**

A set builder can create also a hash map.
