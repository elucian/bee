## Operators

In Bee operators are created using ASCII symbols.

## Brackets

Bee is using brackets for expressions and data structures.

symbol| description
------|-----------------------------------------------------
  ()  | Comma separated List of values or expressions
  []  | Array or range \| access of elements by index 
  {}  | Enumeration, structure, set or hash map

## Single Symbols

symbol| description
------|----------------------------------------------------------------
 ^    | Power symbol used with fractions or expressions
 \#   | Compiler directives prefix \| Template placeholder
  $   | Global variables prefix \| System environment constants
  :   | Pair up key-value in a collection or method call
  ;   | End of statement \| Statement enumerator
  .   | Public element/member/property \| Membership dot notation
  .   | String concatenation 
  '   | ASCII character literal is using single quotes'
  "   | Unlimited string literals are using double quotes"
  \*  | Parameter prefix for variable arguments \| [*] all elements  
  \_  | Anonymous variable (constant  := ' ') \| Space string concatenation 
  \\  | Escape character (\\n := New Line) \| maybe regular expressions 
  \*  | Multiplication \| String repetition
 /    | Numeric Division \| URL or path string concatenation 
 %    | Modulo operator
\+    | Numeric addition \| List concatenation 
\-    | Numeric subtraction \| Collection difference \| Numeric sign


## Double Symbols

Double symbols is a group of two ASCII symbols considered as one.    

symbol| description
------|------------------------------------------------------
\|\*  | Begin expression comment, or nested comment
 \*\| | End expression comment or nested comment
 \--  | Start for single line comment /separator
 \**  | Start for a subtitle comment /separator
 \##  | Start for a title comment /separator  
 ..   | Define range or array slice between two values [n..m]
 =>   | Define function result 
 ->   | Function pipeline \| explicit conversion 
 <+   | Insert one or more values into a string template 
 <:   | Define subset \| input parameter composite type or subset
 @:   | Define input/output parameter with custom type

**Note:** Triple dot "..." is used in switch statement.

## Arithmetic modifiers

Each modifier is created with pattern "x=" where x is a single symbol:

symbol| meaning
------|------------------------------------------------------------------
 ::   | explicit clone a reference, or create a slice  \| explicit boxing
 :=   | modify value or reference \| create new object \| copy value
 +=   | increment value
 -=   | decrement value
 /=   | real division modifier
 *=   | multiplication modifier
 ^=   | power  modifier
 %=   | modulo modifier

## Relations

Relation operators are used to compare expressions.

symbol | meaning
-------|--------------------------------------------------------------------
  ≡    | same memory address, same reference: (shallow comparison)
  =    | equality of two values, collections or objects (deep comparison)
  ≈    | almost equal (support also different data types)  
 \>    | value is greater than 
 \<    | value is less than
  ≥    | greater than or equal to
  ≤    | less than or equal to
  ε    | element belong to collection

**patterns:** 
```
 ¬(x ≡ y) -- divergence of two references, (not the same address)
 ¬(x = y) -- divergence of two values, objects or collections
```

## Collection operators

symbol | `=>`       |meaning
-------|------------|-------------------------------------------------
   &   | Set        |Intersection between two collections
  \|   | Set        |Union between two collections
   +   | List       |Concatenation between two lists
  +=   | collection |Append element to collection 
  -=   | collection |Remove element from collection 
  !=   | element    |Remove first element from collection 
  ?=   | element    |Remove last element from collection 
  <<   | Logic      |set is included in superset: "⊂"
  >>   | Logic      |set contain subset: "⊃"
  <=   | Logic      |set is included in superset or equal: "⊆"
  >=   | Logic      |set contain subset or equal: "⊇"
                                          
## Bitwise Operators 

In Bee the logic operators and bitwise operators are overloaded.

symbol| meaning   | description
------|-----------|-------------------------------
  ↔   | EQUIVALENT| if and only if
  ¬   | NOT       | unary operator
  &   | AND       | dual operator 
 \|   | OR        | dual operator 
 \~   | XOR       | dual operator 
  ←   | SHIFTL    | shift bits to left  
  →   | SHIFTR    | shift bits to right  

**Logical operators**

Bee is using values ƒ is False and † is True

 p | q |¬ p |p ~ q |p ↔ q |p & q | p \| q
---|---|----|------|------|------|--------
 † | † | ƒ  | ƒ    | †    |†     | †      
 † | ƒ | ƒ  | †    | ƒ    |ƒ     | †      
 ƒ | † | †  | †    | ƒ    |ƒ     | †      
 ƒ | ƒ | †  | ƒ    | †    |ƒ     | ƒ      


**Bitwise operators**

 A    | ¬ A | A ← 1 | A → 2  
------|-----|-------|--------
 0000 |1111 | 0000  | 0000   
 1111 |0000 | 1110  | 0011   
 0111 |1000 | 1110  | 0001   
 0110 |1001 | 1100  | 0001   

 A    | B   | A & B  | A \| B  | A ~ B
------|-----|--------|---------|--------
 00   | 00  | 00     | 00      |  11    
 01   | 00  | 00     | 01      |  10    
 11   | 01  | 01     | 11      |  00    
 10   | 11  | 10     | 11      |  01    


**See also:** [Bit Manipulation](https://en.wikipedia.org/wiki/Bit_manipulation) 
 
**Read Next:** [keywords](keywords.md)
