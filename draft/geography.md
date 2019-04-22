## Latitude Longitude

Any location on Earth is described by two numbers: its latitude and its longitude. If a pilot or a ship captain wants to specify position on a map, these are the "coordinates" they would use.

Actually, these are two angles, measured in degrees, "minutes of arc" and "seconds of arc." These are denoted by the symbols ( °,   ',   "  ) e.g. 35° 43' 9" means an angle of 35 degrees, 43 minutes and 9 seconds (do not confuse this with the notation (', ") for feet and inches!). A degree contains 60 minutes of arc and a minute contains 60 seconds of arc--and you may omit the words "of arc" where the context makes it absolutely clear that these are not units of time.

Calculations often represent angles by small letters of the Greek alphabet, and that way latitude will be represented by λ (lambda, Greek L), and longitude by φ (phi, Greek F). Here is how they are defined. 

## Data Types

Geography data types are starting with G prefix and one ptjer uppercase letter.

type Δ <: R[0..+]       = Distance 
type Λ <: R[-180..+180] = Longitude
type Φ <: R[-90..+90]   = Latitude

GL = Geographic Link
GN = Geographic Node
GM = Geographic Map

```
 -- geographic node
 type GN <: {λ ∈ Λ, φ ∈ Φ, ε ∈ Δ}             
 
 -- geographic link
 type GL <: {snode, enode @ GN, shape @ [GN]} 

 -- point of interest
 type PI <: {(id ∈ N: label @ String, lnode @ GN)} 
 
 -- geographic map
 type GM <: {origin @ GN, rotation ∈ ∠, scale ∈ Δ, pint @ [GN], links @ [GL]}
```

**legend**

```
λ = latitude
φ = longitude
ε = elevation
pint  = point of interest
snode = start node
enode = end node
```

## Enumerations

Type   | Definition
-------|---------------------------------------------------------------------------
♇      | Enumeration of planets
