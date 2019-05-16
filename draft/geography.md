## Latitude Longitude

Any location on Earth is described by two numbers: its latitude and its longitude. If a pilot or a ship captain wants to specify position on a map, these are the "coordinates" they would use.

Latitude and longitude are two angles, measured in degrees, "minutes of arc" and "seconds of arc." These are denoted by the symbols ( "°",   "'",   ""  ) For example: 35° 43' 9" means an angle of 35 degrees, 43 minutes' and 9 seconds. A degree contains 60 minutes of arc and a minute contains 60 seconds of arc and you may omit the words "of arc" where the context makes it absolutely clear that these are not units of time.

Bee language has limited support for measurement units. Inside strings you must can use escape sequence "\\'" or '\\"' to represent minutes and seconds. 

Calculations often represent angles by small letters of the Greek alphabet, and that way latitude will be represented by λ (lambda, Greek L), and longitude by φ (phi, Greek F). Here is how they are defined. 

## Data Types

* Δ = Distance
* Λ = Longitude
* Φ = Latitude

```
type Δ <: R[0..+];       
type Λ <: R[-180..+180];
type Φ <: R[-90..+90];
```

Other data types are starting with G prefix and one uppercase letter.

* GL = Geographic Link
* GN = Geographic Node
* GM = Geographic Map

```
  -- geographic node
  type GN <: {λ ∈ Λ, φ ∈ Φ, ε ∈ Δ};             
 
  -- geographic link
  type GL <: {snode, enode @ GN, shape @ [GN]};
  -- point of interest
  type PI <: {(id ∈ N: label @ S, lnode @ GN)};
 
  -- geographic map
  type GM <: {origin @ GN, rotation ∈ ∠, scale ∈ Δ, pint @ [GN], links @ [GL]};
```

**legend**

* λ = latitude
* φ = longitude
* ε = elevation
* pint  = point of interest
* snode = start node
* enode = end node

## Space objects

Type     | Description
---------|-------------------------------------------------------------------------
Galactic | Galactic space
Solar    | Solar space
Star     | A celestial body similar to the Sun with position relative to our Sun
Planet   | Planed similar to Earth with: mass, radius, year duration, day duration
Moon     | Natural celestial body bound to a planet by gravity
Satellite| Artificial celestial body bound to a planet or moon by gravity
Craft    | Space-craft capable to travel in space, not bounded to a planet


## Enumerations

Type   | Definition
-------|---------------------------------------------------------------------------
♇      | Enumeration of planets
