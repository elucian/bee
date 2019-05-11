## Rational numbers

In mathematics rational number is any number that can be expressed as the fraction p\\q of two integer numbers: numerator `p` of type _integer_ and a non-zero denominator `q` of type _natural_ > 0.  
since `q` may be equal to 1, every binary integer is also a rational number.

**Note:** Q numbers are approximated numbers.

* Default precision for Q numbers is 0.001 (micro)
* Default precision can be regulated with directive: #precision:x 
* Operator "≈" is using the default precision if ± is not used

Other precision constants:

*($deci  = 1d = 10⁻¹)
*($centi = 1c = 10⁻²)
*($mili  = 1m = 10⁻³)
*($micro = 1μ = 10⁻⁶)

**Literal Notation:** p/q 

It can be used with type inference to create Q numbers:

**Example:**
```
make x := 0    ∈ Q ; --0     
make a := 1/2  ∈ Q ; --0.5   
make b := 1/4  ∈ Q ; --0.25  
make c := 1/8  ∈ Q ; --0.125 
make d := 1/8  ∈ Q ; --0.062
make e := 1/8  ∈ Q ; --0.031
```

**Note:** 

* The inch is a unit of length in the British imperial and United States 
* It is equal to ​1/36 yard or ​1/12 of a foot
* One inch is divided in 1/2, 1/4, 1/8, 1/16 and 1/32

See also: [wikipedia](https://en.wikipedia.org/wiki/Rational_data_type)

## Q Notation

Rational number has a magnitude and precision defined by the user.  
Is defined using _"fixed point arithmetic"_ declared using Q notation:  

* Qm.n is m+n+1 bit signed integer container with n fractional bits.
* Qm is a m+1 bit signed integer containing 0 fractional bits.

* number of bits = m+n+1
* precision is 2⁻ⁿ
* range is [-(2ᵐ)... (2ᵐ-2⁻ⁿ)]


**For example**
A number format "Q5.2" can store in range(-32.00 to 31.75) on 8 bits.  

* with precision of 2⁻² = 1/4 = 0.25
* from value: -2⁵ = -32.00
* to value:    2⁵ - 2⁻² = 32 - 0.25 = 31.75

```
make  v ∈ Q5.2
alter v := -32   ** minim value
alter v := 31.75 ** maxim value
```

See also: [wikipedia](https://en.wikipedia.org/wiki/Q_(number_format))

## Typical Q numbers

Next I have predefined some numbers for orientation.

|Bytes  |  1\\4  | 1\\8  | 1\\16  | 1\\32 | 1\\64 
|-------|--------|-------|--------|-------|-------
| r ≈   | 0.25   | 0.125 | 0.062  | 0.031 | 0.015 
|-------|--------|-------|--------|-------|-------
|  8    | Q5.2   | Q4.3  | Q3.4   | Q2.5  | Q1.6   
|  16   | Q13.2  | Q12.3 | Q11.4  | Q10.5 | Q9.6  
|  32   | Q29.2  | Q28.3 | Q27.4  | Q26.5 | Q25.6 
|  64   | Q61.2  | Q60.3 | Q59.4  | Q58.5 | Q56.6 
|  128  | Q125.2 | Q124.3|Q123.4  | Q122.5| Q121.6

**Note:** r ≈ is the approximate precision.

**Examples:**

A very large number with high precision on 64 bit:

**Q50.12** 
* Min:-1125899906842624
* Max:+1125899906842623
* Res: 0.000244140625

A number on 32 bit with precision = 0.0005:

**Q20.11** 
* Min:-1048576
* Max: 1048575
* Res: 0.00048828125

## Default Q number

**Q53.10** 

Default Q number has precision 2⁻¹⁰ ≈ 0.001 and occupy 64 bit.

* Min:-9007199254740992
* Max:+9007199254740991
* Res: 0.0009765625

## Approximate comparison

Rational numbers and other numbers can be compared using "≈" instead of "=". 

* Operator "≈" can be used to compare two numbers using default precision;
* Operator "≈" can be used with "±" to overwrite default precision;

**example**

In next example b = 0.33(3), delta = (b - a) = 0.083 

```
** override default precision
#precision:0.01

make a := 0.25 ; --real
make b := 1/3  ; --rational

** using specified precision 0.01 < 0.083
print (a ≈ b) ; --false

print (a ≈ b ± 0.1) ; --true
print (a ≈ c ± 0.5) ; --true
print (b ≈ c ± 0.5) ; --true
```

**Note:** Bee is an efficient language.

