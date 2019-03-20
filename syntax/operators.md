## Operators

In Bee operators are created using Extended ASCII symbols.   
Read about supported symbols here: [symbols](symbols.md)

## Brackets

Bee is using brackets for expressions and data structures.

symbol| description
------|-----------------------------------------------------
  ()  | Comma separated List of values or expressions
  []  | Array or range \| access of elements by index 
  {}  | Enumeration, structure, set or hash map

## Delimiters

symbol  | description
--------|-----------------------------------------------------
 `z`    | Back quote = grave accent for single character 
 'x'    | ASCII character literal is using single quotes
 "y"    | Unlimited string literals are using double quotes


## Single Symbols

symbol| description
------|----------------------------------------------------------------
 \#   | Compiler directives prefix \| Template placeholder
  $   | Global variables prefix \| System environment constants
  :   | Pair up key-value in a collection or method call
  ;   | End of statement \| Statement enumerator
  .   | Decimals for real numbers \| String concatenation
  .   | Membership dot notation \| Prefix for public member/attribute
  \_  | Space constant:' ' \| Anonymous variable
  \*  | Replicate value \| [*] Multiple elements  \|Variable arguments  
  \\  | Escape character (\\n := New Line) \| maybe regular expressions


## Numeric operators  

Listed in the order of precedence top down.

symbol| description
------|------------------------------------------------------------------
 /    | Rational number division (higher precedence)
\-    | Change sign, replace "y = -x" with "y = -1·x"
 ^    | Power symbol used with fractions or expressions   
 ·    | Multiplication
 ÷    | Division 
 ×    | Array and matrix multiplication
 %    | Modulo operator
\+    | Numeric addition \| List append
\-    | Numeric subtraction \| Collection difference 
 ±    | Numeric tolerance (use with ≈)

## Double Symbols

Double symbols is a group of two ASCII symbols considered as one.    

symbol| description
------|------------------------------------------------------
\|\*  | Begin expression comment, or nested comment
 \*\| | End expression comment or nested comment
 \+-  | Start for multiple line comments
 \--  | Start for single line comment /separator
 \**  | Start for a subtitle comment /separator
 \##  | Start for a title comment /separator  
 \-+  | End for multiple line comments 
 ..   | Define range [n..m] \| Define slice from Array
 =\>  | Define: function expression \| method result
 -\>  | Function pipeline \| Explicit conversion 
 \<+  | Unpack a list \| Fill template using values from list
 \<:  | Define subset \| User composite type
 @    | Define output parameter \| Bound first parameter to class

**Note:** Triple dot "..." is used in switch statement.

## Arithmetic modifiers

Each modifier is created with pattern "x=" where x is a single symbol:

symbol| meaning
------|------------------------------------------------------------------
 ::   | explicit clone a reference, or create a slice  \| explicit boxing
 :=   | modify value or reference \| assign new object \| copy value
 +=   | increment value
 -=   | decrement value
 ·=   | multiplication modifier 
 ÷=   | real division modifier
 /=   | rational division modifier
 ^=   | power  modifier
 %=   | modulo modifier

## Relations

Relation operators are used to compare expressions.

symbol | meaning
-------|--------------------------------------------------------------------
  ≡    | same memory address, same reference: (shallow comparison)
  =    | equality of two values, collections or objects (deep comparison)
  ≈    | approximative equal, used with `±` like: (x ≈ 4 ± 0.25)
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
  &&   | Set        |Intersection between two collections
  \|\| | Set        |Union between two collections
  ++   | List       |Concatenation between two lists
  +=   | collection |Append element to collection 
  -=   | collection |Remove element from collection 
  !=   | element    |Remove first element from collection 
  ?=   | element    |Remove last element from collection 
  \<\< | Logic      |set is included in superset: "⊂"
  \>\> | Logic      |set contain subset: "⊃"
  \<=  | Logic      |set is included in superset or equal: "⊆"
  \>=  | Logic      |set contain subset or equal: "⊇"
                                          
## Bitwise Operators 

In Bee the logic operators and bitwise operators are overloaded.

symbol| meaning   | description
------|-----------|-------------------------------
  ↔   | EQUIVALENT| if and only if
  ¬   | NOT       | unary operator
  &   | AND       | dual operator 
 \|   | OR        | dual operator 
 \~   | XOR       | dual operator 

**Logical operators**

Bee is using values  $1 = 1 = True and  $0 = 0 = False 

 p  | q  |¬ p |p ~ q |p ↔ q |p & q | p \| q
----|----|----|------|------|------|--------
 1  | 1  | 0  | 0    | 1    |1     | 1     
 1  | 0  | 0  | 1    | 0    |0     | 1     
 0  | 1  | 1  | 1    | 0    |0     | 1     
 0  | 0  | 1  | 0    | 1    |0     | 0      


**Bitwise operators**

Some of these operators are overloaded.

symbol| meaning       | description
------|---------------|-------------------------------
  ¬   | bit NOT       | unary operator
  &   | bit AND       | dual operator 
 \|   | bit OR        | dual operator 
 \~   | bit XOR       | dual operator 
  ←   | bit SHIFTL    | shift bits to left  
  →   | bit SHIFTR    | shift bits to right  


**See also:** [Bit Manipulation](https://en.wikipedia.org/wiki/Bit_manipulation) 

Arity = 1

 A    | ¬ A | A ← 1 | A → 2  
------|-----|-------|--------
 0000 |1111 | 0000  | 0000   
 1111 |0000 | 1110  | 0011   
 0111 |1000 | 1110  | 0001   
 0110 |1001 | 1100  | 0001   


Arity = 2
 
 A    | B   | A & B  | A \| B  | A ~ B
------|-----|--------|---------|--------
 00   | 00  | 00     | 00      |  11    
 01   | 00  | 00     | 01      |  10    
 11   | 01  | 01     | 11      |  00    
 10   | 11  | 10     | 11      |  01    

 
**Read Next:** [keywords](keywords.md)
