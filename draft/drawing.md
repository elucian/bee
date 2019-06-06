## Bee Graphic

We define new data types and keywords to make dynamic 2D technical drawings:

## Constants

 symbol | value
--------|-------------------------------------------
 π      | 3.14
 ⊥      | π/2
 
## Data types

Each graphic element is a composite data type.

 Type  | Name     | Description
-------|----------|---------------------------------
  ∠    | Angle    | [0..2·π] 
  ⊡    | Cartesian| {x, y ∈ R}
  ⊙    | Polar    | {r ∈ P, α ∈ ∠ }  
  ↗    | Vector   | {o, p ∈ ⊡}  
  ↺    | Relative | {o ∈ ⊡, r ∈ P, α ∈ ∠ }    
  ○    | Circle   | {o ∈ ⊡, r ∈ P}  
  ◷    | Arc      | {o ∈ ⊡, r ∈ P, α,β ∈ ∠ }
  □    | Square   | {o ∈ ⊡, b ∈ P}
  ◁    | Triangle | {o ∈ ⊡, b ∈ P, α,β,ɣ ∈ ∠}
  ◇    | Diamond  | {o ∈ ⊡, α,β ∈ ∠} 
  ⎊    | Regular  | {o ∈ ⊡, r, n ∈ P}
  ⌂    | Shape    | {o ∈ ⊡, s ∈ [⊡]}
  ◪    | Fill     | { ■, ▤, ▥, ▦, ▧, ▨, ▩ } 

Type   | Signature                    | Description
-------|------------------------------|-------------------------------------------------
gC     | {o ∈ ⊡, w,h ∈ Z, m ∈ [gL]}   | Graphic  canvas (with points and shapes)
gL     | {c ∈ N, v ∈ L, m ∈ [gH]}     | Graphic  layer with c = color, m = set of shapes
gH     | {o ∈ ⊡, s ∈ ⌂, α ∈ ∠ }       | Graphhic shape, with origin and rotation
gT     | {o ∈ ⊡, t ∈ S, α, β ∈ ∠}     | Graphic  Text with rotation

**legend**
```
w = width
h = height
s = shape
m = members
d = distance
v = visible 
```

## Drawing keywords

Keyword  | Description
---------|-----------------------------------
draw     | put something on a layer
show     | show canvas
hide     | hide canvas
erase    | remove a drawing shape
scrub    | remove all drawings from a layer
