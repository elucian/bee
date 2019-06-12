## Bee Graphic

We define new data types and keywords to make dynamic 2D technical drawings:

## Constants

 symbol | value
--------|-------------------------------------------
 π      | 3.14
 ⊥      | π/2
 ǁ      | 2·π
 
## Graphic types

Type   | Name    | Signature                    | Description
-------|---------|------------------------------|-------------------------------------------------
  V    | Canvas  | {o ∈ ⊡, w,h ∈ Z, m ∈ [Y]}    | Canvas (with points and shapes)
  Y    | Layer   | {c ∈ B, v ∈ L,   m ∈ [H]}    | Layer with c = color, m = set of shapes
  H    | Shape   | {o ∈ ⊡, s ∈ ⌂, α ∈ ∠ }       | Shape, with origin and rotation
  G    | Tag     | {o ∈ ⊡, t ∈ S, α, β ∈ ∠}     | Graphic label with rotation

**legend**
```
w = width
h = height
s = shape
m = members
d = distance
v = visible 
```

## Drawing Elements

Each graphic element is a composite data type.

 Type  | Name     | Description
-------|----------|---------------------------------
  ∠    | Angle    | [0..2·π] 
  ⊡    | Cartesian| {x, y ∈ Q}
  ⊙    | Polar    | {r ∈ P, α ∈ ∠ }  
  ↗    | Vector   | {o, p ∈ ⊡}  
  ↺    | Relative | {o ∈ ⊡, r ∈ P, α ∈ ∠ }    
  ○    | Circle   | {o ∈ ⊡, r ∈ P}  
  ◷    | Arc      | {o ∈ ⊡, r ∈ P, α,β ∈ ∠ }
  □    | Square   | {o ∈ ⊡, b ∈ P}
  ◁    | Triangle | {o ∈ ⊡, b ∈ P, α,β,ɣ ∈ ∠}
  ◇    | Diamond  | {o ∈ ⊡, α,β ∈ ∠} 
  ⎊    | Regular  | {o ∈ ⊡, r, n ∈ P}
  ⌂    | Polygon  | {o ∈ ⊡, c ∈ [⊡]}
  ◪    | Fill     | { ■, ▤, ▥, ▦, ▧, ▨, ▩ } 
  
**Note:**
* We use default rational numbers Q = Rational for grid precision
* We use P = positive numbers for dimensions and distances

## Drawing keywords

Keyword  | Description
---------|-----------------------------------
draw     | put something on a layer
wipe     | remove drown shapes
show     | show canvas
hide     | hide canvas


