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

Type   | Signature                 | Description
-------|---------------------------|-------------------------------------------------
P      | R[0..+]                   | Positive number representing distance or length
V      | {o ∈ ⊡, d ∈ P}            | 2D vectorial space
H      | {o ∈ ⊡, s ∈ ⌂, α ∈ ∠ }    | Any shape, with origin and rotation
Y      | {c ∈ N, v ∈ [L], m ∈ [H]} | 2D Layer with c = color, m = set of shapes
G      | {o ∈ ⊡, w,h ∈ Z, m ∈ [Y]} | Graphic canvas (with points and shapes)

**legend**
```
w = with
h = height
s = shape
m = members
d = distance
v = visible 
```

## Drawing keywords

Keyword  | Description
---------|-----------------------------------
draw     | draw anything that is not a dot
plot     | place a dot
show     | show canvas
hide     | hide canvas
wait     | wait a number of seconds
erase    | remove a drawing shape
scrub    | remove all drawings from a layer
