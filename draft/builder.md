## Cluster Builders

A cluster builder is a declarative structure used to create a sub-set from a set of elements.

**syntax**
```
make set_name := { f(element) | element ∈ source ∧ filter };
make map_name := { (key: expression) | key ∈ source ∧ filter };

```

**legend**

* f = relation or function
* source = collection or range
* filter = logic expression
* expression = function or relation dependent upon key

**example**
```
make source := [1,2,1,2,3];
make test ∈ {Z};

-- copy source elements
alter test := {x | x ∈ source};

-- expected result
print test ; -- {1,2,3}
```

**Note:**

A cluster builder can create also a hash table.
