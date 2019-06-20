## Latitude Longitude

Any location on Earth is described by two numbers: its latitude and its longitude. If a pilot or a ship captain wants to specify position on a map, these are the "coordinates" they would use.

Latitude and longitude are two angles, measured in degrees, "minutes of arc" and "seconds of arc." These are denoted by the symbols ( "°",   "′",   "″"  ) For example: 35° 43′ 9″ means an angle of 35 degrees, 43 minutes and 9 seconds. A degree contains 60 minutes of arc and a minute contains 60 seconds of arc and you may omit the words "of arc" where the context makes it absolutely clear that these are not units of time.

Bee language has limited support for measurement units. Calculations often represent angles by small letters of the Greek alphabet, and that way latitude will be represented by λ (lambda, Greek L), and longitude by φ (phi, Greek F). Here is how they are defined. 

## Precision

Earth coordinates can be represented using default Q numbers on 32 bit.

** |angle    |equivalent |
--|---------|-----------|---------------------
2 |0.01°	|1.1132     | km
3 |0.001°	|111.32     | m
4 |0.0001°	|11.132     | m
5 |0.00001°	|1.1132     | m (default precision)

## Data Types

* Δ = Distance  :meters
* Λ = Longitude :° ′ ″
* Φ = Latitude  :° ′ ″

```
type Δ := (0..+100000000) <: Q; !twice equatorial
type Λ := (-180°..+180° ) <: Q; !longitude angle (degree)
type Φ := (-90°..+90°   ) <: Q; !latitude angle (degree)
```

Map data types are represented by Unicode symbols:

* •  = Node: { Shape Point   } 
* ↯  = Link: { Street, Trail }
* ⇄  = Lane
* ⌘  = Complex Intersection
* ◉  = Intersection
* ◈  = Place of Interest ( Food, Market, Gas ...)
* ▣  = Area  of Interest ( Park, Stadium, Golf  )
* §  = Line ( Border, Railway, River)
* ■  = Area ( Water, Forest )
* ♁  = Map
* ⁉  = Condition

```
** map simple node: λ = Latitude, φ = Longitude, i = index
  type • := {i ∈ N, λ ∈ Λ, φ ∈ Φ} <: Object;
  
** network node: λ = Latitude, φ = Longitude, ε = Elevation
  type ◉ := {id ∈ N, λ ∈ Λ, φ ∈ Φ, ε ∈ Δ} <: Object;             
 
** network link
  type ↯ := {id ∈ N, start_node ∈ ◉, end_node ∈ ◉, shape ∈ [•]} <: Object;
  
** place of interest
  type ◈ := {id ∈ N, point ∈ •, label ∈ S} <: Object;

** area 
  type ■ := {id ∈ N, origin ∈ •, shape ∈ [•], category ∈ S} <: Object;

** area of interest
  type ▣ := {id ∈ N, point ∈ •, shape ∈ [•], label ∈ S} <: Object;
  
** map area
  type ♁ := {origin ∈ •, extent ∈ •, scale ∈ Q 
             nodes ∈ [◉], links ∈ [↯], 
             area ∈ [■], pint ∈ [◈], aint ∈  [▣] } <: Object;
```

**legend**

* λ = latitude
* φ = longitude
* ε = elevation

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


## Planets

Type   | Definition
-------|---------------------------------------------------------------------------
☀      | Sun
☿      | Mercury
♀      | Venus
♁      | Earth
♂      | Marth
♃      | Jupiter
♄      | Saturn
♅      | Uraus      
♆      | Neptun
♇      | Pluto
