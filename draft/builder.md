## Set Builders

A set builder is a declarative structure used to create a sub-set from a set of elements.

**syntax**
```
make set_name := { func(element)   : element ∈ source ∧ filter };
make map_name := { (key: func(key)): key ∈ source ∧ filter };

```

**legend**

* func = rule(element) or expression
* key  = new key in hash map pair
* source = collection or range
* filter = logic expression
* expression = rule or rule dependent upon key

**example**
```
make source := [1,2,1,2,3];
make test1, test2 @ {Z};

-- copy source elements
alter test1 := { x | x ∈ Source};
alter test2 := { x²| x ∈ Source};

-- expected result
print test1 ; -- {1,2,3}
print test2 ; -- {1,4,9}
```

**Note:**

A set builder can create also a hash map.
