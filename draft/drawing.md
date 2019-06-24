## Bee Graphic

We define new data types and keywords to make dynamic 2D technical drawings:

## Degree

Bee support radians using (π) prefix. Instead of (2 · π) you can write ( 2π )


With Comb Dot: ° 
  30°_30′_30″ 

 symbol | same value in degree
--------|-------------------------------------------
 0      | 0°0′0″ 
 π/4    | 45°
 π/2    | 90°
 π      | 180° 
 2π     | 360°

**Minutes and Seconds:**

Bee is using Unicode symbols prime (′) for minutes and (″) for seconds of arc:

```
make α := 180°   ∈ ∠;
make β := 0°0′0″ ∈ ∠;

pass if α ≈ π;  //α ≠ π
```

**Notes**
* Relation operators can convert the measurement units;
* Operator ± should work with degree, minutes and seconds;

 
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
  ∠    | Angle    | (0 .. 2π) or (0°..360°)
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
  ◪    | Fill     | { ▤, ▥, ▦, ▧, ▨, ▩ } 
  
**Note:**
* We use default rational numbers Q
* We use P = positive numbers for distance

## Drawing keywords

Keyword  | Description
---------|-----------------------------------
draw     | put shape on layer
wipe     | remove drown shapes
show     | show canvas
hide     | hide canvas


